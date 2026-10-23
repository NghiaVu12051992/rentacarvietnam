# Thay khung trống bằng ảnh thật

Đặt file ảnh vào `public/images/`, rồi điền đường dẫn `/images/ten-anh.webp` vào trường tương ứng. Để chuỗi rỗng `""` nếu chưa có ảnh: giao diện sẽ giữ khung trống có nhãn, không hiện biểu tượng ảnh lỗi.

Toàn bộ ảnh nội dung dùng chung tỷ lệ ngang **3:2**. Chỉ cần chuẩn bị một file **1200 × 800** cho mỗi ảnh, dùng lại ở homepage, danh sách và trang chi tiết. Không cần làm thêm bản dọc hay bản banner cho cùng một ảnh.

Khung ảnh giữ đúng tỷ lệ 3:2 trên desktop và mobile; chiều cao không kéo theo độ dài chữ trong thẻ. Ảnh nhỏ và ảnh lớn chỉ khác kích thước hiển thị. Ảnh nguồn đúng tỷ lệ sẽ không bị cắt đổi bố cục. Nếu dùng nguồn sai tỷ lệ, giao diện cắt giữa để vừa khung. Ưu tiên WebP hoặc AVIF và đặt chủ thể ở giữa.

## Xe — `src/data/vehicles.json`

Tìm xe theo `slug`, rồi điền:

- `image`: ảnh ngoại thất, dùng chung ở homepage, danh sách xe và trang chi tiết.
- `imageAlt`: mô tả ngắn bằng tiếng Anh cho ảnh ngoại thất.
- `interiorImage`: ảnh ghế và nội thất trong trang chi tiết.
- `luggageImage`: ảnh khoang hành lý trong trang chi tiết.

Ví dụ:

```json
"image": "/images/16-seater-exterior.webp",
"imageAlt": "Ford Transit 16-seater exterior in Hanoi",
"interiorImage": "/images/16-seater-interior.webp",
"luggageImage": "/images/16-seater-luggage.webp"
```

## Tuyến đường — `src/data/routes.json`

Điền `image` và `imageAlt` cho mỗi tuyến. Chọn ảnh điểm đến (Sapa, Halong Bay, Ninh Binh, Ha Giang). Ảnh được dùng chung trên homepage, danh sách tuyến và trang chi tiết.

## Dịch vụ — `src/data/services.json`

Điền `image` và `imageAlt` cho từng dịch vụ. Chọn ảnh đón khách sân bay, xe có tài xế hoặc xe đoàn tương ứng. Ảnh dùng chung ở danh sách và trang chi tiết.

## Các ảnh khác — `src/data/site-images.json`

- `homeFleet`: ảnh tổng quan đội xe trong thẻ giới thiệu đội ngũ trên homepage.
- `aboutTeam`: ảnh tài xế và đội điều phối trên trang About Us.
- `contactOffice`: ảnh văn phòng trên trang Contact.

Ví dụ: `"homeFleet": "/images/hanoi-fleet.webp"`.

## Ảnh bài viết — `src/content/articles/*.md`

Điền `image` và `imageAlt` trong phần đầu mỗi file Markdown. Để `image: ''` sẽ hiện khung ảnh trống có nhãn. Ảnh này dùng chung ở trang tổng hợp và trang bài viết, tỷ lệ 3:2.
