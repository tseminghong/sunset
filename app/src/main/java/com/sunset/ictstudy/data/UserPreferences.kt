package com.sunset.ictstudy.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

enum class ThemeMode {
    LIGHT, DARK, SYSTEM
}

data class UserPreferences(
    val username: String = "",
    val themeMode: ThemeMode = ThemeMode.SYSTEM,
    val isOnboardingComplete: Boolean = false
)

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "user_preferences")

class PreferencesRepository(private val context: Context) {
    
    private object PreferenceKeys {
        val USERNAME = stringPreferencesKey("username")
        val THEME_MODE = stringPreferencesKey("theme_mode")
        val ONBOARDING_COMPLETE = stringPreferencesKey("onboarding_complete")
    }
    
    val userPreferencesFlow: Flow<UserPreferences> = context.dataStore.data.map { preferences ->
        UserPreferences(
            username = preferences[PreferenceKeys.USERNAME] ?: "",
            themeMode = preferences[PreferenceKeys.THEME_MODE]?.let { 
                try {
                    ThemeMode.valueOf(it)
                } catch (e: IllegalArgumentException) {
                    ThemeMode.SYSTEM
                }
            } ?: ThemeMode.SYSTEM,
            isOnboardingComplete = preferences[PreferenceKeys.ONBOARDING_COMPLETE]?.toBoolean() ?: false
        )
    }
    
    suspend fun updateUsername(username: String) {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.USERNAME] = username
        }
    }
    
    suspend fun updateThemeMode(themeMode: ThemeMode) {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.THEME_MODE] = themeMode.name
        }
    }
    
    suspend fun completeOnboarding() {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.ONBOARDING_COMPLETE] = "true"
        }
    }
}
