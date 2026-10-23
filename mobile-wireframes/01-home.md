# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 01: Trang Chủ (Homepage — `/`)

> **Quy tắc thiết kế Mobile-First (OTA Style):**
> - Tuyệt đối không dùng thẻ `<table>`.
> - Ưu tiên trải nghiệm ngón tay cái (Thumb-zone), chạm mở Modal / Accordion.
> - Cố định thanh Sticky Action Bar ở đáy màn hình.

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│ <- 1. Header tinh gọn, nút Hotline trực tiếp
├─────────────────────────────────────────┤
│                                         │
│   HANOI PRIVATE CAR & BUS WITH DRIVER   │ <- 2. Hero Headline
│   ⭐ 4.9/5 (500+ Reviews trên Tripadvisor)│
│                                         │
│   ┌───────────────────────────────────────────────────┐   │
│   │ ⚡ GET ITINERARY ADVICE & CAR QUOTE (1-TAP WIZARD) │   │ <- 3. Duolingo-style 1-tap wizard
│   │ [━━━━━━━━░░░░░░░░░░░░░░░░░░░░░░░░] Step 1/5       │   │
│   │                                                   │   │
│   │ 👥 HOW MANY PASSENGERS? (Tap to advance)          │   │
│   │ ┌───────────────────────┬───────────────────────┐ │   │
│   │ │ 👤 1–3 Pax (Sedan/SUV)│ 👥 4–7 Pax (SUV/MPV)  │ │   │
│   │ ├───────────────────────┼───────────────────────┤ │   │
│   │ │ 🚐 8–15 Pax (Van 16)  │ 🚌 16–28 Pax (Bus 29) │ │   │
│   │ ├───────────────────────┴───────────────────────┤ │   │
│   │ │ 🚌 29–45+ Pax (Universe Tour Coach)           │ │   │
│   │ └───────────────────────────────────────────────┘ │   │
│   │ 🔒 Free Instant Advice • Direct Local Fleet       │   │
│   └───────────────────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ 🏷️ CHỌN THEO SỨC CHỨA XE (CHIP FILTER)  │ <- 4. Bộ lọc lướt ngang (Scrollable Chips)
│ (● Tất cả) (7 Chỗ) (16 Chỗ) (29 Chỗ)... │
├─────────────────────────────────────────┤
│ 🚗 ĐỘI XE NỔI BẬT (CARD STACK)          │ <- 5. Danh sách xe xếp tầng (Card layout)
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [ Ảnh xe Ford Transit 16:9 bo góc ] │ │
│ │ 🏷️ Phổ biến nhất cho đoàn nhỏ       │ │
│ │                                     │ │
│ │ 16-Seater Van (Transit / Solati)    │ │
│ │                                     │ │
│ │ 👥 Tối đa 10-12 khách + Hành lý     │ │
│ │ 🧳 8-10 vali cỡ lớn (24 inch)       │ │
│ │ ❄️ Điều hòa mát lạnh · Wifi miễn phí│ │
│ │                                     │ │
│ │ Giá từ: $85 USD / chuyến            │ │
│ │ (~ 2.150.000 VNĐ)                   │ │
│ │                                     │ │
│ │ [ ⚡ Xem chi tiết & Chọn xe ]        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [ Ảnh xe 7 chỗ Fortuner / Carnival ] │ │
│ │ 🏷️ Gia đình & Công tác             │ │
│ │                                     │ │
│ │ 7-Seater SUV & MPV                  │ │
│ │ 👥 Phù hợp: 1-4 khách + 4 vali      │ │
│ │ Giá từ: $60 USD / chuyến            │ │
│ │ [ ⚡ Xem chi tiết & Chọn xe ]        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [ ➔ Xem tất cả 6 dòng xe (7 đến 45 chỗ) ]│
├─────────────────────────────────────────┤
│ 🛣️ CÁC TUYẾN ĐƯỜNG TRỌNG ĐIỂM          │ <- 6. Danh sách tuyến dạng Card ngang
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏞️ Hà Nội ➔ Sa Pa (315 km)          │ │
│ │ ⏱️ 3.5 - 4 giờ cao tốc              │ │
│ │ 💰 Giá trọn gói từ: $85 / xe        │ │
│ │ [ Đặt tuyến này ➔ ]                 │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⛵ Hà Nội ➔ Vịnh Hạ Long (160 km)    │ │
│ │ ⏱️ 2.5 giờ cao tốc mới              │ │
│ │ 💰 Giá trọn gói từ: $65 / xe        │ │
│ │ [ Đặt tuyến này ➔ ]                 │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⛰️ Hà Nội ➔ Ninh Bình (95 km)       │ │
│ │ ⏱️ 1.5 giờ                          │ │
│ │ 💰 Giá trọn gói từ: $50 / xe        │ │
│ │ [ Đặt tuyến này ➔ ]                 │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🛡️ TẠI SAO CHỌN CHÚNG TÔI? (ICON GRID)  │ <- 7. Khối uy tín (Cards 2 cột)
│ ┌───────────────────┬─────────────────┐ │
│ │ 🧑‍✈️ Tài xế chuẩn  │ 💵 Giá rõ ràng  │ │
│ │ Kinh nghiệm, lịch │ Không phát sinh │ │
│ │ sự, tiếng Anh cơ  │ phí ẩn hay phụ  │ │
│ │ bản               │ thu vô lý       │ │
│ ├───────────────────┼─────────────────┤ │
│ │ 🚘 Xe đời mới      │ 📞 Hỗ trợ 24/7  │ │
│ │ 2020+, bảo dưỡng  │ Tổng đài viên   │ │
│ │ định kỳ sạch sẽ   │ phản hồi < 5p   │ │
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ 💬 KHÁCH HÀNG NÓI GÌ? (REVIEW SWIPER)   │ <- 8. Đánh giá khách quốc tế
│ ┌─────────────────────────────────────┐ │
│ │ ⭐⭐⭐⭐⭐ "Dịch vụ xuất sắc!"         │ │
│ │ "Lái xe anh Hùng đón đúng giờ tại   │ │
│ │ Nội Bài, lái xe rất an toàn lên Sa  │ │
│ │ Pa. Xe sạch sẽ thơm tho."           │ │
│ │ — David Miller (Úc, T10/2026)       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ❓ CÂU HỎI THƯỜNG GẶP (ACCORDION)       │ <- 9. Accordion chạm mở
│ [▶] Giá đã bao gồm phí cầu đường chưa?  │
│ [▶] Tôi có cần đặt cọc trước không?     │
│ [▶] Nếu chuyến bay bị delay thì sao?    │
├─────────────────────────────────────────┤
│ 🦶 FOOTER                               │ <- 10. Footer cô đọng
│ • Hanoi Car & Bus Rental                │
│ • Hotline: +84 9xx xxx xxx (WhatsApp)   │
│ • Giấy phép vận tải du lịch số xxx/GPTV │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │ <- 11. Thanh ghim đáy chốt đơn
│ [ 💬 WhatsApp Tư Vấn ] [ 📝 Báo Giá Nhanh ]│
└─────────────────────────────────────────┘
```
