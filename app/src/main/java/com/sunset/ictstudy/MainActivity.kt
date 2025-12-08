package com.sunset.ictstudy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import com.sunset.ictstudy.data.PreferencesRepository
import com.sunset.ictstudy.data.ThemeMode
import com.sunset.ictstudy.ui.screens.IctStudyApp
import com.sunset.ictstudy.ui.theme.SunsetTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        
        // Enable predictive back gesture (Android 13+)
        // The predictive back animation is automatically handled by the system
        // when combined with the navigation animations we've implemented
        setContent {
            val preferencesRepository = PreferencesRepository(this)
            val userPreferences by preferencesRepository.userPreferencesFlow.collectAsState(
                initial = com.sunset.ictstudy.data.UserPreferences()
            )
            
            val darkTheme = when (userPreferences.themeMode) {
                ThemeMode.LIGHT -> false
                ThemeMode.DARK -> true
                ThemeMode.SYSTEM -> isSystemInDarkTheme()
            }
            
            SunsetTheme(darkTheme = darkTheme) {
                IctStudyApp(context = this)
            }
        }
    }
}
