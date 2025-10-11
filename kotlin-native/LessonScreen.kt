package com.hpccss.ict.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hpccss.ict.data.model.Lesson

/**
 * Lesson Detail Screen
 * 
 * Displays lesson content with markdown rendering
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LessonDetailScreen(
    lessonId: String,
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    // TODO: Get lesson from ViewModel
    val lesson = remember { getSampleLesson(lessonId) }
    var isCompleted by remember { mutableStateOf(lesson?.isCompleted ?: false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(lesson?.title ?: "Lesson") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        },
        bottomBar = {
            // Bottom action buttons
            Surface(
                tonalElevation = 3.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Button(
                        onClick = {
                            isCompleted = !isCompleted
                            // TODO: Update lesson completion status
                        },
                        modifier = Modifier.weight(1f)
                    ) {
                        Text(
                            text = if (isCompleted) "Mark as Incomplete" else "Mark as Complete"
                        )
                    }

                    OutlinedButton(
                        onClick = { /* Navigate to next lesson */ },
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("Next Lesson")
                    }
                }
            }
        }
    ) { paddingValues ->
        if (lesson == null) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues),
                contentAlignment = androidx.compose.ui.Alignment.Center
            ) {
                Text("Lesson not found")
            }
        } else {
            Column(
                modifier = modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Lesson metadata
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        lesson.duration?.let {
                            Text(
                                text = "Duration: $it",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }

                        Text(
                            text = if (isCompleted) "✓ Completed" else "Not completed",
                            style = MaterialTheme.typography.bodyMedium,
                            color = if (isCompleted)
                                MaterialTheme.colorScheme.primary
                            else
                                MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }

                // Lesson description
                Text(
                    text = lesson.description,
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Divider()

                // Lesson content
                // TODO: Implement markdown rendering
                Text(
                    text = lesson.content.ifEmpty { "Content coming soon..." },
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}

/**
 * Generic Subject Screen
 * 
 * For subject-specific pages (DSE, Hardware, Software, etc.)
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SubjectScreen(
    subject: String,
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(subject) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
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
            item {
                Text(
                    text = subject,
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )
            }

            item {
                Text(
                    text = "Resources and materials for $subject",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // TODO: Add subject-specific content
            item {
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text(
                            text = "Coming Soon",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Content for this section is being prepared. Check back soon!",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }
}

// Sample data
private fun getSampleLesson(lessonId: String): Lesson? {
    return Lesson(
        id = lessonId,
        title = "Introduction to Python",
        description = "Learn what Python is and why it's one of the most popular programming languages in the world.",
        content = """
# Introduction to Python

Python is a high-level, interpreted programming language known for its simplicity and readability.

## Why Learn Python?

1. **Easy to Learn**: Python's syntax is clear and intuitive
2. **Versatile**: Used in web development, data science, AI, and more
3. **Large Community**: Extensive libraries and community support
4. **High Demand**: One of the most sought-after skills in the job market

## Python Features

- **Interpreted Language**: No compilation needed
- **Dynamic Typing**: Variables don't need explicit type declarations
- **Object-Oriented**: Supports OOP principles
- **Cross-Platform**: Runs on Windows, Mac, Linux

## Your First Python Program

```python
print("Hello, World!")
```

This simple program demonstrates Python's readability and ease of use.

## Next Steps

In the next lesson, we'll explore variables and data types in Python.
        """.trimIndent(),
        duration = "15 min",
        isCompleted = false,
        order = 1
    )
}
