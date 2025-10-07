# 📱 Android App Build Guide

This guide explains how to convert your Next.js ICT Revision Hub web app into an Android application.

## 🎯 Approach Used: Capacitor

We're using **Capacitor** (by Ionic) - a modern, cross-platform native runtime that wraps your web app in a native Android container.

---

## ✅ Prerequisites

### 1. **Android Studio**
Download and install [Android Studio](https://developer.android.com/studio)

After installation, open Android Studio and install:
- Android SDK
- Android SDK Platform-Tools
- Android SDK Build-Tools
- Android Emulator (for testing)

### 2. **Java Development Kit (JDK)**
- Install JDK 17 or later
- Set `JAVA_HOME` environment variable

### 3. **Environment Variables**
Add to your system PATH:
```
C:\Users\YourUsername\AppData\Local\Android\Sdk\platform-tools
C:\Users\YourUsername\AppData\Local\Android\Sdk\tools
```

---

## 🚀 Build Steps

### Step 1: Build Next.js Static Export
```bash
npm run build
```
This creates an `out/` folder with your static website.

### Step 2: Add Android Platform
```bash
npm run android:add
```
This creates an `android/` folder with native Android project files.

### Step 3: Sync Web Assets to Android
```bash
npm run android:sync
```
This copies your `out/` folder to the Android project.

### Step 4: Open in Android Studio
```bash
npm run android:open
```
This launches Android Studio with your project.

### Step 5: Build APK in Android Studio

In Android Studio:
1. **Wait for Gradle sync** to complete
2. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for build to complete
4. Click **"locate"** in the notification to find your APK

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Quick Commands

### Development Workflow
```bash
# Sync changes after editing web code
npm run android:sync

# Run on connected device/emulator
npm run android:run
```

### Complete Build
```bash
# Build web app + sync to Android
npm run mobile:build
```

---

## 🎨 Customization

### 1. **App Name & Icon**
Edit `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">ICT Revision Hub</string>
```

Add app icons to:
- `android/app/src/main/res/mipmap-hdpi/`
- `android/app/src/main/res/mipmap-mdpi/`
- `android/app/src/main/res/mipmap-xhdpi/`
- `android/app/src/main/res/mipmap-xxhdpi/`
- `android/app/src/main/res/mipmap-xxxhdpi/`

### 2. **Splash Screen**
Edit `android/app/src/main/res/drawable/splash.png`

### 3. **Package Name**
Already set to: `com.hpccss.ict`

To change, edit:
- `capacitor.config.ts` → `appId`
- `android/app/build.gradle` → `applicationId`

### 4. **Version & Build Number**
Edit `android/app/build.gradle`:
```gradle
versionCode 1
versionName "1.0.0"
```

---

## 🔧 Troubleshooting

### Issue: "SDK location not found"
**Solution:** Create `android/local.properties`:
```
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### Issue: Gradle build fails
**Solution:** 
```bash
cd android
./gradlew clean
cd ..
npm run android:sync
```

### Issue: App shows blank screen
**Solution:** Check `capacitor.config.ts` - ensure `webDir: 'out'` matches your build output

### Issue: Dynamic routes not working
**Solution:** Use `output: 'export'` in `next.config.js` (already configured)

---

## 📝 Production Build (Release APK)

### Step 1: Generate Signing Key
```bash
cd android/app
keytool -genkey -v -keystore release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2: Configure Signing
Edit `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file('release-key.keystore')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Step 3: Build Release APK
In Android Studio:
- **Build** → **Generate Signed Bundle / APK**
- Select **APK**
- Choose your keystore
- Build

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

---

## 🌐 Alternative: React Native Webview

If you want more native features, consider React Native:

```bash
npx react-native init ICTRevisionHub
```

Then use `WebView` component:
```jsx
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView 
      source={{ uri: 'https://your-deployed-app.vercel.app' }} 
      style={{ flex: 1 }}
    />
  );
}
```

---

## 📊 File Size Comparison

| Method | APK Size | Pros | Cons |
|--------|----------|------|------|
| **Capacitor** | ~5-10 MB | Easy setup, web code reuse | Limited native APIs |
| **React Native** | ~8-15 MB | More native features | Requires code rewrite |
| **Flutter Webview** | ~15-20 MB | Cross-platform | Larger app size |

---

## 🎓 Next Steps

1. ✅ Test app on physical device
2. ✅ Optimize images for mobile
3. ✅ Test offline functionality (add PWA support)
4. ✅ Add native features:
   - Push notifications
   - File downloads
   - Share functionality
5. ✅ Submit to Google Play Store

---

## 📚 Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## 💡 Tips

- **Always test on real device** - emulators may not reflect actual performance
- **Check `out/` folder** - ensure all assets are included
- **Use HTTPS** - `androidScheme: 'https'` improves compatibility
- **Monitor bundle size** - keep `out/` folder under 50MB for better performance

Good luck with your Android app! 🚀
