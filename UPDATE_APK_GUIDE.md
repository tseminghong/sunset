# 📱 Update APK on Website

## Current Status

✅ Website updated to serve: `ict-v1.1.0.apk`  
✅ Download link: `/ict-v1.1.0.apk`  
📁 Old APK: `public/ict-v1.0.0.apk` (can be removed)

---

## 🚀 How to Update the APK

### Step 1: Build the APK

Choose one:

**For Testing/Quick Distribution (Recommended):**
```powershell
cd android
.\gradlew assembleDebug
```
Output: `android\app\build\outputs\apk\debug\app-debug.apk`

**For Production/Play Store:**
```powershell
cd android
.\gradlew assembleRelease
```
Output: `android\app\build\outputs\apk\release\app-release.apk` (must be signed first!)

---

### Step 2: Copy APK to Public Folder

**From project root:**

```powershell
# For debug APK (recommended):
Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" -Destination "public\ict-v1.1.0.apk"

# For release APK:
Copy-Item "android\app\build\outputs\apk\release\app-release.apk" -Destination "public\ict-v1.1.0.apk"
```

---

### Step 3: Remove Old APK (Optional)

```powershell
Remove-Item "public\ict-v1.0.0.apk"
```

---

### Step 4: Rebuild Website

```powershell
npm run build
```

---

### Step 5: Sync to Android App

```powershell
npm run android:sync
```

---

## 🔄 Complete Update Process (One Command)

Create a PowerShell script to automate this:

**File: `update-apk.ps1`**
```powershell
# Build debug APK
Write-Host "Building APK..." -ForegroundColor Cyan
cd android
.\gradlew assembleDebug
cd ..

# Copy to public folder
Write-Host "Copying APK to public folder..." -ForegroundColor Cyan
Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" -Destination "public\ict-v1.1.0.apk" -Force

# Rebuild website
Write-Host "Building website..." -ForegroundColor Cyan
npm run build

# Sync to Android
Write-Host "Syncing to Android..." -ForegroundColor Cyan
npm run android:sync

Write-Host "Done! APK updated." -ForegroundColor Green
Write-Host "APK Location: public\ict-v1.1.0.apk" -ForegroundColor Yellow
Write-Host "Download URL: https://your-site.com/ict-v1.1.0.apk" -ForegroundColor Yellow
```

**Run it:**
```powershell
.\update-apk.ps1
```

---

## 📦 Quick Commands

### Just Copy the APK:
```powershell
# From project root:
Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" -Destination "public\ict-v1.1.0.apk"
```

### Rebuild Everything:
```powershell
npm run build && npm run android:sync
```

---

## 🎯 APK Version History

| Version | Date | Location | Notes |
|---------|------|----------|-------|
| v1.0.0 | - | `public/ict-v1.0.0.apk` | Original version |
| v1.1.0 | Oct 2025 | `public/ict-v1.1.0.apk` | Capacitor build, GSAP animations |

---

## 🌐 Download URL

After deploying, users can download from:
```
https://your-domain.com/ict-v1.1.0.apk
```

Or via the hero section button that triggers the download automatically.

---

## 📊 File Sizes

| Build Type | Typical Size |
|------------|--------------|
| Debug APK | 5-8 MB |
| Release APK (unsigned) | 4-6 MB |
| Release APK (signed) | 4-6 MB |

---

## ⚠️ Important Notes

1. **Debug vs Release:**
   - Use **debug** for quick distribution/testing
   - Use **signed release** for Play Store or public distribution

2. **Version Numbers:**
   - Update filename when releasing new version
   - Update HeroSection.tsx href to match
   - Keep version numbers consistent

3. **Git:**
   - APK files in `public/` will be committed to Git
   - If APK is large (>50MB), consider:
     - Using Git LFS
     - Hosting on external CDN
     - Using GitHub Releases

4. **Deployment:**
   - Vercel/Netlify will serve files from `public/` automatically
   - No special configuration needed

---

## 🔧 Troubleshooting

### APK not downloading?
- Check if file exists: `ls public\ict-v1.1.0.apk`
- Check file size: `(Get-Item public\ict-v1.1.0.apk).Length / 1MB` should be > 1MB
- Rebuild: `npm run build`

### Users can't install?
- Make sure using **debug** APK (auto-signed) or **signed release** APK
- Unsigned release APKs cannot be installed!

### Download link broken?
- Check HeroSection.tsx has correct path: `/ict-v1.1.0.apk`
- Check file is in `public/` folder
- Clear browser cache

---

## ✅ Checklist

Before releasing new version:

- [ ] Build APK (`.\gradlew assembleDebug` or signed release)
- [ ] Copy to `public/` with new version number
- [ ] Update `HeroSection.tsx` href to match filename
- [ ] Test APK installs on device
- [ ] Run `npm run build`
- [ ] Test download works locally
- [ ] Commit and deploy
- [ ] Test download works on production
- [ ] Update version history in this document

---

## 🎓 Next Version Update

When releasing v1.2.0:

1. Update HeroSection.tsx:
   ```tsx
   href="/ict-v1.2.0.apk"
   ```

2. Copy new APK:
   ```powershell
   Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" -Destination "public\ict-v1.2.0.apk"
   ```

3. Remove old APK (optional):
   ```powershell
   Remove-Item "public\ict-v1.1.0.apk"
   ```

4. Rebuild and deploy
