package com.sunset.ictstudy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.sunset.ictstudy.data.database.StudySession
import com.sunset.ictstudy.ui.theme.NightSurface
import com.sunset.ictstudy.ui.theme.NightMuted
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun CalendarScreen(
    sessions: List<StudySession>,
    onBack: () -> Unit,
    onAddSession: (String, Long, Int) -> Unit,
    onToggleComplete: (Long, Boolean) -> Unit
) {
    var showAddDialog by remember { mutableStateOf(false) }
    var selectedMonth by remember { mutableStateOf(Calendar.getInstance()) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        CalendarTopBar(
            title = "Study Calendar",
            onBack = onBack,
            onAdd = { showAddDialog = true }
        )
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        // Month selector
        MonthSelector(
            selectedMonth = selectedMonth,
            onPreviousMonth = {
                selectedMonth = Calendar.getInstance().apply {
                    timeInMillis = selectedMonth.timeInMillis
                    add(Calendar.MONTH, -1)
                }
            },
            onNextMonth = {
                selectedMonth = Calendar.getInstance().apply {
                    timeInMillis = selectedMonth.timeInMillis
                    add(Calendar.MONTH, 1)
                }
            }
        )
        
        Divider(color = Color.White.copy(alpha = 0.08f), modifier = Modifier.padding(vertical = 8.dp))
        
        // Sessions list
        val monthSessions = remember(sessions, selectedMonth) {
            val cal = Calendar.getInstance()
            sessions.filter { session ->
                cal.timeInMillis = session.scheduledDate
                cal.get(Calendar.MONTH) == selectedMonth.get(Calendar.MONTH) &&
                        cal.get(Calendar.YEAR) == selectedMonth.get(Calendar.YEAR)
            }.sortedBy { it.scheduledDate }
        }
        
        if (monthSessions.isEmpty()) {
            EmptyCalendarState()
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                contentPadding = PaddingValues(vertical = 16.dp)
            ) {
                items(monthSessions) { session ->
                    SessionCard(
                        session = session,
                        onToggleComplete = { onToggleComplete(session.id, !session.isCompleted) }
                    )
                }
            }
        }
    }
    
    if (showAddDialog) {
        AddSessionDialog(
            onDismiss = { showAddDialog = false },
            onAdd = { title, date, duration ->
                onAddSession(title, date, duration)
                showAddDialog = false
            }
        )
    }
}

@Composable
private fun CalendarTopBar(
    title: String,
    onBack: () -> Unit,
    onAdd: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 12.dp),
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
            text = title,
            style = MaterialTheme.typography.titleLarge,
            color = Color.White,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.weight(1f)
        )
        IconButton(onClick = onAdd) {
            Icon(
                imageVector = Icons.Rounded.Add,
                contentDescription = "Add session",
                tint = Color(0xFF10B981)
            )
        }
    }
}

@Composable
private fun MonthSelector(
    selectedMonth: Calendar,
    onPreviousMonth: () -> Unit,
    onNextMonth: () -> Unit
) {
    val monthFormat = remember { SimpleDateFormat("MMMM yyyy", Locale.getDefault()) }
    
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        IconButton(onClick = onPreviousMonth) {
            Icon(
                imageVector = Icons.Rounded.ChevronLeft,
                contentDescription = "Previous month",
                tint = Color.White
            )
        }
        
        Text(
            text = monthFormat.format(selectedMonth.time),
            style = MaterialTheme.typography.titleMedium,
            color = Color.White,
            fontWeight = FontWeight.SemiBold
        )
        
        IconButton(onClick = onNextMonth) {
            Icon(
                imageVector = Icons.Rounded.ChevronRight,
                contentDescription = "Next month",
                tint = Color.White
            )
        }
    }
}

@Composable
private fun SessionCard(
    session: StudySession,
    onToggleComplete: () -> Unit
) {
    val dateFormat = remember { SimpleDateFormat("EEE, MMM dd • hh:mm a", Locale.getDefault()) }
    val sessionDate = remember(session.scheduledDate) {
        dateFormat.format(Date(session.scheduledDate))
    }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (session.isCompleted) {
                Color(0xFF10B981).copy(alpha = 0.1f)
            } else {
                Color.White.copy(alpha = 0.05f)
            }
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = session.isCompleted,
                onCheckedChange = { onToggleComplete() },
                colors = CheckboxDefaults.colors(
                    checkedColor = Color(0xFF10B981),
                    uncheckedColor = Color.White.copy(alpha = 0.3f),
                    checkmarkColor = Color.White
                )
            )
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = session.title,
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = sessionDate,
                    style = MaterialTheme.typography.bodySmall,
                    color = NightMuted
                )
                if (session.durationMinutes > 0) {
                    Spacer(modifier = Modifier.height(4.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Rounded.AccessTime,
                            contentDescription = null,
                            tint = NightMuted,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "${session.durationMinutes} minutes",
                            style = MaterialTheme.typography.labelSmall,
                            color = NightMuted
                        )
                    }
                }
            }
            
            if (session.isCompleted) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(Color(0xFF10B981).copy(alpha = 0.2f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Rounded.CheckCircle,
                        contentDescription = "Completed",
                        tint = Color(0xFF10B981),
                        modifier = Modifier.size(24.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun EmptyCalendarState() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.05f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Rounded.CalendarToday,
                    contentDescription = null,
                    tint = NightMuted,
                    modifier = Modifier.size(40.dp)
                )
            }
            Text(
                text = "No sessions this month",
                style = MaterialTheme.typography.titleMedium,
                color = Color.White,
                fontWeight = FontWeight.SemiBold
            )
            Text(
                text = "Tap + to schedule a study session",
                style = MaterialTheme.typography.bodyMedium,
                color = NightMuted
            )
        }
    }
}

@Composable
private fun AddSessionDialog(
    onDismiss: () -> Unit,
    onAdd: (String, Long, Int) -> Unit
) {
    var title by remember { mutableStateOf("") }
    var selectedDate by remember { mutableStateOf(Calendar.getInstance()) }
    var duration by remember { mutableStateOf("30") }
    
    val dateFormat = remember { SimpleDateFormat("EEE, MMM dd, yyyy • hh:mm a", Locale.getDefault()) }
    
    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E2E)),
            shape = RoundedCornerShape(20.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                Text(
                    text = "Schedule Study Session",
                    style = MaterialTheme.typography.titleLarge,
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
                
                // Title input
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Session Title", color = NightMuted) },
                    placeholder = { Text("e.g., Review Processing Modes", color = NightMuted.copy(alpha = 0.6f)) },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedBorderColor = Color(0xFF10B981),
                        unfocusedBorderColor = Color.White.copy(alpha = 0.2f)
                    ),
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                )
                
                // Date display (simplified - in real app would use date picker)
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.05f)),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Rounded.CalendarToday,
                            contentDescription = null,
                            tint = Color(0xFF10B981)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Scheduled for",
                                style = MaterialTheme.typography.labelSmall,
                                color = NightMuted
                            )
                            Text(
                                text = dateFormat.format(selectedDate.time),
                                style = MaterialTheme.typography.bodyMedium,
                                color = Color.White
                            )
                        }
                    }
                }
                
                // Duration input
                OutlinedTextField(
                    value = duration,
                    onValueChange = { if (it.all { char -> char.isDigit() }) duration = it },
                    label = { Text("Duration (minutes)", color = NightMuted) },
                    placeholder = { Text("30", color = NightMuted.copy(alpha = 0.6f)) },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White,
                        focusedBorderColor = Color(0xFF10B981),
                        unfocusedBorderColor = Color.White.copy(alpha = 0.2f)
                    ),
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                )
                
                // Action buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    OutlinedButton(
                        onClick = onDismiss,
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = Color.White
                        ),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.2f)),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("Cancel", modifier = Modifier.padding(vertical = 4.dp))
                    }
                    
                    Button(
                        onClick = {
                            if (title.isNotBlank()) {
                                onAdd(
                                    title,
                                    selectedDate.timeInMillis,
                                    duration.toIntOrNull() ?: 30
                                )
                            }
                        },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF10B981)
                        ),
                        shape = RoundedCornerShape(12.dp),
                        enabled = title.isNotBlank()
                    ) {
                        Text("Add Session", modifier = Modifier.padding(vertical = 4.dp))
                    }
                }
            }
        }
    }
}
