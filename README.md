# GRADUATION RESEARCH 1

Dự án triển khai kiến trúc multi - tenant vào phần mềm quản lý chung cư BlueMoon

## BÁO CÁO THÀNH VIÊN

- **Tạ Hồng Phúc (20225906)**: [Báo cáo chi tiết](./Báo%20cáo%20GR1%20-%20Tạ%20Hồng%20Phúc.pdf)
- **Bùi Quang Hưng (20225849)**: [Báo cáo chi tiết](./Báo%20cáo%20Nghiên%20cứu%20ĐATN1%20-%20Bùi%20Quang%20Hưng%20-%2020225849.pdf)

## GIỚI THIỆU

Kiến trúc multi - tenant đang là xu hướng của các ứng dụng SaaS hiện nay. Qua ứng dụng này, ta sẽ tiến hành áp dụng kiến trúc này vào ứng dụng quản lý chung cư BlueMoon.
Ứng dụng BlueMoon là ứng dụng hỗ trợ quản lý chung cư với các chức năng:

- Quản lý hộ dân cư
- Quản lý nhân khẩu
- Quản lý phương tiện
- Quản lý thu phí
- Quản lý loại phí (Dành cho Tổ trưởng)
- Quản lý người dùng – Phân quyền người dùng (Dành cho Tổ trưởng)
- Trang cá nhân

![Ảnh trang Home](./resource/home.png)

   <div align="center">
     <em>Hình: Sơ đồ tích hợp hệ thống</em>
    </div>

## TÁC GIẢ

- Tên nhóm: Những anh chàng thư giãn
- Thành viên trong nhóm
  |STT|Họ tên|MSSV|
  |--:|--|--|
  |1|Tạ Hồng Phúc|20225906|
  |2|Bùi Quang Hưng|20225849|

## MÔI TRƯỜNG HOẠT ĐỘNG

### 1. Thành phần hệ thống

#### Back-end

Back-end đóng vai trò xử lý toàn bộ logic nghiệp vụ, bảo mật và quản lý dữ liệu. Kiến trúc phân tầng tại đây bao gồm các tầng chính như:

- Tầng Controller (Presentation Layer): Tiếp nhận yêu cầu từ client, điều
  phối luồng dữ liệu.
- Tầng Service (Business Logic Layer): Xử lý nghiệp vụ cốt lõi, áp dụng các
  quy tắc của hệ thống.
- Tầng Model (Data Access Layer): Giao tiếp với cơ sở dữ liệu, đảm bảo lưu
  trữ và truy xuất dữ liệu chính xác.

#### Front-end

Front-end tập trung vào giao diện người dùng, tối ưu hóa trải nghiệm người dùng (UX) với thiết kế đơn giản, mượt mà và tương thích đa nền tảng. Phần này giao tiếp với server thông qua các API REST.

### 2. Nền tảng hệ điều hành hỗ trợ

- Windows 10/11, Linux, MacOS (chỉ cần cài đặt được Node.js và MySQL)

- Các trình duyệt web như Chrome, Safari, Cốc Cốc, ...

### 3. Sơ đồ tích hợp hệ thống

<div align="center">
  <img src="design/LayeredArchitecture.png" alt="" />
  <br>
  <em>Hình: Sơ đồ tích hợp hệ thống</em>
</div>

## HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY THỬ

### 1. Hướng dẫn cài đặt

- Để phần mềm chạy được, hệ điều hành cần cài đặt môi trường cho Node.js.
- Để cấu hình phần mềm, nên có một IDE hỗ trợ như Visual Studio Code.
- Cần cài đặt hệ quản trị cơ sở dữ liệu MySQL để lưu trữ dữ liệu.
- Sau khi cài đặt đủ các phần mềm yêu cầu có thể vào IDE cấu hình lại đường dẫn CSDL, đường dẫn API, khởi động server rồi khởi động client để truy cập giao diện người dùng.
- Các bước cài đặt chi tiết ở phần 4.

### 2. Đối tượng, phạm vi sử dụng

- Đối tượng sử dụng phần mềm: các thành viên ban quản lý chung cư BlueMoon.
- Phạm vi sử dụng phần mềm: dành cho việc quản lý thông tin hộ gia đình, nhân khẩu, thu phí,… ở chung cư BlueMoon.

### 3. Xác định các yêu cầu cài đặt

Yêu cầu phần cứng:

- CPU: 1.1Ghz trở lên
- Bộ nhớ trong (RAM): tối thiểu 2GB

Yêu cầu phần mềm:

- Hệ điều hành: bất kỳ hệ điều hành nào có hỗ trợ Node.js
- Phiên bản Node.js: từ v17.0.0 trở lên

### 4. Hướng dẫn chi tiết các bước cài đặt

#### 4.1 Cài đặt hạ tầng

- Yêu cầu hệ thống: yêu cầu máy vật lý sử dụng hệ điều hành Windows 10 trở lên.
- Đã cài đặt IDE Visual Studio Code của Microsoft

#### 4.2 Cài đặt Node.js

- Truy cập https://nodejs.org/en/download và tải file cài đặt ứng với hệ điều hành đang sử dụng.
- Mở file cài đặt trong thư mục download.
<div align="center">
  <img src="resource/NodeJS.png" alt="" />
</div>
- Mở Command Prompt và chạy dòng lệnh:

```
  npm --version
```

để kiểm đã cài đặt được hay chưa. Nếu cài đặt thành công sẽ hiện ra phiên bản.

<div align="center">
  <img src="resource/Cmd.png" alt="" />
</div>

#### 4.3 Cài đặt Git

- Truy cập liên kết: https://git-scm.com/downloads/win
- Lựa chọn phiên bản phù hợp và tải về máy

#### 4.4 Cài đặt cơ sở dữ liệu MySQL

- Truy cập vào đường dẫn: https://dev.mysql.com/downloads/installer/
- Tải phiên bản 2.1M dành cho Windows

#### 4.5 Cài đặt dự án

- Truy cập đường dẫn đến repository của project: https://github.com/nmtun/project_IT3180_nhom_10 và clone repository về máy.

#### 4.6 Chạy thử ứng dụng

##### Cài đặt Server

- Mở thư mục back-end
- Tải các dependencies bằng câu lệnh:

```
  npm i
```

- Truy cập vào thư mục back-end/src và tạo file .env theo mẫu có sẵn (ở phần 3 của mục THIẾT KẾ CƠ SỞ DỮ LIỆU) và điền thông tin vào
- Ngoài các thông tin về database như đã hướng dẫn ở trên, chạy file back-end/untils getAccessToken.js sau đó sao chép mã được sinh ra vào JWT_SECTET trong file .env

##### Cài đặt giao diện và chạy ứng dụng

- Mở thư mục front-end
- Tải các dependencies bằng câu lệnh:

```
  npm i
```

- Gỡ comment dòng 66 file index.js
- Khởi chạy back-end bằng câu lệnh

```
  npm start
```

- Khởi chạy front-end với câu lệnh

```
  npm run dev
```

## NGUYÊN LÝ CƠ BẢN

### 1. Mục tiêu của kiến trúc multi-tenant

Kiến trúc multi-tenant cho phép một hệ thống phần mềm phục vụ nhiều khách hàng (tenant) trên cùng một nền tảng, nhưng dữ liệu và quyền truy cập của từng tenant được tách biệt rõ ràng. Trong ứng dụng quản lý chung cư BlueMoon, mỗi căn hộ/chung cư được xem như một tenant riêng biệt. Điều này giúp hệ thống dễ dàng mở rộng, quản lý và đảm bảo tính bảo mật dữ liệu giữa các khách hàng.

### 2. Thiết kế bảng dữ liệu phục vụ multi-tenant

Để hiện thực hóa kiến trúc multi-tenant, hệ thống sử dụng các bảng chính và các bảng liên kết (join table) như sau:

- **Users**: Quản lý thông tin tài khoản người dùng. Một user có thể thuộc nhiều tenant (căn hộ/chung cư).
- **Apartments**: Đại diện cho từng tenant (căn hộ/chung cư) trong hệ thống.
- **User_Apartment**: Bảng liên kết nhiều-nhiều giữa User và Apartment, cho phép một user thuộc nhiều apartment (multi-tenant). Đây là bảng trung gian xác định user thuộc những tenant nào.
- **Roles**: Danh sách các vai trò (tổ trưởng, thủ quỹ, tổ phó, cư dân, ...).
- **User_Apartment_Role**: Bảng liên kết giữa User_Apartment và Role, cho phép một user có nhiều vai trò khác nhau ở từng apartment khác nhau.

#### Sơ đồ quan hệ:

- Một User có thể thuộc nhiều Apartment (qua bảng User_Apartment)
- Một User_Apartment có thể có nhiều Role (qua bảng User_Apartment_Role)
- Một Role có thể được gán cho nhiều User_Apartment

### 3. Luồng phân quyền động

- Khi người dùng đăng nhập, hệ thống xác định user này thuộc những apartment nào thông qua bảng User_Apartment.
- Khi người dùng thao tác trên một apartment cụ thể, hệ thống kiểm tra vai trò (role) của user trong apartment đó thông qua bảng User_Apartment_Role.
- Quyền truy cập và chức năng hiển thị trên giao diện sẽ được điều chỉnh động dựa trên role hiện tại của user trong tenant đang chọn.
- Việc phân quyền động này giúp một user có thể là tổ trưởng ở apartment A, nhưng chỉ là cư dân ở apartment B.

#### Ví dụ thực tế:

- User "Nguyễn Văn A" là tổ trưởng (admin) ở chung cư Sunshine, đồng thời là cư dân (resident) ở chung cư BlueMoon.
- Khi đăng nhập và chọn chung cư Sunshine, hệ thống cấp quyền admin cho user này.
- Khi chuyển sang chung cư BlueMoon, hệ thống chỉ cấp quyền cư dân, các chức năng quản trị sẽ bị ẩn.

### 4. Quy tắc thiết kế bảng dữ liệu

- Các bảng thông tin độc lập (như Resident, Vehicle, Fee, ...) sẽ có cột ApartmentID để xác định dữ liệu thuộc tenant nào.
- Các bảng phụ thuộc (join table) như User_Apartment, User_Apartment_Role không cần thêm ApartmentID vì đã liên kết qua các bảng cha.
- Khi truy vấn dữ liệu, luôn lọc theo ApartmentID để đảm bảo tính tách biệt dữ liệu giữa các tenant.

### 5. Các ưu điểm

- **Bảo mật dữ liệu**: Mỗi tenant chỉ truy cập được dữ liệu của mình.
- **Mở rộng linh hoạt**: Dễ dàng thêm tenant mới mà không ảnh hưởng đến các tenant khác.
- **Phân quyền động**: Một user có thể có nhiều vai trò ở các tenant khác nhau, quyền hạn được kiểm soát linh hoạt.
- **Quản lý tập trung**: Dễ dàng quản lý người dùng, vai trò, dữ liệu cho từng tenant trên cùng một hệ thống.

---

## CÁC THUẬT TOÁN CƠ BẢN

### 1. Băm mật khẩu bằng Bcrypt khi tạo hoặc cập nhật user

- Để đảm bảo an toàn, mật khẩu người dùng được băm trước khi lưu vào cơ sở dữ liệu.

  ```js
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(Password, saltRounds);
  ```

### 2. Sinh JWT Token khi đăng nhập thành công

- Sau khi xác thực thành công, hệ thống sinh ra một JWT token để xác thực các request tiếp theo của người dùng.

  ```js
  const token = jwt.sign(
    { id: user.UserID },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1d" }
  );
  ```

### 3. Kiểm tra role động phía frontend (lấy role của user trong từng apartment)

- Ứng dụng frontend gọi API để lấy vai trò hiện tại của user trong apartment đang chọn, lưu vào localStorage để điều hướng và hiển thị chức năng phù hợp.

  ```js
  const roleResponse = await axiosInstance.get(
    `/user-apartment-roles/get-roles-by-user-apartment/${currentUserApartment.UserApartmentID}`
  );
  const activeRole = roleResponse.data.roles.find(
    (role) => role.IsActive === true
  );
  if (activeRole && activeRole.Role) {
    localStorage.setItem("role", activeRole.Role.RoleName);
    return activeRole.Role.RoleName;
  }
  ```

## THIẾT KẾ CƠ SỞ DỮ LIỆU

### 1. Sơ đồ logic để thể hiện mối quan hệ giữa các bảng trong CSDL.

<div align="center">
  <img src="./resource/logic.png" alt="Logic" />
  <br>
  <em>Hình: Sơ đồ Logic</em>
</div>

### 2. Chi tiết các bảng phục vụ kiến trúc multi - tenant

- **Users**

  - Quản lý thông tin tài khoản người dùng, có thể thuộc nhiều tenant (căn hộ/chung cư).
  - Trường quan trọng:
    - `UserID`: Khóa chính
    - `Username`: Tên đăng nhập
    - `Password`: Mật khẩu (băm)
    - `Email`: Email liên hệ

- **Apartments**

  - Đại diện cho từng tenant (căn hộ/chung cư) trong hệ thống.
  - Trường quan trọng:
    - `ApartmentID`: Khóa chính
    - `ApartmentName`: Tên/mã căn hộ
    - `Address`: Địa chỉ

- **User_Apartment**

  - Bảng liên kết nhiều-nhiều giữa User và Apartment, cho phép một user thuộc nhiều apartment (multi-tenant).
  - Trường quan trọng:
    - `UserApartmentID`: Khóa chính
    - `UserID`: Liên kết Users
    - `ApartmentID`: Liên kết Apartments

- **Roles**

  - Danh sách các vai trò (tổ trưởng, thủ quỹ, tổ phó).
  - Trường quan trọng:
    - `RoleID`: Khóa chính
    - `RoleName`: Tên vai trò

- **User_Apartment_Role**

  - Gán vai trò cho user ở từng apartment, cho phép một user có vai trò khác nhau ở các tenant khác nhau.
  - Trường quan trọng:
    - `UserApartmentRoleID`: Khóa chính
    - `UserApartmentID`: Liên kết UserApartment
    - `RoleID`: Liên kết Role

- **Ví dụ luồng dữ liệu đa khách hàng:**
  - Một user có thể là tổ trưởng (admin) ở apartment A, nhưng chỉ là cư dân (resident) ở apartment B.
  - Khi đăng nhập, hệ thống xác định user đang thao tác với tenant (apartment) nào, và phân quyền dựa trên User_Apartment_Role.

### 3. Cấu hình file .env

```env
DB_HOST="Your database host"
DB_USER="Your database user"
DB_PASSWORD="Your database password"
DB_NAME="Your database name"
DB_PORT="Your database port"
JWT_SECRET="Your JWT secret key"
```

## CÁC PAYLOAD

### Các payload JSON cho chức năng đa khách hàng:

- **Tạo căn hộ mới (Apartment):**

  ```json
  {
    "ApartmentName": "Chung cư Sunshine",
    "Phone": "0123456789",
    "Address": "Số 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội"
  }
  ```

- **Tạo user mới (User):**

  ```json
  {
    "Username": "admin",
    "Password": "123456",
    "FullName": "Nguyễn Văn A",
    "Email": "admin@gmail.com",
    "PhoneNumber": "0912345678"
  }
  ```

- **Gán user vào một apartment (User_Apartment):**

  ```json
  {
    "UserID": 1,
    "ApartmentID": 1
  }
  ```

- **Gán vai trò cho user ở một căn hộ (User_Apartment_Role):**
  ```json
  {
    "UserApartmentID": 1,
    "RoleID": 1,
    "IsActive": true
  }
  ```

## ĐẶC TẢ HÀM

- Danh sách các API trong Back-end:

  ![API User](./resource/user.png)
   <div align="center">
     <em>API cho User</em>
    </div>

  ![API Apartment](./resource/apartment.png)
   <div align="center">
     <em>API cho Apartment</em>
    </div>

  ![API Role](./resource/role.png)
   <div align="center">
     <em>API cho Role</em>
    </div>

  ![API UserApartment](./resource/user_apartment.png)
   <div align="center">
     <em>API cho UserApartment</em>
    </div>

  ![API UserApartmentRole](./resource/user_apartment_role.png)
   <div align="center">
     <em>API cho UserApartmentRole</em>
    </div>

## PHÁT SINH

- **Lỗi: Cấp quyền khi tạo chung cư mới**

  - Chi tiết: Khi tạo chung cư mới, người dùng trong phiên hiện tại không thể truy cập các chức năng dành cho tổ trưởng mặc dù trong CSDL đã có bản ghi quyền Tổ trưởng với chung cư mới.
  - Nguyên nhân: Khi tạo chung cư mới, hệ thống đã tạo quyền truy cập cho người dùng trong CSDL nhưng chưa thêm vào localStorage, dẫn đến người dùng không truy cập được các chức năng admin
  - Giải pháp: Thêm role "Tổ trưởng" vào localStorage sau khi thêm role Tổ trưởng vào cơ sở dữ liệu

- **Lỗi: Không hiển thị role người dùng trong trang quản lý**
  - Chi tiết: Khi admin truy cập trang Account, một số quyền truy cập không thể xem được (không hiển thị)
  - Nguyên nhân: Trong form thêm role cho người dùng, thay vì đặt tên role là "Tổ phó", role được đặt nhầm thành "Phó tổ trưởng" dẫn đến không thể hiển thị role của người dùng
  - Giải pháp: Sửa tham số truyền vào khi chọn option "Tổ phó"

- **Lỗi: Trùng số phòng giữa các tenant**
  - Chi tiết: Khi chung cư A có phòng 101, chung cư B không thể thêm được phòng 101 dù là 2 chung cư riêng biệt
  - Nguyên nhân: Trong CSDL, trường RoomNumber có giá trị unique:true, dẫn đến không thể thêm được số phòng trùng nhau dù khác ApartmentID
  - Giải pháp: Đặt ràng buộc unique cho trường RoomNumber thành false và set cặp (RoomNumber, ApartmentID) có ràng buộc unique: true
## KẾT QUẢ

### Khởi tạo một tenant (chung cư) mới:

<div align="center">
  <img src="resource/CreateTenant.png" alt="" />
</div>

- Admin (Tổ trưởng) điền thông tin của chung cư muốn khởi tạo:

<div align="center">
  <img src="resource/FillInfoTenant.png" alt="" />
</div>

- Khởi tạo thành công:

<div align="center">
  <img src="resource/SuccessCreate.png" alt="" />
</div>

### Lựa chọn chung cư muốn làm việc:

- Một User có thể vừa là thủ quỹ của chung cư này, vừa là tổ phó của chung cư khác. Khi đăng nhập vào hệ thống, người dùng lựa chọn chung cư muốn làm việc.

<div align="center">
  <img src="resource/SelectApartment.png" alt="" />
</div>

### Thêm tài khoản người dùng (có sẵn trong hệ thống) vào chung cu:

- Admin (Tổ trưởng) của chung cư có quyền thêm các tài khoản người dùng vào trong hệ thống chung cư đó với các nhu cầu khác nhau để đáp ứng nhu cầu quản lý.

<div align="center">
  <img src="resource/AddAccount.png" alt="" />
</div>

- Thêm tài khoản thành công

<div align="center">
  <img src="resource/Result.png" alt="" />
</div>
