# Trang chi tiết dùng chung

Cả 12 trang xe, tuyến và dịch vụ đều đi qua `src/layouts/DetailPage.astro`. Các file `src/pages/{vehicles,routes,services}/[slug].astro` chỉ lấy dữ liệu và gọi layout này; không có markup hoặc CSS riêng cho từng nhóm.

| Muốn sửa | Sửa tại |
| --- | --- |
| Khung trang, breadcrumb, tiêu đề, vị trí form | `src/layouts/DetailPage.astro` |
| Chiều rộng cột và responsive | `src/layouts/PageFrame.astro`, `src/styles/utilities.css`, token `--page-*` |
| Ảnh chính và nhóm ảnh nhỏ | `src/components/DetailGallery.astro` |
| Khung section, tiêu đề section, ghi chú | `src/components/ContentSection.astro` |
| Các loại nội dung: thông số, danh sách, hành trình, bao gồm | `src/components/DetailSections.astro` |
| Cách hiển thị hàng giá | `src/components/PriceList.astro` |
| Cỡ chữ, padding, gap, ảnh và giá của trang chi tiết | Nhóm `.p-detail-*` trong `src/styles/components.css` |
| Chọn/thứ tự section và chuyển dữ liệu mỗi loại trang | `src/lib/detail-pages.ts` |
| Giá trị, mô tả, đường dẫn ảnh của từng xe/tuyến/dịch vụ | File JSON tương ứng trong `src/data/` |

## Thêm trang

Thêm bản ghi trong JSON tương ứng với `slug` mới. Trang được sinh tự động bằng cùng layout, gallery, section, giá và form.

## Thêm kiểu nội dung

Các section hiện có: `specs`, `features`, `prices`, `journey`, `inclusions`. Muốn thêm kiểu mới, khai báo trong kiểu `DetailSection` và thêm phần render tương ứng trong `DetailSections.astro`. Không copy cấu trúc sang từng file `[slug].astro`.

## Phạm vi

Layout này dùng cho trang chi tiết xe, tuyến và dịch vụ. Trang danh sách vẫn có cách trình bày riêng; bài viết và chính sách dùng `ResourceLayout.astro`. Tất cả cùng dùng `BaseLayout.astro`, `PageFrame.astro`, `ImageSlot.astro` và hệ CSS chung.
