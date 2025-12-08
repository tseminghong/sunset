package com.sunset.ictstudy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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

data class CourseCategory(
    val id: String,
    val title: String,
    val icon: ImageVector,
    val color: Color,
    val topicCount: Int,
    val onClick: () -> Unit
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CourseScreen(
    onOpenPython: () -> Unit,
    onOpenSQL: () -> Unit,
    onOpenCybersecurity: () -> Unit,
    onOpenProcessingModes: () -> Unit,
    modifier: Modifier = Modifier
) {
    val courses = remember {
        listOf(
            CourseCategory(
                id = "python",
                title = "Python Programming",
                icon = Icons.Default.Code,
                color = Color(0xFF4CAF50),
                topicCount = 15,
                onClick = onOpenPython
            ),
            CourseCategory(
                id = "sql",
                title = "SQL Database",
                icon = Icons.Default.Storage,
                color = Color(0xFF2196F3),
                topicCount = 12,
                onClick = onOpenSQL
            ),
            CourseCategory(
                id = "cybersecurity",
                title = "Cybersecurity",
                icon = Icons.Default.Security,
                color = Color(0xFFF44336),
                topicCount = 10,
                onClick = onOpenCybersecurity
            ),
            CourseCategory(
                id = "processing",
                title = "Processing Modes",
                icon = Icons.Default.Memory,
                color = Color(0xFFFF9800),
                topicCount = 4,
                onClick = onOpenProcessingModes
            )
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Courses") }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            item {
                Text(
                    text = "Available Courses",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(8.dp))
            }

            items(courses) { course ->
                CourseCategoryCard(course = course)
            }
        }
    }
}

@Composable
fun CourseCategoryCard(
    course: CourseCategory,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable(onClick = course.onClick),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
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
            // Icon
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(course.color.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = course.icon,
                    contentDescription = null,
                    modifier = Modifier.size(36.dp),
                    tint = course.color
                )
            }

            // Content
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = course.title,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                Row(
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Book,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp),
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "${course.topicCount} Topics",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            // Arrow
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "Open",
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
