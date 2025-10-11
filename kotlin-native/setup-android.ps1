# Kotlin Native Android Setup Script
# This script automates the process of integrating Kotlin files into the Android project

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  ICT Revision Hub - Native Android Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Android folder exists
if (-not (Test-Path "android")) {
    Write-Host "Error: android/ folder not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this from the project root." -ForegroundColor Yellow
    exit 1
}

Write-Host "Creating package structure..." -ForegroundColor Yellow

# Create directory structure
$dirs = @(
    "android/app/src/main/java/com/hpccss/ict",
    "android/app/src/main/java/com/hpccss/ict/ui",
    "android/app/src/main/java/com/hpccss/ict/ui/components",
    "android/app/src/main/java/com/hpccss/ict/ui/screens",
    "android/app/src/main/java/com/hpccss/ict/ui/navigation",
    "android/app/src/main/java/com/hpccss/ict/ui/theme",
    "android/app/src/main/java/com/hpccss/ict/data",
    "android/app/src/main/java/com/hpccss/ict/data/model"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Write-Host "Package structure created" -ForegroundColor Green

Write-Host "Copying Kotlin files..." -ForegroundColor Yellow

# Define file mappings: source -> destination
$fileMappings = @{
    "kotlin-native/MainActivity.kt" = "android/app/src/main/java/com/hpccss/ict/MainActivity.kt"
    "kotlin-native/HeroSection.kt" = "android/app/src/main/java/com/hpccss/ict/ui/components/HeroSection.kt"
    "kotlin-native/ResourceCard.kt" = "android/app/src/main/java/com/hpccss/ict/ui/components/ResourceCard.kt"
    "kotlin-native/SearchBar.kt" = "android/app/src/main/java/com/hpccss/ict/ui/components/SearchBar.kt"
    "kotlin-native/TagFilter.kt" = "android/app/src/main/java/com/hpccss/ict/ui/components/TagFilter.kt"
    "kotlin-native/HomeScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/HomeScreen.kt"
    "kotlin-native/CoursesScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/CoursesScreen.kt"
    "kotlin-native/CourseDetailScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/CourseDetailScreen.kt"
    "kotlin-native/LessonScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/LessonScreen.kt"
    "kotlin-native/AboutScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/AboutScreen.kt"
    "kotlin-native/SettingsScreen.kt" = "android/app/src/main/java/com/hpccss/ict/ui/screens/SettingsScreen.kt"
    "kotlin-native/Navigation.kt" = "android/app/src/main/java/com/hpccss/ict/ui/navigation/Navigation.kt"
    "kotlin-native/NavGraph.kt" = "android/app/src/main/java/com/hpccss/ict/ui/navigation/NavGraph.kt"
    "kotlin-native/Theme.kt" = "android/app/src/main/java/com/hpccss/ict/ui/theme/Theme.kt"
    "kotlin-native/Type.kt" = "android/app/src/main/java/com/hpccss/ict/ui/theme/Type.kt"
    "kotlin-native/Models.kt" = "android/app/src/main/java/com/hpccss/ict/data/model/Models.kt"
}

$copiedCount = 0
$failedCount = 0

foreach ($mapping in $fileMappings.GetEnumerator()) {
    $source = $mapping.Key
    $destination = $mapping.Value
    
    if (Test-Path $source) {
        try {
            Copy-Item -Path $source -Destination $destination -Force
            $copiedCount++
            Write-Host "  Copied $(Split-Path $source -Leaf)" -ForegroundColor Green
        }
        catch {
            Write-Host "  Failed to copy $(Split-Path $source -Leaf): $_" -ForegroundColor Red
            $failedCount++
        }
    }
    else {
        Write-Host "  Source file not found: $source" -ForegroundColor Yellow
        $failedCount++
    }
}

Write-Host ""
Write-Host "Copy Summary:" -ForegroundColor Cyan
Write-Host "  Copied: $copiedCount files" -ForegroundColor Green
if ($failedCount -gt 0) {
    Write-Host "  Failed: $failedCount files" -ForegroundColor Red
}

Write-Host ""
Write-Host "Creating ICTApplication.kt..." -ForegroundColor Yellow

$applicationContent = "package com.hpccss.ict`n`nimport android.app.Application`nimport dagger.hilt.android.HiltAndroidApp`n`n@HiltAndroidApp`nclass ICTApplication : Application()"

Set-Content -Path "android/app/src/main/java/com/hpccss/ict/ICTApplication.kt" -Value $applicationContent
Write-Host "ICTApplication.kt created" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update android/app/build.gradle with dependencies (see IMPLEMENTATION_GUIDE.md)" -ForegroundColor White
Write-Host "2. Update android/build.gradle (project level)" -ForegroundColor White
Write-Host "3. Update AndroidManifest.xml" -ForegroundColor White
Write-Host "4. Sync Gradle files" -ForegroundColor White
Write-Host "5. Build the app:" -ForegroundColor White
Write-Host "   cd android" -ForegroundColor Gray
Write-Host "   ./gradlew assembleDebug" -ForegroundColor Gray
Write-Host ""
Write-Host "See IMPLEMENTATION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
