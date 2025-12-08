package com.sunset.ictstudy.ui.screens

import androidx.compose.animation.*
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
import com.sunset.ictstudy.data.database.QuizQuestion
import com.sunset.ictstudy.ui.theme.NightSurface
import com.sunset.ictstudy.ui.theme.NightMuted
import kotlinx.coroutines.delay
import org.json.JSONArray

@Composable
fun QuizSelectionScreen(
    availableTopics: List<Pair<String, String>>, // Pair of (topicId, topicName)
    onBack: () -> Unit,
    onTopicSelected: (String, String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        QuizTopBar(title = "Practice Quiz", onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            item {
                Text(
                    text = "Select a topic to start practicing",
                    style = MaterialTheme.typography.bodyLarge,
                    color = NightMuted,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
            items(availableTopics) { (topicId, topicName) ->
                QuizTopicCard(
                    topicName = topicName,
                    onClick = { onTopicSelected(topicId, topicName) }
                )
            }
        }
    }
}

@Composable
private fun QuizTopicCard(
    topicName: String,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.05f)),
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(Color(0xFF10B981).copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Rounded.Quiz,
                    contentDescription = null,
                    tint = Color(0xFF10B981),
                    modifier = Modifier.size(24.dp)
                )
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = topicName,
                style = MaterialTheme.typography.titleMedium,
                color = Color.White,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.weight(1f)
            )
            
            Icon(
                imageVector = Icons.Rounded.ChevronRight,
                contentDescription = null,
                tint = Color.White.copy(alpha = 0.6f)
            )
        }
    }
}

@Composable
fun QuizTakingScreen(
    topicName: String,
    questions: List<QuizQuestion>,
    onQuizComplete: (Int, Int, Long) -> Unit,
    onBack: () -> Unit
) {
    var currentQuestionIndex by remember { mutableStateOf(0) }
    var selectedAnswers by remember { mutableStateOf(mutableMapOf<Int, Int>()) }
    var startTime by remember { mutableStateOf(System.currentTimeMillis()) }
    var showResult by remember { mutableStateOf(false) }
    
    val currentQuestion = questions.getOrNull(currentQuestionIndex)
    val isLastQuestion = currentQuestionIndex == questions.size - 1
    
    if (currentQuestion == null) {
        // Quiz complete
        LaunchedEffect(Unit) {
            val endTime = System.currentTimeMillis()
            val durationSeconds = (endTime - startTime) / 1000
            val correctCount = selectedAnswers.count { (index, answer) ->
                questions[index].correctAnswer == answer
            }
            onQuizComplete(questions.size, correctCount, durationSeconds)
        }
        return
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        QuizProgressTopBar(
            topicName = topicName,
            currentQuestion = currentQuestionIndex + 1,
            totalQuestions = questions.size,
            onBack = onBack
        )
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        Column(
            modifier = Modifier
                .weight(1f)
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Question text
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.05f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        text = "Question ${currentQuestionIndex + 1}",
                        style = MaterialTheme.typography.labelLarge,
                        color = Color(0xFF10B981)
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = currentQuestion.questionText,
                        style = MaterialTheme.typography.titleMedium,
                        color = Color.White,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
            
            // Answer options
            val options = remember(currentQuestion) {
                try {
                    val jsonArray = JSONArray(currentQuestion.options)
                    List(jsonArray.length()) { jsonArray.getString(it) }
                } catch (e: Exception) {
                    emptyList()
                }
            }
            
            val selectedAnswer = selectedAnswers[currentQuestionIndex]
            
            options.forEachIndexed { index, option ->
                AnswerOption(
                    text = option,
                    index = index,
                    isSelected = selectedAnswer == index,
                    showResult = showResult,
                    isCorrect = index == currentQuestion.correctAnswer,
                    onClick = {
                        if (!showResult) {
                            selectedAnswers[currentQuestionIndex] = index
                            showResult = true
                        }
                    }
                )
            }
        }
        
        // Navigation buttons
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            if (showResult) {
                Button(
                    onClick = {
                        showResult = false
                        currentQuestionIndex++
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF10B981)
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = if (isLastQuestion) "Finish Quiz" else "Next Question",
                        modifier = Modifier.padding(vertical = 8.dp),
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

@Composable
private fun AnswerOption(
    text: String,
    index: Int,
    isSelected: Boolean,
    showResult: Boolean,
    isCorrect: Boolean,
    onClick: () -> Unit
) {
    val backgroundColor = when {
        showResult && isCorrect -> Color(0xFF10B981).copy(alpha = 0.2f)
        showResult && isSelected && !isCorrect -> Color(0xFFEF4444).copy(alpha = 0.2f)
        isSelected -> Color(0xFF6366F1).copy(alpha = 0.2f)
        else -> Color.White.copy(alpha = 0.05f)
    }
    
    val borderColor = when {
        showResult && isCorrect -> Color(0xFF10B981)
        showResult && isSelected && !isCorrect -> Color(0xFFEF4444)
        isSelected -> Color(0xFF6366F1)
        else -> Color.Transparent
    }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(enabled = !showResult, onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = backgroundColor),
        shape = RoundedCornerShape(12.dp),
        border = androidx.compose.foundation.BorderStroke(
            width = if (borderColor != Color.Transparent) 2.dp else 0.dp,
            color = borderColor
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(32.dp)
                    .clip(CircleShape)
                    .background(
                        when {
                            showResult && isCorrect -> Color(0xFF10B981)
                            showResult && isSelected && !isCorrect -> Color(0xFFEF4444)
                            else -> Color.White.copy(alpha = 0.1f)
                        }
                    ),
                contentAlignment = Alignment.Center
            ) {
                if (showResult && isCorrect) {
                    Icon(
                        imageVector = Icons.Rounded.Check,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                } else if (showResult && isSelected && !isCorrect) {
                    Icon(
                        imageVector = Icons.Rounded.Close,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                } else {
                    Text(
                        text = ('A' + index).toString(),
                        color = Color.White,
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = text,
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White,
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
fun QuizResultsScreen(
    topicName: String,
    totalQuestions: Int,
    correctAnswers: Int,
    durationSeconds: Long,
    onRetake: () -> Unit,
    onBack: () -> Unit
) {
    val percentage = (correctAnswers.toFloat() / totalQuestions * 100).toInt()
    val passed = percentage >= 70
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        QuizTopBar(title = "Quiz Results", onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            Spacer(modifier = Modifier.height(40.dp))
            
            // Score circle
            Box(
                modifier = Modifier.size(160.dp),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(
                    progress = percentage / 100f,
                    strokeWidth = 12.dp,
                    color = if (passed) Color(0xFF10B981) else Color(0xFFEF4444),
                    trackColor = Color.White.copy(alpha = 0.1f),
                    modifier = Modifier.fillMaxSize()
                )
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "$percentage%",
                        style = MaterialTheme.typography.displayMedium,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = if (passed) "Passed!" else "Keep Trying",
                        style = MaterialTheme.typography.bodyMedium,
                        color = if (passed) Color(0xFF10B981) else Color(0xFFEF4444)
                    )
                }
            }
            
            Text(
                text = topicName,
                style = MaterialTheme.typography.titleLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center
            )
            
            // Stats cards
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard(
                    label = "Correct",
                    value = "$correctAnswers/$totalQuestions",
                    modifier = Modifier.weight(1f)
                )
                StatCard(
                    label = "Time",
                    value = formatDuration(durationSeconds),
                    modifier = Modifier.weight(1f)
                )
            }
            
            Spacer(modifier = Modifier.weight(1f))
            
            // Action buttons
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = onRetake,
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF10B981)
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Icon(imageVector = Icons.Rounded.Refresh, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Retake Quiz",
                        modifier = Modifier.padding(vertical = 8.dp),
                        fontWeight = FontWeight.SemiBold
                    )
                }
                
                OutlinedButton(
                    onClick = onBack,
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = Color.White
                    ),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.2f)),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = "Back to Topics",
                        modifier = Modifier.padding(vertical = 8.dp),
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

@Composable
private fun StatCard(
    label: String,
    value: String,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.05f)),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                style = MaterialTheme.typography.titleLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = label,
                style = MaterialTheme.typography.bodySmall,
                color = NightMuted
            )
        }
    }
}

@Composable
private fun QuizTopBar(
    title: String,
    onBack: () -> Unit
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
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
private fun QuizProgressTopBar(
    topicName: String,
    currentQuestion: Int,
    totalQuestions: Int,
    onBack: () -> Unit
) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(
                    imageVector = Icons.Rounded.Close,
                    contentDescription = "Exit quiz",
                    tint = Color.White
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = topicName,
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Question $currentQuestion of $totalQuestions",
                    style = MaterialTheme.typography.bodySmall,
                    color = NightMuted
                )
            }
        }
        LinearProgressIndicator(
            progress = currentQuestion.toFloat() / totalQuestions,
            modifier = Modifier.fillMaxWidth(),
            color = Color(0xFF10B981),
            trackColor = Color.White.copy(alpha = 0.1f)
        )
    }
}

private fun formatDuration(seconds: Long): String {
    val minutes = seconds / 60
    val secs = seconds % 60
    return if (minutes > 0) {
        "${minutes}m ${secs}s"
    } else {
        "${secs}s"
    }
}
