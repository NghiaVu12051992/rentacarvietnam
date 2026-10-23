#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import sys
import shutil
import json
import subprocess
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_VEHICLES_DIR = BASE_DIR / "public" / "images" / "vehicles"
CLOUD_VEHICLES_DIR = Path("D:/Anh_Cloud_R2_RentACarVietnam/vehicles")
RCLONE_EXE = Path("F:/Cac-Du-An-Lap-Trinh/Xu-ly-anh-v2/bin/rclone.exe")
R2_DEST = "r2-rentacar:hanoi-car-and-bus/vehicles"

PUBLIC_VEHICLES_DIR.mkdir(parents=True, exist_ok=True)
CLOUD_VEHICLES_DIR.mkdir(parents=True, exist_ok=True)

images_to_process = [
    {
        "src": r"C:\Users\Admin\Downloads\7 seat.png",
        "out_name": "7-seater-car-rental-hanoi-mitsubishi-xpander-exterior.webp",
        "slug": "7-seater-car",
        "alt": "7-Seater Car Rental with Driver in Hanoi - Mitsubishi Xpander SUV",
        "tags": "#7SeaterCarRental #HanoiCarRental #MitsubishiXpanderVietnam #ToyotaVeloz #FamilyTripHanoi #CarRentalWithDriver #VietnamTravelTransport"
    },
    {
        "src": r"C:\Users\Admin\Downloads\16 seat van.png",
        "out_name": "16-seater-van-rental-hanoi-ford-transit-exterior.webp",
        "slug": "16-seater-van",
        "alt": "16-Seater Van Rental with Driver in Hanoi - Ford Transit High-Roof",
        "tags": "#16SeaterVanVietnam #FordTransitHanoi #HyundaiSolati #SmallGroupTravelVietnam #HanoiCarAndBusRental #PrivateVanVietnam #SapaVanTransfer"
    },
    {
        "src": r"C:\Users\Admin\Downloads\29 seat vip.png",
        "out_name": "29-seater-midi-bus-rental-hanoi-thaco-exterior.webp",
        "slug": "29-seater-bus",
        "alt": "29-Seater Tourist Midi Bus Rental with Driver in Hanoi",
        "tags": "#29SeaterBus #ThacoTownBus #VietnamTouristBus #BusRentalHanoi #GroupTransportVietnam #AirSuspensionBus #VietnamTourCoach"
    },
    {
        "src": r"C:\Users\Admin\Downloads\28 seat vip.png",
        "out_name": "35-seater-bus-rental-hanoi-samco-exterior.webp",
        "slug": "35-seater-bus",
        "alt": "35-Seater Tourist Bus Rental with Driver in Hanoi",
        "tags": "#35SeaterBus #SamcoBus #ThacoKinglong #CorporateTravelVietnam #GolfTransportHanoi #VietnamTourCoach"
    },
    {
        "src": r"C:\Users\Admin\Downloads\45 seat.png",
        "out_name": "45-seater-universe-coach-rental-hanoi-exterior.webp",
        "slug": "45-seater-coach",
        "alt": "45-Seater Hyundai Universe Coach Rental with Driver in Hanoi",
        "tags": "#45SeaterCoach #HyundaiUniversePrime #MICETravelVietnam #LargeGroupTransport #HanoiBusRental #UniverseLuxuryBus"
    },
    {
        "src": r"C:\Users\Admin\Downloads\9 seat dcar vip.png",
        "out_name": "9-seater-dcar-limousine-vip-hanoi-exterior.webp",
        "slug": "9-seater-limousine",
        "alt": "9-Seater DCar VIP Limousine Rental with Driver in Hanoi",
        "tags": "#9SeaterLimousine #DCarVIP #VIPChauffeurHanoi #LuxuryCarRentalVietnam #StarlightCeiling #ExecutiveTransferHanoi"
    }
]

# Load vehicles.json
json_path = BASE_DIR / "src" / "data" / "vehicles.json"
with open(json_path, "r", encoding="utf-8") as f:
    vehicles_data = json.load(f)

print("=" * 65)
print("  ĐANG BẮT ĐẦU XỬ LÝ ẢNH, XÓA DẤU VẾT AI VÀ NÉN WEBP...")
print("=" * 65)

for item in images_to_process:
    src_p = Path(item["src"])
    out_web = PUBLIC_VEHICLES_DIR / item["out_name"]
    out_cloud = CLOUD_VEHICLES_DIR / item["out_name"]

    with Image.open(src_p) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Resize chuẩn 1200 x 800 (tỉ lệ 3:2)
        resized = img.resize((1200, 800), Image.Resampling.LANCZOS)

        # Xóa sạch 100% metadata AI bằng pure canvas
        clean = Image.new("RGB", (1200, 800), (255, 255, 255))
        clean.paste(resized)

        # Lưu WebP chất lượng 85
        clean.save(str(out_web), "WEBP", quality=85, method=6)
        shutil.copy2(out_web, out_cloud)

    kb = out_web.stat().st_size / 1024
    rel_url = f"/images/vehicles/{item['out_name']}"
    print(f"✅ {item['out_name']} ({kb:.1f} KB)")
    print(f"   * Hashtags: {item['tags']}")
    print(f"   * Offline:  {rel_url}")

    # Cập nhật vehicles.json
    for v in vehicles_data:
        if v.get("slug") == item["slug"]:
            v["image"] = rel_url
            v["imageAlt"] = item["alt"]
            print(f"   -> Đã gán làm ảnh đại diện cho: {v['title']}")

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(vehicles_data, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 65)
print("  ☁️ ĐANG ĐỒNG BỘ ẢNH LÊN CLOUDFLARE R2 (hanoi-car-and-bus)...")
print("=" * 65)

cmd = [str(RCLONE_EXE), "sync", str(CLOUD_VEHICLES_DIR), R2_DEST, "--progress"]
subprocess.run(cmd, check=True)
print("\n🎉 THÀNH CÔNG RỰC RỠ! Toàn bộ ảnh đã được lưu vào Web, ổ D và Cloudflare R2!")
