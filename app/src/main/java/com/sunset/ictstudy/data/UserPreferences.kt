package com.sunset.ictstudy.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

enum class ThemeMode {
    LIGHT, DARK, SYSTEM
}

data class UserPreferences(
    val username: String = "",
    val themeMode: ThemeMode = ThemeMode.SYSTEM,
    val isOnboardingComplete: Boolean = false,
    val dailyGoalEnabled: Boolean = true,
    val notificationsEnabled: Boolean = true,
    val soundEnabled: Boolean = false,
    val studyModeEnabled: Boolean = false,
    val studyModeTopicId: String = "",
    val studyModeTopicName: String = ""
)

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "user_preferences")

class PreferencesRepository(private val context: Context) {
    
    private object PreferenceKeys {
        val USERNAME = stringPreferencesKey("username")
        val THEME_MODE = stringPreferencesKey("theme_mode")
        val ONBOARDING_COMPLETE = stringPreferencesKey("onboarding_complete")
        val DAILY_GOAL_ENABLED = booleanPreferencesKey("daily_goal_enabled")
        val NOTIFICATIONS_ENABLED = booleanPreferencesKey("notifications_enabled")
        val SOUND_ENABLED = booleanPreferencesKey("sound_enabled")
        val STUDY_MODE_ENABLED = booleanPreferencesKey("study_mode_enabled")
        val STUDY_MODE_TOPIC_ID = stringPreferencesKey("study_mode_topic_id")
        val STUDY_MODE_TOPIC_NAME = stringPreferencesKey("study_mode_topic_name")
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
            isOnboardingComplete = preferences[PreferenceKeys.ONBOARDING_COMPLETE]?.toBoolean() ?: false,
            dailyGoalEnabled = preferences[PreferenceKeys.DAILY_GOAL_ENABLED] ?: true,
            notificationsEnabled = preferences[PreferenceKeys.NOTIFICATIONS_ENABLED] ?: true,
            soundEnabled = preferences[PreferenceKeys.SOUND_ENABLED] ?: false,
            studyModeEnabled = preferences[PreferenceKeys.STUDY_MODE_ENABLED] ?: false,
            studyModeTopicId = preferences[PreferenceKeys.STUDY_MODE_TOPIC_ID] ?: "",
            studyModeTopicName = preferences[PreferenceKeys.STUDY_MODE_TOPIC_NAME] ?: ""
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
    
    suspend fun updateDailyGoalEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.DAILY_GOAL_ENABLED] = enabled
        }
    }
    
    suspend fun updateNotificationsEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.NOTIFICATIONS_ENABLED] = enabled
        }
    }
    
    suspend fun updateSoundEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.SOUND_ENABLED] = enabled
        }
    }
    
    suspend fun updateStudyMode(enabled: Boolean, topicId: String = "", topicName: String = "") {
        context.dataStore.edit { preferences ->
            preferences[PreferenceKeys.STUDY_MODE_ENABLED] = enabled
            if (enabled) {
                preferences[PreferenceKeys.STUDY_MODE_TOPIC_ID] = topicId
                preferences[PreferenceKeys.STUDY_MODE_TOPIC_NAME] = topicName
            } else {
                preferences[PreferenceKeys.STUDY_MODE_TOPIC_ID] = ""
                preferences[PreferenceKeys.STUDY_MODE_TOPIC_NAME] = ""
            }
        }
    }
    
    suspend fun clearAllData() {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }
}
