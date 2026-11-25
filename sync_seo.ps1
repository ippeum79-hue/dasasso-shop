$gh = "C:\Users\ippeu\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe"
$token = (& $gh auth token).Trim()
$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"

& $git add .
& $git commit -m "feat(seo): Add Naver search advisor metadata, robots.txt and dynamic sitemap.xml for wooselect.com"
& $git remote set-url origin "https://${token}@github.com/ippeum79-hue/dasasso-shop.git"
& $git push origin main
& $git remote set-url origin "https://github.com/ippeum79-hue/dasasso-shop.git"
Write-Host "SEO_PUSH_SUCCESS"
