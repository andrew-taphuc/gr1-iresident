# GRADUATION RESEARCH 1
  Dự án triển khai kiến trúc multi - tenant vào phần mềm quản lý chung cư BlueMoon
## GIỚI THIỆU

Kiến trúc multi - tenant đang là xu hướng của các ứng dụng SaaS hiện nay. Qua ứng dụng này, ta sẽ tiến hành áp dụng kiến trúc này vào ứng dụng quản lý chung cư BlueMoon.
Ứng dụng BlueMoon là ứng dụng hỗ trợ quản lý chung cư với các chức năng:
-	Quản lý hộ dân cư
-	Quản lý nhân khẩu
-	Quản lý phương tiện
-	Quản lý thu phí
-	Quản lý loại phí (Dành cho Tổ trưởng)
-	Quản lý người dùng – Phân quyền người dùng (Dành cho Tổ trưởng)
-	Trang cá nhân

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

- Truy cập đường dẫn đến repository của project:  https://github.com/nmtun/project_IT3180_nhom_10 và clone repository về máy.

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

> Tham khảo cách trình bày như ở đây [Code Project](https://www.codeproject.com/Articles/5385907/Managing-Cplusplus-Projects-with-Conan-and-CMake)

### TÍCH HỢP HỆ THỐNG

- Mô tả các thành phần phần cứng và vai trò của chúng: máy chủ, máy trạm, thiết bị IoT, MQTT Server, module cảm biến IoT...
- Mô tả các thành phần phần mềm và vai trò của chúng, vị trí nằm trên phần cứng nào: Front-end, Back-end, Worker, Middleware...

## CÁC THUẬT TOÁN CƠ BẢN

### 1. Băm mật khẩu bằng Bcrypt khi tạo hoặc cập nhật user
   - Để đảm bảo an toàn, mật khẩu người dùng được băm trước khi lưu vào cơ sở dữ liệu.

     ```js
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(Password, saltRounds);
     ```

### 2. So sánh mật khẩu khi đăng nhập
   - Khi người dùng đăng nhập, hệ thống sẽ so sánh mật khẩu nhập vào với mật khẩu đã băm trong database.

     ```js
     const isMatch = await bcrypt.compare(password, user.Password);
     if (!isMatch) return res.status(401).json({ message: "Invalid password" });
     ```

### 3. Sinh JWT Token khi đăng nhập thành công
   - Sau khi xác thực thành công, hệ thống sinh ra một JWT token để xác thực các request tiếp theo của người dùng.
   
     ```js
     const token = jwt.sign(
       { id: user.UserID },
       process.env.JWT_SECRET || "your_jwt_secret",
       { expiresIn: "1d" }
     );
     ```

### 4. Kiểm tra role động phía frontend (lấy role của user trong từng apartment)
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

## THIẾT KẾ CƠ SỞ DỮ LIỆU    999 

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

## CÁC PAYLOAD   999 

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

- Một số hàm quan trọng
- Mô tả ý nghĩa của hàm, tham số vào, ra
- Hoặc có thể tham chiếu, chụp ảnh từ các công cụ như swagger, pydoc, javadoc, doxygen

  ```C
     /**
      *  Hàm tính ...
      *  @param  x  Tham số
      *  @param  y  Tham số
      */
     void abc(int x, int y = 2);
  ```


## PHÁT SINH

- __Lỗi: Cấp quyền khi tạo chung cư mới__
  - Chi tiết: Khi tạo chung cư mới, người dùng trong phiên hiện tại không thể truy cập các chức năng dành cho tổ trưởng mặc dù trong CSDL đã có bản ghi quyền Tổ trưởng với chung cư mới.
  - Nguyên nhân: Khi tạo chung cư mới, hệ thống đã tạo quyền truy cập cho người dùng trong CSDL nhưng chưa thêm vào localStorage, dẫn đến người dùng không truy cập được các chức năng admin
  - Giải pháp: Thêm role "Tổ trưởng" vào localStorage sau khi thêm role Tổ trưởng vào cơ sở dữ liệu

- __Lỗi: Không hiển thị role người dùng trong trang quản lý__
  - Chi tiết: Khi admin truy cập trang Account, một số quyền truy cập không thể xem được (không hiển thị)
  - Nguyên nhân: Trong form thêm role cho người dùng, thay vì đặt tên role là "Tổ phó", role được đặt nhầm thành "Phó tổ trưởng" dẫn đến không thể hiển thị role của người dùng
  - Giải pháp: Sửa tham số truyền vào khi chọn option "Tổ phó"

- __Lỗi: __
  - Chi tiết: 
  - Nguyên nhân: 
  - Giải pháp: 

  
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


