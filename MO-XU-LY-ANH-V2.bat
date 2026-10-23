@echo off
title KHOI DONG XU LY ANH V2 - GIAO DIEN WEB
chcp 65001 > nul

echo ====================================================================
echo   🚗 ĐANG MỞ CÔNG CỤ XỬ LÝ ẢNH V2 CHO RENT A CAR VIETNAM
echo ====================================================================
echo.
echo * Thu muc luu anh OFFLINE cho web rentacarvietnam:
echo   - Xe:      F:\Cac-Du-An-Lap-Trinh\rentacarvietnam\public\images\vehicles
echo   - Tuyen:   F:\Cac-Du-An-Lap-Trinh\rentacarvietnam\public\images\routes
echo   - Dich vu: F:\Cac-Du-An-Lap-Trinh\rentacarvietnam\public\images\services
echo.
echo * Trinh duyet web se tu dong bat tai: http://127.0.0.1:5000
echo.

cd /d "F:\Cac-Du-An-Lap-Trinh\Xu-ly-anh-v2"
call run.bat
