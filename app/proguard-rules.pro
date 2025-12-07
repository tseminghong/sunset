# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to the configuration
# file that is packaged with your SDK.
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.kts.

# Keep Jetpack Compose runtime metadata that is required for previews and runtime inspection.
-keep class androidx.compose.** { *; }
-keep class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.coroutines.**
