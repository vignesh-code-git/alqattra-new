@echo off
echo ========================================================
echo  Starting Al Qattara Water CRM - Django Backend
echo ========================================================
cd /d "%~dp0backend"
call env\Scripts\activate.bat
python manage.py runserver 0.0.0.0:8000
pause
