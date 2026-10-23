# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 03: Thuê Xe 7 Chỗ (7-Seater Car Rental — `/vehicles/7-seater-car/`)

> **Đặc điểm xe**: Toyota Fortuner, Innova, Kia Carnival. Phù hợp cho nhóm gia đình nhỏ (2-4 khách) hoặc doanh nhân đi công tác.

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│
├─────────────────────────────────────────┤
│ < Đội xe / Xe 7 Chỗ                     │
│                                         │
│ 7-SEATER CAR & SUV RENTAL WITH DRIVER   │
│ ⭐ 4.95 (180+ khách đánh giá)           │
├─────────────────────────────────────────┤
│ 📸 BỘ ẢNH XE LƯỚT NGANG (CAROUSEL)      │
│ ┌─────────────────────────────────────┐ │
│ │ [ Ảnh ngoại thất Fortuner/Carnival] │ │
│ │  (1/5) • Chạm để phóng to          │ │
│ └─────────────────────────────────────┘ │
│ [• Ngoại thất] [• Ghế ngồi] [• Cốp xe]  │
├─────────────────────────────────────────┤
│ ⚡ THÔNG SỐ VÀ TIỆN NGHI (ICON CHIPS)    │ <- KHÔNG DÙNG BẢNG
│ ┌───────────────────┬─────────────────┐ │
│ │ 👥 Tối ưu:        │ 🧳 Hành lý:     │ │
│ │ 1 - 4 người lớn   │ 3-4 vali 24"    │ │
│ ├───────────────────┼─────────────────┤ │
│ │ ❄️ Điều hòa:      │ 🔌 Cổng sạc:    │ │
│ │ 2 vùng mát sâu    │ USB / Type-C    │ │
│ ├───────────────────┼─────────────────┤ │
│ │ 🍼 Ghế trẻ em:    │ 📶 Kết nối:     │ │
│ │ Có sẵn (khi báo)  │ Wifi tốc độ cao │ │
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ 💡 TƯ VẤN SỨC CHỨA THỰC TẾ              │
│ ℹ️ Xe có 7 ghế ngồi, tuy nhiên khi ngồi │
│ đủ 6-7 người thì hàng ghế thứ 3 dựng lên│
│ và cốp xe CHỈ để vừa 1-2 balo nhỏ.     │
│ 👉 Nếu có từ 3 vali to trở lên, nên đi  │
│ tối đa 4 khách hoặc chọn xe 16 chỗ.     │
├─────────────────────────────────────────┤
│ 🏷️ CÁC TUYẾN PHỔ BIẾN XE 7 CHỖ         │ <- Thay bảng giá bằng Card Tuyến
│ ┌─────────────────────────────────────┐ │
│ │ ✈️ Đón/Tiễn Sân Bay Nội Bài         │ │
│ │ Khoảng cách: 30 km (45 phút)        │ │
│ │ 💵 Giá trọn gói: $18 USD (~450k)    │ │
│ │ [ Đặt tuyến này ]                   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🏞️ Hà Nội ➔ Ninh Bình (Tràng An)     │ │
│ │ 1 ngày khứ hồi (8h sáng - 6h tối)   │ │
│ │ 💵 Giá trọn gói: $65 USD            │ │
│ │ [ Đặt tuyến này ]                   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⛵ Hà Nội ➔ Vịnh Hạ Long (Cao tốc)  │ │
│ │ 1 chiều: $60 USD | 2 chiều: $105 USD│ │
│ │ [ Đặt tuyến này ]                   │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🛡️ DỊCH VỤ BAO GỒM VÀ CAM KẾT          │
│ ✅ Đã bao gồm: Xăng dầu, vé cầu đường,  │
│    phí đỗ xe sân bay, lái xe phục vụ.   │
│ ❌ Không bao gồm: Thuế VAT, chi phí cá  │
│    nhân, tiền tip (tùy tâm).            │
├─────────────────────────────────────────┤
│ ⚡ FAST 1-TAP INQUIRY (7-SEATER CAR PRE-SELECTED) │
│ ┌───────────────────────────────────────────────────┐   │
│ │ 🚗 7-SEATER CAR RENTAL QUOTE (1-TAP)              │   │
│ │ [━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░] Step 2/4     │   │
│ │                                                   │   │
│ │ 📍 WHERE ARE YOU TRAVELING TO? (Tap one)          │   │
│ │ ┌───────────────────────┬───────────────────────┐ │   │
│ │ │ ✈️ Noi Bai Airport    │ 🏞️ Hanoi ➔ Sapa       │ │   │
│ │ ├───────────────────────┼───────────────────────┤ │   │
│ │ │ ⛵ Hanoi ➔ Halong Bay │ ⛰️ Hanoi ➔ Ninh Binh  │ │   │
│ │ ├───────────────────────┴───────────────────────┤ │   │
│ │ │ 🏙️ Full Day Hanoi City Tour (8 Hours)          │ │   │
│ │ └───────────────────────────────────────────────┘ │   │
│ │ 🔒 Free Advice • Direct Local Fleet               │   │
│ └───────────────────────────────────────────────────┘   │
├─────────────────────────────────────────┤
│ ❓ CÂU HỎI THƯỜNG GẶP XE 7 CHỖ          │
│ [▶] Tài xế có đón tận sảnh khách sạn?   │
│ [▶] Đón sân bay nửa đêm có phụ thu?     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │
│ Xe 7 chỗ từ $18 USD                     │
│ [ 💬 Chat WhatsApp ] [ ⚡ Đặt Xe Ngay ] │
└─────────────────────────────────────────┘
```
