package com.sunset.ictstudy.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = AccentPrimary,
    secondary = AccentSecondary,
    tertiary = AccentPurple,
    background = NightSurface,
    surface = NightSurface,
    onSurface = Color.White,
    onBackground = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = AccentPrimary,
    secondary = AccentSecondary,
    tertiary = AccentPurple,
    background = DaySurface,
    surface = DayCard,
    onSurface = DayText,
    onBackground = DayText,
    onPrimary = Color.White,
    onSecondary = Color.White
)

@Composable
fun SunsetTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme: ColorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = AppTypography,
        content = content
    )
}

// Theme-aware colors
object AppColors {
    val surface: Color
        @Composable get() = MaterialTheme.colorScheme.background
    
    val card: Color
        @Composable get() = MaterialTheme.colorScheme.surface
    
    val textPrimary: Color
        @Composable get() = MaterialTheme.colorScheme.onBackground
    
    val textSecondary: Color
        @Composable get() = if (MaterialTheme.colorScheme.background == NightSurface) {
            NightMuted
        } else {
            DayMuted
        }
    
    val divider: Color
        @Composable get() = Color.White.copy(alpha = if (MaterialTheme.colorScheme.background == NightSurface) 0.08f else 0.12f)
}
