-- Bảng Apartments (Chung cư)
CREATE TABLE Apartments (
  ApartmentID INT PRIMARY KEY AUTO_INCREMENT,
  ApartmentName VARCHAR(200) NOT NULL,
  Phone VARCHAR(20),
  Address TEXT
);

-- Bảng Roles (Vai trò)
CREATE TABLE Roles (
  RoleID INT PRIMARY KEY AUTO_INCREMENT,
  RoleName ENUM('Tổ trưởng', 'Tổ phó', 'Thủ quỹ') NOT NULL UNIQUE,
  Description TEXT
);

-- Bảng Users (đã bỏ trường Role)
CREATE TABLE Users (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  FullName VARCHAR(100) NOT NULL,
  Email VARCHAR(100),
  PhoneNumber VARCHAR(20),
  Status ENUM('Đang hoạt động', 'Đã nghỉ việc') DEFAULT 'Đang hoạt động'
);

-- Bảng User_Apartment (Liên kết User và Apartment)
CREATE TABLE User_Apartment (
  UserApartmentID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT NOT NULL,
  ApartmentID INT NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (ApartmentID) REFERENCES Apartments(ApartmentID) ON DELETE CASCADE,
  UNIQUE KEY unique_user_apartment (UserID, ApartmentID)
);

-- Bảng User_Apartment_Role (Liên kết User, Apartment và Role)
CREATE TABLE User_Apartment_Role (
  UserApartmentRoleID INT PRIMARY KEY AUTO_INCREMENT,
  UserApartmentID INT NOT NULL,
  RoleID INT NOT NULL,
  IsActive BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (UserApartmentID) REFERENCES User_Apartment(UserApartmentID) ON DELETE CASCADE,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
  UNIQUE KEY unique_user_apartment_role (UserApartmentID, RoleID)
);

-- Bảng Households (thêm ApartmentID)
CREATE TABLE Households (
  HouseholdID INT PRIMARY KEY AUTO_INCREMENT,
  ApartmentID INT NOT NULL,
  RoomNumber VARCHAR(20) NOT NULL,
  Type ENUM('Đơn', 'Đôi') NOT NULL,
  HouseholdHead VARCHAR(50) NOT NULL,
  Members INT DEFAULT 0,
  HasVehicle BOOLEAN DEFAULT FALSE,
  Notes TEXT,
  FOREIGN KEY (ApartmentID) REFERENCES Apartments(ApartmentID),
  UNIQUE KEY unique_apartment_room (ApartmentID, RoomNumber)
);

-- Bảng Residents (không cần thêm ApartmentID vì đã có thông qua Households)
CREATE TABLE Residents (
  ResidentID INT PRIMARY KEY AUTO_INCREMENT,
  HouseholdID INT,
  FullName VARCHAR(100) NOT NULL,
  DateOfBirth DATE,
  Sex ENUM('Nam', 'Nữ') NOT NULL,
  Relationship ENUM('Chủ hộ', 'Vợ', 'Chồng', 'Con', 'Cha', 'Mẹ', 'Anh', 'Chị', 'Em', 'Khác') NOT NULL,
  PhoneNumber VARCHAR(20),
  EducationLevel VARCHAR(50),
  Occupation VARCHAR(100),
  ResidencyStatus ENUM('Thường trú', 'Tạm trú', 'Tạm vắng', 'Đã chuyển đi') NOT NULL DEFAULT 'Tạm trú',
  RegistrationDate DATE,
  FOREIGN KEY (HouseholdID) REFERENCES Households(HouseholdID)
);

-- Bảng FeeTypes (thêm ApartmentID)
CREATE TABLE FeeTypes (
  FeeTypeID INT PRIMARY KEY AUTO_INCREMENT,
  ApartmentID INT NOT NULL,
  FeeTypeName VARCHAR(100) NOT NULL,
  Description TEXT,
  Category ENUM('Bắt buộc', 'Tự nguyện') NOT NULL,
  Scope ENUM('Chung', 'Riêng') NOT NULL,
  UnitPrice DECIMAL(10,2),
  Unit VARCHAR(20),
  FOREIGN KEY (ApartmentID) REFERENCES Apartments(ApartmentID)
);

-- Bảng FeeCollections (không cần thêm ApartmentID vì đã có thông qua FeeTypes)
CREATE TABLE FeeCollections (
  CollectionID INT PRIMARY KEY AUTO_INCREMENT,
  FeeTypeID INT NOT NULL,
  CollectionName VARCHAR(100) NOT NULL,
  StartDate DATE NOT NULL,
  EndDate DATE,
  TotalAmount DECIMAL(15,2),
  Status ENUM('Đang thu', 'Hoàn thành', 'Kết thúc') NOT NULL,
  Notes TEXT,
  FOREIGN KEY (FeeTypeID) REFERENCES FeeTypes(FeeTypeID)
);

-- Bảng FeeDetails (không cần thêm ApartmentID vì đã có thông qua FeeCollections -> FeeTypes)
CREATE TABLE FeeDetails (
  FeeDetailID INT PRIMARY KEY AUTO_INCREMENT,
  CollectionID INT,
  HouseholdID INT,
  Amount DECIMAL(10,2),
  PaymentDate DATE,
  PaymentMethod ENUM('Tiền mặt', 'Chuyển khoản') NOT NULL,
  PaymentStatus ENUM('Chưa đóng', 'Đã đóng') NOT NULL,
  FOREIGN KEY (CollectionID) REFERENCES FeeCollections(CollectionID),
  FOREIGN KEY (HouseholdID) REFERENCES Households(HouseholdID)
);

-- Bảng Vehicles (không cần thêm ApartmentID vì đã có thông qua Households)
CREATE TABLE Vehicles (
  VehicleID INT PRIMARY KEY AUTO_INCREMENT,
  HouseholdID INT,
  VehicleType ENUM('Xe máy', 'Ô tô') NOT NULL,
  LicensePlate VARCHAR(20) NOT NULL,
  Brand VARCHAR(50),
  Color VARCHAR(50),
  RegistrationDate DATE NOT NULL,
  Status ENUM('Còn hạn đăng ký gửi', 'Hết hạn đăng ký gửi') NOT NULL,
  FOREIGN KEY (HouseholdID) REFERENCES Households(HouseholdID)
);

-- Insert dữ liệu mẫu cho bảng Roles
INSERT INTO Roles (RoleName, Description) VALUES 
('Tổ trưởng', 'Trưởng ban quản lý chung cư'),
('Tổ phó', 'Phó ban quản lý chung cư'),
('Thủ quỹ', 'Quản lý tài chính chung cư');

-- Index để tối ưu hiệu suất
CREATE INDEX idx_households_apartment ON Households(ApartmentID);
CREATE INDEX idx_feetypes_apartment ON FeeTypes(ApartmentID);
CREATE INDEX idx_user_apartment_user ON User_Apartment(UserID);
CREATE INDEX idx_user_apartment_apartment ON User_Apartment(ApartmentID);
CREATE INDEX idx_user_apartment_role_user_apartment ON User_Apartment_Role(UserApartmentID);

-- Ví dụ query để lấy dữ liệu theo từng chung cư
-- Lấy tất cả hộ gia đình của một chung cư cụ thể
-- SELECT * FROM Households WHERE ApartmentID = 1;

-- Lấy tất cả loại phí của một chung cư cụ thể
-- SELECT * FROM FeeTypes WHERE ApartmentID = 1;

-- Lấy role của user trong một chung cư cụ thể
-- SELECT u.FullName, r.RoleName, a.ApartmentName
-- FROM Users u
-- JOIN User_Apartment ua ON u.UserID = ua.UserID
-- JOIN User_Apartment_Role uar ON ua.UserApartmentID = uar.UserApartmentID
-- JOIN Roles r ON uar.RoleID = r.RoleID
-- JOIN Apartments a ON ua.ApartmentID = a.ApartmentID
-- WHERE a.ApartmentID = 1 AND uar.IsActive = TRUE;