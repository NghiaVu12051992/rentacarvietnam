#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TOOL PIPELINE TỰ ĐỘNG HÓA XỬ LÝ ẢNH DÀNH CHO AI AGENT & CLI
Hỗ trợ Agent:
- Đặt tên chuẩn SEO (Latin slugs)
- Gắn thẻ Hashtags / Taxonomy metadata
- Xuất WebP xem Offline (public/images/)
- Lưu ổ cứng: D:\\Anh_Cloud_R2_RentACarVietnam
- Đẩy lên Cloudflare R2: r2-rentacar:hanoi-car-and-bus
- Cập nhật trực tiếp vào vehicles.json hoặc routes.json
"""

import os
import sys
import json
import argparse
import shutil
import subprocess
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_IMAGES_DIR = BASE_DIR / "public" / "images"
CLOUD_BACKUP_DIR = Path("D:/Anh_Cloud_R2_RentACarVietnam")
RCLONE_EXE = Path("F:/Cac-Du-An-Lap-Trinh/Xu-ly-anh-v2/bin/rclone.exe")
R2_REMOTE_BUCKET = "r2-rentacar:hanoi-car-and-bus"

TARGET_SIZES = {
    "photo": (1200, 800),     # 3:2
    "video": (1200, 675),     # 16:9
    "portrait": (800, 1200),  # 2:3
    "square": (1000, 1000),   # 1:1
}

def resize_and_crop(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
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

def update_json_reference(category: str, target_slug: str, role: str, relative_url: str):
    if category == "vehicles":
        file_path = BASE_DIR / "src" / "data" / "vehicles.json"
        if not file_path.exists():
            return
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for car in data:
            if car.get("slug") == target_slug:
                if role in ("main", "exterior") or not car.get("image"):
                    car["image"] = relative_url
                elif role == "interior":
                    car["interiorImage"] = relative_url
                elif role == "luggage":
                    car["luggageImage"] = relative_url
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    elif category == "routes":
        file_path = BASE_DIR / "src" / "data" / "routes.json"
        if not file_path.exists():
            return
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for r in data:
            if r.get("slug") == target_slug:
                r["image"] = relative_url
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

def process_single_image(input_path: str, filename: str, category: str, aspect: str = "photo",
                         tags: str = "", target_slug: str = "", role: str = "main", sync_r2: bool = True):
    inp = Path(input_path)
    if not inp.exists():
        print(f"[ERROR] File khong ton tai: {input_path}")
        return False

    w, h = TARGET_SIZES.get(aspect, (1200, 800))
    if not filename.endswith(".webp"):
        filename += ".webp"

    web_out_dir = PUBLIC_IMAGES_DIR / category
    web_out_dir.mkdir(parents=True, exist_ok=True)
    web_target = web_out_dir / filename

    cloud_out_dir = CLOUD_BACKUP_DIR / category
    cloud_out_dir.mkdir(parents=True, exist_ok=True)
    cloud_target = cloud_out_dir / filename

    with Image.open(inp) as img:
        if img.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
            img = bg
        # Xóa sạch 100% metadata AI, C2PA, Prompt và parameters ẩn
        processed = resize_and_crop(img, w, h)
        clean_img = Image.new("RGB", processed.size, (255, 255, 255))
        clean_img.paste(processed)

        # Lưu WebP thuần túy không chứa bất kỳ thẻ AI nào
        clean_img.save(str(web_target), "WEBP", quality=85, method=6)
        shutil.copy2(web_target, cloud_target)

    rel_url = f"/images/{category}/{filename}"
    kb = web_target.stat().st_size / 1024

    print(f"✅ Đã xử lý: {filename} ({kb:.1f} KB)")
    print(f"   * Offline Web: {rel_url}")
    print(f"   * Ổ đĩa D: {cloud_target}")
    if tags:
        print(f"   * Tags / Hashtags: {tags}")

    if target_slug:
        update_json_reference(category, target_slug, role, rel_url)

    if sync_r2 and RCLONE_EXE.exists():
        print(f"☁️ Đang đồng bộ {filename} lên Cloudflare R2 ({R2_REMOTE_BUCKET}/{category}/)...")
        try:
            cmd = [
                str(RCLONE_EXE), "copyto",
                str(cloud_target),
                f"{R2_REMOTE_BUCKET}/{category}/{filename}"
            ]
            subprocess.run(cmd, check=True)
            print(f"🚀 Đồng bộ R2 thành công: {category}/{filename}")
        except Exception as e:
            print(f"⚠️ Lỗi Rclone: {e}")

    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Image pipeline CLI for Hanoi Car & Bus Rental")
    parser.add_argument("--input", required=True, help="Path to input image")
    parser.add_argument("--name", required=True, help="SEO output filename (without .webp)")
    parser.add_argument("--category", default="vehicles", choices=["vehicles", "routes", "services", "banners"])
    parser.add_argument("--aspect", default="photo", choices=["photo", "video", "portrait", "square"])
    parser.add_argument("--tags", default="", help="Hashtags / SEO tags string")
    parser.add_argument("--target-slug", default="", help="Slug in vehicles.json or routes.json to auto-update")
    parser.add_argument("--role", default="main", choices=["main", "interior", "luggage", "cockpit", "side"])
    parser.add_argument("--no-r2", action="store_true", help="Skip R2 upload")

    args = parser.parse_args()
    process_single_image(
        input_path=args.input,
        filename=args.name,
        category=args.category,
        aspect=args.aspect,
        tags=args.tags,
        target_slug=args.target_slug,
        role=args.role,
        sync_r2=not args.no_r2
    )
