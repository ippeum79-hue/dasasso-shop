Remove-Item -Path .\install_git.ps1 -Force -ErrorAction SilentlyContinue
$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"

& $git init
& $git config user.name "ippeum79-hue"
& $git config user.email "ippeum79-hue@users.noreply.github.com"
& $git branch -M main
& $git add .
& $git status --short
& $git commit -m "feat: Initial commit for DASASSO flagship store"
& $git remote remove origin 2>$null
& $git remote add origin "https://github.com/ippeum79-hue/dasasso-shop.git"
& $git remote -v
