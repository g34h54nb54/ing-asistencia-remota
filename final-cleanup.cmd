@echo off
sc stop RustDesk
sc delete RustDesk
taskkill /F /IM rustdesk.exe
rmdir /S /Q "C:\Program Files\RustDesk"
rmdir /S /Q "C:\Users\Yeyian Gaming\ing-remote-support"
echo done>"C:\Users\Yeyian Gaming\ing-cleanup-empty\cleanup-complete.txt"
schtasks /Delete /TN INGFinalCleanup /F