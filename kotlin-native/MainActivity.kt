package com.hpccss.ict

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.hpccss.ict.ui.navigation.NavGraph
import com.hpccss.ict.ui.theme.ICTRevisionTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Main Activity - Entry point for the ICT Revision Hub Android app
 * 
 * This replaces the Next.js server-side rendering with native Android UI
 * Built with Jetpack Compose for modern, declarative UI
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            ICTRevisionTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // Main navigation graph - handles all screen routing
                    NavGraph()
                }
            }
        }
    }
    
    override fun onResume() {
        super.onResume()
        // Track app usage, restore state, etc.
    }
    
    override fun onPause() {
        super.onPause()
        // Save state, pause animations, etc.
    }
}
