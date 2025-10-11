# ⚠️ Java 21 Required for Capacitor 7.x

## Problem
The build is failing with:
```
error: invalid source release: 21
```

This is because **Capacitor 7.x requires Java 21** (JDK 21) to compile, but you currently have Java 17 installed.

## Solutions

### Option 1: Install Java 21 (Recommended)

#### Download and Install
1. Download **Azul Zulu JDK 21** (recommended for Android):
   https://www.azul.com/downloads/?package=jdk#zulu

2. Or download **Oracle JDK 21**:
   https://www.oracle.com/java/technologies/downloads/#java21

3. Install it to a location like: `C:\Program Files\Java\jdk-21`

#### Update Android Studio
1. Open Android Studio
2. Go to: `File` → `Settings` → `Build, Execution, Deployment` → `Build Tools` → `Gradle`
3. Set **Gradle JDK** to **JDK 21**

#### Or Update gradle.properties
Add this line to `android/gradle.properties`:
```properties
org.gradle.java.home=C:/Program Files/Java/jdk-21
```

### Option 2: Downgrade Capacitor (Alternative)

If you can't install Java 21, downgrade to Capacitor 6.x which supports Java 17:

#### Update package.json
```bash
cd c:\Users\Tsemi\sunset
npm install @capacitor/core@6.1.2 @capacitor/cli@6.1.2 @capacitor/android@6.1.2
npx cap sync android
```

#### Then rebuild
```powershell
cd android
./gradlew clean assembleDebug
```

## Verification

After installing Java 21:
```powershell
java -version
# Should show: openjdk version "21.x.x"

cd android
./gradlew --version
# Should show: JVM: 21.x.x
```

## Quick Fix (Recommended)

1. **Download Azul Zulu JDK 21**: https://www.azul.com/downloads/?package=jdk#zulu
2. Install it
3. Set JAVA_HOME:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Zulu\zulu-21"
   $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
   ```
4. Verify:
   ```powershell
   java -version
   ```
5. Build again:
   ```powershell
   cd android
   ./gradlew clean assembleDebug
   ```

## After Java 21 is Installed

The build should work! Then you can continue with the native Kotlin integration.

---

**Current Status**: ✅ Kotlin files copied successfully, ⚠️ Need Java 21 to build
