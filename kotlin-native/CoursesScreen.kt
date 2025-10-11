package com.hpccss.ict.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hpccss.ict.data.model.Course
import com.hpccss.ict.ui.components.ResourceCard
import com.hpccss.ict.ui.components.SearchBar
import com.hpccss.ict.ui.components.TagFilter

/**
 * Courses Screen
 * 
 * Replaces: src/app/courses/page.tsx
 * 
 * Displays all available courses with filtering and search
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CoursesScreen(
    onCourseClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedTags by remember { mutableStateOf<List<String>>(emptyList()) }
    
    // TODO: Replace with ViewModel
    val courses = remember { getSampleCourses() }
    val tags = remember { courses.flatMap { it.tags }.distinct() }
    
    // Filter courses based on search and tags
    val filteredCourses = courses.filter { course ->
        val matchesSearch = course.title.contains(searchQuery, ignoreCase = true) ||
                          course.description.contains(searchQuery, ignoreCase = true)
        val matchesTags = selectedTags.isEmpty() || 
                         course.tags.any { it in selectedTags }
        matchesSearch && matchesTags
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.School,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Text("Courses")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        }
    ) { paddingValues ->
        Column(
            modifier = modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Search bar
            SearchBar(
                query = searchQuery,
                onQueryChange = { searchQuery = it },
                onSearch = { /* Handle search */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            )

            // Tag filters
            AnimatedVisibility(
                visible = tags.isNotEmpty(),
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                TagFilter(
                    tags = tags,
                    selectedTags = selectedTags,
                    onTagToggle = { tag ->
                        selectedTags = if (tag in selectedTags) {
                            selectedTags - tag
                        } else {
                            selectedTags + tag
                        }
                    },
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }

            // Results count
            Text(
                text = "${filteredCourses.size} courses found",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
            )

            // Courses list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(filteredCourses) { course ->
                    CourseCard(
                        course = course,
                        onClick = { onCourseClick(course.id) }
                    )
                }

                // Empty state
                if (filteredCourses.isEmpty()) {
                    item {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.School,
                                contentDescription = null,
                                modifier = Modifier.size(64.dp),
                                tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.4f)
                            )
                            Text(
                                text = "No courses found",
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Text(
                                text = "Try adjusting your search or filters",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CourseCard(
    course: Course,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Convert Course to Resource format for ResourceCard
    ResourceCard(
        resource = com.hpccss.ict.data.model.Resource(
            id = course.id,
            title = course.title,
            description = course.description,
            category = course.category,
            tags = course.tags,
            url = "",
            difficulty = course.difficulty,
            duration = course.duration,
            progress = course.progress
        ),
        onClick = onClick,
        modifier = modifier
    )
}

// Sample data - TODO: Replace with ViewModel/Repository
private fun getSampleCourses(): List<Course> {
    return listOf(
        Course(
            id = "1",
            title = "Introduction to Python",
            description = "Learn Python programming from basics to advanced concepts",
            category = "Programming",
            tags = listOf("Python", "Beginner", "Programming"),
            lessons = emptyList(),
            duration = "8 hours",
            progress = 0.4f
        ),
        Course(
            id = "2",
            title = "Web Development with JavaScript",
            description = "Master modern JavaScript for web development",
            category = "Web Development",
            tags = listOf("JavaScript", "Web", "Frontend"),
            lessons = emptyList(),
            duration = "12 hours",
            progress = 0.2f
        ),
        Course(
            id = "3",
            title = "Database Design with SQL",
            description = "Learn SQL and database design principles",
            category = "Database",
            tags = listOf("SQL", "Database", "Backend"),
            lessons = emptyList(),
            duration = "6 hours",
            progress = 0.0f
        )
    )
}
