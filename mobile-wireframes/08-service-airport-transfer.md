# Sơ Đồ Khung Màn Hình Di Động (Mobile Wireframe)
## Trang 08: Đón Tiễn Sân Bay Nội Bài (Hanoi Airport Transfer — `/services/hanoi-airport-transfer/`)

> **Mục tiêu UX**: Trải nghiệm đặt xe đưa đón sân bay nhanh như Grab/Uber nhưng chuyên nghiệp hơn cho khách quốc tế (theo dõi số hiệu chuyến bay, tài xế cầm biển tên đón tại ga đến quốc tế T2/nội địa T1).

---

### Khung Màn Hình Trực Quan (Viewport 375px - 414px)

```
┌─────────────────────────────────────────┐
│ [≡ Menu]     HANOI CAR & BUS    [📞 Eng]│
├─────────────────────────────────────────┤
│ < Dịch vụ / Đón Tiễn Sân Bay            │
│                                         │
│ HANOI AIRPORT TRANSFER (HAN / NOI BAI)  │
│ "Đón Đúng Giờ · Có Biển Tên · Không Ẩn Phí"│
├─────────────────────────────────────────┤
│ ⚡ WIDGET ĐẶT XE SÂN BAY CẤP TỐC        │
│ ┌─────────────────────────────────────┐ │
│ │ [ Chiều đón Sân bay ] [ Chiều tiễn ]│ │
│ │ 🛫 Mã chuyến bay: [ vd: VN 1234   ] │ │
│ │ 📅 Ngày & Giờ hạ cánh: [ Chọn giờ ] │ │
│ │ 🏨 Khách sạn đến: [ Phố Cổ Hà Nội ] │ │
│ │ 🚗 Chọn xe: [ 7 chỗ | 16 chỗ ▼    ] │ │
│ │ [  ⚡ XEM GIÁ & ĐẶT XE NGAY       ] │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🏷️ BÁO GIÁ CỐ ĐỊNH THEO LOẠI XE         │ <- Card Stack theo phong cách OTA
│ ┌─────────────────────────────────────┐ │
│ │ 🚗 Xe 7 Chỗ (SUV / MPV)             │ │
│ │ Phù hợp: 1-4 khách + 3 vali         │ │
│ │ 💵 Sân bay ➔ Trung tâm: $18 USD    │ │
│ │ 💵 Trung tâm ➔ Sân bay: $15 USD    │ │
│ │ [ Chọn Xe 7 Chỗ ]                   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🚐 Xe 16 Chỗ (Minivan Transit)      │ │
│ │ Phù hợp: 5-10 khách + 8 vali        │ │
│ │ 💵 Sân bay ➔ Trung tâm: $28 USD    │ │
│ │ 💵 Trung tâm ➔ Sân bay: $25 USD    │ │
│ │ [ Chọn Xe 16 Chỗ ]                  │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🚌 Xe 29 - 45 Chỗ (Đoàn Lớn)        │ │
│ │ Phù hợp: 15-40 khách + hành lý đoàn │ │
│ │ 💵 Trọn gói từ: $60 USD             │ │
│ │ [ Báo Giá Xe Lớn ]                  │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🚶 QUY TRÌNH ĐÓN SÂN BAY 4 BƯỚC         │ <- Dòng thời gian trực quan (Stepper)
│ 1️⃣ Bạn đặt xe & cung cấp mã chuyến bay  │
│ 2️⃣ Chúng tôi tự động theo dõi chuyến bay│
│    (Nếu delay, tài xế tự lùi giờ đón)   │
│ 3️⃣ Tài xế cầm biển tên đón bạn tại Cột  │
│    9 hoặc 10 (Sảnh đến T2 / T1)         │
│ 4️⃣ Lên xe thư giãn về khách sạn        │
├─────────────────────────────────────────┤
│ 🛡️ CAM KẾT VÀNG CHO CHUYẾN BAY          │
│ ⏱️ Chờ miễn phí đến 60 phút sau hạ cánh │
│ 🏷️ Giá đã gồm vé vào cổng sân bay & BOT │
│ 🧑‍✈️ Tài xế hỗ trợ bê vác hành lý chu đáo│
├─────────────────────────────────────────┤
│ ❓ CÂU HỎI THƯỜNG GẶP KHI ĐÓN SÂN BAY    │
│ [▶] Nếu chuyến bay hạ cánh trễ có mất phí?│
│ [▶] Tôi tìm tài xế ở đâu tại sảnh T2?   │
│ [▶] Có đón lúc 2-3 giờ sáng không?      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⚡ STICKY BOTTOM BAR                    │
│ Đón sân bay chỉ từ $18 USD              │
│ [ 💬 Chat WhatsApp ] [ 🚗 Đặt Xe Ngay ] │
└─────────────────────────────────────────┘
```
