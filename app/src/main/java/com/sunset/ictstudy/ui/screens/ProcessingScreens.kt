package com.sunset.ictstudy.ui.screens

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ArrowBack
import androidx.compose.material.icons.rounded.BookmarkBorder
import androidx.compose.material.icons.rounded.BookmarkAdded
import androidx.compose.material.icons.rounded.Check
import androidx.compose.material.icons.rounded.ChevronRight
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material.icons.rounded.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.sunset.ictstudy.data.DetailTone
import com.sunset.ictstudy.data.InfoItem
import com.sunset.ictstudy.data.ProcessingMode
import com.sunset.ictstudy.ui.theme.AccentPrimary
import com.sunset.ictstudy.ui.theme.NightCard
import com.sunset.ictstudy.ui.theme.NightMuted
import com.sunset.ictstudy.ui.theme.NightSurface

@Composable
fun ProcessingModesScreen(
    modes: List<ProcessingMode>,
    readStates: Map<String, Boolean>,
    onBack: () -> Unit,
    onModeSelected: (ProcessingMode) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        ModesTopBar(onBack = onBack)
        Divider(color = Color.White.copy(alpha = 0.08f))
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(modes) { mode ->
                val isRead = readStates[mode.id] ?: mode.isCompleted
                ProcessingModeCard(
                    mode = mode,
                    isRead = isRead,
                    onClick = { onModeSelected(mode) }
                )
            }
        }
    }
}

@Composable
private fun ModesTopBar(onBack: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onBack) {
            Icon(imageVector = Icons.Rounded.ArrowBack, contentDescription = "Back", tint = Color.White)
        }
        Text(
            text = "Data Processing Modes",
            style = MaterialTheme.typography.headlineSmall,
            color = Color.White,
            modifier = Modifier.weight(1f),
            textAlign = TextAlign.Center
        )
        IconButton(onClick = { /* future search */ }) {
            Icon(imageVector = Icons.Rounded.Search, contentDescription = "Search", tint = Color.White)
        }
    }
}

@Composable
private fun ProcessingModeCard(
    mode: ProcessingMode,
    isRead: Boolean,
    onClick: () -> Unit
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(20.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = mode.title, style = MaterialTheme.typography.titleMedium, color = Color.White)
                Spacer(modifier = Modifier.height(4.dp))
                Text(text = mode.description, style = MaterialTheme.typography.bodyMedium, color = NightMuted)
            }
            Spacer(modifier = Modifier.width(12.dp))
            if (isRead) {
                CompletedBadge()
            } else {
                ProgressDonut(progress = mode.progressPercent, accent = mode.accent)
            }
            Icon(
                imageVector = Icons.Rounded.ChevronRight,
                contentDescription = null,
                tint = Color.White.copy(alpha = 0.6f)
            )
        }
    }
}

@Composable
private fun CompletedBadge() {
    Box(
        modifier = Modifier
            .size(52.dp)
            .clip(CircleShape)
            .background(Color(0xFF1FC15A).copy(alpha = 0.2f)),
        contentAlignment = Alignment.Center
    ) {
        Icon(
            imageVector = Icons.Rounded.Check,
            contentDescription = "Completed",
            tint = Color(0xFF1FC15A)
        )
    }
}

@Composable
private fun ProgressDonut(progress: Int, accent: Color) {
    Box(contentAlignment = Alignment.Center, modifier = Modifier.size(54.dp)) {
        CircularProgressIndicator(
            progress = (progress.coerceIn(0, 100) / 100f),
            strokeWidth = 5.dp,
            color = accent,
            trackColor = Color.White.copy(alpha = 0.08f)
        )
        Text(text = "${progress}%", color = Color.White, style = MaterialTheme.typography.labelMedium)
    }
}

@Composable
fun ProcessingModeDetailScreen(
    mode: ProcessingMode,
    isRead: Boolean,
    onToggleRead: (Boolean) -> Unit,
    onBack: () -> Unit
) {
    var bookmarked by rememberSaveable(mode.id) { mutableStateOf(false) }
    var localRead by rememberSaveable(mode.id) { mutableStateOf(isRead) }

    LaunchedEffect(isRead) { localRead = isRead }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        DetailTopBar(
            title = mode.title,
            bookmarked = bookmarked,
            onBack = onBack,
            onBookmarkToggle = { bookmarked = !bookmarked }
        )
        Divider(color = Color.White.copy(alpha = 0.08f))
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            HeroHeader(mode)
            SectionCard(title = "Definition", description = mode.detail.definition)
            if (mode.detail.keyCharacteristics.isNotEmpty()) {
                SectionList(title = "Key Characteristics", bullets = mode.detail.keyCharacteristics)
            }
            if (mode.detail.types.isNotEmpty()) {
                TypesGrid(title = "Types", items = mode.detail.types)
            }
            if (mode.detail.commonApplications.isNotEmpty()) {
                SectionList(title = "Common Applications", bullets = mode.detail.commonApplications)
            }
            if (mode.detail.advantages.isNotEmpty()) {
                InfoList(title = "Advantages", items = mode.detail.advantages)
            }
            if (mode.detail.challenges.isNotEmpty()) {
                InfoList(title = "Challenges", items = mode.detail.challenges)
            }
            if (mode.detail.examples.isNotEmpty()) {
                SectionList(title = "Real-World Examples", bullets = mode.detail.examples)
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
        Button(
            onClick = {
                val updated = !localRead
                localRead = updated
                onToggleRead(updated)
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = if (localRead) AccentPrimary.copy(alpha = 0.4f) else AccentPrimary,
                contentColor = Color.White
            )
        ) {
            Text(text = if (localRead) "Completed" else "Mark as Read", fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
private fun DetailTopBar(
    title: String,
    bookmarked: Boolean,
    onBack: () -> Unit,
    onBookmarkToggle: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onBack) {
            Icon(imageVector = Icons.Rounded.ArrowBack, contentDescription = "Back", tint = Color.White)
        }
        Text(
            text = title,
            style = MaterialTheme.typography.headlineSmall,
            color = Color.White,
            modifier = Modifier.weight(1f),
            textAlign = TextAlign.Center
        )
        IconButton(onClick = onBookmarkToggle) {
            Icon(
                imageVector = if (bookmarked) Icons.Rounded.BookmarkAdded else Icons.Rounded.BookmarkBorder,
                contentDescription = "Bookmark",
                tint = Color.White
            )
        }
    }
}

@Composable
private fun HeroHeader(mode: ProcessingMode) {
    Box(
        modifier = Modifier
            .size(86.dp)
            .clip(RoundedCornerShape(26.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(mode.accent, mode.accent.copy(alpha = 0.3f))
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Icon(imageVector = mode.icon, contentDescription = null, tint = Color.White, modifier = Modifier.size(42.dp))
    }
    Spacer(modifier = Modifier.height(12.dp))
    Text(text = mode.title, style = MaterialTheme.typography.displaySmall, color = Color.White)
    Spacer(modifier = Modifier.height(4.dp))
    Text(text = mode.detail.summary, color = NightMuted, style = MaterialTheme.typography.bodyMedium)
}

@Composable
private fun SectionCard(title: String, description: String?) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(28.dp))
            .background(NightCard)
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(text = title, style = MaterialTheme.typography.titleMedium, color = Color.White)
        if (!description.isNullOrBlank()) {
            Text(text = description, color = NightMuted, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Composable
private fun SectionList(title: String, bullets: List<String>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(28.dp))
            .background(NightCard)
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = title, style = MaterialTheme.typography.titleMedium, color = Color.White)
        bullets.forEach { bullet ->
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.Top) {
                Text(text = "•", color = AccentPrimary, style = MaterialTheme.typography.titleMedium)
                Text(text = bullet, color = NightMuted, style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class, ExperimentalFoundationApi::class)
@Composable
private fun TypesGrid(title: String, items: List<InfoItem>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(28.dp))
            .background(NightCard)
            .padding(20.dp)
    ) {
        Text(text = title, style = MaterialTheme.typography.titleMedium, color = Color.White)
        Spacer(modifier = Modifier.height(12.dp))
        androidx.compose.foundation.layout.FlowRow(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items.forEach { item ->
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = Color.White.copy(alpha = 0.04f),
                    modifier = Modifier
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(text = item.title, color = Color.White, style = MaterialTheme.typography.titleSmall)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = item.description, color = NightMuted, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
    }
}

@Composable
private fun InfoList(title: String, items: List<InfoItem>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(28.dp))
            .background(NightCard)
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = title, style = MaterialTheme.typography.titleMedium, color = Color.White)
        items.forEach { item ->
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Icon(
                    imageVector = when (item.tone) {
                        DetailTone.Positive -> Icons.Rounded.Check
                        DetailTone.Caution -> Icons.Rounded.Warning
                        DetailTone.Neutral -> Icons.Rounded.ChevronRight
                    },
                    contentDescription = null,
                    tint = when (item.tone) {
                        DetailTone.Positive -> Color(0xFF1FC15A)
                        DetailTone.Caution -> Color(0xFFFFC53D)
                        DetailTone.Neutral -> AccentPrimary
                    }
                )
                Column {
                    Text(text = item.title, color = Color.White, style = MaterialTheme.typography.titleSmall)
                    Text(text = item.description, color = NightMuted, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}
