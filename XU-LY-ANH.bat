@echo off
title XU LY ANH CHUAN SEO - RENT A CAR VIETNAM
chcp 65001 > nul
cd /d "%~dp0"

echo ====================================================================
echo   🚗 ĐANG KHỞI ĐỘNG BỘ XỬ LÝ ẢNH - RENT A CAR VIETNAM
echo ====================================================================
echo.

python "%~dp0tools\image_processor.py"

pause
