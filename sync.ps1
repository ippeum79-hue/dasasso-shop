$gh = "C:\Users\ippeu\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe"
$token = (& $gh auth token).Trim()
$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"

& $git add .
& $git commit -m "feat: Complete Checkout, PG Payments integration, and Fail page"
& $git remote set-url origin "https://${token}@github.com/ippeum79-hue/dasasso-shop.git"
& $git push origin main
& $git remote set-url origin "https://github.com/ippeum79-hue/dasasso-shop.git"
Write-Host "SYNC_SUCCESS"
