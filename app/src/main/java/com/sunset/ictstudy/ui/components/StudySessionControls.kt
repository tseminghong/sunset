package com.sunset.ictstudy.ui.components

import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.sunset.ictstudy.services.StudySessionService

@Composable
fun StudySessionControls(
    topicId: String,
    topicName: String,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val isSessionActive = StudySessionService.isRunning && StudySessionService.currentTopicName == topicName
    val isPaused = StudySessionService.isPaused
    
    var showDurationDialog by remember { mutableStateOf(false) }
    var selectedDuration by remember { mutableIntStateOf(25) }
    
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Timer,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        text = "Study Session",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                if (isSessionActive) {
                    Surface(
                        color = if (isPaused) Color(0xFFFF9800) else Color(0xFF4CAF50),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = if (isPaused) "Paused" else "Active",
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
            
            // Session info or timer display
            if (isSessionActive) {
                StudySessionTimer()
            } else {
                Text(
                    text = "Start a focused study session with live progress tracking",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.7f)
                )
            }
            
            // Action buttons
            if (isSessionActive) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedButton(
                        onClick = {
                            val intent = Intent(context, StudySessionService::class.java).apply {
                                action = if (isPaused) StudySessionService.ACTION_RESUME else StudySessionService.ACTION_PAUSE
                            }
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                context.startForegroundService(intent)
                            } else {
                                context.startService(intent)
                            }
                        },
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(
                            imageVector = if (isPaused) Icons.Default.PlayArrow else Icons.Default.Pause,
                            contentDescription = null,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(if (isPaused) "Resume" else "Pause")
                    }
                    
                    OutlinedButton(
                        onClick = {
                            val intent = Intent(context, StudySessionService::class.java).apply {
                                action = StudySessionService.ACTION_STOP
                            }
                            context.startService(intent)
                        },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = MaterialTheme.colorScheme.error
                        )
                    ) {
                        Icon(
                            imageVector = Icons.Default.Stop,
                            contentDescription = null,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Stop")
                    }
                }
            } else {
                Button(
                    onClick = { showDurationDialog = true },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(
                        imageVector = Icons.Default.PlayArrow,
                        contentDescription = null
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Start Study Session")
                }
            }
        }
    }
    
    // Duration selection dialog
    if (showDurationDialog) {
        AlertDialog(
            onDismissRequest = { showDurationDialog = false },
            title = { Text("Study Duration") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Select study session duration:")
                    
                    val durations = listOf(15, 25, 30, 45, 60)
                    durations.forEach { duration ->
                        FilterChip(
                            selected = selectedDuration == duration,
                            onClick = { selectedDuration = duration },
                            label = { Text("$duration minutes") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        startStudySession(context, topicId, topicName, selectedDuration)
                        showDurationDialog = false
                    }
                ) {
                    Text("Start")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDurationDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun StudySessionTimer() {
    val elapsedMinutes = StudySessionService.elapsedSeconds / 60
    val elapsedSeconds = StudySessionService.elapsedSeconds % 60
    val totalMinutes = StudySessionService.totalSeconds / 60
    val progress = if (StudySessionService.totalSeconds > 0) {
        (StudySessionService.elapsedSeconds.toFloat() / StudySessionService.totalSeconds)
    } else 0f
    
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {
            Text(
                text = String.format("%02d:%02d", elapsedMinutes, elapsedSeconds),
                style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = "/ $totalMinutes:00",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.6f)
            )
        }
        
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp)),
        )
    }
}

private fun startStudySession(
    context: Context,
    topicId: String,
    topicName: String,
    durationMinutes: Int
) {
    val intent = Intent(context, StudySessionService::class.java).apply {
        action = StudySessionService.ACTION_START
        putExtra(StudySessionService.EXTRA_TOPIC_ID, topicId)
        putExtra(StudySessionService.EXTRA_TOPIC_NAME, topicName)
        putExtra(StudySessionService.EXTRA_DURATION_MINUTES, durationMinutes)
    }
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(intent)
    } else {
        context.startService(intent)
    }
}
