package com.sunset.ictstudy.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.BookmarkBorder
import androidx.compose.material.icons.rounded.DataUsage
import androidx.compose.material.icons.rounded.MenuBook
import androidx.compose.material.icons.rounded.PlayArrow
import androidx.compose.material.icons.rounded.School
import androidx.compose.material.icons.rounded.Security
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material.icons.rounded.Storage
import androidx.compose.material.icons.rounded.Wifi
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.sunset.ictstudy.data.ProcessingModesRepository
import com.sunset.ictstudy.data.QuickActionType
import com.sunset.ictstudy.data.QuickAccessAction
import com.sunset.ictstudy.data.StudyContentRepository
import com.sunset.ictstudy.data.StudyTopic
import com.sunset.ictstudy.data.TopicCategory
import com.sunset.ictstudy.ui.theme.AccentCyan
import com.sunset.ictstudy.ui.theme.AccentPrimary
import com.sunset.ictstudy.ui.theme.AccentPurple
import com.sunset.ictstudy.ui.theme.AccentSecondary
import com.sunset.ictstudy.ui.theme.NightCard
import com.sunset.ictstudy.ui.theme.NightMuted
import com.sunset.ictstudy.ui.theme.NightSurface
import com.sunset.ictstudy.ui.theme.SunsetTheme

@Composable
fun IctStudyApp() {
    val navController = rememberNavController()
    var readStates by rememberSaveable { mutableStateOf<Map<String, Boolean>>(emptyMap()) }

    Surface(color = NightSurface, modifier = Modifier.fillMaxSize()) {
        NavHost(navController = navController, startDestination = StudyDestination.Home.route) {
            composable(StudyDestination.Home.route) {
                HomeRoute(onOpenProcessingModes = {
                    navController.navigate(StudyDestination.ProcessingModes.route)
                })
            }
            composable(StudyDestination.ProcessingModes.route) {
                ProcessingModesScreen(
                    modes = ProcessingModesRepository.processingModes,
                    readStates = readStates,
                    onBack = { navController.popBackStack() },
                    onModeSelected = { mode ->
                        navController.navigate(StudyDestination.ProcessingModeDetail.create(mode.id))
                    }
                )
            }
            composable(
                route = StudyDestination.ProcessingModeDetail.route,
                arguments = listOf(navArgument("modeId") { type = NavType.StringType })
            ) { entry ->
                val modeId = entry.arguments?.getString("modeId") ?: return@composable
                val mode = ProcessingModesRepository.getMode(modeId)
                if (mode == null) {
                    navController.popBackStack()
                } else {
                    val modeRead = readStates[mode.id] ?: mode.isCompleted
                    ProcessingModeDetailScreen(
                        mode = mode,
                        isRead = modeRead,
                        onToggleRead = { updated ->
                            readStates = readStates.toMutableMap().apply { put(mode.id, updated) }
                        },
                        onBack = { navController.popBackStack() }
                    )
                }
            }
        }
    }
}

@Composable
private fun HomeRoute(onOpenProcessingModes: () -> Unit) {
    var query by rememberSaveable { mutableStateOf("") }
    val filteredTopics = remember(query) {
        StudyContentRepository.studyTopics.filter { topic ->
            query.isBlank() || topic.title.contains(query, ignoreCase = true)
        }
    }

    HomeScreen(
        query = query,
        onQueryChange = { query = it },
        actions = StudyContentRepository.quickAccess,
        topics = filteredTopics,
        onQuickActionClick = { action ->
            if (action.type == QuickActionType.ProcessingModes) {
                onOpenProcessingModes()
            }
        }
    )
}

@Composable
private fun HomeScreen(
    query: String,
    onQueryChange: (String) -> Unit,
    actions: List<QuickAccessAction>,
    topics: List<StudyTopic>,
    onQuickActionClick: (QuickAccessAction) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 20.dp, vertical = 24.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        HeaderSection()
        SearchBar(query = query, onQueryChange = onQueryChange)
        QuickAccessSection(actions = actions, onActionClick = onQuickActionClick)
        StudyTopicsSection(topics = topics, query = query)
    }
}

@Composable
private fun HeaderSection() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(46.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(Brush.linearGradient(listOf(AccentPrimary, AccentPurple))),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Rounded.School,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(26.dp)
                )
            }
            Spacer(modifier = Modifier.size(16.dp))
            Column {
                Text(text = "Hi, Alex", style = MaterialTheme.typography.displaySmall, color = Color.White)
                Text(text = "Keep the momentum going", style = MaterialTheme.typography.bodyMedium, color = NightMuted)
            }
        }
        IconButton(onClick = { }) {
            Icon(
                imageVector = Icons.Rounded.Settings,
                contentDescription = "Settings",
                tint = Color.White
            )
        }
    }
}

@Composable
private fun SearchBar(
    query: String,
    onQueryChange: (String) -> Unit
) {
    val placeholderColor by animateColorAsState(
        targetValue = if (query.isEmpty()) NightMuted else Color.White,
        label = "searchPlaceholder"
    )
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(18.dp))
            .background(NightCard)
            .padding(horizontal = 20.dp, vertical = 14.dp)
    ) {
        if (query.isEmpty()) {
            Text(text = "Search topics, concepts...", color = placeholderColor)
        }
        BasicTextField(
            value = query,
            onValueChange = onQueryChange,
            textStyle = MaterialTheme.typography.bodyMedium.copy(color = Color.White),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
private fun QuickAccessSection(
    actions: List<QuickAccessAction>,
    onActionClick: (QuickAccessAction) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(text = "Quick Access", style = MaterialTheme.typography.headlineSmall, color = Color.White)
        LazyRow(horizontalArrangement = Arrangement.spacedBy(14.dp)) {
            items(actions) { action ->
                QuickAccessCard(action = action, onClick = { onActionClick(action) })
            }
        }
    }
}

@Composable
private fun QuickAccessCard(action: QuickAccessAction, onClick: () -> Unit) {
    val gradient = when (action.type) {
        QuickActionType.ContinueLearning -> listOf(AccentPrimary, AccentPurple)
        QuickActionType.SavedItems -> listOf(Color(0xFF233554), AccentPrimary)
        QuickActionType.PracticeQuiz -> listOf(AccentPurple, AccentCyan)
        QuickActionType.ProcessingModes -> listOf(Color(0xFF0F2027), Color(0xFF203A43))
    }
    Card(
        colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        shape = RoundedCornerShape(24.dp),
        modifier = Modifier
            .size(width = 180.dp, height = 120.dp)
            .clickable(onClick = onClick)
    ) {
        Box(
            modifier = Modifier
                .background(Brush.linearGradient(gradient))
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Column(modifier = Modifier.align(Alignment.TopStart)) {
                Icon(
                    imageVector = quickActionIcon(action.type),
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier
                        .size(32.dp)
                        .background(Color.White.copy(alpha = 0.1f), CircleShape)
                        .padding(6.dp)
                )
                Spacer(modifier = Modifier.height(18.dp))
                Text(text = action.title, color = Color.White, style = MaterialTheme.typography.titleMedium)
                Text(text = action.subtitle, color = Color.White.copy(alpha = 0.8f), style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}

private fun quickActionIcon(type: QuickActionType) = when (type) {
    QuickActionType.ContinueLearning -> Icons.Rounded.PlayArrow
    QuickActionType.SavedItems -> Icons.Rounded.BookmarkBorder
    QuickActionType.PracticeQuiz -> Icons.Rounded.MenuBook
    QuickActionType.ProcessingModes -> Icons.Rounded.DataUsage
}

@Composable
private fun StudyTopicsSection(topics: List<StudyTopic>, query: String) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = "Study Topics", style = MaterialTheme.typography.headlineSmall, color = Color.White)
                Text(text = "Plan your revision", color = NightMuted, style = MaterialTheme.typography.bodyMedium)
            }
            Text(text = "See all", color = AccentSecondary, style = MaterialTheme.typography.bodyMedium)
        }
        if (topics.isEmpty()) {
            EmptyState(query = query)
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                topics.forEach { topic -> TopicCard(topic) }
            }
        }
    }
}

@Composable
private fun TopicCard(topic: StudyTopic) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = NightCard),
        shape = RoundedCornerShape(24.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(topicIconGradient(topic.category)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = topic.category.icon(),
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(26.dp)
                )
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(text = topic.title, color = Color.White, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = "${topic.lessons} Lessons",
                    color = NightMuted,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(10.dp))
                LinearProgressIndicator(
                    progress = topic.completedPercentage / 100f,
                    modifier = Modifier.fillMaxWidth(),
                    trackColor = Color.White.copy(alpha = 0.1f),
                    color = AccentPrimary
                )
            }
            Text(
                text = "${topic.completedPercentage}%",
                color = Color.White,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.width(40.dp),
                textAlign = TextAlign.End
            )
        }
    }
}

@Composable
private fun EmptyState(query: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = NightCard)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                imageVector = Icons.Rounded.MenuBook,
                contentDescription = null,
                tint = AccentPrimary,
                modifier = Modifier
                    .size(36.dp)
                    .background(Color.White.copy(alpha = 0.08f), CircleShape)
                    .padding(8.dp)
            )
            Text(
                text = if (query.isBlank()) "No topics yet" else "No matches for \"$query\"",
                color = Color.White,
                style = MaterialTheme.typography.titleMedium,
                textAlign = TextAlign.Center
            )
            Text(
                text = "Try another keyword or clear the search to keep revising.",
                color = NightMuted,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center
            )
        }
    }
}

private fun topicIconGradient(category: TopicCategory) = when (category) {
    TopicCategory.Networking -> Brush.linearGradient(listOf(AccentPrimary, AccentCyan))
    TopicCategory.Databases -> Brush.linearGradient(listOf(Color(0xFF2C2F88), AccentPurple))
    TopicCategory.Cybersecurity -> Brush.linearGradient(listOf(Color(0xFF184451), AccentCyan))
    TopicCategory.Programming -> Brush.linearGradient(listOf(AccentPurple, Color(0xFFFB6FFF)))
    TopicCategory.Hardware -> Brush.linearGradient(listOf(Color(0xFF7A5CFF), Color(0xFF2BD9DF)))
    TopicCategory.EmergingTech -> Brush.linearGradient(listOf(Color(0xFF3A86FF), Color(0xFFF9D423)))
}

private fun TopicCategory.icon() = when (this) {
    TopicCategory.Networking -> Icons.Rounded.Wifi
    TopicCategory.Databases -> Icons.Rounded.Storage
    TopicCategory.Cybersecurity -> Icons.Rounded.Security
    TopicCategory.Programming -> Icons.Rounded.MenuBook
    TopicCategory.Hardware -> Icons.Rounded.Settings
    TopicCategory.EmergingTech -> Icons.Rounded.School
}

private sealed class StudyDestination(val route: String) {
    data object Home : StudyDestination("home")
    data object ProcessingModes : StudyDestination("processingModes")
    data object ProcessingModeDetail : StudyDestination("processingModes/{modeId}") {
        fun create(modeId: String) = "processingModes/$modeId"
    }
}

@Preview(showBackground = true)
@Composable
private fun HomeScreenPreview() {
    SunsetTheme {
        Surface(color = NightSurface) {
            HomeScreen(
                query = "",
                onQueryChange = {},
                actions = StudyContentRepository.quickAccess,
                topics = StudyContentRepository.studyTopics,
                onQuickActionClick = {}
            )
        }
    }
}
