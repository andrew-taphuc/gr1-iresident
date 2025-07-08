# GRADUATION RESEARCH 1
  Dự án triển khai kiến trúc multi - tenant vào phần mềm quản lý chung cư BlueMoon
## GIỚI THIỆU

 - Mô tả lại tính năng, đề bài được yêu cầu.
 - Ảnh chụp minh họa:\
   ![Ảnh minh họa](https://soict.hust.edu.vn/wp-content/uploads/logo-soict-hust-1-1024x416.png)

## TÁC GIẢ

- Tên nhóm: Những anh chàng thư giãn
- Thành viên trong nhóm
  |STT|Họ tên|MSSV|
  |--:|--|--|
  |1|Tạ Hồng Phúc|20225906|
  |2|Bùi Quang Hưng|20225849|

## MÔI TRƯỜNG HOẠT ĐỘNG

- Mô tả sơ lược về các thành phần như máy tính, mobile, thiết bị IoT... các máy chủ back-end, front-end, mqtt, database
- Thông tin về nền tảng OS mà hệ thống vận hành
- Nên có sơ đồ tích hợp hệ thống để người xem thấy được mối liên quan giữa các thành phần.
  
## HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY THỬ

  Các bước đề cài đặt hệ thống. Trường hợp với IoT, có thể hướng dẫn ngắn gọn là: cắm điện, gạt công tắc ....
  Nêu ra một tình huống sử dụng đơn giản để chứng tỏ sản phẩm có vận hành đúng (Self Test)

## NGUYÊN LÝ CƠ BẢN

> Tham khảo cách trình bày như ở đây [Code Project](https://www.codeproject.com/Articles/5385907/Managing-Cplusplus-Projects-with-Conan-and-CMake)

### TÍCH HỢP HỆ THỐNG

- Mô tả các thành phần phần cứng và vai trò của chúng: máy chủ, máy trạm, thiết bị IoT, MQTT Server, module cảm biến IoT...
- Mô tả các thành phần phần mềm và vai trò của chúng, vị trí nằm trên phần cứng nào: Front-end, Back-end, Worker, Middleware...

### CÁC THUẬT TOÁN CƠ BẢN

- Ví dụ: tạo token bằng JWT.
- Ví dụ: băm mật khẩu bằng MD5 theo công thức: MD5(key+"myapp"+key).
- Ví dụ: tạo id cho đối tượng bằng GUID, hoặc bằng hàm random.

### THIẾT KẾ CƠ SỞ DỮ LIỆU

- Sơ đồ quan hệ thực thể để thể hiện mối quan hệ giữa các trường thông tin.
- Giải thích các table, và một vài table.field quan trọng
- Cấu trúc các file cấu hình như .env, .conf, .xml

### CÁC PAYLOAD

- Cấu trúc các gói json
- Nội dung trao đổi giữa các module, cảm biến

### ĐẶC TẢ HÀM

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


### PHÁT SINH

_Các sự cố, vẫn đề, lỗi mà không xử lý được, hoặc xử lý mất quá 4h thì nên ghi vào đây, hoặc ghi vào [issue của GitHub](https://github.com/neittien0110/ProjectSample/issues). Sẽ được tính điểm. Ví dụ__

- __Lỗi: blablablabla__
  - Chi tiêt: .....
  - Nguyên nhân: ...
  - Giải pháp: chưa có

  
## KẾT QUẢ
Các ảnh chụp với caption giải thích.
Hoặc video sản phẩm

