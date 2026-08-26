$ErrorActionPreference='SilentlyContinue'
Stop-Service RustDesk -Force
sc.exe delete RustDesk | Out-Null
Get-Process rustdesk,ingremote,hoptodesk,cargo,rustc,flutter,cmake,msbuild -ErrorAction SilentlyContinue | Stop-Process -Force
$products=Get-CimInstance Win32_Product | Where-Object {$_.Name -like 'RustDesk*'}
foreach($p in $products){Start-Process msiexec.exe -ArgumentList "/x $($p.IdentifyingNumber) /qn /norestart" -Wait}
Remove-Item 'C:\Program Files\RustDesk' -Recurse -Force
Remove-Item 'C:\Users\Yeyian Gaming\ing-remote-support' -Recurse -Force
$vs='C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe'
if(Test-Path $vs){Start-Process $vs -ArgumentList 'uninstall --installPath "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools" --quiet --norestart' -Wait}
Remove-Item 'C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools' -Recurse -Force
Set-Content 'C:\Users\Yeyian Gaming\ing-cleanup-empty\cleanup-complete.txt' 'done'