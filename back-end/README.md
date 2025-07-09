# iResident Backend API

## Swagger API Documentation

Dự án đã được tích hợp Swagger để cung cấp documentation cho toàn bộ API.

### Truy cập Swagger UI

Sau khi khởi động server, bạn có thể truy cập Swagger UI tại:

```
http://localhost:3000/api-docs
```

### Các tính năng của Swagger

1. **Interactive API Documentation**: Xem và test các API endpoints trực tiếp từ giao diện web
2. **Request/Response Examples**: Xem cấu trúc request và response cho từng API
3. **Authentication**: Hỗ trợ JWT Bearer token authentication
4. **Schema Definitions**: Định nghĩa rõ ràng các data models
5. **Relationship Management**: Quản lý mối quan hệ giữa User, Apartment và Role

### Các API Endpoints được document

#### Users

- `GET /api/users/get-all-user` - Lấy danh sách tất cả users
- `GET /api/users/get-user-by-id/{id}` - Lấy thông tin user theo ID
- `POST /api/users/create-user` - Tạo user mới
- `PUT /api/users/update-user/{id}` - Cập nhật thông tin user
- `DELETE /api/users/delete-user/{id}` - Xóa user
- `POST /api/users/login` - Đăng nhập user

#### Apartments

- `GET /api/apartments/get-all-apartments` - Lấy danh sách tất cả apartments
- `GET /api/apartments/get-apartment-by-id/{id}` - Lấy thông tin apartment theo ID
- `POST /api/apartments/create-apartment` - Tạo apartment mới
- `PUT /api/apartments/update-apartment/{id}` - Cập nhật thông tin apartment
- `DELETE /api/apartments/delete-apartment/{id}` - Xóa apartment

#### Roles

- `GET /api/roles/get-all-roles` - Lấy danh sách tất cả roles
- `GET /api/roles/get-role-by-id/{id}` - Lấy thông tin role theo ID
- `POST /api/roles/create-role` - Tạo role mới
- `PUT /api/roles/update-role/{id}` - Cập nhật thông tin role
- `DELETE /api/roles/delete-role/{id}` - Xóa role

#### User Apartments (Quan hệ User-Apartment)

- `GET /api/user-apartments/get-all-user-apartments` - Lấy tất cả quan hệ user-apartment
- `GET /api/user-apartments/get-user-apartment-by-id/{id}` - Lấy quan hệ user-apartment theo ID
- `POST /api/user-apartments/create-user-apartment` - Tạo quan hệ user-apartment mới
- `PUT /api/user-apartments/update-user-apartment/{id}` - Cập nhật quan hệ user-apartment
- `DELETE /api/user-apartments/delete-user-apartment/{id}` - Xóa quan hệ user-apartment
- `GET /api/user-apartments/get-apartments-by-user/{userId}` - Lấy tất cả apartments của một user
- `GET /api/user-apartments/get-users-by-apartment/{apartmentId}` - Lấy tất cả users của một apartment

#### User Apartment Roles (Quan hệ User-Apartment-Role)

- `GET /api/user-apartment-roles/get-all-user-apartment-roles` - Lấy tất cả quan hệ user-apartment-role
- `GET /api/user-apartment-roles/get-user-apartment-role-by-id/{id}` - Lấy quan hệ user-apartment-role theo ID
- `POST /api/user-apartment-roles/create-user-apartment-role` - Tạo quan hệ user-apartment-role mới
- `PUT /api/user-apartment-roles/update-user-apartment-role/{id}` - Cập nhật quan hệ user-apartment-role
- `DELETE /api/user-apartment-roles/delete-user-apartment-role/{id}` - Xóa quan hệ user-apartment-role
- `GET /api/user-apartment-roles/get-roles-by-user-apartment/{userApartmentId}` - Lấy tất cả roles của một quan hệ user-apartment
- `GET /api/user-apartment-roles/get-users-by-role-in-apartment/{apartmentId}/{roleId}` - Lấy tất cả users có role cụ thể trong apartment
- `PUT /api/user-apartment-roles/update-active-status/{userApartmentId}` - Cập nhật trạng thái active cho tất cả roles của user-apartment
- `DELETE /api/user-apartment-roles/delete-by-user-apartment/{userApartmentId}` - Xóa tất cả role assignments của một user-apartment

### Cách sử dụng

1. **Khởi động server**:

   ```bash
   npm start
   # hoặc
   npm run dev
   ```

2. **Truy cập Swagger UI**:

   - Mở trình duyệt và truy cập: `http://localhost:3000/api-docs`

3. **Test API**:
   - Chọn endpoint bạn muốn test
   - Click "Try it out"
   - Điền các tham số cần thiết
   - Click "Execute"

### Authentication

Để test các API yêu cầu authentication:

1. Đăng nhập qua endpoint `/api/users/login`
2. Copy JWT token từ response
3. Click "Authorize" button trên Swagger UI
4. Nhập token theo format: `Bearer <your-token>`
5. Click "Authorize"

### Quản lý Role và Permission

Hệ thống hỗ trợ quản lý role và permission thông qua 3 bảng chính:

1. **Roles**: Định nghĩa các vai trò (admin, resident, manager, etc.)
2. **UserApartments**: Quản lý quan hệ giữa user và apartment
3. **UserApartmentRoles**: Gán role cho user trong từng apartment

#### Workflow quản lý role:

1. **Tạo User**: `POST /api/users/create-user`
2. **Tạo Apartment**: `POST /api/apartments/create-apartment`
3. **Liên kết User-Apartment**: `POST /api/user-apartments/create-user-apartment`
4. **Gán Role**: `POST /api/user-apartment-roles/create-user-apartment-role`

### Thêm documentation cho API mới

Để thêm documentation cho API mới, sử dụng JSDoc comments:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Your API description
 *     tags: [YourTag]
 *     responses:
 *       200:
 *         description: Success response
 */
router.get("/your-endpoint", yourController);
```

### Cấu hình Swagger

File cấu hình Swagger được đặt tại: `src/config/swagger.js`

Bạn có thể chỉnh sửa:

- API title và description
- Server URLs
- Security schemes
- Data schemas
- Tags và categories

### Data Models

Hệ thống bao gồm các models chính:

- **User**: Quản lý thông tin người dùng
- **Apartment**: Quản lý thông tin căn hộ
- **Role**: Định nghĩa các vai trò
- **UserApartment**: Quan hệ nhiều-nhiều giữa User và Apartment
- **UserApartmentRole**: Quan hệ nhiều-nhiều giữa UserApartment và Role
- **Resident**: Thông tin cư dân
- **Household**: Thông tin hộ gia đình
- **Vehicle**: Thông tin phương tiện
- **FeeType**: Loại phí
- **FeeDetail**: Chi tiết phí
- **FeeCollection**: Thu phí
