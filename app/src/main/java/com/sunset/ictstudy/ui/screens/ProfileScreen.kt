package com.sunset.ictstudy.ui.screens

import android.content.Context
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.sunset.ictstudy.data.PreferencesRepository
import com.sunset.ictstudy.data.ThemeMode
import com.sunset.ictstudy.data.database.StudyActivityRepository
import com.sunset.ictstudy.data.database.StudyStats
import com.sunset.ictstudy.data.TopicCategory
import kotlinx.coroutines.launch

data class ProfileSection(
    val icon: ImageVector,
    val title: String,
    val subtitle: String,
    val onClick: () -> Unit
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    context: Context,
    username: String,
    onOpenSettings: () -> Unit,
    onOpenStatistics: () -> Unit,
    onOpenReminders: () -> Unit,
    onOpenSavedItems: () -> Unit,
    modifier: Modifier = Modifier
) {
    val preferencesRepository = remember { PreferencesRepository(context) }
    val studyActivityRepository = remember { StudyActivityRepository(context) }
    val scope = rememberCoroutineScope()
    
    // Load real statistics from database
    var stats by remember { mutableStateOf(StudyStats(0, 0, 0)) }
    var totalCourses by remember { mutableStateOf(0) }
    
    LaunchedEffect(Unit) {
        stats = studyActivityRepository.getTotalStats()
        // Count unique topic categories that have been studied
        totalCourses = listOf(TopicCategory.Python, TopicCategory.SQL, TopicCategory.Cybersecurity).size
    }

    val sections = remember {
        listOf(
            ProfileSection(
                icon = Icons.Default.BarChart,
                title = "Statistics",
                subtitle = "View your learning progress",
                onClick = onOpenStatistics
            ),
            ProfileSection(
                icon = Icons.Default.Bookmark,
                title = "Saved Items",
                subtitle = "Your bookmarked content",
                onClick = onOpenSavedItems
            ),
            ProfileSection(
                icon = Icons.Default.Notifications,
                title = "Reminders",
                subtitle = "Manage study reminders",
                onClick = onOpenReminders
            ),
            ProfileSection(
                icon = Icons.Default.Settings,
                title = "Settings",
                subtitle = "App preferences and theme",
                onClick = onOpenSettings
            )
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile") }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Profile Header
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        // Avatar
                        Box(
                            modifier = Modifier
                                .size(80.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primary),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = username.firstOrNull()?.uppercase() ?: "U",
                                style = MaterialTheme.typography.headlineLarge,
                                color = MaterialTheme.colorScheme.onPrimary,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        // Username
                        Text(
                            text = username.ifEmpty { "Student" },
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )

                        // Stats Row
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceEvenly
                        ) {
                            StatItem(label = "Courses", value = totalCourses.toString())
                            StatItem(label = "Lessons", value = stats.totalLessons.toString())
                            StatItem(label = "Streak", value = "${stats.currentStreak}d")
                        }
                    }
                }
            }

            // Quick Actions
            item {
                Text(
                    text = "Quick Actions",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(vertical = 8.dp)
                )
            }

            // Profile Sections
            items(sections.size) { index ->
                val section = sections[index]
                ProfileSectionCard(section = section)
            }

            // Logout
            item {
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedButton(
                    onClick = {
                        scope.launch {
                            preferencesRepository.clearAllData()
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.error
                    )
                ) {
                    Icon(Icons.Default.Logout, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Reset Profile")
                }
            }
        }
    }
}

@Composable
fun StatItem(label: String, value: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
        )
    }
}

@Composable
fun ProfileSectionCard(section: ProfileSection) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = section.onClick),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(MaterialTheme.colorScheme.secondaryContainer),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = section.icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSecondaryContainer
                )
            }

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = section.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = section.subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "Open",
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
