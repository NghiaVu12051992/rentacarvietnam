import os
from PIL import Image

images = [
    {
        "src": "photos-raw/1.jpg",
        "slug": "16-seater-van-ford-transit-exterior-high-roof.webp",
        "title": "White Ford Transit High-Roof Exterior 3/4 View",
    },
    {
        "src": "photos-raw/2.jpg",
        "slug": "16-seater-van-ford-transit-driver-cockpit.webp",
        "title": "Ford Transit Driver Cockpit and Boarding Entrance",
    },
    {
        "src": "photos-raw/3.jpg",
        "slug": "16-seater-van-ford-transit-passenger-cabin-interior.webp",
        "title": "Ford Transit Passenger Cabin with Reclining Leather Seats",
    },
    {
        "src": "photos-raw/4.jpg",
        "slug": "16-seater-van-ford-transit-cabin-leather-reclining-seats.webp",
        "title": "Ford Transit Luxury Reclining Seats with Armrests and Safety Belts",
    },
    {
        "src": "photos-raw/5.jpg",
        "slug": "16-seater-van-ford-transit-luggage-trunk-space.webp",
        "title": "Ford Transit Rear Luggage Compartment and Trunk Space",
    },
]

public_dir = "public/images/vehicles"
backup_dir = "D:/Anh_Cloud_R2_RentACarVietnam/vehicles"

os.makedirs(public_dir, exist_ok=True)
os.makedirs(backup_dir, exist_ok=True)

for item in images:
    raw_path = item["src"]
    slug = item["slug"]
    
    with Image.open(raw_path) as img:
        # Convert to RGB
        img_rgb = img.convert("RGB")
        
        # Strip all AI and camera metadata by copying raw pixel buffer onto fresh image
        fresh_img = Image.new("RGB", img_rgb.size)
        fresh_img.putdata(list(img_rgb.getdata()))
        
        # Destinations
        dest_public = os.path.join(public_dir, slug)
        dest_backup = os.path.join(backup_dir, slug)
        
        # Save as WebP with high quality, zero metadata
        fresh_img.save(dest_public, format="WEBP", quality=88, method=6)
        fresh_img.save(dest_backup, format="WEBP", quality=88, method=6)
        
        print(f"Processed: {raw_path} -> {slug} ({fresh_img.size[0]}x{fresh_img.size[1]})")
        print(f"  Saved public: {dest_public} ({os.path.getsize(dest_public)} bytes)")
        print(f"  Saved backup: {dest_backup} ({os.path.getsize(dest_backup)} bytes)")

print("\nAll 5 images successfully processed and stripped of metadata!")
