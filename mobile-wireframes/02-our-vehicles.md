# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 02: Danh Mục Xe (Our Vehicles Hub — `/vehicles/`)

> **Mục tiêu UX**: Giúp khách hàng nhanh chóng chọn đúng loại xe phù hợp với quy mô đoàn và số lượng hành lý mà **không cần đọc các bảng thông số kỹ thuật phức tạp**.

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│
├─────────────────────────────────────────┤
│ < Trang Chủ / Đội xe của chúng tôi      │ <- Breadcrumb rút gọn
│                                         │
│ 🚘 OUR FLEET & VEHICLES                 │
│ "Xe Đời Mới, Bảo Dưỡng Chuẩn & Tài Xế"  │
├─────────────────────────────────────────┤
│ 💡 HƯỚNG DẪN CHỌN XE NHANH THEO ĐOÀN    │ <- Visual Selector (Không dùng bảng)
│ Chạm để lọc nhanh xe phù hợp:           │
│ [ 1-4 khách ] [ 5-12 khách ] [ 13-45+ ] │
├─────────────────────────────────────────┤
│ 📋 DANH SÁCH TỪNG DÒNG XE (STACK CARDS) │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Ảnh xe 7 chỗ] [Badge: Gia Đình]    │ │
│ │ 7-Seater Car & SUV Rental           │ │
│ │ Mẫu xe: Toyota Fortuner, Innova     │ │
│ │ ─────────────────────────────────── │ │
│ │ 👥 Khuyên dùng: 1 - 4 khách         │ │
│ │ 🧳 Khoang hành lý: 3 - 4 vali cỡ vừa │ │
│ │ 💺 Da êm ái, cổng sạc điện thoại USB│ │
│ │ ─────────────────────────────────── │ │
│ │ Tuyến tiêu biểu:                    │ │
│ │ • Nội Bài ➔ Phố Cổ: từ $18 USD     │ │
│ │ • Hà Nội ➔ Ninh Bình: từ $55 USD    │ │
│ │ [ ➔ Xem chi tiết & Thông số ]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Ảnh xe 16 chỗ] [Badge: Đặt Nhiều]  │ │
│ │ 16-Seater Minivan Rental            │ │
│ │ Mẫu xe: Ford Transit, Hyundai Solati│ │
│ │ ─────────────────────────────────── │ │
│ │ 👥 Khuyên dùng: 8 - 12 khách        │ │
│ │ 🧳 Khoang hành lý: 8 - 10 vali 24"  │ │
│ │ ❄️ Điều hòa độc lập từng hàng ghế   │ │
│ │ ─────────────────────────────────── │ │
│ │ Tuyến tiêu biểu:                    │ │
│ │ • Hà Nội ➔ Sa Pa: từ $85 USD        │ │
│ │ • Hà Nội ➔ Hạ Long: từ $65 USD      │ │
│ │ [ ➔ Xem chi tiết & Thông số ]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Ảnh xe 29 chỗ] [Badge: Đoàn Tour]  │ │
│ │ 29-Seater Midi Bus Rental           │ │
│ │ Mẫu xe: Hyundai County, Thaco Town  │ │
│ │ ─────────────────────────────────── │ │
│ │ 👥 Khuyên dùng: 15 - 20 khách       │ │
│ │ 🧳 Cốp rộng: 18 - 22 vali to        │ │
│ │ 🎤 Micro hướng dẫn viên, âm thanh   │ │
│ │ [ ➔ Xem chi tiết & Thông số ]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Ảnh xe 35 chỗ]                     │ │
│ │ 35-Seater Bus Rental                │ │
│ │ 👥 Khuyên dùng: 21 - 28 khách       │ │
│ │ 🧳 Cốp hầm lớn: 25 - 30 vali        │ │
│ │ [ ➔ Xem chi tiết & Thông số ]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Ảnh xe 45 chỗ] [Badge: Xe Lớn Nhất]│ │
│ │ 45-Seater Coach Rental              │ │
│ │ Mẫu xe: Hyundai Universe đời mới    │ │
│ │ 👥 Khuyên dùng: 30 - 42 khách       │ │
│ │ 🧳 Hầm chứa đồ không giới hạn       │ │
│ │ [ ➔ Xem chi tiết & Thông số ]       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 💡 MẸO HÀNH LÝ CHO KHÁCH DU LỊCH        │ <- Khối Callout tư vấn thực tế
│ ⚠️ Lưu ý sức chứa:                      │
│ Xe 16 chỗ ngồi đủ 16 người nhưng sẽ     │
│ KHÔNG CÒN CHỖ để vali lớn! Nếu đoàn có  │
│ trên 10 người và nhiều hành lý, nên chọn│
│ xe 29 chỗ để chuyến đi thoải mái nhất.  │
├─────────────────────────────────────────┤
│ ❓ CÂU HỎI VỀ ĐỘI XE                    │
│ [▶] Xe có gắn định vị GPS và dây an toàn?│
│ [▶] Có xe Limousine VIP không?          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │
│ Chưa biết chọn xe nào?                  │
│ [ 💬 Chat WhatsApp ] [ 📞 Gọi Ngay ]   │
└─────────────────────────────────────────┘
```
