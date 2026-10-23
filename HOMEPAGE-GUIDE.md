# Homepage khám phá hạng mục

Homepage hiển thị các mục xe, điểm đến, dịch vụ, bài viết và hỗ trợ theo từng slider. Desktop hiển thị hai thẻ; điện thoại hiển thị một thẻ và hé thẻ tiếp theo. Không tự chạy slider.

## Sửa nội dung

- `src/lib/homepage.ts`: chọn các `slug` tiêu biểu trong `homeFeatured`; thứ tự trong mảng là thứ tự thẻ. Bài viết được chọn theo ID của file Markdown.
- Hàm `homepageSections` trong cùng file quản lý tiêu đề mục, mô tả và liên kết “xem tất cả”.
- Nội dung xe, tuyến và dịch vụ lấy từ JSON hiện có. Bài viết lấy từ collection `articles`, loại các bài đang đặt `draft: true`.
- FAQ, chính sách, giới thiệu và liên hệ nằm trong slider hỗ trợ. Ảnh tổng quan đội xe dùng lại trường `homeFleet` trong `site-images.json`.
- Giá trên thẻ đi kèm tuyến/loại xe cụ thể, không dùng một giá chung cho mọi chuyến.

## Sửa giao diện và hành vi

- `src/components/CardCarousel.astro`: khung mục, nút trước/sau, đếm thẻ và điều khiển bàn phím.
- `src/components/ExploreCard.astro`: giao diện thẻ dùng chung cho mọi mục.
- CSS chung nằm ở nhóm `.p-home-*`, `.p-discovery-*`, `.p-carousel-*`, `.p-explore-*` trong `src/styles/components.css`.
- Kích thước và khoảng cách slider lấy từ `--carousel-*`, `--home-card-media-share` trong `tokens.css`.

Thêm hạng mục mới bằng một bản ghi `HomeSection`; homepage tự dựng slider và lối tắt từ cùng danh sách.
