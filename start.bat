@cls
@echo off
echo -----------------------
echo Local CDN
echo -----------------------


rem python -m http.server 8000 --bind 127.0.0.1
python cors_server.py 8000