# Phương Hướng Phát Triển Hệ Thống Quản Lý Chung Cư Thành Multi-Tenant

## 1. Tổng Quan Multi-Tenant Architecture

### 1.1 Định nghĩa Multi-Tenant

Multi-tenant là kiến trúc phần mềm cho phép một instance duy nhất của ứng dụng phục vụ nhiều khách hàng (tenants) khác nhau, mỗi tenant có dữ liệu và cấu hình riêng biệt.

### 1.2 Lợi ích của Multi-Tenant

- **Tiết kiệm chi phí**: Chia sẻ tài nguyên hạ tầng
- **Dễ bảo trì**: Cập nhật một lần cho tất cả tenants
- **Scalability**: Dễ dàng mở rộng theo số lượng tenants
- **Hiệu quả tài nguyên**: Tối ưu hóa việc sử dụng server và database

## 2. Phân Tích Hệ Thống Hiện Tại

### 2.1 Kiến trúc hiện tại

- **Single-tenant**: Phục vụ một chung cư duy nhất
- **Database**: MySQL với các bảng Users, Households, Residents, FeeTypes, v.v.
- **Authentication**: JWT-based cho một tổ chức

### 2.2 Hạn chế của hệ thống hiện tại

- Không thể phục vụ nhiều chung cư cùng lúc
- Dữ liệu không được phân tách theo tổ chức
- Khó mở rộng cho nhiều khách hàng

## 3. Chiến Lược Multi-Tenant

### 3.1 Các mô hình Multi-Tenant

#### A. Database per Tenant (Khuyến nghị cho giai đoạn đầu)

```
Tenant A → Database A
Tenant B → Database B
Tenant C → Database C
```

**Ưu điểm:**

- Isolation hoàn toàn
- Dễ backup/restore cho từng tenant
- Hiệu năng tốt
- Tuân thủ quy định bảo mật

**Nhược điểm:**

- Chi phí cao hơn
- Phức tạp trong việc quản lý

#### B. Shared Database, Separate Schema

```
Database
├── tenant_a_schema
├── tenant_b_schema
└── tenant_c_schema
```

#### C. Shared Database, Shared Schema (Row-Level Security)

```
Tất cả bảng có cột tenant_id
WHERE tenant_id = 'current_tenant'
```

## 4. Roadmap Phát Triển

### Phase 1: Chuẩn bị Infrastructure (2-3 tuần)

#### 4.1 Tạo Tenant Management System

```javascript
// Model: Tenant.js
const Tenant = sequelize.define("Tenant", {
  TenantID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  TenantName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Domain: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  DatabaseName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM("Active", "Inactive", "Suspended"),
    defaultValue: "Active",
  },
  Settings: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});
```

#### 4.2 Middleware Tenant Resolution

```javascript
// middleware/tenantResolver.js
export const resolveTenant = async (req, res, next) => {
  try {
    const domain = req.get("host") || req.headers["x-tenant-domain"];
    const tenant = await Tenant.findOne({ where: { domain } });

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    req.tenant = tenant;
    req.tenantId = tenant.TenantID;
    next();
  } catch (error) {
    res.status(500).json({ error: "Tenant resolution failed" });
  }
};
```

### Phase 2: Database Refactoring (3-4 tuần)

#### 4.3 Cập nhật Models với TenantID

```javascript
// Cập nhật User.js
const User = sequelize.define("User", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TenantID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Tenants",
      key: "TenantID",
    },
  },
  // ... các trường khác
});
```

#### 4.4 Dynamic Database Connection

```javascript
// config/tenantDatabase.js
const tenantConnections = new Map();

export const getTenantConnection = async (tenantId) => {
  if (tenantConnections.has(tenantId)) {
    return tenantConnections.get(tenantId);
  }

  const tenant = await Tenant.findByPk(tenantId);
  const connection = new Sequelize(tenant.DatabaseName, {
    // connection config
  });

  tenantConnections.set(tenantId, connection);
  return connection;
};
```

### Phase 3: Authentication & Authorization (2-3 tuần)

#### 4.5 Multi-Tenant JWT

```javascript
// utils/jwt.js
export const generateTenantToken = (user, tenant) => {
  return jwt.sign(
    {
      userId: user.UserID,
      tenantId: tenant.TenantID,
      role: user.Role,
    },
    process.env.JWT_SECRET
  );
};
```

#### 4.6 Tenant-aware Middleware

```javascript
// middleware/tenantAuth.js
export const tenantAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.tenantId !== req.tenantId) {
    return res.status(403).json({ error: "Tenant mismatch" });
  }

  req.user = decoded;
  next();
};
```

### Phase 4: API Refactoring (4-5 tuần)

#### 4.7 Tenant-aware Controllers

```javascript
// controllers/UserController.js
export const getUsers = async (req, res) => {
  try {
    const connection = await getTenantConnection(req.tenantId);
    const User = connection.models.User;

    const users = await User.findAll({
      where: { TenantID: req.tenantId },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Phase 5: Frontend Adaptation (3-4 tuần)

#### 4.8 Tenant Context

```javascript
// contexts/TenantContext.js
const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    // Resolve tenant from domain/subdomain
    const resolveTenant = async () => {
      const domain = window.location.hostname;
      const response = await api.get(`/tenants/resolve?domain=${domain}`);
      setTenant(response.data);
    };

    resolveTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
};
```

#### 4.9 Tenant-aware API Client

```javascript
// utils/api.js
const api = axios.create();

api.interceptors.request.use((config) => {
  const tenant = getCurrentTenant();
  if (tenant) {
    config.headers["X-Tenant-Domain"] = tenant.domain;
  }
  return config;
});
```

## 5. Deployment Strategy

### 5.1 Infrastructure Requirements

- **Load Balancer**: Nginx/HAProxy cho tenant routing
- **Database**: MySQL Cluster hoặc separate instances
- **Caching**: Redis cho tenant data caching
- **Monitoring**: Prometheus + Grafana cho multi-tenant monitoring

### 5.2 Tenant Onboarding Process

1. **Tenant Registration**: Admin portal để tạo tenant mới
2. **Database Provisioning**: Tự động tạo database/schema
3. **Initial Setup**: Tạo admin user và cấu hình ban đầu
4. **Domain Configuration**: Setup subdomain/custom domain

## 6. Security Considerations

### 6.1 Data Isolation

- Đảm bảo tenant không thể truy cập dữ liệu của tenant khác
- Implement row-level security
- Audit logs cho multi-tenant access

### 6.2 Authentication Security

- Separate JWT secrets per tenant (optional)
- Rate limiting per tenant
- IP whitelisting per tenant

## 7. Monitoring & Analytics

### 7.1 Tenant-specific Metrics

- Usage statistics per tenant
- Performance metrics per tenant
- Resource consumption tracking

### 7.2 Centralized Logging

```javascript
// utils/logger.js
export const logTenantActivity = (tenantId, action, data) => {
  logger.info({
    tenantId,
    action,
    data,
    timestamp: new Date().toISOString(),
  });
};
```

## 8. Migration Strategy

### 8.1 Từ Single-tenant sang Multi-tenant

1. **Backup dữ liệu hiện tại**
2. **Tạo tenant đầu tiên** cho dữ liệu hiện có
3. **Migrate dữ liệu** vào tenant structure
4. **Test thoroughly** trước khi go-live
5. **Gradual rollout** với monitoring

### 8.2 Zero-downtime Migration

- Blue-green deployment
- Database migration scripts
- Rollback procedures

## 9. Cost Analysis

### 9.1 Infrastructure Costs

- Database costs per tenant
- Server resources scaling
- Storage requirements

### 9.2 Development Effort

- **Phase 1-2**: 5-7 tuần (Backend core)
- **Phase 3-4**: 6-8 tuần (API & Auth)
- **Phase 5**: 3-4 tuần (Frontend)
- **Testing & Deployment**: 2-3 tuần

**Tổng thời gian ước tính: 16-22 tuần**

## 10. Risk Mitigation

### 10.1 Technical Risks

- **Data corruption**: Comprehensive backup strategy
- **Performance degradation**: Load testing và optimization
- **Security breaches**: Penetration testing

### 10.2 Business Risks

- **Customer migration**: Phased rollout approach
- **Downtime**: Blue-green deployment
- **Data loss**: Multiple backup strategies

## 11. Success Metrics

- **Onboarding time**: < 24 hours cho tenant mới
- **Performance**: < 2s response time
- **Uptime**: 99.9% availability
- **Scalability**: Support 100+ tenants
- **Cost efficiency**: 30% reduction in per-customer cost

## 12. Next Steps

1. **Stakeholder approval** cho roadmap
2. **Team training** về multi-tenant patterns
3. **POC development** với 2-3 tenants
4. **Performance testing** và optimization
5. **Production deployment** với monitoring

---

_Tài liệu này sẽ được cập nhật định kỳ theo tiến độ phát triển_
