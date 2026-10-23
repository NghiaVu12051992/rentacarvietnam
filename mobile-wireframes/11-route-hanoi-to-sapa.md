# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 11: Tuyến Hà Nội ➔ Sa Pa (Hanoi to Sapa — `/routes/hanoi-to-sapa/`)

> **Đặc trưng tuyến**: 315 km, đường cao tốc Hà Nội - Lào Cai + 30km đèo dốc lên Sa Pa. Đây là tuyến vàng có tỷ lệ tìm kiếm và chuyển đổi booking cao nhất miền Bắc.

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│
├─────────────────────────────────────────┤
│ < Tuyến Đường / Hà Nội ➔ Sa Pa          │
│                                         │
│ HANOI TO SAPA PRIVATE CAR & VAN TRANSFER│
│ ⏱️ 3.5 - 4 Giờ · Cao Tốc · Đón Tận Nơi  │
├─────────────────────────────────────────┤
│ 🗺️ THÔNG TIN HÀNH TRÌNH NHANH           │ <- Quick Stats Pills
│ [ 📏 315 km ] [ ⏱️ 4.0 Giờ ] [ 🛣️ Cao tốc ]│
├─────────────────────────────────────────┤
│ 🚗 BÁO GIÁ CÁC LOẠI XE TUYẾN SA PA      │ <- Card Stack (Tuyệt đối không dùng bảng)
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🚙 Xe 7 Chỗ (Fortuner / Innova)     │ │
│ │ • Tối ưu: 1-4 khách + 3-4 vali      │ │
│ │ • Đón tận nơi Hà Nội trả KS Sa Pa   │ │
│ │ ─────────────────────────────────── │ │
│ │ 💵 1 Chiều: $80 USD (~2.000.000đ)   │ │
│ │ 💵 2 Chiều (về trong 2-3 ngày): $150│ │
│ │ [ ⚡ Chọn Xe 7 Chỗ ]                │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🚐 Xe 16 Chỗ (Transit / Solati)     │ │
│ │ 🏷️ Lựa chọn phổ biến nhất           │ │
│ │ • Tối ưu: 5-10 khách + 10 vali      │ │
│ │ • Trần cao, điều hòa mát lịm        │ │
│ │ ─────────────────────────────────── │ │
│ │ 💵 1 Chiều: $95 USD (~2.400.000đ)   │ │
│ │ 💵 2 Chiều: $180 USD                │ │
│ │ [ ⚡ Chọn Xe 16 Chỗ ]               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🚌 Xe 29 Chỗ (Thaco / Hyundai)      │ │
│ │ • Tối ưu: 12-20 khách + hành lý     │ │
│ │ • Giảm xóc bóng hơi êm ái leo đèo   │ │
│ │ ─────────────────────────────────── │ │
│ │ 💵 1 Chiều: $170 USD                │ │
│ │ 💵 2 Chiều (3N2Đ phục vụ Sa Pa): $320│ │
│ │ [ ⚡ Chọn Xe 29 Chỗ ]               │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ⏱️ LỘ TRÌNH CHI TIẾT (STEPPER DỌC)      │ <- Timeline trực quan
│ ◉ 07:00: Đón tại khách sạn Phố Cổ       │
│ │                                       │
│ │ 🚗 130 km trên Cao tốc Nội Bài - Lào Cai
│ │                                       │
│ ☕ 09:00: Dừng nghỉ trạm dừng chân Km117│
│ │  (Vệ sinh, uống cà phê, ăn sáng nhẹ)  │
│ │                                       │
│ │ 🚗 150 km tiếp theo đến TP Lào Cai    │
│ │ ⛰️ 30 km đèo dốc uốn lượn lên Sa Pa   │
│ │                                       │
│ ◎ 11:30: Đến sảnh khách sạn tại Sa Pa   │
├─────────────────────────────────────────┤
│ 🛡️ DỊCH VỤ BAO GỒM                     │
│ ✅ Phí đường cao tốc mới Nội Bài - Lào Cai
│ ✅ Xăng xe, lái xe nhiệt tình, an toàn  │
│ ✅ Nước uống đóng chai                  │
│ ❌ Vé cáp treo Fansipan, bản Cát Cát    │
├─────────────────────────────────────────┤
│ 💡 SO SÁNH XE RIÊNG VỚI XE KHÁCH / TÀU HỎA│
│ 🚄 Tàu hỏa: Phải chuyển tiếp xe buýt từ  │
│    ga Lào Cai lên Sa Pa, tốn thời gian.  │
│ 🚌 Xe khách: Không đón trả tại khách sạn│
│ 🚗 Xe riêng: Đi giờ nào tùy bạn, dừng   │
│    chụp ảnh Cầu Cốc Lếu / ruộng bậc thang│
├─────────────────────────────────────────┤
│ ❓ CÂU HỎI VỀ ĐƯỜNG ĐI SA PA            │
│ [▶] Đi đèo Sa Pa có nguy hiểm không?    │
│ [▶] Có phụ thu nếu đón tại Sân bay Nội Bài?│
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │
│ Hà Nội ➔ Sa Pa từ $80 USD               │
│ [ 💬 Chat WhatsApp ] [ 🚗 Đặt Tuyến Này ]│
└─────────────────────────────────────────┘
```
