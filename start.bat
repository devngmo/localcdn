@cls
@echo off
echo -----------------------
echo Local CDN
echo -----------------------

%windir%\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy ByPass -NoExit -Command "& 'C:\apps\anaconda3\shell\condabin\conda-hook.ps1' ; conda activate 'C:\apps\anaconda3\envs\WEB_SERVER';cd 'D:\servers\localcdn'; python cors_server.py 8000"

