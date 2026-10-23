@echo off
title DONG BO ANH CLOUDFLARE R2 - HANOI CAR AND BUS
chcp 65001 > nul
cd /d "%~dp0"

echo ====================================================================
echo   ☁️ ĐỒNG BỘ ẢNH LÊN CLOUDFLARE R2 (BUCKET: hanoi-car-and-bus)
echo   Nguồn: D:\Anh_Cloud_R2_RentACarVietnam
echo ====================================================================
echo.

"F:\Cac-Du-An-Lap-Trinh\Xu-ly-anh-v2\bin\rclone.exe" sync "D:\Anh_Cloud_R2_RentACarVietnam" "r2-rentacar:hanoi-car-and-bus" --progress --transfers 16 --checkers 32

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================================
    echo   [THÀNH CÔNG] Toàn bộ ảnh đã được cập nhật lên Cloudflare R2!
    echo ====================================================================
) else (
    echo.
    echo [LỖI] Quá trình upload gặp sự cố.
)

pause
