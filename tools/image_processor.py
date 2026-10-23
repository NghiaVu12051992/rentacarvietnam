#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BỘ XỬ LÝ ẢNH CHUẨN SEO & ĐỒNG BỘ CLOUDFLARE R2 - HANOI CAR & BUS RENTAL
- Nén WebP chuẩn tỉ lệ (3:2, 16:9, 2:3, 1:1) cực nét (<150KB)
- Đặt tên chuẩn SEO hoặc tự gõ tên tự do
- Lưu trực tiếp vào public/images/ để XEM OFFLINE 100% TRÊN MÁY TÍNH
- Lưu một bản gốc vào D:\Anh_Cloud_R2_RentACarVietnam
- Tự động đẩy lên Cloudflare R2 bucket: hanoi-car-and-bus bằng Rclone
"""

import os
import sys
import json
import re
import glob
import shutil
import subprocess
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = BASE_DIR / "photos-raw"
PUBLIC_IMAGES_DIR = BASE_DIR / "public" / "images"
CLOUD_BACKUP_DIR = Path("D:/Anh_Cloud_R2_RentACarVietnam")
RCLONE_EXE = Path("F:/Cac-Du-An-Lap-Trinh/Xu-ly-anh-v2/bin/rclone.exe")
R2_REMOTE_BUCKET = "r2-rentacar:hanoi-car-and-bus"

TARGET_SIZES = {
    "1": ("Ngang 3:2 (1200 x 800) - Chuẩn chi tiết xe & tuyến đường", 1200, 800),
    "2": ("Ngang 16:9 (1200 x 675) - Chuẩn Banner lớn & Video", 1200, 675),
    "3": ("Dọc 2:3 (800 x 1200) - Chuẩn ảnh dọc điện thoại", 800, 1200),
    "4": ("Vuông 1:1 (1000 x 1000) - Chuẩn chi tiết / Nội thất", 1000, 1000),
    "5": ("Giữ nguyên tỉ lệ ảnh gốc (Tối đa chiều rộng 1400px)", 1400, None)
}

VEHICLE_OPTIONS = {
    "1": ("16-seater-van", "Xe 16 chỗ (Ford Transit & Hyundai Solati)"),
    "2": ("7-seater-car", "Xe 7 chỗ (Toyota Veloz & Mitsubishi Xpander)"),
    "3": ("29-seater-bus", "Xe 29 chỗ (Thaco & Hyundai County)"),
    "4": ("35-seater-bus", "Xe 35 chỗ (Samco & Universe)"),
    "5": ("45-seater-coach", "Xe 45 chỗ (Hyundai Universe)"),
    "6": ("9-seater-limousine", "Xe Limousine 9 chỗ VIP DCar")
}

ROUTE_OPTIONS = {
    "1": ("hanoi-to-sapa", "Hà Nội - Sapa (Cao tốc CT05)"),
    "2": ("hanoi-to-halong-bay", "Hà Nội - Hạ Long (Cao tốc 5B)"),
    "3": ("hanoi-to-ninh-binh", "Hà Nội - Ninh Bình (Tràng An / Tam Cốc)"),
    "4": ("hanoi-to-ha-giang", "Hà Nội - Hà Giang Loop")
}

IMAGE_ROLES = {
    "1": ("main-exterior", "Ảnh ngoại thất chính (Đầu xe / Thân xe)"),
    "2": ("interior-seats", "Nội thất khoang ghế hành khách"),
    "3": ("luggage-trunk", "Khoang hành lý / Cốp chứa vali"),
    "4": ("driver-cockpit", "Khoang lái & Tài xế"),
    "5": ("side-profile", "Góc nghiêng / Toàn cảnh xe trên đường"),
    "6": ("custom", "Tự gõ mô tả vị trí khác...")
}

def to_slug(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[àáạảãâầấậẩẫăằắặẳẵ]', 'a', text)
    text = re.sub(r'[èéẹẻẽêềếệểễ]', 'e', text)
    text = re.sub(r'[ìíịỉĩ]', 'i', text)
    text = re.sub(r'[òóọỏõôồốộổỗơờớợởỡ]', 'o', text)
    text = re.sub(r'[ùúụủũưừứựửữ]', 'u', text)
    text = re.sub(r'[ỳýỵỷỹ]', 'y', text)
    text = re.sub(r'[đ]', 'd', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_banner():
    clear_screen()
    print("=" * 70)
    print("  🚗 HANOI CAR & BUS RENTAL - XỬ LÝ ẢNH & ĐỒNG BỘ R2 CLOUD")
    print("=" * 70)
    print("  * Xem Offline 100% trên localhost: http://localhost:4321")
    print("  * Nén WebP chuẩn SEO, tối ưu tốc độ tải trang 100/100")
    print("  * Lưu bản sao máy: D:\\Anh_Cloud_R2_RentACarVietnam")
    print("  * Đồng bộ Cloud: Cloudflare R2 bucket [hanoi-car-and-bus]")
    print("=" * 70 + "\n")

def get_raw_images():
    extensions = ("*.jpg", "*.jpeg", "*.png", "*.webp", "*.bmp", "*.JPG", "*.JPEG", "*.PNG", "*.WEBP")
    files = []
    for ext in extensions:
        files.extend(glob.glob(str(RAW_DIR / ext)))
    return sorted(files)

def resize_and_crop(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    if target_h is None:
        w, h = img.size
        if w > target_w:
            new_h = int(h * (target_w / w))
            return img.resize((target_w, new_h), Image.Resampling.LANCZOS)
        return img

    target_ratio = target_w / target_h
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_width = int(img.height * target_ratio)
        offset = (img.width - new_width) // 2
        img_cropped = img.crop((offset, 0, offset + new_width, img.height))
    else:
        new_height = int(img.width / target_ratio)
        offset = (img.height - new_height) // 2
        img_cropped = img.crop((0, offset, img.width, offset + new_height))

    return img_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

def update_vehicles_json(vehicle_slug: str, role: str, relative_url: str):
    json_path = BASE_DIR / "src" / "data" / "vehicles.json"
    if not json_path.exists():
        return
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        updated = False
        for car in data:
            if car.get("slug") == vehicle_slug:
                if role == "main-exterior" or not car.get("image"):
                    car["image"] = relative_url
                    updated = True
                elif role == "interior-seats":
                    car["interiorImage"] = relative_url
                    updated = True
                elif role == "luggage-trunk":
                    car["luggageImage"] = relative_url
                    updated = True

        if updated:
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  [OK] Đã tự động cập nhật link ảnh vào vehicles.json cho: {vehicle_slug}")
    except Exception as e:
        print(f"  [CẢNH BÁO] Không thể ghi vehicles.json: {e}")

def update_routes_json(route_slug: str, relative_url: str):
    json_path = BASE_DIR / "src" / "data" / "routes.json"
    if not json_path.exists():
        return
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        updated = False
        for r in data:
            if r.get("slug") == route_slug:
                r["image"] = relative_url
                updated = True

        if updated:
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  [OK] Đã tự động cập nhật link ảnh vào routes.json cho: {route_slug}")
    except Exception as e:
        print(f"  [CẢNH BÁO] Không thể ghi routes.json: {e}")

def main():
    print_banner()

    raw_files = get_raw_images()
    if not raw_files:
        print(f"👉 Vui lòng thả ảnh gốc cần xử lý vào thư mục:")
        print(f"   {RAW_DIR}\n")
        input("Nhấn phím Enter sau khi bạn đã copy ảnh vào thư mục trên...")
        raw_files = get_raw_images()
        if not raw_files:
            print("[THÔNG BÁO] Chưa tìm thấy ảnh nào trong photos-raw/. Thoát chương trình.")
            sys.exit(0)

    print(f"Tìm thấy {len(raw_files)} ảnh trong photos-raw/\n")

    print("--- BƯỚC 1: CÁCH ĐẶT TÊN ẢNH ---")
    print("  [1] Chọn theo dòng xe / tuyến đường có sẵn (Tự động sinh tên chuẩn SEO)")
    print("  [2] Tự gõ tên tự do (Ví dụ: 'xpander-2026', 'ghe-da-solati', 'halong-port')")
    name_mode = input("Chọn cách đặt tên (1 hoặc 2, mặc định 1): ").strip() or "1"

    dest_folder = "vehicles"
    base_name = "car"
    role_name = ""

    if name_mode == "2":
        # Tự gõ tên tự do
        print("\n--- CHỌN THƯ MỤC LƯU TRỮ TRÊN WEB ---")
        print("  [1] vehicles (Ảnh xe)")
        print("  [2] routes   (Ảnh tuyến đường)")
        print("  [3] services (Ảnh dịch vụ đưa đón)")
        print("  [4] banners  (Ảnh banner trang chủ)")
        f_choice = input("Lưu vào thư mục nào (1-4, mặc định 1): ").strip() or "1"
        folder_map = {"1": "vehicles", "2": "routes", "3": "services", "4": "banners"}
        dest_folder = folder_map.get(f_choice, "vehicles")

        user_name = input("\n👉 Nhập tên ảnh bạn muốn đặt (Ví dụ: 'toyota-veloz-mau-trang'): ").strip()
        base_name = to_slug(user_name) or "photo"
    else:
        # Chọn theo danh mục
        print("\n--- CHỌN DANH MỤC ---")
        print("  [1] Ảnh Xe du lịch (Vehicles)")
        print("  [2] Ảnh Tuyến đường (Routes)")
        print("  [3] Ảnh Dịch vụ (Services)")
        print("  [4] Ảnh Banner / Trang chủ (Banners)")
        cat_choice = input("Chọn danh mục (1-4, mặc định 1): ").strip() or "1"

        if cat_choice == "1":
            dest_folder = "vehicles"
            print("\n--- CHỌN DÒNG XE ---")
            for k, v in VEHICLE_OPTIONS.items():
                print(f"  [{k}] {v[1]}")
            car_c = input("Chọn xe (1-6, mặc định 1): ").strip() or "1"
            base_name = VEHICLE_OPTIONS.get(car_c, VEHICLE_OPTIONS["1"])[0]

            print("\n--- CHỌN VỊ TRÍ ẢNH ---")
            for k, v in IMAGE_ROLES.items():
                print(f"  [{k}] {v[1]}")
            role_c = input("Chọn vị trí (1-6, mặc định 1): ").strip() or "1"
            if role_c == "6":
                custom_desc = input("Nhập mô tả vị trí (vd: cop-xe, man-hinh): ").strip()
                role_name = to_slug(custom_desc) or "detail"
            else:
                role_name = IMAGE_ROLES.get(role_c, IMAGE_ROLES["1"])[0]

        elif cat_choice == "2":
            dest_folder = "routes"
            print("\n--- CHỌN TUYẾN ĐƯỜNG ---")
            for k, v in ROUTE_OPTIONS.items():
                print(f"  [{k}] {v[1]}")
            route_c = input("Chọn tuyến (1-4, mặc định 1): ").strip() or "1"
            base_name = ROUTE_OPTIONS.get(route_c, ROUTE_OPTIONS["1"])[0]
            desc = input("Nhập cảnh đẹp / điểm dừng chân (vd: expressway, sunset): ").strip()
            role_name = to_slug(desc) or "view"

        elif cat_choice == "3":
            dest_folder = "services"
            desc = input("Nhập tên dịch vụ (vd: airport-transfer, chauffeur): ").strip()
            base_name = to_slug(desc) or "service"

        else:
            dest_folder = "banners"
            desc = input("Nhập tên banner (vd: home-hero, fleet-overview): ").strip()
            base_name = to_slug(desc) or "banner"

    print("\n--- BƯỚC 2: CHỌN TỈ LỆ & KÍCH THƯỚC ---")
    for k, v in TARGET_SIZES.items():
        print(f"  [{k}] {v[0]}")
    size_choice = input("Chọn tỉ lệ (1-5, mặc định 1): ").strip() or "1"
    _, target_w, target_h = TARGET_SIZES.get(size_choice, TARGET_SIZES["1"])

    # Thư mục web offline
    out_web_dir = PUBLIC_IMAGES_DIR / dest_folder
    out_web_dir.mkdir(parents=True, exist_ok=True)

    # Thư mục backup trên ổ D:
    out_cloud_dir = CLOUD_BACKUP_DIR / dest_folder
    out_cloud_dir.mkdir(parents=True, exist_ok=True)

    print("\n" + "=" * 50)
    print("  ĐANG BẮT ĐẦU XỬ LÝ & NÉN ẢNH...")
    print("=" * 50)

    first_rel_url = ""

    for idx, fpath in enumerate(raw_files, start=1):
        suffix = f"-{idx}" if len(raw_files) > 1 else ""
        if role_name:
            out_name = f"{base_name}-{role_name}{suffix}.webp"
        else:
            out_name = f"{base_name}{suffix}.webp"

        web_target = out_web_dir / out_name
        cloud_target = out_cloud_dir / out_name

        try:
            with Image.open(fpath) as img:
                if img.mode in ("RGBA", "LA", "P"):
                    bg = Image.new("RGB", img.size, (255, 255, 255))
                    bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
                    img = bg
                elif img.mode != "RGB":
                    img = img.convert("RGB")

                # Xóa sạch 100% metadata AI, C2PA, Prompt, ComfyUI parameters
                processed = resize_and_crop(img, target_w, target_h)
                clean_img = Image.new("RGB", processed.size, (255, 255, 255))
                clean_img.paste(processed)

                # Lưu vào public/images (xem offline) thuần pixel
                clean_img.save(str(web_target), "WEBP", quality=85, method=6)
                # Lưu bản sao sang D:\Anh_Cloud_R2_RentACarVietnam
                shutil.copy2(web_target, cloud_target)

            kb = web_target.stat().st_size / 1024
            rel_url = f"/images/{dest_folder}/{out_name}"
            if not first_rel_url:
                first_rel_url = rel_url

            print(f"  [OK] {out_name} ({kb:.1f} KB)")
            print(f"       -> Web: {rel_url}")
            print(f"       -> Lưu ổ D: {cloud_target}")

        except Exception as e:
            print(f"  [LỖI] Không thể xử lý {Path(fpath).name}: {e}")

    # Tự động cập nhật JSON nếu có
    if name_mode == "1":
        if cat_choice == "1" and first_rel_url:
            update_vehicles_json(base_name, role_name, first_rel_url)
        elif cat_choice == "2" and first_rel_url:
            update_routes_json(base_name, first_rel_url)

    print("\n" + "=" * 50)
    print("  HOÀN TẤT XỬ LÝ ẢNH!")
    print(f"  * Xem Offline 100%: public/images/{dest_folder}/")
    print(f"  * Lưu trữ máy tính: D:\\Anh_Cloud_R2_RentACarVietnam\\{dest_folder}\\")
    print("=" * 50)

    # Đồng bộ R2
    if RCLONE_EXE.exists():
        sync_r2 = input(f"\n👉 Bạn có muốn ĐỒNG BỘ LUÔN lên Cloudflare R2 ({R2_REMOTE_BUCKET}) không? (y/n, mặc định y): ").strip().lower()
        if sync_r2 != 'n':
            print(f"\n☁️ Đang đồng bộ D:\\Anh_Cloud_R2_RentACarVietnam lên {R2_REMOTE_BUCKET} ...")
            try:
                cmd = [
                    str(RCLONE_EXE), "sync",
                    str(CLOUD_BACKUP_DIR),
                    R2_REMOTE_BUCKET,
                    "--progress"
                ]
                subprocess.run(cmd, check=True)
                print("\n[THÀNH CÔNG] Dữ liệu ảnh đã được đồng bộ lên Cloudflare R2!")
            except Exception as e:
                print(f"[CẢNH BÁO] Lỗi rclone: {e}")

    # Dọn dẹp photos-raw
    clean = input("\nBạn có muốn XÓA ảnh trong photos-raw/ để lần sau thả ảnh mới vào không? (y/n, mặc định n): ").strip().lower()
    if clean == 'y':
        for f in raw_files:
            try:
                os.remove(f)
            except:
                pass
        print("[OK] Đã dọn dẹp thư mục photos-raw/.")

    # Mở thư mục kết quả
    os.system(f'explorer "{out_web_dir}"')

if __name__ == "__main__":
    main()
