# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 09: Thuê Xe Có Tài Xế (Hanoi Car Rental with Driver — `/services/car-rental-with-driver/`)

> **Mục tiêu UX**: Dành cho khách muốn thuê xe riêng trọn gói theo ngày, linh hoạt điểm đến (City tour hoặc đi tỉnh lân cận theo yêu cầu), không bị gò bó lịch trình.

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│
├─────────────────────────────────────────┤
│ < Dịch vụ / Thuê Xe Có Tài Xế           │
│                                         │
│ HANOI PRIVATE CAR RENTAL WITH DRIVER    │
│ "Tự Do Lịch Trình · Tài Xế Riêng Tận Tâm"│
├─────────────────────────────────────────┤
│ 💡 3 GÓI THUÊ PHỔ BIẾN NHẤT             │ <- Segment Cards
│ ┌─────────────────────────────────────┐ │
│ │ 🏙️ GÓI 1: NỘI THÀNH HÀ NỘI (CITY TOUR)│ │
│ │ • Thời gian: 8 tiếng (8:00 - 17:00) │ │
│ │ • Giới hạn: 100 km nội thành        │ │
│ │ • Tự do ghé thăm các điểm tham quan │ │
│ │ 💵 Xe 7 chỗ: $55 USD / ngày         │ │
│ │ 💵 Xe 16 chỗ: $75 USD / ngày        │ │
│ │ [ Đặt Gói Nội Thành ]               │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🏞️ GÓI 2: ĐI TỈNH TRONG NGÀY         │ │
│ │ • Thời gian: 10 tiếng               │ │
│ │ • Giới hạn: 200 km (Ninh Bình/Hải   │ │
│ │   Dương/Bắc Ninh/Hòa Bình...)       │ │
│ │ 💵 Xe 7 chỗ: $75 USD / ngày         │ │
│ │ 💵 Xe 16 chỗ: $95 USD / ngày        │ │
│ │ [ Đặt Gói Đi Tỉnh 1 Ngày ]          │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ⛰️ GÓI 3: THUÊ XE NHIỀU NGÀY (TOUR)  │ │
│ │ • Đi Sa Pa, Hà Giang, Cao Bằng...   │ │
│ │ • Xe & tài xế phục vụ suốt tuyến    │ │
│ │ 💵 Xe 7 chỗ: từ $80 USD / ngày      │ │
│ │ 💵 Xe 16 chỗ: từ $100 USD / ngày    │ │
│ │ [ Nhận Báo Giá Đa Ngày ]            │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 👨‍✈️ TIÊU CHUẨN TÀI XẾ HANOI CAR & BUS    │ <- Khối khẳng định chất lượng
│ • Giao tiếp tiếng Anh cơ bản chuyên du lịch
│ • Không hút thuốc lá trên xe            │
│ • Nhiệt tình gợi ý quán ăn địa phương ngon
│ • Lái xe cẩn thận, không phóng nhanh    │
├─────────────────────────────────────────┤
│ 🛡️ CHÍNH SÁCH PHỤ PHÍ MINH BẠCH         │
│ • Quá giờ (Overtime): $5 USD / giờ (xe 7 chỗ)
│ • Quá km: $0.4 USD / km phát sinh       │
│ • Mọi chi phí được thông báo trước rõ ràng
├─────────────────────────────────────────┤
│ 📝 GỬI YÊU CẦU LỊCH TRÌNH RIÊNG         │
│ [ Nhập lịch trình bạn muốn đi...     ]  │
│ [ Số ngày thuê xe                    ]  │
│ [ Ngày bắt đầu                       ]  │
│ [  🚀 BÁO GIÁ TRỌN GÓI TRONG 10 PHÚT  ] │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │
│ Thuê xe có tài xế từ $55/ngày           │
│ [ 💬 Chat WhatsApp ] [ 📝 Báo Giá Nhanh ]│
└─────────────────────────────────────────┘
```
