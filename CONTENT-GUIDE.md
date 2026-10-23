# Bài viết, FAQ và chính sách

Trang tổng hợp: `/resources/`. Menu hiển thị là **Guide & Help**.

## Thêm bài viết

Tạo file `src/content/articles/ten-bai.md`. Tên file trở thành URL `/resources/ten-bai/`. Bài tự xuất hiện trong danh sách, sắp xếp theo `order`.

```markdown
---
title: Tiêu đề tiếng Anh
description: Mô tả ngắn cho danh sách và SEO.
category: Planning your trip
order: 4
image: ''
imageAlt: Mô tả ảnh bằng tiếng Anh
---

## Tiêu đề phần

Nội dung bài viết.
```

Để `image: ''` sẽ hiện khung trống. Đặt ảnh 3:2 vào `public/images/` và điền đường dẫn như `/images/travel-guide.webp`.

## Sửa FAQ

Sửa các nhóm và câu hỏi trong `src/data/faqs.ts`. Trang `/resources/faq/` tự hiển thị toàn bộ. Homepage dùng lại bốn câu hỏi từ cùng nguồn dữ liệu.

## Sửa chính sách

Các file nằm ở `src/content/policies/`, URL là `/resources/policies/ten-file/`. Trang danh sách nằm ở `/resources/policies/`.

Nội dung hiện tại là khung chờ hoàn thiện, không phải bộ điều khoản chính thức. `draft: true` hiển thị thông báo chưa hoàn thiện và thêm `noindex, follow` vào trang chi tiết. Thay bằng điều khoản thực tế của doanh nghiệp rồi đặt `draft: false` khi nội dung đã được chốt.

Mục này cung cấp hướng dẫn và thông tin hỗ trợ. Giá, lựa chọn xe và nội dung bán dịch vụ vẫn thuộc các trang Vehicles, Routes và Services.
