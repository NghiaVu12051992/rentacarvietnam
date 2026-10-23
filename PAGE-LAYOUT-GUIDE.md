# Khung trang dùng chung

`src/layouts/PageFrame.astro` quản lý chiều rộng cột. Nội dung bên trong phải chiếm đủ chiều rộng được cấp, không đặt thêm `max-width` cho article hoặc khối nội dung chính.

Container chung tối đa 1240px, gồm padding hai bên. Khoảng cách cột desktop là 32px.

## Ba mẫu trang

| Mẫu | Desktop | Mục đích |
| --- | --- | --- |
| `columns={1}` | Một cột toàn chiều rộng | FAQ, danh sách bài, chính sách |
| `columns={2}` | Nội dung co giãn + sidebar 288px | Bài viết, hướng dẫn |
| `columns={3}` | Mục lục 192px + nội dung co giãn + sidebar 288px | Bài dài có mục lục và hỗ trợ |

Với form báo giá, thêm `sidebar="booking"` để cột form rộng 384px. Các kích thước nằm trong `src/styles/tokens.css`.

Mẫu hai cột:

```astro
<PageFrame columns={2}>
  <article>Nội dung chính</article>
  <aside slot="sidebar">Nội dung hỗ trợ</aside>
</PageFrame>
```

Mẫu ba cột:

```astro
<PageFrame columns={3}>
  <nav slot="navigation">Mục lục</nav>
  <article>Nội dung chính</article>
  <aside slot="sidebar">Nội dung hỗ trợ</aside>
</PageFrame>
```

## Chọn mẫu trong bài Markdown

Thêm `columns: 1`, `columns: 2` hoặc `columns: 3` vào frontmatter. Mặc định bài viết dùng 2 cột, chính sách dùng 1 cột. Mẫu 3 cột tự lấy mục lục từ các heading `##` trong bài.

## Responsive

- Từ 1280px: hiển thị đủ số cột được chọn.
- 1025–1279px: mẫu 3 cột đưa mục lục lên trên, nội dung và sidebar nằm dưới thành 2 cột.
- Từ 1024px trở xuống: xếp thành 1 cột theo thứ tự mục lục, nội dung, sidebar.

Lưới card (`p-grid-cols-2`, `p-grid-cols-3`) vẫn chỉ dùng cho danh sách card trong một cột trang; không dùng thay thế khung trang.

## Thanh hành động trên mobile

`src/components/MobileActions.astro` quản lý ba nút WhatsApp, Get a Quote và Back to top. Get a Quote mở native dialog ngay trên trang; form được đưa vào dialog rồi trả về chỗ cũ khi đóng, giữ nguyên dữ liệu và bước hiện tại.

Trang đã có `BookingWizard` cần truyền `hasBookingWizard` cho `BaseLayout`. Trang chưa có form sẽ tự có một form dự phòng ẩn, chỉ hiển thị khi mở dialog. Mỗi trang chỉ có một form, tránh trùng ID. `DetailPage.astro` đã đặt sẵn thuộc tính này cho toàn bộ trang chi tiết.

Màu và kích thước popup nằm ở nhóm `.p-quote-dialog*` trong `src/styles/components.css`; thanh dưới vẫn dùng `.mobile-sticky-bar`.
