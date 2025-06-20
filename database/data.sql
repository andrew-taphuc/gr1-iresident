-- Dữ liệu mẫu cho hệ thống quản lý chung cư

-- 1. Tạo dữ liệu cho 5 chung cư
INSERT INTO Apartments (ApartmentName, Phone, Address) VALUES 
('Chung cư Hoàng Anh Gia Lai', '024-3838-1234', '123 Nguyễn Trãi, Thanh Xuân, Hà Nội'),
('Chung cư Times City', '024-3838-5678', '458 Minh Khai, Hai Bà Trưng, Hà Nội'),
('Chung cư Royal City', '024-3838-9012', '72A Nguyễn Trãi, Thanh Xuân, Hà Nội'),
('Chung cư Landmark 81', '028-3838-3456', '720A Điện Biên Phủ, Bình Thạnh, TP.HCM'),
('Chung cư Vinhomes Central Park', '028-3838-7890', '208 Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM');

-- 2. Tạo tài khoản người dùng (15 tài khoản: 5 tổ trưởng, 5 tổ phó, 5 thủ quỹ)
INSERT INTO Users (Username, Password, FullName, Email, PhoneNumber) VALUES 
-- Tổ trưởng
('admin1', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Nguyễn Văn An', 'admin1@apartment.com', '0901234567'),
('admin2', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Trần Thị Bình', 'admin2@apartment.com', '0901234568'),
('admin3', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Lê Văn Cường', 'admin3@apartment.com', '0901234569'),
('admin4', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Phạm Thị Dung', 'admin4@apartment.com', '0901234570'),
('admin5', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Hoàng Văn Em', 'admin5@apartment.com', '0901234571'),
-- Tổ phó
('sadmin1', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Vũ Thị Hoa', 'sadmin1@apartment.com', '0902234567'),
('sadmin2', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Đỗ Văn Giang', 'sadmin2@apartment.com', '0902234568'),
('sadmin3', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Bùi Thị Kim', 'sadmin3@apartment.com', '0902234569'),
('sadmin4', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Ngô Văn Long', 'sadmin4@apartment.com', '0902234570'),
('sadmin5', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Lý Thị Mai', 'sadmin5@apartment.com', '0902234571'),
-- Thủ quỹ
('tq1', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Đinh Văn Nam', 'tq1@apartment.com', '0903234567'),
('tq2', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Cao Thị Oanh', 'tq2@apartment.com', '0903234568'),
('tq3', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Phan Văn Phúc', 'tq3@apartment.com', '0903234569'),
('tq4', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Võ Thị Quỳnh', 'tq4@apartment.com', '0903234570'),
('tq5', '$2b$10$hueaoVQCcgOpYtKA6jqPIeKwVRCV/Q3uk.rZyis/7aWtggH4a6uJu', 'Tạ Văn Sơn', 'tq5@apartment.com', '0903234571');

-- 3. Liên kết User với Apartment
INSERT INTO User_Apartment (UserID, ApartmentID) VALUES 
-- Chung cư 1
(1, 1), (6, 1), (11, 1),
-- Chung cư 2
(2, 2), (7, 2), (12, 2),
-- Chung cư 3
(3, 3), (8, 3), (13, 3),
-- Chung cư 4
(4, 4), (9, 4), (14, 4),
-- Chung cư 5
(5, 5), (10, 5), (15, 5);

-- 4. Gán Role cho User trong từng Apartment
INSERT INTO User_Apartment_Role (UserApartmentID, RoleID, IsActive) VALUES 
-- Chung cư 1: admin1=Tổ trưởng, sadmin1=Tổ phó, tq1=Thủ quỹ
(1, 1, TRUE), (2, 2, TRUE), (3, 3, TRUE),
-- Chung cư 2: admin2=Tổ trưởng, sadmin2=Tổ phó, tq2=Thủ quỹ
(4, 1, TRUE), (5, 2, TRUE), (6, 3, TRUE),
-- Chung cư 3: admin3=Tổ trưởng, sadmin3=Tổ phó, tq3=Thủ quỹ
(7, 1, TRUE), (8, 2, TRUE), (9, 3, TRUE),
-- Chung cư 4: admin4=Tổ trưởng, sadmin4=Tổ phó, tq4=Thủ quỹ
(10, 1, TRUE), (11, 2, TRUE), (12, 3, TRUE),
-- Chung cư 5: admin5=Tổ trưởng, sadmin5=Tổ phó, tq5=Thủ quỹ
(13, 1, TRUE), (14, 2, TRUE), (15, 3, TRUE);

-- 5. Tạo Households (5 hộ cho mỗi chung cư)
INSERT INTO Households (ApartmentID, RoomNumber, HouseholdHead, Members, HasVehicle, Notes) VALUES 
-- Chung cư 1
(1, 'A101', 'Đôi', 'Trần Văn Tuấn', 3, TRUE, 'Gia đình trẻ'),
(1, 'A102', 'Đơn', 'Nguyễn Thị Linh', 2, TRUE, 'Vợ chồng trẻ'),
(1, 'A103', 'Đôi', 'Lê Văn Minh', 3, TRUE, 'Có trẻ nhỏ'),
(1, 'A104', 'Đơn', 'Phạm Thị Nga', 2, FALSE, 'Cặp đôi'),
(1, 'A105', 'Đôi', 'Hoàng Văn Bình', 3, TRUE, 'Gia đình 3 thế hệ'),

-- Chung cư 2
(2, 'B201', 'Đôi', 'Vũ Văn Đức', 3, TRUE, 'Gia đình có con nhỏ'),
(2, 'B202', 'Đơn', 'Đỗ Thị Hương', 2, TRUE, 'Vợ chồng trung niên'),
(2, 'B203', 'Đôi', 'Bùi Văn Khoa', 3, TRUE, 'Gia đình trẻ'),
(2, 'B204', 'Đơn', 'Ngô Thị Lan', 2, TRUE, 'Cặp vợ chồng'),
(2, 'B205', 'Đôi', 'Lý Văn Mạnh', 3, FALSE, 'Ba thế hệ cùng sống'),

-- Chung cư 3
(3, 'C301', 'Đôi', 'Đinh Văn Nhân', 3, TRUE, 'Gia đình có 2 con'),
(3, 'C302', 'Đơn', 'Cao Thị Oanh', 2, TRUE, 'Vợ chồng mới cưới'),
(3, 'C303', 'Đôi', 'Phan Văn Phong', 3, TRUE, 'Gia đình đông con'),
(3, 'C304', 'Đơn', 'Võ Thị Quỳnh', 2, TRUE, 'Cặp vợ chồng trẻ'),
(3, 'C305', 'Đôi', 'Tạ Văn Rồng', 3, TRUE, 'Gia đình 3 thế hệ'),

-- Chung cư 4
(4, 'D401', 'Đôi', 'Lương Văn Sáng', 3, TRUE, 'Gia đình có con học đại học'),
(4, 'D402', 'Đơn', 'Đặng Thị Tâm', 2, TRUE, 'Vợ chồng trung niên'),
(4, 'D403', 'Đôi', 'Chu Văn Uy', 3, TRUE, 'Gia đình trẻ'),
(4, 'D404', 'Đơn', 'Trịnh Thị Vân', 2, FALSE, 'Cặp đôi mới cưới'),
(4, 'D405', 'Đôi', 'Mai Văn Xuân', 3, TRUE, 'Gia đình có ông bà'),

-- Chung cư 5
(5, 'E501', 'Đôi', 'Dương Văn Yên', 3, TRUE, 'Gia đình 3 người'),
(5, 'E502', 'Đơn', 'Hồ Thị Ánh', 2, TRUE, 'Vợ chồng trẻ'),
(5, 'E503', 'Đôi', 'Lại Văn Bằng', 3, TRUE, 'Có trẻ em'),
(5, 'E504', 'Đơn', 'Ung Thị Cúc', 2, TRUE, 'Cặp vợ chồng'),
(5, 'E505', 'Đôi', 'Kiều Văn Đạt', 3, TRUE, 'Gia đình đông người');

-- 6. Tạo Residents (2-3 người cho mỗi household)
INSERT INTO Residents (HouseholdID, FullName, DateOfBirth, Sex, Relationship, PhoneNumber, EducationLevel, Occupation, ResidencyStatus, RegistrationDate) VALUES 
-- Household 1 (A101)
(1, 'Trần Văn Tuấn', '1985-05-15', 'Nam', 'Chủ hộ', '0911111111', 'Đại học', 'Kỹ sư', 'Thường trú', '2023-01-15'),
(1, 'Lê Thị Hoa', '1987-08-20', 'Nữ', 'Vợ', '0911111112', 'Cao đẳng', 'Kế toán', 'Thường trú', '2023-01-15'),
(1, 'Trần Văn Minh', '2015-03-10', 'Nam', 'Con', NULL, 'Tiểu học', 'Học sinh', 'Thường trú', '2023-01-15'),

-- Household 2 (A102)
(2, 'Nguyễn Thị Linh', '1990-12-05', 'Nữ', 'Chủ hộ', '0912222222', 'Đại học', 'Giáo viên', 'Thường trú', '2023-02-01'),
(2, 'Phạm Văn Đức', '1988-07-25', 'Nam', 'Chồng', '0912222223', 'Đại học', 'Bác sĩ', 'Thường trú', '2023-02-01'),

-- Household 3 (A103)
(3, 'Lê Văn Minh', '1982-11-12', 'Nam', 'Chủ hộ', '0913333333', 'Đại học', 'Quản lý', 'Thường trú', '2023-03-01'),
(3, 'Hoàng Thị Lan', '1985-06-18', 'Nữ', 'Vợ', '0913333334', 'Cao đẳng', 'Nhân viên văn phòng', 'Thường trú', '2023-03-01'),
(3, 'Lê Thị Mai', '2018-09-22', 'Nữ', 'Con', NULL, 'Mầm non', 'Trẻ em', 'Thường trú', '2023-03-01'),

-- Household 4 (A104)
(4, 'Phạm Thị Nga', '1992-04-08', 'Nữ', 'Chủ hộ', '0914444444', 'Đại học', 'Marketing', 'Thường trú', '2023-04-01'),
(4, 'Vũ Văn Nam', '1990-01-30', 'Nam', 'Chồng', '0914444445', 'Đại học', 'IT', 'Thường trú', '2023-04-01'),

-- Household 5 (A105)
(5, 'Hoàng Văn Bình', '1978-10-14', 'Nam', 'Chủ hộ', '0915555555', 'Trung cấp', 'Thợ điện', 'Thường trú', '2023-05-01'),
(5, 'Nguyễn Thị Oanh', '1980-03-22', 'Nữ', 'Vợ', '0915555556', 'THPT', 'Nội trợ', 'Thường trú', '2023-05-01'),
(5, 'Hoàng Văn Phúc', '2010-12-05', 'Nam', 'Con', NULL, 'THCS', 'Học sinh', 'Thường trú', '2023-05-01'),

-- Household 6 (B201)
(6, 'Vũ Văn Đức', '1986-09-17', 'Nam', 'Chủ hộ', '0916666666', 'Đại học', 'Kiến trúc sư', 'Thường trú', '2023-06-01'),
(6, 'Đỗ Thị Bích', '1988-11-25', 'Nữ', 'Vợ', '0916666667', 'Đại học', 'Dược sĩ', 'Thường trú', '2023-06-01'),
(6, 'Vũ Thị Cẩm', '2016-02-14', 'Nữ', 'Con', NULL, 'Tiểu học', 'Học sinh', 'Thường trú', '2023-06-01'),

-- Household 7 (B202)
(7, 'Đỗ Thị Hương', '1975-07-20', 'Nữ', 'Chủ hộ', '0917777777', 'Cao đẳng', 'Y tá', 'Thường trú', '2023-07-01'),
(7, 'Bùi Văn Hùng', '1973-04-12', 'Nam', 'Chồng', '0917777778', 'Đại học', 'Luật sư', 'Thường trú', '2023-07-01'),

-- Household 8 (B203)
(8, 'Bùi Văn Khoa', '1991-08-28', 'Nam', 'Chủ hộ', '0918888888', 'Đại học', 'Lập trình viên', 'Thường trú', '2023-08-01'),
(8, 'Ngô Thị Linh', '1993-12-15', 'Nữ', 'Vợ', '0918888889', 'Đại học', 'Thiết kế', 'Thường trú', '2023-08-01'),
(8, 'Bùi Văn Long', '2020-05-10', 'Nam', 'Con', NULL, 'Mầm non', 'Trẻ em', 'Thường trú', '2023-08-01'),

-- Household 9 (B204)
(9, 'Ngô Thị Lan', '1989-06-03', 'Nữ', 'Chủ hộ', '0919999999', 'Đại học', 'Nhà báo', 'Thường trú', '2023-09-01'),
(9, 'Lý Văn Minh', '1987-01-18', 'Nam', 'Chồng', '0919999990', 'Đại học', 'Photographer', 'Thường trú', '2023-09-01'),

-- Household 10 (B205)
(10, 'Lý Văn Mạnh', '1970-11-08', 'Nam', 'Chủ hộ', '0910101010', 'THPT', 'Công nhân', 'Thường trú', '2023-10-01'),
(10, 'Đinh Thị Nga', '1972-09-26', 'Nữ', 'Vợ', '0910101011', 'THCS', 'Bán hàng', 'Thường trú', '2023-10-01'),
(10, 'Lý Văn Ơn', '2000-07-14', 'Nam', 'Con', '0910101012', 'Đại học', 'Sinh viên', 'Thường trú', '2023-10-01'),

-- Tiếp tục với 15 households còn lại...
-- Household 11 (C301)
(11, 'Đinh Văn Nhân', '1983-02-28', 'Nam', 'Chủ hộ', '0920202020', 'Đại học', 'Nhà quản lý', 'Thường trú', '2023-11-01'),
(11, 'Cao Thị Phương', '1985-10-16', 'Nữ', 'Vợ', '0920202021', 'Cao đẳng', 'Thư ký', 'Thường trú', '2023-11-01'),
(11, 'Đinh Văn Quang', '2012-04-08', 'Nam', 'Con', NULL, 'Tiểu học', 'Học sinh', 'Thường trú', '2023-11-01'),

-- Household 12 (C302)
(12, 'Cao Thị Oanh', '1994-01-12', 'Nữ', 'Chủ hộ', '0921212121', 'Đại học', 'Bán hàng', 'Thường trú', '2023-12-01'),
(12, 'Phan Văn Rồng', '1992-08-24', 'Nam', 'Chồng', '0921212122', 'Đại học', 'Kỹ thuật', 'Thường trú', '2023-12-01'),

-- Household 13 (C303)
(13, 'Phan Văn Phong', '1979-05-19', 'Nam', 'Chủ hộ', '0922222222', 'Trung cấp', 'Thợ xây', 'Thường trú', '2024-01-01'),
(13, 'Võ Thị Sáng', '1981-12-07', 'Nữ', 'Vợ', '0922222223', 'THPT', 'Bán hàng', 'Thường trú', '2024-01-01'),
(13, 'Phan Thị Thu', '2008-09-13', 'Nữ', 'Con', NULL, 'THCS', 'Học sinh', 'Thường trú', '2024-01-01'),

-- Household 14 (C304)
(14, 'Võ Thị Quỳnh', '1993-03-21', 'Nữ', 'Chủ hộ', '0923232323', 'Đại học', 'Tài chính', 'Thường trú', '2024-02-01'),
(14, 'Tạ Văn Uy', '1991-11-09', 'Nam', 'Chồng', '0923232324', 'Đại học', 'Quản lý dự án', 'Thường trú', '2024-02-01'),

-- Household 15 (C305)
(15, 'Tạ Văn Rồng', '1977-06-15', 'Nam', 'Chủ hộ', '0924242424', 'THPT', 'Tài xế', 'Thường trú', '2024-03-01'),
(15, 'Lương Thị Vân', '1979-04-03', 'Nữ', 'Vợ', '0924242425', 'THCS', 'Nội trợ', 'Thường trú', '2024-03-01'),
(15, 'Tạ Văn Xuân', '2005-01-27', 'Nam', 'Con', NULL, 'THPT', 'Học sinh', 'Thường trú', '2024-03-01'),

-- Household 16 (D401)
(16, 'Lương Văn Sáng', '1975-08-11', 'Nam', 'Chủ hộ', '0925252525', 'Đại học', 'Giám đốc', 'Thường trú', '2024-04-01'),
(16, 'Đặng Thị Yến', '1977-02-19', 'Nữ', 'Vợ', '0925252526', 'Đại học', 'Bác sĩ', 'Thường trú', '2024-04-01'),
(16, 'Lương Văn Ánh', '1999-10-05', 'Nam', 'Con', '0925252527', 'Đại học', 'Sinh viên', 'Thường trú', '2024-04-01'),

-- Household 17 (D402)
(17, 'Đặng Thị Tâm', '1986-12-23', 'Nữ', 'Chủ hộ', '0926262626', 'Đại học', 'Nhân sự', 'Thường trú', '2024-05-01'),
(17, 'Chu Văn Bình', '1984-07-31', 'Nam', 'Chồng', '0926262627', 'Đại học', 'Marketing', 'Thường trú', '2024-05-01'),

-- Household 18 (D403)
(18, 'Chu Văn Uy', '1988-09-14', 'Nam', 'Chủ hộ', '0927272727', 'Đại học', 'Kinh doanh', 'Thường trú', '2024-06-01'),
(18, 'Trịnh Thị Cẩm', '1990-05-22', 'Nữ', 'Vợ', '0927272728', 'Cao đẳng', 'Điều dưỡng', 'Thường trú', '2024-06-01'),
(18, 'Chu Thị Đào', '2019-03-18', 'Nữ', 'Con', NULL, 'Mầm non', 'Trẻ em', 'Thường trú', '2024-06-01'),

-- Household 19 (D404)
(19, 'Trịnh Thị Vân', '1995-01-06', 'Nữ', 'Chủ hộ', '0928282828', 'Đại học', 'Thiết kế', 'Thường trú', '2024-07-01'),
(19, 'Mai Văn Em', '1993-11-14', 'Nam', 'Chồng', '0928282829', 'Đại học', 'Lập trình', 'Thường trú', '2024-07-01'),

-- Household 20 (D405)
(20, 'Mai Văn Xuân', '1980-04-30', 'Nam', 'Chủ hộ', '0929292929', 'Trung cấp', 'Thợ điện', 'Thường trú', '2024-08-01'),
(20, 'Dương Thị Giang', '1982-08-17', 'Nữ', 'Vợ', '0929292930', 'THPT', 'Bán hàng', 'Thường trú', '2024-08-01'),
(20, 'Mai Văn Hà', '2007-12-25', 'Nam', 'Con', NULL, 'THCS', 'Học sinh', 'Thường trú', '2024-08-01'),

-- Household 21 (E501)
(21, 'Dương Văn Yên', '1987-07-09', 'Nam', 'Chủ hộ', '0930303030', 'Đại học', 'Kế toán', 'Thường trú', '2024-09-01'),
(21, 'Hồ Thị Kiều', '1989-03-27', 'Nữ', 'Vợ', '0930303031', 'Cao đẳng', 'Giáo viên', 'Thường trú', '2024-09-01'),
(21, 'Dương Văn Lâm', '2014-11-12', 'Nam', 'Con', NULL, 'Tiểu học', 'Học sinh', 'Thường trú', '2024-09-01'),

-- Household 22 (E502)
(22, 'Hồ Thị Ánh', '1992-10-04', 'Nữ', 'Chủ hộ', '0931313131', 'Đại học', 'Quản lý', 'Thường trú', '2024-10-01'),
(22, 'Lại Văn Minh', '1990-06-21', 'Nam', 'Chồng', '0931313132', 'Đại học', 'Kỹ sư', 'Thường trú', '2024-10-01'),

-- Household 23 (E503)
(23, 'Lại Văn Bằng', '1984-01-16', 'Nam', 'Chủ hộ', '0932323232', 'Đại học', 'Bán hàng', 'Thường trú', '2024-11-01'),
(23, 'Ung Thị Nga', '1986-09-08', 'Nữ', 'Vợ', '0932323233', 'Cao đẳng', 'Kế toán', 'Thường trú', '2024-11-01'),
(23, 'Lại Thị Oanh', '2017-05-24', 'Nữ', 'Con', NULL, 'Mầm non', 'Trẻ em', 'Thường trú', '2024-11-01'),

-- Household 24 (E504)
(24, 'Ung Thị Cúc', '1988-04-13', 'Nữ', 'Chủ hộ', '0933333333', 'Đại học', 'Y tá', 'Thường trú', '2024-12-01'),
(24, 'Kiều Văn Phúc', '1986-12-01', 'Nam', 'Chồng', '0933333334', 'Đại học', 'Dược sĩ', 'Thường trú', '2024-12-01'),

-- Household 25 (E505)
(25, 'Kiều Văn Đạt', '1976-02-18', 'Nam', 'Chủ hộ', '0934343434', 'THPT', 'Tài xế', 'Thường trú', '2025-01-01'),
(25, 'Trần Thị Quỳnh', '1978-08-06', 'Nữ', 'Vợ', '0934343435', 'THCS', 'Nội trợ', 'Thường trú', '2025-01-01'),
(25, 'Kiều Văn Sơn', '2009-06-20', 'Nam', 'Con', NULL, 'THCS', 'Học sinh', 'Thường trú', '2025-01-01');

-- 7. Tạo FeeTypes cho từng chung cư
INSERT INTO FeeTypes (ApartmentID, FeeTypeName, Description, Category, Scope, UnitPrice, Unit) VALUES 
-- Chung cư 1
(1, 'Phí quản lý chung cư', 'Phí duy trì hoạt động chung cư', 'Bắt buộc', 'Chung', 25000, 'm2'),
(1, 'Phí điện chung', 'Điện thang máy, hành lang', 'Bắt buộc', 'Chung', 3000, 'hộ'),
(1, 'Phí nước chung', 'Nước sinh hoạt chung', 'Bắt buộc', 'Chung', 2000, 'hộ'),
(1, 'Phí gửi xe máy', 'Phí gửi xe máy tháng', 'Bắt buộc', 'Riêng', 50000, 'xe'),
(1, 'Phí gửi ô tô', 'Phí gửi ô tô tháng', 'Bắt buộc', 'Riêng', 500000, 'xe'),

-- Chung cư 2
(2, 'Phí quản lý chung cư', 'Phí duy trì hoạt động chung cư', 'Bắt buộc', 'Chung', 30000, 'm2'),
(2, 'Phí điện chung', 'Điện thang máy, hành lang', 'Bắt buộc', 'Chung', 3500, 'hộ'),
(2, 'Phí nước chung', 'Nước sinh hoạt chung', 'Bắt buộc', 'Chung', 2500, 'hộ'),
(2, 'Phí gửi xe máy', 'Phí gửi xe máy tháng', 'Bắt buộc', 'Riêng', 60000, 'xe'),
(2, 'Phí gửi ô tô', 'Phí gửi ô tô tháng', 'Bắt buộc', 'Riêng', 600000, 'xe'),

-- Chung cư 3
(3, 'Phí quản lý chung cư', 'Phí duy trì hoạt động chung cư', 'Bắt buộc', 'Chung', 28000, 'm2'),
(3, 'Phí điện chung', 'Điện thang máy, hành lang', 'Bắt buộc', 'Chung', 3200, 'hộ'),
(3, 'Phí nước chung', 'Nước sinh hoạt chung', 'Bắt buộc', 'Chung', 2200, 'hộ'),
(3, 'Phí gửi xe máy', 'Phí gửi xe máy tháng', 'Bắt buộc', 'Riêng', 55000, 'xe'),
(3, 'Phí gửi ô tô', 'Phí gửi ô tô tháng', 'Bắt buộc', 'Riêng', 550000, 'xe'),

-- Chung cư 4
(4, 'Phí quản lý chung cư', 'Phí duy trì hoạt động chung cư', 'Bắt buộc', 'Chung', 35000, 'm2'),
(4, 'Phí điện chung', 'Điện thang máy, hành lang', 'Bắt buộc', 'Chung', 4000, 'hộ'),
(4, 'Phí nước chung', 'Nước sinh hoạt chung', 'Bắt buộc', 'Chung', 3000, 'hộ'),
(4, 'Phí gửi xe máy', 'Phí gửi xe máy tháng', 'Bắt buộc', 'Riêng', 70000, 'xe'),
(4, 'Phí gửi ô tô', 'Phí gửi ô tô tháng', 'Bắt buộc', 'Riêng', 700000, 'xe'),

-- Chung cư 5
(5, 'Phí quản lý chung cư', 'Phí duy trì hoạt động chung cư', 'Bắt buộc', 'Chung', 32000, 'm2'),
(5, 'Phí điện chung', 'Điện thang máy, hành lang', 'Bắt buộc', 'Chung', 3800, 'hộ'),
(5, 'Phí nước chung', 'Nước sinh hoạt chung', 'Bắt buộc', 'Chung', 2800, 'hộ'),
(5, 'Phí gửi xe máy', 'Phí gửi xe máy tháng', 'Bắt buộc', 'Riêng', 65000, 'xe'),
(5, 'Phí gửi ô tô', 'Phí gửi ô tô tháng', 'Bắt buộc', 'Riêng', 650000, 'xe');

-- 8. Tạo FeeCollections (thu phí tháng 6/2025)
INSERT INTO FeeCollections (FeeTypeID, CollectionName, StartDate, EndDate, TotalAmount, Status, Notes) VALUES 
-- Chung cư 1 - Tháng 6/2025
(1, 'Thu phí quản lý tháng 6/2025', '2025-06-01', '2025-06-30', 2500000, 'Đang thu', 'Thu phí quản lý chung cư tháng 6'),
(2, 'Thu phí điện chung tháng 6/2025', '2025-06-01', '2025-06-30', 15000, 'Đang thu', 'Thu phí điện khu vực chung'),
(3, 'Thu phí nước chung tháng 6/2025', '2025-06-01', '2025-06-30', 10000, 'Đang thu', 'Thu phí nước khu vực chung'),
(4, 'Thu phí gửi xe máy tháng 6/2025', '2025-06-01', '2025-06-30', 200000, 'Đang thu', 'Thu phí gửi xe máy'),
(5, 'Thu phí gửi ô tô tháng 6/2025', '2025-06-01', '2025-06-30', 1500000, 'Đang thu', 'Thu phí gửi ô tô'),

-- Chung cư 2 - Tháng 6/2025
(6, 'Thu phí quản lý tháng 6/2025', '2025-06-01', '2025-06-30', 3000000, 'Đang thu', 'Thu phí quản lý chung cư tháng 6'),
(7, 'Thu phí điện chung tháng 6/2025', '2025-06-01', '2025-06-30', 17500, 'Đang thu', 'Thu phí điện khu vực chung'),
(8, 'Thu phí nước chung tháng 6/2025', '2025-06-01', '2025-06-30', 12500, 'Đang thu', 'Thu phí nước khu vực chung'),
(9, 'Thu phí gửi xe máy tháng 6/2025', '2025-06-01', '2025-06-30', 240000, 'Đang thu', 'Thu phí gửi xe máy'),
(10, 'Thu phí gửi ô tô tháng 6/2025', '2025-06-01', '2025-06-30', 1800000, 'Đang thu', 'Thu phí gửi ô tô'),

-- Chung cư 3 - Tháng 6/2025
(11, 'Thu phí quản lý tháng 6/2025', '2025-06-01', '2025-06-30', 2800000, 'Đang thu', 'Thu phí quản lý chung cư tháng 6'),
(12, 'Thu phí điện chung tháng 6/2025', '2025-06-01', '2025-06-30', 16000, 'Đang thu', 'Thu phí điện khu vực chung'),
(13, 'Thu phí nước chung tháng 6/2025', '2025-06-01', '2025-06-30', 11000, 'Đang thu', 'Thu phí nước khu vực chung'),
(14, 'Thu phí gửi xe máy tháng 6/2025', '2025-06-01', '2025-06-30', 220000, 'Đang thu', 'Thu phí gửi xe máy'),
(15, 'Thu phí gửi ô tô tháng 6/2025', '2025-06-01', '2025-06-30', 1650000, 'Đang thu', 'Thu phí gửi ô tô'),

-- Chung cư 4 - Tháng 6/2025
(16, 'Thu phí quản lý tháng 6/2025', '2025-06-01', '2025-06-30', 3500000, 'Đang thu', 'Thu phí quản lý chung cư tháng 6'),
(17, 'Thu phí điện chung tháng 6/2025', '2025-06-01', '2025-06-30', 20000, 'Đang thu', 'Thu phí điện khu vực chung'),
(18, 'Thu phí nước chung tháng 6/2025', '2025-06-01', '2025-06-30', 15000, 'Đang thu', 'Thu phí nước khu vực chung'),
(19, 'Thu phí gửi xe máy tháng 6/2025', '2025-06-01', '2025-06-30', 280000, 'Đang thu', 'Thu phí gửi xe máy'),
(20, 'Thu phí gửi ô tô tháng 6/2025', '2025-06-01', '2025-06-30', 2100000, 'Đang thu', 'Thu phí gửi ô tô'),

-- Chung cư 5 - Tháng 6/2025
(21, 'Thu phí quản lý tháng 6/2025', '2025-06-01', '2025-06-30', 3200000, 'Đang thu', 'Thu phí quản lý chung cư tháng 6'),
(22, 'Thu phí điện chung tháng 6/2025', '2025-06-01', '2025-06-30', 19000, 'Đang thu', 'Thu phí điện khu vực chung'),
(23, 'Thu phí nước chung tháng 6/2025', '2025-06-01', '2025-06-30', 14000, 'Đang thu', 'Thu phí nước khu vực chung'),
(24, 'Thu phí gửi xe máy tháng 6/2025', '2025-06-01', '2025-06-30', 260000, 'Đang thu', 'Thu phí gửi xe máy'),
(25, 'Thu phí gửi ô tô tháng 6/2025', '2025-06-01', '2025-06-30', 1950000, 'Đang thu', 'Thu phí gửi ô tô');

-- 9. Tạo FeeDetails (chi tiết thu phí cho từng hộ)
INSERT INTO FeeDetails (CollectionID, HouseholdID, Amount, PaymentDate, PaymentMethod, PaymentStatus) VALUES 
-- Chung cư 1 - Phí quản lý (100m2 mỗi hộ x 25,000)
(1, 1, 500000, '2025-06-05', 'Chuyển khoản', 'Đã đóng'),
(1, 2, 500000, '2025-06-07', 'Tiền mặt', 'Đã đóng'),
(1, 3, 500000, NULL, NULL, 'Chưa đóng'),
(1, 4, 500000, '2025-06-10', 'Chuyển khoản', 'Đã đóng'),
(1, 5, 500000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 1 - Phí điện chung
(2, 1, 3000, '2025-06-05', 'Chuyển khoản', 'Đã đóng'),
(2, 2, 3000, '2025-06-07', 'Tiền mặt', 'Đã đóng'),
(2, 3, 3000, NULL, NULL, 'Chưa đóng'),
(2, 4, 3000, '2025-06-10', 'Chuyển khoản', 'Đã đóng'),
(2, 5, 3000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 1 - Phí nước chung
(3, 1, 2000, '2025-06-05', 'Chuyển khoản', 'Đã đóng'),
(3, 2, 2000, '2025-06-07', 'Tiền mặt', 'Đã đóng'),
(3, 3, 2000, NULL, NULL, 'Chưa đóng'),
(3, 4, 2000, '2025-06-10', 'Chuyển khoản', 'Đã đóng'),
(3, 5, 2000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 1 - Phí gửi xe máy (household 1,2,3,5 có xe máy)
(4, 1, 50000, '2025-06-05', 'Chuyển khoản', 'Đã đóng'),
(4, 2, 50000, '2025-06-07', 'Tiền mặt', 'Đã đóng'),
(4, 3, 50000, NULL, NULL, 'Chưa đóng'),
(4, 5, 50000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 1 - Phí gửi ô tô (household 1,3,5 có ô tô)
(5, 1, 500000, '2025-06-05', 'Chuyển khoản', 'Đã đóng'),
(5, 3, 500000, NULL, NULL, 'Chưa đóng'),
(5, 5, 500000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),

-- Tương tự cho các chung cư khác (rút gọn để tiết kiệm không gian)
-- Chung cư 2 - Phí quản lý (100m2 x 30,000)
(6, 6, 600000, '2025-06-03', 'Chuyển khoản', 'Đã đóng'),
(6, 7, 600000, '2025-06-06', 'Tiền mặt', 'Đã đóng'),
(6, 8, 600000, NULL, NULL, 'Chưa đóng'),
(6, 9, 600000, '2025-06-09', 'Chuyển khoản', 'Đã đóng'),
(6, 10, 600000, '2025-06-12', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 3 - Phí quản lý (100m2 x 28,000)
(11, 11, 560000, '2025-06-04', 'Chuyển khoản', 'Đã đóng'),
(11, 12, 560000, '2025-06-08', 'Tiền mặt', 'Đã đóng'),
(11, 13, 560000, NULL, NULL, 'Chưa đóng'),
(11, 14, 560000, '2025-06-11', 'Chuyển khoản', 'Đã đóng'),
(11, 15, 560000, '2025-06-15', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 4 - Phí quản lý (100m2 x 35,000)
(16, 16, 700000, '2025-06-02', 'Chuyển khoản', 'Đã đóng'),
(16, 17, 700000, '2025-06-05', 'Tiền mặt', 'Đã đóng'),
(16, 18, 700000, NULL, NULL, 'Chưa đóng'),
(16, 19, 700000, '2025-06-08', 'Chuyển khoản', 'Đã đóng'),
(16, 20, 700000, '2025-06-10', 'Tiền mặt', 'Đã đóng'),

-- Chung cư 5 - Phí quản lý (100m2 x 32,000)
(21, 21, 640000, '2025-06-01', 'Chuyển khoản', 'Đã đóng'),
(21, 22, 640000, '2025-06-04', 'Tiền mặt', 'Đã đóng'),
(21, 23, 640000, NULL, NULL, 'Chưa đóng'),
(21, 24, 640000, '2025-06-07', 'Chuyển khoản', 'Đã đóng'),
(21, 25, 640000, '2025-06-09', 'Tiền mặt', 'Đã đóng');

-- 10. Tạo Vehicles (1-2 xe cho mỗi household)
INSERT INTO Vehicles (HouseholdID, VehicleType, LicensePlate, Brand, Color, RegistrationDate, Status) VALUES 
-- Chung cư 1
(1, 'Xe máy', '29A1-12345', 'Honda', 'Đỏ', '2023-01-15', 'Còn hạn đăng ký gửi'),
(1, 'Ô tô', '30A-123.45', 'Toyota', 'Trắng', '2023-01-15', 'Còn hạn đăng ký gửi'),
(2, 'Xe máy', '29B1-23456', 'Yamaha', 'Xanh', '2023-02-01', 'Còn hạn đăng ký gửi'),
(3, 'Xe máy', '29C1-34567', 'Honda', 'Đen', '2023-03-01', 'Còn hạn đăng ký gửi'),
(3, 'Ô tô', '30B-234.56', 'Hyundai', 'Bạc', '2023-03-01', 'Còn hạn đăng ký gửi'),
(5, 'Xe máy', '29D1-45678', 'Suzuki', 'Vàng', '2023-05-01', 'Còn hạn đăng ký gửi'),
(5, 'Ô tô', '30C-345.67', 'Mazda', 'Xanh', '2023-05-01', 'Còn hạn đăng ký gửi'),

-- Chung cư 2
(6, 'Xe máy', '29E1-56789', 'Honda', 'Đỏ', '2023-06-01', 'Còn hạn đăng ký gửi'),
(6, 'Ô tô', '30D-456.78', 'Honda', 'Đen', '2023-06-01', 'Còn hạn đăng ký gửi'),
(7, 'Xe máy', '29F1-67890', 'Yamaha', 'Trắng', '2023-07-01', 'Còn hạn đăng ký gửi'),
(7, 'Ô tô', '30E-567.89', 'Mercedes', 'Đen', '2023-07-01', 'Còn hạn đăng ký gửi'),
(8, 'Xe máy', '29G1-78901', 'Honda', 'Xanh', '2023-08-01', 'Còn hạn đăng ký gửi'),
(9, 'Xe máy', '29H1-89012', 'Suzuki', 'Bạc', '2023-09-01', 'Còn hạn đăng ký gửi'),
(9, 'Ô tô', '30F-678.90', 'BMW', 'Trắng', '2023-09-01', 'Còn hạn đăng ký gửi'),

-- Chung cư 3
(11, 'Xe máy', '29I1-90123', 'Honda', 'Đỏ', '2023-11-01', 'Còn hạn đăng ký gửi'),
(11, 'Ô tô', '30G-789.01', 'Toyota', 'Bạc', '2023-11-01', 'Còn hạn đăng ký gửi'),
(12, 'Xe máy', '29J1-01234', 'Yamaha', 'Xanh', '2023-12-01', 'Còn hạn đăng ký gửi'),
(13, 'Xe máy', '29K1-12345', 'Honda', 'Đen', '2024-01-01', 'Còn hạn đăng ký gửi'),
(13, 'Ô tô', '30H-890.12', 'Kia', 'Trắng', '2024-01-01', 'Còn hạn đăng ký gửi'),
(14, 'Xe máy', '29L1-23456', 'Suzuki', 'Vàng', '2024-02-01', 'Còn hạn đăng ký gửi'),
(15, 'Xe máy', '29M1-34567', 'Honda', 'Xanh', '2024-03-01', 'Còn hạn đăng ký gửi'),
(15, 'Ô tô', '30I-901.23', 'Ford', 'Đỏ', '2024-03-01', 'Còn hạn đăng ký gửi'),

-- Chung cư 4
(16, 'Xe máy', '29N1-45678', 'Honda', 'Bạc', '2024-04-01', 'Còn hạn đăng ký gửi'),
(16, 'Ô tô', '30J-012.34', 'Lexus', 'Đen', '2024-04-01', 'Còn hạn đăng ký gửi'),
(17, 'Xe máy', '29O1-56789', 'Yamaha', 'Trắng', '2024-05-01', 'Còn hạn đăng ký gửi'),
(17, 'Ô tô', '30K-123.45', 'Audi', 'Bạc', '2024-05-01', 'Còn hạn đăng ký gửi'),
(18, 'Xe máy', '29P1-67890', 'Honda', 'Đỏ', '2024-06-01', 'Còn hạn đăng ký gửi'),
(20, 'Xe máy', '29Q1-78901', 'Suzuki', 'Xanh', '2024-08-01', 'Còn hạn đăng ký gửi'),
(20, 'Ô tô', '30L-234.56', 'Nissan', 'Trắng', '2024-08-01', 'Còn hạn đăng ký gửi'),

-- Chung cư 5
(21, 'Xe máy', '29R1-89012', 'Honda', 'Đen', '2024-09-01', 'Còn hạn đăng ký gửi'),
(21, 'Ô tô', '30M-345.67', 'Toyota', 'Bạc', '2024-09-01', 'Còn hạn đăng ký gửi'),
(22, 'Xe máy', '29S1-90123', 'Yamaha', 'Vàng', '2024-10-01', 'Còn hạn đăng ký gửi');




