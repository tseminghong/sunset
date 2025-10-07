# 🚀 Quick Start - Android App Build

## ⚡ Fast Track (5 Steps)

### 1️⃣ Prerequisites
- ✅ Install [Android Studio](https://developer.android.com/studio)
- ✅ Set JAVA_HOME environment variable
- ✅ Already done: `npm install` (Capacitor installed)

### 2️⃣ Build Web App
```bash
npm run build
```

### 3️⃣ Add Android (Already Done!)
```bash
npm run android:add
```
✅ This creates the `android/` folder

### 4️⃣ Open in Android Studio
```bash
npm run android:open
```

### 5️⃣ Build APK
In Android Studio:
1. Wait for Gradle sync
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Find APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔄 Update Workflow (After Code Changes)

```bash
# 1. Build + Sync in one command
npm run android:sync

# 2. Open Android Studio
npm run android:open

# 3. Run on device/emulator (or use Run button in Android Studio)
```

---

## 📱 Test on Device

### Via USB:
1. Enable **Developer Options** on phone (tap Build Number 7 times)
2. Enable **USB Debugging**
3. Connect phone via USB
4. In Android Studio, click ▶️ **Run**

### Via Emulator:
1. In Android Studio: **Tools** → **Device Manager**
2. Create Virtual Device
3. Click ▶️ **Run**

---

## 📦 What You Have Now

```
sunset/
├── android/              # ✅ Native Android project (NEW!)
│   ├── app/
│   │   └── build/outputs/apk/  # Your APK will be here
│   └── build.gradle
├── out/                  # ✅ Built web app
├── capacitor.config.ts   # ✅ Capacitor config
└── package.json          # ✅ Updated with mobile scripts
```

---

## 🎯 Current Status

✅ **Capacitor configured**: `com.hpccss.ict` (Package ID)  
✅ **App name**: "ICT Revision Hub"  
✅ **Android platform**: Added successfully  
✅ **Build scripts**: Ready to use  
✅ **Static export**: Working (output: 'export')  

---

## 🛠️ Useful Commands

| Command | What it does |
|---------|--------------|
| `npm run android:add` | Adds Android platform (done once) |
| `npm run android:sync` | Builds web + copies to Android |
| `npm run android:open` | Opens project in Android Studio |
| `npm run android:run` | Builds + runs on device |
| `npm run mobile:build` | Just builds without opening |

---

## 🎨 Customize Your App

### Change App Name
**File**: `android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">Your App Name</string>
```

### Add App Icon
Replace icons in:
- `android/app/src/main/res/mipmap-*dpi/`

Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) to generate icons

### Change Splash Screen
Replace: `android/app/src/main/res/drawable/splash.png`

---

## ⚠️ Common Issues

### "SDK location not found"
Create `android/local.properties`:
```
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### Blank screen in app
Make sure `capacitor.config.ts` has:
```typescript
webDir: 'out'
```

### Gradle errors
```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

---

## 📚 Full Documentation
See `ANDROID_BUILD_GUIDE.md` for complete instructions

---

## 💡 Next Steps

1. Open Android Studio: `npm run android:open`
2. Wait for Gradle sync (first time takes 5-10 minutes)
3. Click green ▶️ **Run** button
4. Select device/emulator
5. Test your app! 🎉

**Need help?** Check `ANDROID_BUILD_GUIDE.md` for troubleshooting
