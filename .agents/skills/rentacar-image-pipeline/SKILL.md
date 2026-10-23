---
name: rentacar-image-pipeline
description: Quy trình tự động xử lý ảnh, đặt tên chuẩn SEO Google Image (Latin slugs), viết bộ hashtag du lịch/thuê xe, lưu ảnh xem Offline trên localhost và upload thẳng lên Cloudflare R2 bucket hanoi-car-and-bus. Kích hoạt khi người dùng yêu cầu xử lý ảnh, upload ảnh cho xe hoặc tuyến đường, hoặc viết hashtag/tên cho ảnh.
---

# Rent A Car Vietnam — Automated Image Pipeline & SEO Tagging Skill

Skill này hướng dẫn và trang bị cho AI Agent năng lực tự động hóa toàn diện khi xử lý ảnh cho dự án **Hanoi Car & Bus Rental / Rent a Car Vietnam**:

---

## 1. Nguyên tắc Đặt Tên Ảnh Chuẩn SEO (Google Image SEO)
* **Chỉ dùng chữ cái Latin thường, không dấu, ngăn cách bằng dấu gạch ngang (`-`)**.
* **Cấu trúc đặt tên chuẩn**:
  `[loại-xe-hoặc-tuyến-đường]-[đặc-điểm-chi-tiết]-[góc-chụp]-[stt].webp`
* **Ví dụ mẫu**:
  * Xe 16 chỗ ngoại thất: `16-seater-van-ford-transit-exterior-front-01.webp`
  * Xe 16 chỗ nội thất: `16-seater-van-hyundai-solati-reclining-leather-seats-01.webp`
  * Cốp xe 7 chỗ: `7-seater-suv-mitsubishi-xpander-flat-folding-luggage-trunk-01.webp`
  * Tuyến Sapa: `hanoi-to-sapa-private-car-transfer-ct05-expressway-01.webp`
  * Tuyến Hạ Long: `hanoi-to-halong-bay-private-van-tuan-chau-port-01.webp`

---

## 2. Bộ Hashtags / Taxonomy Chuẩn (Latin Slugs)
Mỗi bức ảnh khi xử lý sẽ được gán bộ hashtag theo 3 tầng:

1. **Brand & Dịch vụ**:
   `#HanoiCarAndBusRental #RentACarVietnam #HanoiCarRentalWithDriver #PrivateCarVietnam #VietnamChauffeurService`
2. **Loại phương tiện / Tuyến đường tương ứng**:
   * **16-Seater Van**: `#16SeaterVanVietnam #FordTransitHanoi #HyundaiSolati #SmallGroupTravelVietnam`
   * **7-Seater Car**: `#7SeaterCarRental #ToyotaVelozVietnam #MitsubishiXpander #FamilyTripHanoi`
   * **29/35/45-Seater Bus**: `#VietnamTouristBus #BusRentalHanoi #GroupTransportVietnam #HyundaiUniverse`
   * **Tuyến Sapa**: `#HanoiToSapa #SapaExpressway #NoiBaiLaoCai #SapaPrivateTransfer`
   * **Tuyến Hạ Long**: `#HanoiToHalong #HalongBayTransfer #TuanChauCruisePort`
   * **Nội Bài**: `#NoiBaiAirportTransfer #HanoiAirportPickup`
3. **Đặc tính kỹ thuật & Sự tiện nghi**:
   `#LeatherSeats #DualAirConditioning #SpaciousTrunk #LuggageCapacity #CleanSmokeFree #LicensedTouristTransport`

---

## 3. Lệnh Thực Thi Tự Động (Python Pipeline)

Khi người dùng cung cấp ảnh (hoặc có ảnh trong `photos-raw/`), Agent thực thi lệnh sau:

```bash
python tools/image_pipeline.py \
  --input "<đường_dẫn_ảnh_gốc>" \
  --name "<tên_file_chuẩn_seo>" \
  --category "<vehicles|routes|services|banners>" \
  --aspect "<photo|video|portrait|square>" \
  --target-slug "<slug_xe_hoặc_tuyến>" \
  --role "<main|interior|luggage>" \
  --tags "<danh_sách_hashtags>"
```

### Các tác vụ công cụ tự động làm 100%:
1. **Chuyển đổi WebP chất lượng 85%** (giảm 80% dung lượng, chuẩn tỉ lệ 3:2 hoặc 2:3).
2. **Lưu vào `public/images/<category>/<tên_file>.webp`**: Giúp **xem OFFLINE 100% trên `localhost:4321`** mà không cần mạng.
3. **Lưu bản sao máy vào `D:\Anh_Cloud_R2_RentACarVietnam\<category>/<tên_file>.webp`**.
4. **Đẩy thẳng lên Cloudflare R2 bucket `hanoi-car-and-bus`** qua lệnh Rclone `r2-rentacar:hanoi-car-and-bus`.
5. **Tự động điền link ảnh vào `src/data/vehicles.json` hoặc `routes.json`** để giao diện web hiển thị ngay mà người dùng không cần copy link thủ công.
