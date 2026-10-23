# Hanoi Car & Bus Rental — Mobile Wireframe & Architecture System
> **Tech Stack**: Astro (SSG) + Cloudflare Pages + Cloudflare D1 Database + Zero-Runtime Vanilla CSS  
> **Deployment Language**: **English (`en`)** as the primary international version  
> **UX Golden Rule**: **Zero Tables (`<table>`) on Mobile**, 100% Card Stacks, Visual Steppers, and **Duolingo-style 1-Tap Booking Wizard**.

---

## 1. 1-Tap Booking Wizard Flow (Duolingo Style)
File đặc tả chi tiết: [form-dat-xe-chuan.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/form-dat-xe-chuan.md)

* **Step 1: Group Size** — `[ 1–3 Pax ]` `[ 4–7 Pax ]` `[ 8–15 Pax ]` `[ 16–28 Pax ]` `[ 29–45+ Pax ]` *(Chạm 1 cái tự động nhảy bước)*
* **Step 2: Duration** — `[ 1 Day (City / Airport) ]` `[ 2 Days ]` `[ 3 Days ]` `[ 4+ Days (Tour) ]`
* **Step 3: Route / Destination** — `[ ✈️ Airport Transfer ]` `[ 🏞️ Sapa ]` `[ ⛵ Halong Bay ]` `[ ⛰️ Ninh Binh ]` `[ 📍 Other ]`
* **Step 4: Timing** — `[ Today ]` `[ Tomorrow ]` `[ Specific Date ]` `[ Flexible ]`
* **Step 5: Instant Dispatch** — Nhập duy nhất **WhatsApp / Phone / Email** ➔ Chốt đơn & lưu vào Cloudflare D1.

---

## 2. Danh Mục 16 Trang Cốt Lõi (Giai Đoạn 1)

| TT | Tên Trang | URL Đề Xuất | File Wireframe Chi Tiết |
| :---: | :--- | :--- | :--- |
| **01** | **Homepage** | `/` | [01-home.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/01-home.md) |
| **02** | **Our Vehicles Hub** | `/vehicles/` | [02-our-vehicles.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/02-our-vehicles.md) |
| **03** | 7-Seater Car & SUV Rental | `/vehicles/7-seater-car/` | [03-7-seater-car.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/03-7-seater-car.md) |
| **04** | 16-Seater Van Rental | `/vehicles/16-seater-van/` | [04-16-seater-van.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/04-16-seater-van.md) |
| **05** | 29-Seater Midi Bus Rental | `/vehicles/29-seater-bus/` | [05-29-seater-bus.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/05-29-seater-bus.md) |
| **06** | 35-Seater Bus Rental | `/vehicles/35-seater-bus/` | [06-35-seater-bus.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/06-35-seater-bus.md) |
| **07** | 45-Seater Universe Coach Rental | `/vehicles/45-seater-coach/` | [07-45-seater-coach.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/07-45-seater-coach.md) |
| **08** | Hanoi Airport Transfer (Noi Bai) | `/services/hanoi-airport-transfer/` | [08-service-airport-transfer.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/08-service-airport-transfer.md) |
| **09** | Hanoi Car Rental with Driver | `/services/car-rental-with-driver/` | [09-service-car-rental-driver.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/09-service-car-rental-driver.md) |
| **10** | Private Bus Charter | `/services/private-bus-charter/` | [10-service-private-bus-charter.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/10-service-private-bus-charter.md) |
| **11** | Hanoi to Sapa Private Car & Van | `/routes/hanoi-to-sapa/` | [11-route-hanoi-to-sapa.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/11-route-hanoi-to-sapa.md) |
| **12** | Hanoi to Halong Bay Transfer | `/routes/hanoi-to-halong-bay/` | [12-route-hanoi-to-halong-bay.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/12-route-hanoi-to-halong-bay.md) |
| **13** | Hanoi to Ninh Binh Private Car | `/routes/hanoi-to-ninh-binh/` | [13-route-hanoi-to-ninh-binh.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/13-route-hanoi-to-ninh-binh.md) |
| **14** | Hanoi to Ha Giang Private Car | `/routes/hanoi-to-ha-giang/` | [14-route-hanoi-to-ha-giang.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/14-route-hanoi-to-ha-giang.md) |
| **15** | About Us (Trust & Fleet Standards) | `/about-us/` | [15-about-us.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/15-about-us.md) |
| **16** | Contact & Get a Quote | `/contact/` | [form-dat-xe-chuan.md](file:///F:/Cac-Du-An-Lap-Trinh/rentacarvietnam/mobile-wireframes/form-dat-xe-chuan.md) |

---

## 3. Kiến Trúc Kỹ Thuật (Astro + Cloudflare Pages & D1)
1. **SSG HTML (Zero JS)**: 16 trang render tĩnh ở Build Time, load tức thì < 50ms trên Cloudflare Global Edge.
2. **Design Tokens**: Tái sử dụng trọn vẹn bộ CSS 5 tầng từ `website-vntoyou-ver2/src/styles/` (`tokens.css`, `global.css`, `components.css`, `pricing-engine.css`, `utilities.css`).
3. **Cloudflare D1 Binding**: 
   - Endpoint `/functions/api/quote.ts` nhận dữ liệu từ Wizard gửi về lưu vào bảng SQLite D1.
   - Endpoint `/functions/api/prices.ts` truy vấn bảng giá realtime theo tuyến & loại xe.
