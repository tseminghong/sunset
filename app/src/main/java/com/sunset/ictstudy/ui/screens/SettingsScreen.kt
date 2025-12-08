package com.sunset.ictstudy.ui.screens

import android.content.Context
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.sunset.ictstudy.data.ThemeMode
import com.sunset.ictstudy.data.UserPreferences
import com.sunset.ictstudy.notifications.LiveAlertManager
import com.sunset.ictstudy.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun SettingsScreen(
    username: String,
    preferences: UserPreferences,
    onUsernameChange: (String) -> Unit,
    onThemeModeChange: (ThemeMode) -> Unit,
    onDailyGoalChange: (Boolean) -> Unit,
    onNotificationsChange: (Boolean) -> Unit,
    onSoundChange: (Boolean) -> Unit,
    onClearAllData: () -> Unit,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var showUsernameDialog by remember { mutableStateOf(false) }
    var showAboutDialog by remember { mutableStateOf(false) }
    var showClearDataDialog by remember { mutableStateOf(false) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        // Header
        SettingsHeader(onBack = onBack)
        
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
        ) {
            Spacer(modifier = Modifier.height(24.dp))
            
            // User Profile Section
            SectionHeader("User Profile")
            SettingsCard {
                SettingsItem(
                    icon = Icons.Rounded.Person,
                    title = "Username",
                    subtitle = username,
                    onClick = { showUsernameDialog = true }
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Study Preferences Section
            SectionHeader("Study Preferences")
            SettingsCard {
                SettingsToggleItem(
                    icon = Icons.Rounded.Timer,
                    title = "Daily Study Goal",
                    subtitle = "Set daily learning targets",
                    checked = preferences.dailyGoalEnabled,
                    onCheckedChange = onDailyGoalChange
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsToggleItem(
                    icon = Icons.Rounded.Notifications,
                    title = "Study Reminders",
                    subtitle = "Get notified about study sessions",
                    checked = preferences.notificationsEnabled,
                    onCheckedChange = onNotificationsChange
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // App Preferences Section
            SectionHeader("App Preferences")
            SettingsCard {
                SettingsToggleItem(
                    icon = Icons.Rounded.DarkMode,
                    title = "Dark Mode",
                    subtitle = when (preferences.themeMode) {
                        ThemeMode.LIGHT -> "Light theme enabled"
                        ThemeMode.DARK -> "Dark theme enabled"
                        ThemeMode.SYSTEM -> "Follow system settings"
                    },
                    checked = preferences.themeMode == ThemeMode.DARK,
                    onCheckedChange = { enabled ->
                        onThemeModeChange(if (enabled) ThemeMode.DARK else ThemeMode.LIGHT)
                    }
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsToggleItem(
                    icon = Icons.Rounded.VolumeUp,
                    title = "Sound Effects",
                    subtitle = "Play sounds for interactions",
                    checked = preferences.soundEnabled,
                    onCheckedChange = onSoundChange
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Notifications Section
            SectionHeader("Notifications")
            SettingsCard {
                SettingsItem(
                    icon = Icons.Rounded.Notifications,
                    title = "Live Alerts (ColorOS)",
                    subtitle = "Manage dynamic island-style notifications",
                    onClick = { 
                        val liveAlertManager = LiveAlertManager(context)
                        liveAlertManager.openLiveAlertSettings()
                    }
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsItem(
                    icon = Icons.Rounded.Science,
                    title = "Test Live Alert",
                    subtitle = "Preview study timer notification",
                    onClick = { 
                        val liveAlertManager = LiveAlertManager(context)
                        liveAlertManager.showStudyTimerLiveAlert(
                            totalMinutes = 25,
                            elapsedMinutes = 10,
                            isPaused = false
                        )
                    }
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Data & Privacy Section
            SectionHeader("Data & Privacy")
            SettingsCard {
                SettingsItem(
                    icon = Icons.Rounded.CloudDownload,
                    title = "Export Progress",
                    subtitle = "Save your study data",
                    onClick = { /* TODO: Export data */ }
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsItem(
                    icon = Icons.Rounded.Delete,
                    title = "Clear All Data",
                    subtitle = "Reset app to default state",
                    onClick = { showClearDataDialog = true },
                    tintColor = Color(0xFFD83B01)
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // About Section
            SectionHeader("About")
            SettingsCard {
                SettingsItem(
                    icon = Icons.Rounded.Info,
                    title = "About ICT Study",
                    subtitle = "Version 1.0.0",
                    onClick = { showAboutDialog = true }
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsItem(
                    icon = Icons.Rounded.Policy,
                    title = "Privacy Policy",
                    subtitle = "How we handle your data",
                    onClick = { /* TODO: Open privacy policy */ }
                )
                
                Divider(
                    color = NightMuted.copy(alpha = 0.2f),
                    modifier = Modifier.padding(start = 56.dp)
                )
                
                SettingsItem(
                    icon = Icons.Rounded.Gavel,
                    title = "Terms of Service",
                    subtitle = "App usage terms",
                    onClick = { /* TODO: Open terms */ }
                )
            }
            
            Spacer(modifier = Modifier.height(40.dp))
        }
    }
    
    // Dialogs
    if (showUsernameDialog) {
        UsernameDialog(
            currentUsername = username,
            onDismiss = { showUsernameDialog = false },
            onConfirm = { newUsername ->
                onUsernameChange(newUsername)
                showUsernameDialog = false
            }
        )
    }
    
    if (showAboutDialog) {
        AboutDialog(onDismiss = { showAboutDialog = false })
    }
    
    if (showClearDataDialog) {
        ClearDataDialog(
            onDismiss = { showClearDataDialog = false },
            onConfirm = {
                onClearAllData()
                showClearDataDialog = false
            }
        )
    }
}

@Composable
private fun SettingsHeader(onBack: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onBack) {
            Icon(
                imageVector = Icons.Rounded.ArrowBack,
                contentDescription = "Back",
                tint = Color.White
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = "Settings",
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
    }
}

@Composable
private fun SectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleSmall,
        fontWeight = FontWeight.SemiBold,
        color = AccentPrimary,
        modifier = Modifier.padding(bottom = 12.dp)
    )
}

@Composable
private fun SettingsCard(content: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(NightCard)
    ) {
        content()
    }
}

@Composable
private fun SettingsItem(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit,
    tintColor: Color = Color.White
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = tintColor,
            modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyLarge,
                color = tintColor,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = NightMuted
            )
        }
        Icon(
            imageVector = Icons.Rounded.ChevronRight,
            contentDescription = null,
            tint = NightMuted,
            modifier = Modifier.size(20.dp)
        )
    }
}

@Composable
private fun SettingsToggleItem(
    icon: ImageVector,
    title: String,
    subtitle: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = NightMuted
            )
        }
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = SwitchDefaults.colors(
                checkedThumbColor = Color.White,
                checkedTrackColor = AccentPrimary,
                uncheckedThumbColor = NightMuted,
                uncheckedTrackColor = NightCard
            )
        )
    }
}

@Composable
private fun UsernameDialog(
    currentUsername: String,
    onDismiss: () -> Unit,
    onConfirm: (String) -> Unit
) {
    var username by remember { mutableStateOf(currentUsername) }
    
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Change Username",
                color = Color.White
            )
        },
        text = {
            Column {
                Text(
                    text = "Enter your new username",
                    color = NightMuted,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedTextField(
                    value = username,
                    onValueChange = { username = it },
                    placeholder = { Text("Username") },
                    singleLine = true,
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedBorderColor = AccentPrimary,
                        unfocusedBorderColor = NightMuted,
                        cursorColor = AccentPrimary
                    )
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onConfirm(username.trim()) },
                enabled = username.trim().isNotEmpty()
            ) {
                Text("Save", color = AccentPrimary)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel", color = NightMuted)
            }
        },
        containerColor = NightCard
    )
}

@Composable
private fun AboutDialog(onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Icon(
                imageVector = Icons.Rounded.School,
                contentDescription = null,
                tint = AccentPrimary,
                modifier = Modifier.size(48.dp)
            )
        },
        title = {
            Text(
                text = "ICT Study App",
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column {
                Text(
                    text = "Version 1.0.0",
                    color = NightMuted,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "A comprehensive learning platform for ICT topics including:",
                    color = Color.White,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "• Processing Modes\n• Python Programming\n• SQL Databases\n• Cybersecurity\n• Hardware & Networking",
                    color = NightMuted,
                    style = MaterialTheme.typography.bodySmall
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Built with ❤️ for students",
                    color = AccentPrimary,
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Medium
                )
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Close", color = AccentPrimary)
            }
        },
        containerColor = NightCard
    )
}

@Composable
private fun ClearDataDialog(
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Icon(
                imageVector = Icons.Rounded.Warning,
                contentDescription = null,
                tint = Color(0xFFD83B01),
                modifier = Modifier.size(48.dp)
            )
        },
        title = {
            Text(
                text = "Clear All Data?",
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Text(
                text = "This will permanently delete:\n\n• All study progress\n• Quiz results\n• Saved notes\n• Study sessions\n• Reminders\n\nThis action cannot be undone!",
                color = NightMuted,
                style = MaterialTheme.typography.bodyMedium
            )
        },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Clear Data", color = Color(0xFFD83B01), fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel", color = NightMuted)
            }
        },
        containerColor = NightCard
    )
}
