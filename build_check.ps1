Set-Location 'c:\Users\ippeu\OneDrive\Desktop\새 폴더'
$env:NEXT_TELEMETRY_DISABLED = '1'
npx next build
Write-Host "BUILD_EXIT_CODE:$LASTEXITCODE"
