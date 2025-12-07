package com.sunset.ictstudy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.sunset.ictstudy.ui.screens.IctStudyApp
import com.sunset.ictstudy.ui.theme.SunsetTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SunsetTheme {
                IctStudyApp()
            }
        }
    }
}
