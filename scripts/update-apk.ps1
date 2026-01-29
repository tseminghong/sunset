# ICT Revision Hub - APK Update Script
# This script builds the Android APK and copies it to the public folder

Write-Host "`n=== ICT Revision Hub - APK Update ===" -ForegroundColor Cyan
Write-Host "Version: 1.1.0`n" -ForegroundColor Yellow

# Step 1: Build Android APK
Write-Host "[1/5] Building Android APK..." -ForegroundColor Cyan
Set-Location android
$buildResult = .\gradlew assembleDebug 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: APK build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "✓ APK built successfully" -ForegroundColor Green

# Step 2: Copy APK to public folder
Write-Host "`n[2/5] Copying APK to public folder..." -ForegroundColor Cyan
$apkSource = "android\app\build\outputs\apk\debug\app-debug.apk"
$apkDest = "public\ict-v1.1.0.apk"

if (Test-Path $apkSource) {
    Copy-Item $apkSource -Destination $apkDest -Force
    $fileSize = [math]::Round((Get-Item $apkDest).Length / 1MB, 2)
    Write-Host "✓ APK copied: $apkDest ($fileSize MB)" -ForegroundColor Green
} else {
    Write-Host "Error: Source APK not found at $apkSource" -ForegroundColor Red
    exit 1
}

# Step 3: Remove old APK (optional)
Write-Host "`n[3/5] Checking for old APK..." -ForegroundColor Cyan
if (Test-Path "public\ict-v1.0.0.apk") {
    $response = Read-Host "Remove old APK (ict-v1.0.0.apk)? (y/n)"
    if ($response -eq 'y') {
        Remove-Item "public\ict-v1.0.0.apk"
        Write-Host "✓ Old APK removed" -ForegroundColor Green
    }
} else {
    Write-Host "✓ No old APK to remove" -ForegroundColor Green
}

# Step 4: Build website
Write-Host "`n[4/5] Building website..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Website build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Website built successfully" -ForegroundColor Green

# Step 5: Sync to Android app
Write-Host "`n[5/5] Syncing to Android app..." -ForegroundColor Cyan
npx cap sync android
Write-Host "✓ Synced to Android" -ForegroundColor Green

# Summary
Write-Host "`n=== Update Complete! ===" -ForegroundColor Cyan
Write-Host "`nAPK Details:" -ForegroundColor Yellow
Write-Host "  Location: $apkDest"
Write-Host "  Size: $fileSize MB"
Write-Host "  Download URL: /ict-v1.1.0.apk"
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "  1. Test the APK on a device"
Write-Host "  2. Commit changes: git add . && git commit -m 'Update APK to v1.1.0'"
Write-Host "  3. Deploy to production"
Write-Host "  4. Test download from website"
Write-Host "`nDone! 🎉" -ForegroundColor Green
