# 🔐 APK Signing Guide

## Your APK Needs Signing!

The release APK at `android/app/build/outputs/apk/release/app-release.apk` is **unsigned** and cannot be installed.

---

## 🚀 Quick Solution: Build Debug APK (For Testing)

```powershell
cd android
.\gradlew assembleDebug
```

**Output:** `android\app\build\outputs\apk\debug\app-debug.apk`  
✅ Automatically signed  
✅ Ready to install  
✅ Perfect for testing  

---

## 📦 Proper Signing (For Production/Play Store)

### Step 1: Generate Signing Key

```powershell
# Run from android/app folder
cd android\app

keytool -genkey -v -keystore release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be asked for:
- **Keystore password** (remember this!)
- **Your name**
- **Organization**
- **City, State, Country**

**⚠️ IMPORTANT:** Keep `release-key.keystore` safe! You'll need it for all future updates.

---

### Step 2: Configure Gradle Signing

**Option A: Using gradle.properties (Secure)**

Create/edit `android/gradle.properties`:
```properties
RELEASE_STORE_FILE=app/release-key.keystore
RELEASE_STORE_PASSWORD=your-keystore-password
RELEASE_KEY_ALIAS=my-key-alias
RELEASE_KEY_PASSWORD=your-key-password
```

Then edit `android/app/build.gradle`, add inside `android {}` block:

```gradle
signingConfigs {
    release {
        storeFile file(RELEASE_STORE_FILE)
        storePassword RELEASE_STORE_PASSWORD
        keyAlias RELEASE_KEY_ALIAS
        keyPassword RELEASE_KEY_PASSWORD
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

**Option B: Direct Configuration (Less Secure)**

Edit `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('release-key.keystore')
            storePassword 'YOUR_PASSWORD_HERE'
            keyAlias 'my-key-alias'
            keyPassword 'YOUR_PASSWORD_HERE'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

### Step 3: Build Signed Release APK

```powershell
cd android
.\gradlew assembleRelease
```

**Output:** `android\app\build\outputs\apk\release\app-release.apk`  
✅ Signed and ready!  
✅ Can be uploaded to Play Store  
✅ Can be installed on any device  

---

## 🎯 Recommended Workflow

### For Testing:
```powershell
.\gradlew assembleDebug
# Install: android\app\build\outputs\apk\debug\app-debug.apk
```

### For Distribution:
1. Generate keystore (once)
2. Configure signing
3. Build release:
   ```powershell
   .\gradlew assembleRelease
   ```
4. Test the signed APK
5. Upload to Play Store

---

## 📦 Alternative: Build Signed APK via Android Studio

1. Open Android Studio: `npm run android:open`
2. Go to **Build** → **Generate Signed Bundle / APK**
3. Select **APK**
4. Click **Create new...** to generate keystore
5. Fill in details and passwords
6. Choose **release** build type
7. Click **Finish**

Android Studio will:
- Generate keystore
- Sign your APK
- Show you the location

---

## 🔍 Verify Your APK

### Check if APK is signed:
```powershell
# From android folder
jarsigner -verify -verbose -certs app\build\outputs\apk\release\app-release.apk
```

Should show: `jar verified.`

### Check APK info:
```powershell
# From android/app/build/outputs/apk/release
aapt dump badging app-release.apk
```

---

## ⚠️ Security Notes

1. **Never commit keystore files** to Git
   - Add to `.gitignore`:
     ```
     *.keystore
     *.jks
     gradle.properties
     ```

2. **Backup your keystore** safely
   - Store in password manager
   - Keep offline backup
   - You CANNOT recover it if lost!

3. **Use different keys** for debug and release

---

## 📱 Install APK on Device

### Via USB:
```powershell
adb install path\to\app-debug.apk
```

### Via File Transfer:
1. Copy APK to phone
2. Open file manager on phone
3. Tap APK file
4. Allow "Install from unknown sources" if prompted
5. Install

---

## 🎓 Summary

| APK Type | Command | Signed? | Use For |
|----------|---------|---------|---------|
| **Debug** | `.\gradlew assembleDebug` | ✅ Auto | Testing |
| **Release (unsigned)** | `.\gradlew assembleRelease` | ❌ No | N/A |
| **Release (signed)** | Configure + `assembleRelease` | ✅ Yes | Distribution |

---

## ✅ Quick Fix (Get Testing Now!)

```powershell
cd android
.\gradlew assembleDebug
```

Then install: `android\app\build\outputs\apk\debug\app-debug.apk`

Done! 🎉
