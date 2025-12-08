package com.sunset.ictstudy.ui.screens

import androidx.compose.animation.AnimatedVisibilityScope
import androidx.compose.animation.ExperimentalSharedTransitionApi
import androidx.compose.animation.SharedTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.sunset.ictstudy.data.*
import com.sunset.ictstudy.ui.theme.AccentPrimary
import com.sunset.ictstudy.ui.theme.NightCard
import com.sunset.ictstudy.ui.theme.NightMuted
import com.sunset.ictstudy.ui.theme.NightSurface

// Python Topics Screen
@Composable
fun PythonTopicsScreen(
    topics: List<PythonTopic>,
    onBack: () -> Unit,
    onTopicSelected: (PythonTopic) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        TopicListTopBar(title = "Python Programming", onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(topics) { topic ->
                TopicCard(
                    title = topic.title,
                    icon = topic.icon,
                    accentColor = topic.accent,
                    onClick = { onTopicSelected(topic) }
                )
            }
        }
    }
}

@Composable
fun PythonTopicDetailScreen(
    topic: PythonTopic,
    onBack: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        DetailTopBar(title = topic.title, onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                DetailHeader(
                    icon = topic.icon,
                    title = topic.title,
                    summary = topic.detail.summary,
                    accentColor = topic.accent
                )
            }
            
            item {
                SectionTitle("Definition")
                InfoCard(topic.detail.definition)
            }
            
            if (topic.detail.keyCharacteristics.isNotEmpty()) {
                item {
                    SectionTitle("Key Characteristics")
                    topic.detail.keyCharacteristics.forEach { characteristic ->
                        BulletPoint(characteristic)
                    }
                }
            }
            
            if (topic.detail.concepts.isNotEmpty()) {
                item {
                    SectionTitle("Core Concepts")
                    topic.detail.concepts.forEach { concept ->
                        InfoItemRow(concept)
                    }
                }
            }
            
            if (topic.detail.codeExamples.isNotEmpty()) {
                item {
                    SectionTitle("Code Examples")
                    topic.detail.codeExamples.forEach { example ->
                        CodeExampleCard(example)
                    }
                }
            }
            
            if (topic.detail.commonApplications.isNotEmpty()) {
                item {
                    SectionTitle("Common Applications")
                    topic.detail.commonApplications.forEach { app ->
                        BulletPoint(app)
                    }
                }
            }
        }
    }
}

// SQL Topics Screen
@Composable
fun SQLTopicsScreen(
    topics: List<SQLTopic>,
    onBack: () -> Unit,
    onTopicSelected: (SQLTopic) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        TopicListTopBar(title = "SQL Database", onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(topics) { topic ->
                TopicCard(
                    title = topic.title,
                    icon = topic.icon,
                    accentColor = topic.accent,
                    onClick = { onTopicSelected(topic) }
                )
            }
        }
    }
}

@Composable
fun SQLTopicDetailScreen(
    topic: SQLTopic,
    onBack: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        DetailTopBar(title = topic.title, onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                DetailHeader(
                    icon = topic.icon,
                    title = topic.title,
                    summary = topic.detail.summary,
                    accentColor = topic.accent
                )
            }
            
            item {
                SectionTitle("Definition")
                InfoCard(topic.detail.definition)
            }
            
            if (topic.detail.keyCharacteristics.isNotEmpty()) {
                item {
                    SectionTitle("Key Characteristics")
                    topic.detail.keyCharacteristics.forEach { characteristic ->
                        BulletPoint(characteristic)
                    }
                }
            }
            
            if (topic.detail.concepts.isNotEmpty()) {
                item {
                    SectionTitle("Core Concepts")
                    topic.detail.concepts.forEach { concept ->
                        InfoItemRow(concept)
                    }
                }
            }
            
            if (topic.detail.sqlExamples.isNotEmpty()) {
                item {
                    SectionTitle("SQL Examples")
                    topic.detail.sqlExamples.forEach { example ->
                        SQLExampleCard(example)
                    }
                }
            }
            
            if (topic.detail.commonApplications.isNotEmpty()) {
                item {
                    SectionTitle("Common Applications")
                    topic.detail.commonApplications.forEach { app ->
                        BulletPoint(app)
                    }
                }
            }
        }
    }
}

// Cybersecurity Topics Screen
@Composable
fun CybersecurityTopicsScreen(
    topics: List<CybersecurityTopic>,
    onBack: () -> Unit,
    onTopicSelected: (CybersecurityTopic) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        TopicListTopBar(title = "Cybersecurity", onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(topics) { topic ->
                TopicCard(
                    title = topic.title,
                    icon = topic.icon,
                    accentColor = topic.accent,
                    onClick = { onTopicSelected(topic) }
                )
            }
        }
    }
}

@Composable
fun CybersecurityTopicDetailScreen(
    topic: CybersecurityTopic,
    onBack: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        DetailTopBar(title = topic.title, onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                DetailHeader(
                    icon = topic.icon,
                    title = topic.title,
                    summary = topic.detail.summary,
                    accentColor = topic.accent
                )
            }
            
            item {
                SectionTitle("Definition")
                InfoCard(topic.detail.definition)
            }
            
            if (topic.detail.keyCharacteristics.isNotEmpty()) {
                item {
                    SectionTitle("Key Characteristics")
                    topic.detail.keyCharacteristics.forEach { characteristic ->
                        BulletPoint(characteristic)
                    }
                }
            }
            
            if (topic.detail.concepts.isNotEmpty()) {
                item {
                    SectionTitle("Core Concepts")
                    topic.detail.concepts.forEach { concept ->
                        InfoItemRow(concept)
                    }
                }
            }
            
            if (topic.detail.securityExamples.isNotEmpty()) {
                item {
                    SectionTitle("Security Examples")
                    topic.detail.securityExamples.forEach { example ->
                        SecurityExampleCard(example)
                    }
                }
            }
            
            if (topic.detail.commonApplications.isNotEmpty()) {
                item {
                    SectionTitle("Common Applications")
                    topic.detail.commonApplications.forEach { app ->
                        BulletPoint(app)
                    }
                }
            }
        }
    }
}

// Shared Composables
@Composable
private fun TopicListTopBar(title: String, onBack: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 12.dp),
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
            style = MaterialTheme.typography.headlineSmall,
            color = Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
private fun DetailTopBar(title: String, onBack: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 12.dp),
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
    }
}

@Composable
private fun TopicCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    accentColor: Color,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(accentColor.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(24.dp)
                )
            }
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                color = Color.White,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.weight(1f)
            )
            Icon(
                imageVector = Icons.Rounded.ChevronRight,
                contentDescription = "Navigate",
                tint = NightMuted
            )
        }
    }
}

@Composable
private fun DetailHeader(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    summary: String,
    accentColor: Color
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = NightCard
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(20.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                accentColor.copy(alpha = 0.3f),
                                accentColor.copy(alpha = 0.1f)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(32.dp)
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = summary,
                style = MaterialTheme.typography.bodyMedium,
                color = NightMuted,
                lineHeight = MaterialTheme.typography.bodyMedium.lineHeight.times(1.4f)
            )
        }
    }
}

@Composable
private fun SectionTitle(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.titleMedium,
        color = Color.White,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.padding(top = 8.dp)
    )
}

@Composable
private fun InfoCard(text: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.bodyMedium,
            color = Color.White.copy(alpha = 0.9f),
            lineHeight = MaterialTheme.typography.bodyMedium.lineHeight.times(1.5f),
            modifier = Modifier.padding(16.dp)
        )
    }
}

@Composable
private fun InfoItemRow(item: InfoItem) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.title,
                    style = MaterialTheme.typography.titleSmall,
                    color = AccentPrimary,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = item.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.White.copy(alpha = 0.85f),
                    lineHeight = MaterialTheme.typography.bodyMedium.lineHeight.times(1.4f)
                )
            }
        }
    }
    Spacer(modifier = Modifier.height(8.dp))
}

@Composable
private fun CodeExampleCard(example: CodeExample) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = example.title,
                style = MaterialTheme.typography.titleSmall,
                color = Color(0xFF4EC9B0),
                fontWeight = FontWeight.SemiBold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = example.code,
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFFD4D4D4),
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                lineHeight = MaterialTheme.typography.bodySmall.lineHeight.times(1.5f)
            )
            if (example.explanation.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Divider(color = Color.White.copy(alpha = 0.1f))
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = example.explanation,
                    style = MaterialTheme.typography.bodySmall,
                    color = NightMuted,
                    lineHeight = MaterialTheme.typography.bodySmall.lineHeight.times(1.4f)
                )
            }
        }
    }
    Spacer(modifier = Modifier.height(12.dp))
}

@Composable
private fun SQLExampleCard(example: SQLExample) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = example.title,
                style = MaterialTheme.typography.titleSmall,
                color = Color(0xFF4EC9B0),
                fontWeight = FontWeight.SemiBold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = example.sql,
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFFD4D4D4),
                fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                lineHeight = MaterialTheme.typography.bodySmall.lineHeight.times(1.5f)
            )
            if (example.explanation.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Divider(color = Color.White.copy(alpha = 0.1f))
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = example.explanation,
                    style = MaterialTheme.typography.bodySmall,
                    color = NightMuted,
                    lineHeight = MaterialTheme.typography.bodySmall.lineHeight.times(1.4f)
                )
            }
        }
    }
    Spacer(modifier = Modifier.height(12.dp))
}

@Composable
private fun SecurityExampleCard(example: SecurityExample) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Rounded.Security,
                    contentDescription = null,
                    tint = Color(0xFFFF6B35),
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = example.title,
                    style = MaterialTheme.typography.titleSmall,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = example.description,
                style = MaterialTheme.typography.bodyMedium,
                color = Color.White.copy(alpha = 0.85f),
                lineHeight = MaterialTheme.typography.bodyMedium.lineHeight.times(1.4f)
            )
            if (example.implementation.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = example.implementation,
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFFD4D4D4),
                        modifier = Modifier.padding(12.dp),
                        lineHeight = MaterialTheme.typography.bodySmall.lineHeight.times(1.4f)
                    )
                }
            }
        }
    }
    Spacer(modifier = Modifier.height(12.dp))
}

@Composable
private fun BulletPoint(text: String, isWarning: Boolean = false) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(6.dp)
                .offset(y = 8.dp)
                .clip(CircleShape)
                .background(if (isWarning) Color(0xFFFF6B35) else AccentPrimary)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            style = MaterialTheme.typography.bodyMedium,
            color = Color.White.copy(alpha = 0.85f),
            lineHeight = MaterialTheme.typography.bodyMedium.lineHeight.times(1.4f),
            modifier = Modifier.weight(1f)
        )
    }
}
