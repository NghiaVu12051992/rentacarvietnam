#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CONG CU XU LY & DONG BO ANH CHUYEN NGHIEP CHO RENTACARVIETNAM
- Chuyen doi & toi uu sang WebP chuan SEO Google Image
- Dat ten chuan SEO (Latin slugs, khong dau)
- Luu vao public/images de XEM OFFLINE 100% tren may tinh
- Tu dong cap nhat duong dan vao file du lieu JSON (vehicles.json, routes.json...)
- Tuy chon dong bo len Cloudflare R2 bang Rclone
"""

import os
import sys
import json
import re
import glob
import subprocess
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = BASE_DIR / "photos-raw"
PUBLIC_IMAGES_DIR = BASE_DIR / "public" / "images"
RCLONE_EXE = Path("F:/Cac-Du-An-Lap-Trinh/Xu-ly-anh-v2/bin/rclone.exe")

TARGET_SIZES = {
    "1": ("Ngang 3:2 (1200 x 800) - Chuan anh xe & tuyen duong", 1200, 800),
    "2": ("Ngang 16:9 (1200 x 675) - Chuan Banner & Video", 1200, 675),
    "3": ("Doc 2:3 (800 x 1200) - Chuan anh doc / Story", 800, 1200),
    "4": ("Vuong 1:1 (1000 x 1000) - Chuan Avatar / Chi tiet", 1000, 1000),
    "5": ("Giu nguyen ty le goc (Toi da chieu rong 1400px)", 1400, None)
}

VEHICLE_OPTIONS = {
    "1": ("16-seater-van", "16-Seater Van (Ford Transit & Hyundai Solati)"),
    "2": ("7-seater-car", "7-Seater SUV (Toyota Veloz & Mitsubishi Xpander)"),
    "3": ("29-seater-bus", "29-Seater Tourist Bus (Thaco & County)"),
    "4": ("35-seater-bus", "35-Seater Bus (Samco & Universe)"),
    "5": ("45-seater-coach", "45-Seater Coach (Hyundai Universe)"),
    "6": ("9-seater-limousine", "9-Seater VIP DCar Limousine")
}

ROUTE_OPTIONS = {
    "1": ("hanoi-to-sapa", "Hanoi to Sapa (Cao toc CT05)"),
    "2": ("hanoi-to-halong-bay", "Hanoi to Halong Bay (Cao toc 5B)"),
    "3": ("hanoi-to-ninh-binh", "Hanoi to Ninh Binh (Trang An / Tam Coc)"),
    "4": ("hanoi-to-ha-giang", "Hanoi to Ha Giang Loop")
}

IMAGE_ROLES = {
    "1": ("main-exterior", "Anh dai dien ngoai that chinh (Main Exterior)"),
    "2": ("interior-seats", "Noi that khoang hanh khach & ghe ngoi (Interior Seats)"),
    "3": ("luggage-trunk", "Khoang hanh ly / cop de vali (Luggage Trunk)"),
    "4": ("driver-cockpit", "Khoang lai & tai xe (Driver Cockpit)"),
    "5": ("side-profile", "Goc nghieng xe / doc duong (Side Profile)"),
    "6": ("custom", "Tu go mo ta rieng...")
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
    print("=" * 65)
    print("  🚗 BO XU LY ANH CHUAN SEO & DONG BO CLOUD - RENTACARVIETNAM")
    print("=" * 65)
    print("  * Xem Offline 100% tren localhost (khong can mang)")
    print("  * Nen WebP sieu nhe (<150KB), dat ten chuan SEO tieng Anh")
    print("  * Tu dong cap nhat vao giao dien web & ho tro day len R2")
    print("=" * 65 + "\n")

def get_raw_images():
    extensions = ("*.jpg", "*.jpeg", "*.png", "*.webp", "*.bmp", "*.JPG", "*.JPEG", "*.PNG", "*.WEBP")
    files = []
    for ext in extensions:
        files.extend(glob.glob(str(RAW_DIR / ext)))
    return sorted(files)

def resize_and_crop(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    if target_h is None:
        # Giu nguyen ti le
        w, h = img.size
        if w > target_w:
            new_h = int(h * (target_w / w))
            return img.resize((target_w, new_h), Image.Resampling.LANCZOS)
        return img

    target_ratio = target_w / target_h
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        # Anh rong hon -> Crop 2 ben
        new_width = int(img.height * target_ratio)
        offset = (img.width - new_width) // 2
        img_cropped = img.crop((offset, 0, offset + new_width, img.height))
    else:
        # Anh cao hon -> Crop tren/duoi
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
            print(f"  [OK] Da tu dong cap nhat link anh vao src/data/vehicles.json cho xe: {vehicle_slug}")
    except Exception as e:
        print(f"  [CANH BAO] Khong the ghi vehicles.json: {e}")

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
            print(f"  [OK] Da tu dong cap nhat link anh vao src/data/routes.json cho tuyen: {route_slug}")
    except Exception as e:
        print(f"  [CANH BAO] Khong the ghi routes.json: {e}")

def main():
    print_banner()

    raw_files = get_raw_images()
    if not raw_files:
        print(f"👉 Vui long tha anh can xu ly vao thu muc:")
        print(f"   {RAW_DIR}\n")
        input("Nhan Enter sau khi da tha anh vao...")
        raw_files = get_raw_images()
        if not raw_files:
            print("[THONG BAO] Chua co anh nao trong photos-raw. Thoat chuong trinh.")
            sys.exit(0)

    print(f"Tim thay {len(raw_files)} anh trong thu muc photos-raw/\n")

    print("--- BUOC 1: CHON DANH MUC ANH ---")
    print("  [1] Anh xe du lich (Vehicles - 7, 16, 29, 35, 45 cho)")
    print("  [2] Anh tuyen duong (Routes - Sapa, Halong, Ninh Binh, Ha Giang)")
    print("  [3] Anh dich vu & dua don san bay (Services)")
    print("  [4] Anh Banner / Trang chu / Gioi thieu (Banners)")
    category_choice = input("Chon danh muc (1-4, mac dinh 1): ").strip() or "1"

    dest_folder = "vehicles"
    slug_prefix = "car"
    role_name = "main"

    if category_choice == "1":
        dest_folder = "vehicles"
        print("\n--- CHON DONG XE ---")
        for k, v in VEHICLE_OPTIONS.items():
            print(f"  [{k}] {v[1]}")
        car_choice = input("Chon xe (1-6, mac dinh 1): ").strip() or "1"
        slug_prefix = VEHICLE_OPTIONS.get(car_choice, VEHICLE_OPTIONS["1"])[0]

        print("\n--- CHON VI TRI / GOC ANH ---")
        for k, v in IMAGE_ROLES.items():
            print(f"  [{k}] {v[1]}")
        role_choice = input("Chon vi tri (1-6, mac dinh 1): ").strip() or "1"
        if role_choice == "6":
            custom_role = input("Nhap mo ta ngan (vd: cop-xe, man-hinh-tv): ").strip()
            role_name = to_slug(custom_role) or "detail"
        else:
            role_name = IMAGE_ROLES.get(role_choice, IMAGE_ROLES["1"])[0]

    elif category_choice == "2":
        dest_folder = "routes"
        print("\n--- CHON TUYEN DUONG ---")
        for k, v in ROUTE_OPTIONS.items():
            print(f"  [{k}] {v[1]}")
        route_choice = input("Chon tuyen (1-4, mac dinh 1): ").strip() or "1"
        slug_prefix = ROUTE_OPTIONS.get(route_choice, ROUTE_OPTIONS["1"])[0]
        custom_desc = input("Nhap mo ta canh/diem den (vd: expressway, hotel-dropoff): ").strip()
        role_name = to_slug(custom_desc) or "scenery"

    elif category_choice == "3":
        dest_folder = "services"
        slug_prefix = "service"
        custom_desc = input("Nhap ten dich vu (vd: airport-transfer, chauffeur): ").strip()
        role_name = to_slug(custom_desc) or "intro"

    else:
        dest_folder = "banners"
        slug_prefix = "hero"
        custom_desc = input("Nhap mo ta (vd: homepage-fleet, about-team): ").strip()
        role_name = to_slug(custom_desc) or "banner"

    print("\n--- BUOC 2: CHON KICH THUOC & TI LE XUAT ---")
    for k, v in TARGET_SIZES.items():
        print(f"  [{k}] {v[0]}")
    size_choice = input("Chon ti le (1-5, mac dinh 1): ").strip() or "1"
    _, target_w, target_h = TARGET_SIZES.get(size_choice, TARGET_SIZES["1"])

    out_dir = PUBLIC_IMAGES_DIR / dest_folder
    out_dir.mkdir(parents=True, exist_ok=True)

    print("\n" + "=" * 50)
    print("  DANG BAT DAU NEN & XU LY ANH...")
    print("=" * 50)

    first_relative_url = ""

    for idx, fpath in enumerate(raw_files, start=1):
        suffix = f"-{idx}" if len(raw_files) > 1 else ""
        out_filename = f"{slug_prefix}-{role_name}{suffix}.webp"
        out_file = out_dir / out_filename

        try:
            with Image.open(fpath) as img:
                # Convert RGBA / CMYK to RGB
                if img.mode in ("RGBA", "LA", "P"):
                    bg = Image.new("RGB", img.size, (255, 255, 255))
                    bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
                    img = bg
                elif img.mode != "RGB":
                    img = img.convert("RGB")

                # Resize & crop
                processed = resize_and_crop(img, target_w, target_h)

                # Save as WebP
                processed.save(str(out_file), "WEBP", quality=85, method=6)

            file_size_kb = out_file.stat().st_size / 1024
            rel_url = f"/images/{dest_folder}/{out_filename}"
            if not first_relative_url:
                first_relative_url = rel_url

            print(f"  [OK] {out_filename} ({file_size_kb:.1f} KB) -> {rel_url}")

        except Exception as e:
            print(f"  [LOI] Khong the xu ly {Path(fpath).name}: {e}")

    # Cap nhat du lieu JSON
    if category_choice == "1" and first_relative_url:
        update_vehicles_json(slug_prefix, role_name, first_relative_url)
    elif category_choice == "2" and first_relative_url:
        update_routes_json(slug_prefix, first_relative_url)

    print("\n" + "=" * 50)
    print("  HOAN TAT XU LY ANH!")
    print(f"  -> Tat ca anh da duoc luu tai: public/images/{dest_folder}/")
    print("  -> Ban co the F5 xem ngay OFFLINE tren localhost!")
    print("=" * 50)

    # Dong bo R2 tuy chon
    if RCLONE_EXE.exists():
        sync_r2 = input("\nBan co muon dong bo luon sang Cloudflare R2 bang Rclone khong? (y/n, mac dinh n): ").strip().lower()
        if sync_r2 == 'y':
            print("Dang chay Rclone day anh len R2...")
            try:
                cmd = [
                    str(RCLONE_EXE), "copy",
                    str(PUBLIC_IMAGES_DIR),
                    "my-r2:rentacarvietnam-media/images",
                    "--progress"
                ]
                subprocess.run(cmd, check=True)
                print("[THANH CONG] Da dong bo toan bo thu muc anh len Cloudflare R2!")
            except Exception as e:
                print(f"[CANH BAO] Khong the goi rclone: {e}")

    # Don dep photos-raw tuy chon
    clean_raw = input("\nBan co muon XOA anh goc trong photos-raw/ de lan sau cho anh moi vao khong? (y/n, mac dinh n): ").strip().lower()
    if clean_raw == 'y':
        for f in raw_files:
            try:
                os.remove(f)
            except:
                pass
        print("[OK] Da don dep thu muc photos-raw/.")

    # Mo thu muc ket qua
    os.system(f'explorer "{out_dir}"')

if __name__ == "__main__":
    main()
