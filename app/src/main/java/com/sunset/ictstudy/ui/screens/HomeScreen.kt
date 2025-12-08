package com.sunset.ictstudy.ui.screens

import android.content.Context
import androidx.compose.animation.AnimatedContentScope
import androidx.compose.animation.ExperimentalSharedTransitionApi
import androidx.compose.animation.SharedTransitionLayout
import androidx.compose.animation.SharedTransitionScope
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import java.util.Calendar
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
import androidx.compose.foundation.layout.statusBarsPadding
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
import androidx.compose.material.icons.rounded.Code
import androidx.compose.material.icons.rounded.DataUsage
import androidx.compose.material.icons.rounded.MenuBook
import androidx.compose.material.icons.rounded.PlayArrow
import androidx.compose.material.icons.rounded.School
import androidx.compose.material.icons.rounded.Security
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material.icons.rounded.Storage
import androidx.compose.material.icons.rounded.TableChart
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.navArgument
import com.sunset.ictstudy.data.PreferencesRepository
import com.sunset.ictstudy.data.ProcessingModesRepository
import com.sunset.ictstudy.data.PythonRepository
import com.sunset.ictstudy.data.SQLRepository
import com.sunset.ictstudy.data.CybersecurityRepository
import com.sunset.ictstudy.data.QuickActionType
import com.sunset.ictstudy.data.QuickAccessAction
import com.sunset.ictstudy.data.database.QuizQuestion
import com.sunset.ictstudy.data.StudyContentRepository
import com.sunset.ictstudy.data.StudyTopic
import com.sunset.ictstudy.data.ThemeMode
import com.sunset.ictstudy.data.TopicCategory
import com.sunset.ictstudy.data.database.ProgressRepository
import com.sunset.ictstudy.ui.components.BottomNavBar
import com.sunset.ictstudy.ui.theme.AccentCyan
import com.sunset.ictstudy.ui.theme.AccentPrimary
import com.sunset.ictstudy.ui.theme.AccentPurple
import com.sunset.ictstudy.ui.theme.AccentSecondary
import com.sunset.ictstudy.ui.theme.DayMuted
import com.sunset.ictstudy.ui.theme.NightCard
import com.sunset.ictstudy.ui.theme.NightMuted
import com.sunset.ictstudy.ui.theme.NightSurface
import com.sunset.ictstudy.ui.theme.SunsetTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun IctStudyApp(context: Context) {
    val navController = rememberNavController()
    val scope = rememberCoroutineScope()
    val preferencesRepository = remember { PreferencesRepository(context) }
    val progressRepository = remember { ProgressRepository(context) }
    val favoritesRepository = remember { com.sunset.ictstudy.data.database.FavoritesRepository(context) }
    val studySessionRepository = remember { com.sunset.ictstudy.data.database.StudySessionRepository(context) }
    val userPreferences by preferencesRepository.userPreferencesFlow.collectAsState(
        initial = com.sunset.ictstudy.data.UserPreferences()
    )
    val processingModesProgress by progressRepository.getAllProcessingModesProgress().collectAsState(
        initial = emptyMap()
    )

    val startDestination = if (userPreferences.isOnboardingComplete) {
        StudyDestination.Home.route
    } else {
        StudyDestination.Welcome.route
    }
    
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: StudyDestination.Home.route
    
    // List of bottom nav routes
    val bottomNavRoutes = listOf(
        StudyDestination.Home.route,
        StudyDestination.Course.route,
        StudyDestination.Game.route,
        StudyDestination.Profile.route
    )
    
    val shouldShowBottomNav = currentRoute in bottomNavRoutes

    Surface(color = MaterialTheme.colorScheme.background, modifier = Modifier.fillMaxSize()) {
        Scaffold(
            bottomBar = {
                if (shouldShowBottomNav && userPreferences.isOnboardingComplete) {
                    BottomNavBar(
                        currentRoute = currentRoute,
                        onNavigate = { route ->
                            navController.navigate(route) {
                                popUpTo(StudyDestination.Home.route) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        ) { paddingValues ->
            SharedTransitionLayout {
                NavHost(
                    navController = navController,
                    startDestination = startDestination,
                    modifier = Modifier.padding(paddingValues)
                ) {
                composable(StudyDestination.Welcome.route) {
                WelcomeScreen(
                    onComplete = { username, themeMode ->
                        scope.launch {
                            preferencesRepository.updateUsername(username)
                            preferencesRepository.updateThemeMode(themeMode)
                            preferencesRepository.completeOnboarding()
                            navController.navigate(StudyDestination.Home.route) {
                                popUpTo(StudyDestination.Welcome.route) { inclusive = true }
                            }
                        }
                    }
                )
            }
            composable(StudyDestination.Home.route) {
                HomeRoute(
                    username = userPreferences.username,
                    progressRepository = progressRepository,
                    onOpenProcessingModes = {
                        navController.navigate(StudyDestination.ProcessingModes.route)
                    },
                    onOpenSavedItems = {
                        navController.navigate(StudyDestination.SavedItems.route)
                    },
                    onOpenQuiz = {
                        navController.navigate(StudyDestination.QuizSelection.route)
                    },
                    onOpenCalendar = {
                        navController.navigate(StudyDestination.Calendar.route)
                    },
                    onOpenStatistics = {
                        navController.navigate(StudyDestination.Statistics.route)
                    },
                    onOpenReminders = {
                        navController.navigate(StudyDestination.Reminders.route)
                    },
                    onOpenSettings = {
                        navController.navigate(StudyDestination.Settings.route)
                    },
                    onOpenPython = {
                        navController.navigate(StudyDestination.PythonTopics.route)
                    },
                    onOpenSQL = {
                        navController.navigate(StudyDestination.SQLTopics.route)
                    },
                    onOpenCybersecurity = {
                        navController.navigate(StudyDestination.CybersecurityTopics.route)
                    }
                )
            }
            composable(StudyDestination.Course.route) {
                CourseScreen(
                    onOpenPython = {
                        navController.navigate(StudyDestination.PythonTopics.route)
                    },
                    onOpenSQL = {
                        navController.navigate(StudyDestination.SQLTopics.route)
                    },
                    onOpenCybersecurity = {
                        navController.navigate(StudyDestination.CybersecurityTopics.route)
                    },
                    onOpenProcessingModes = {
                        navController.navigate(StudyDestination.ProcessingModes.route)
                    }
                )
            }
            composable(StudyDestination.Game.route) {
                GameScreen(
                    onGameSelected = { gameId ->
                        when (gameId) {
                            "sorting" -> navController.navigate(StudyDestination.SortingGame.route)
                            "quiz" -> navController.navigate(StudyDestination.QuizSelection.route)
                        }
                    }
                )
            }
            composable(StudyDestination.Profile.route) {
                ProfileScreen(
                    context = context,
                    username = userPreferences.username,
                    onOpenSettings = {
                        navController.navigate(StudyDestination.Settings.route)
                    },
                    onOpenStatistics = {
                        navController.navigate(StudyDestination.Statistics.route)
                    },
                    onOpenReminders = {
                        navController.navigate(StudyDestination.Reminders.route)
                    },
                    onOpenSavedItems = {
                        navController.navigate(StudyDestination.SavedItems.route)
                    }
                )
            }
            composable(
                route = StudyDestination.SortingGame.route,
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) {
                SortingGameScreen(
                    onBack = { navController.popBackStack() }
                )
            }
            composable(
                route = StudyDestination.ProcessingModes.route,
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) {
                ProcessingModesScreen(
                    modes = ProcessingModesRepository.processingModes,
                    readStates = processingModesProgress,
                    onBack = { navController.popBackStack() },
                    onModeSelected = { mode ->
                        navController.navigate(StudyDestination.ProcessingModeDetail.create(mode.id))
                    }
                )
            }
            composable(
                route = StudyDestination.ProcessingModeDetail.route,
                arguments = listOf(navArgument("modeId") { type = NavType.StringType }),
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) { entry ->
                val modeId = entry.arguments?.getString("modeId") ?: return@composable
                val mode = ProcessingModesRepository.getMode(modeId)
                if (mode == null) {
                    navController.popBackStack()
                } else {
                    val modeRead = processingModesProgress[mode.id] ?: mode.isCompleted
                    val isFavorited by favoritesRepository.isFavorited(mode.id).collectAsState(initial = false)
                    ProcessingModeDetailScreen(
                        mode = mode,
                        isRead = modeRead,
                        isFavorited = isFavorited,
                        onToggleRead = { updated ->
                            scope.launch {
                                progressRepository.markProcessingModeComplete(mode.id, updated)
                            }
                        },
                        onToggleFavorite = {
                            scope.launch {
                                favoritesRepository.toggleFavorite(
                                    itemId = mode.id,
                                    title = mode.title,
                                    subtitle = mode.description,
                                    type = "processing_mode"
                                )
                            }
                        },
                        onBack = { navController.popBackStack() }
                    )
                }
            }
            composable(
                route = StudyDestination.PythonTopics.route,
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) {
                PythonTopicsScreen(
                    topics = PythonRepository.pythonTopics,
                    onBack = { navController.popBackStack() },
                    onTopicSelected = { topic ->
                        navController.navigate(StudyDestination.PythonTopicDetail.create(topic.id))
                    }
                )
            }
            composable(
                route = StudyDestination.PythonTopicDetail.route,
                arguments = listOf(navArgument("topicId") { type = NavType.StringType }),
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) { entry ->
                val topicId = entry.arguments?.getString("topicId") ?: return@composable
                val topic = PythonRepository.getTopic(topicId)
                if (topic == null) {
                    navController.popBackStack()
                } else {
                    PythonTopicDetailScreen(
                        topic = topic,
                        onBack = { navController.popBackStack() }
                    )
                }
            }
            composable(
                route = StudyDestination.SQLTopics.route,
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) {
                SQLTopicsScreen(
                    topics = SQLRepository.sqlTopics,
                    onBack = { navController.popBackStack() },
                    onTopicSelected = { topic ->
                        navController.navigate(StudyDestination.SQLTopicDetail.create(topic.id))
                    }
                )
            }
            composable(
                route = StudyDestination.SQLTopicDetail.route,
                arguments = listOf(navArgument("topicId") { type = NavType.StringType }),
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) { entry ->
                val topicId = entry.arguments?.getString("topicId") ?: return@composable
                val topic = SQLRepository.getTopic(topicId)
                if (topic == null) {
                    navController.popBackStack()
                } else {
                    SQLTopicDetailScreen(
                        topic = topic,
                        onBack = { navController.popBackStack() }
                    )
                }
            }
            composable(
                route = StudyDestination.CybersecurityTopics.route,
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) {
                CybersecurityTopicsScreen(
                    topics = CybersecurityRepository.cybersecurityTopics,
                    onBack = { navController.popBackStack() },
                    onTopicSelected = { topic ->
                        navController.navigate(StudyDestination.CybersecurityTopicDetail.create(topic.id))
                    }
                )
            }
            composable(
                route = StudyDestination.CybersecurityTopicDetail.route,
                arguments = listOf(navArgument("topicId") { type = NavType.StringType }),
                enterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                exitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                },
                popEnterTransition = {
                    slideInHorizontally(
                        initialOffsetX = { -it / 3 },
                        animationSpec = tween(400)
                    ) + fadeIn(animationSpec = tween(400))
                },
                popExitTransition = {
                    slideOutHorizontally(
                        targetOffsetX = { it },
                        animationSpec = tween(400)
                    ) + fadeOut(animationSpec = tween(400))
                }
            ) { entry ->
                val topicId = entry.arguments?.getString("topicId") ?: return@composable
                val topic = CybersecurityRepository.getTopic(topicId)
                if (topic == null) {
                    navController.popBackStack()
                } else {
                    CybersecurityTopicDetailScreen(
                        topic = topic,
                        onBack = { navController.popBackStack() }
                    )
                }
            }
            composable(StudyDestination.SavedItems.route) {
                val favorites by favoritesRepository.getAllFavorites().collectAsState(initial = emptyList())
                SavedItemsScreen(
                    favorites = favorites,
                    onBack = { navController.popBackStack() },
                    onRemoveFavorite = { itemId ->
                        scope.launch {
                            favoritesRepository.removeFavorite(itemId)
                        }
                    },
                    onItemClick = { favorite ->
                        when (favorite.type) {
                            "processing_mode" -> {
                                navController.navigate(StudyDestination.ProcessingModeDetail.create(favorite.itemId))
                            }
                        }
                    }
                )
            }
            composable(StudyDestination.QuizSelection.route) {
                val availableTopics = listOf(
                    "processing_modes" to "Data Processing Modes"
                )
                QuizSelectionScreen(
                    availableTopics = availableTopics,
                    onBack = { navController.popBackStack() },
                    onTopicSelected = { topicId, topicName ->
                        navController.navigate(StudyDestination.QuizTaking.create(topicId, topicName))
                    }
                )
            }
            composable(
                route = StudyDestination.QuizTaking.route,
                arguments = listOf(
                    navArgument("topicId") { type = NavType.StringType },
                    navArgument("topicName") { type = NavType.StringType }
                )
            ) { entry ->
                val topicId = entry.arguments?.getString("topicId") ?: return@composable
                val topicName = entry.arguments?.getString("topicName") ?: return@composable
                val quizRepository = remember { com.sunset.ictstudy.data.database.QuizRepository(context) }
                
                var questions by remember { mutableStateOf<List<QuizQuestion>>(emptyList()) }
                
                LaunchedEffect(Unit) {
                    questions = quizRepository.getQuestionsForTopic(topicId, count = 5)
                    if (questions.isEmpty()) {
                        quizRepository.addSampleQuestions()
                        questions = quizRepository.getQuestionsForTopic(topicId, count = 5)
                    }
                }
                
                if (questions.isNotEmpty()) {
                    QuizTakingScreen(
                        topicName = topicName,
                        questions = questions,
                        onQuizComplete = { total, correct, duration ->
                            scope.launch {
                                quizRepository.saveQuizResult(topicId, total, correct, duration.toInt())
                            }
                            navController.navigate(
                                StudyDestination.QuizResults.create(topicId, topicName, total, correct, duration)
                            ) {
                                popUpTo(StudyDestination.QuizSelection.route)
                            }
                        },
                        onBack = { navController.popBackStack() }
                    )
                }
            }
            composable(
                route = StudyDestination.QuizResults.route,
                arguments = listOf(
                    navArgument("topicId") { type = NavType.StringType },
                    navArgument("topicName") { type = NavType.StringType },
                    navArgument("total") { type = NavType.IntType },
                    navArgument("correct") { type = NavType.IntType },
                    navArgument("duration") { type = NavType.LongType }
                )
            ) { entry ->
                val topicId = entry.arguments?.getString("topicId") ?: return@composable
                val topicName = entry.arguments?.getString("topicName") ?: return@composable
                val total = entry.arguments?.getInt("total") ?: 0
                val correct = entry.arguments?.getInt("correct") ?: 0
                val duration = entry.arguments?.getLong("duration") ?: 0L
                
                QuizResultsScreen(
                    topicName = topicName,
                    totalQuestions = total,
                    correctAnswers = correct,
                    durationSeconds = duration,
                    onRetake = {
                        navController.navigate(StudyDestination.QuizTaking.create(topicId, topicName)) {
                            popUpTo(StudyDestination.QuizResults.route) { inclusive = true }
                        }
                    },
                    onBack = {
                        navController.navigate(StudyDestination.QuizSelection.route) {
                            popUpTo(StudyDestination.QuizResults.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(StudyDestination.Calendar.route) {
                val currentMonth = remember { Calendar.getInstance() }
                val sessions by studySessionRepository.getSessionsForMonth(
                    currentMonth.get(Calendar.YEAR),
                    currentMonth.get(Calendar.MONTH) + 1
                ).collectAsState(initial = emptyList())
                
                CalendarScreen(
                    sessions = sessions,
                    onBack = { navController.popBackStack() },
                    onAddSession = { title, scheduledDate, duration ->
                        scope.launch {
                            studySessionRepository.createSession(
                                title = title,
                                description = "",
                                topicId = null,
                                scheduledDate = scheduledDate,
                                durationMinutes = duration
                            )
                        }
                    },
                    onToggleComplete = { sessionId, isCompleted ->
                        scope.launch {
                            studySessionRepository.markComplete(sessionId, isCompleted)
                        }
                    }
                )
            }
            composable(StudyDestination.Statistics.route) {
                val studyActivityRepository = remember { com.sunset.ictstudy.data.database.StudyActivityRepository(context) }
                var stats by remember { mutableStateOf(com.sunset.ictstudy.data.database.StudyStats(0, 0, 0)) }
                
                LaunchedEffect(Unit) {
                    stats = studyActivityRepository.getTotalStats()
                }
                
                val recentActivity by studyActivityRepository.getRecentActivity(30)
                    .collectAsState(initial = emptyList())
                
                StatisticsScreen(
                    stats = stats,
                    recentActivity = recentActivity,
                    onBack = { navController.popBackStack() }
                )
            }
            composable(StudyDestination.Reminders.route) {
                val reminderRepository = remember { com.sunset.ictstudy.data.database.StudyReminderRepository(context) }
                val reminderManager = remember { com.sunset.ictstudy.notifications.StudyReminderManager(context) }
                val reminders by reminderRepository.getAllReminders().collectAsState(initial = emptyList())
                
                RemindersScreen(
                    reminders = reminders,
                    onBack = { navController.popBackStack() },
                    onAddReminder = { title, message, hour, minute, days ->
                        scope.launch {
                            val id = reminderRepository.createReminder(title, message, hour, minute, days).toInt()
                            reminderManager.scheduleReminder(id, title, message, hour, minute, days)
                        }
                    },
                    onToggleReminder = { reminderId, enabled ->
                        scope.launch {
                            reminderRepository.toggleReminder(reminderId, enabled)
                            val reminder = reminders.find { it.id == reminderId }
                            if (reminder != null) {
                                val days = parseDaysOfWeek(reminder.daysOfWeek)
                                if (enabled) {
                                    reminderManager.scheduleReminder(
                                        reminderId, reminder.title, reminder.message,
                                        reminder.hour, reminder.minute, days
                                    )
                                } else {
                                    reminderManager.cancelReminder(reminderId, days)
                                }
                            }
                        }
                    },
                    onDeleteReminder = { reminder ->
                        scope.launch {
                            reminderRepository.deleteReminder(reminder)
                            val days = parseDaysOfWeek(reminder.daysOfWeek)
                            reminderManager.cancelReminder(reminder.id, days)
                        }
                    }
                )
            }
            composable(StudyDestination.Settings.route) {
                SettingsScreen(
                    username = userPreferences.username,
                    preferences = userPreferences,
                    onUsernameChange = { newUsername ->
                        scope.launch {
                            preferencesRepository.updateUsername(newUsername)
                        }
                    },
                    onThemeModeChange = { themeMode ->
                        scope.launch {
                            preferencesRepository.updateThemeMode(themeMode)
                        }
                    },
                    onDailyGoalChange = { enabled ->
                        scope.launch {
                            preferencesRepository.updateDailyGoalEnabled(enabled)
                        }
                    },
                    onNotificationsChange = { enabled ->
                        scope.launch {
                            preferencesRepository.updateNotificationsEnabled(enabled)
                        }
                    },
                    onSoundChange = { enabled ->
                        scope.launch {
                            preferencesRepository.updateSoundEnabled(enabled)
                        }
                    },
                    onClearAllData = {
                        scope.launch {
                            preferencesRepository.clearAllData()
                            // TODO: Also clear Room database if needed
                        }
                    },
                    onBack = { navController.popBackStack() }
                )
            }
                }
            }
        }
    }
}

private fun parseDaysOfWeek(daysJson: String): List<Int> {
    return try {
        daysJson.trim('[', ']').split(",").map { it.trim().toInt() }
    } catch (e: Exception) {
        emptyList()
    }
}

@Composable
private fun HomeRoute(
    username: String, 
    progressRepository: ProgressRepository, 
    onOpenProcessingModes: () -> Unit,
    onOpenSavedItems: () -> Unit,
    onOpenQuiz: () -> Unit,
    onOpenCalendar: () -> Unit,
    onOpenStatistics: () -> Unit,
    onOpenReminders: () -> Unit,
    onOpenSettings: () -> Unit,
    onOpenPython: () -> Unit,
    onOpenSQL: () -> Unit,
    onOpenCybersecurity: () -> Unit
) {
    var query by rememberSaveable { mutableStateOf("") }
    val baseTopics = StudyContentRepository.studyTopics
    
    // Collect dynamic progress for each topic
    val topicsWithProgress = baseTopics.map { topic ->
        val progress by progressRepository.getTopicCompletionPercentage(
            topicId = topic.id,
            category = topic.category,
            totalLessons = topic.lessons
        ).collectAsState(initial = 0)
        
        topic.copy(completedPercentage = progress)
    }
    
    val filteredTopics = remember(query, topicsWithProgress) {
        topicsWithProgress.filter { topic ->
            query.isBlank() || topic.title.contains(query, ignoreCase = true)
        }
    }

    HomeScreen(
        username = username,
        query = query,
        onQueryChange = { query = it },
        actions = StudyContentRepository.quickAccess,
        topics = filteredTopics,
        onQuickActionClick = { action ->
            when (action.type) {
                QuickActionType.SavedItems -> onOpenSavedItems()
                QuickActionType.PracticeQuiz -> onOpenQuiz()
                QuickActionType.StudyCalendar -> onOpenCalendar()
                QuickActionType.Statistics -> onOpenStatistics()
                QuickActionType.Reminders -> onOpenReminders()
                else -> {}
            }
        },
        onTopicClick = { topic ->
            when (topic.category) {
                TopicCategory.ProcessingModes -> onOpenProcessingModes()
                TopicCategory.Python -> onOpenPython()
                TopicCategory.SQL -> onOpenSQL()
                TopicCategory.Cybersecurity -> onOpenCybersecurity()
                else -> {}
            }
        },
        onOpenSettings = onOpenSettings
    )
}

@Composable
private fun HomeScreen(
    username: String,
    query: String,
    onQueryChange: (String) -> Unit,
    actions: List<QuickAccessAction>,
    topics: List<StudyTopic>,
    onQuickActionClick: (QuickAccessAction) -> Unit,
    onTopicClick: (StudyTopic) -> Unit,
    onOpenSettings: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .statusBarsPadding()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 18.dp, vertical = 20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        HeaderSection(username = username, onOpenSettings = onOpenSettings)
        SearchBar(query = query, onQueryChange = onQueryChange)
        QuickAccessSection(actions = actions, onActionClick = onQuickActionClick)
        StudyTopicsSection(topics = topics, query = query, onTopicClick = onTopicClick)
    }
}

@Composable
private fun HeaderSection(username: String, onOpenSettings: () -> Unit) {
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
            Spacer(modifier = Modifier.size(12.dp))
            Column {
                Text(text = "Hi, $username", style = MaterialTheme.typography.headlineMedium, color = MaterialTheme.colorScheme.onBackground)
                Text(text = "Keep the momentum going", style = MaterialTheme.typography.bodyMedium, color = if (MaterialTheme.colorScheme.background == NightSurface) NightMuted else DayMuted)
            }
        }
        IconButton(onClick = onOpenSettings) {
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
    val isDark = MaterialTheme.colorScheme.background == NightSurface
    val mutedColor = if (isDark) NightMuted else DayMuted
    val textColor = MaterialTheme.colorScheme.onBackground
    
    val placeholderColor by animateColorAsState(
        targetValue = if (query.isEmpty()) mutedColor else textColor,
        label = "searchPlaceholder"
    )
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(18.dp))
            .background(MaterialTheme.colorScheme.surface)
            .padding(horizontal = 20.dp, vertical = 14.dp)
    ) {
        if (query.isEmpty()) {
            Text(text = "Search topics, concepts...", color = placeholderColor)
        }
        BasicTextField(
            value = query,
            onValueChange = onQueryChange,
            textStyle = MaterialTheme.typography.bodyMedium.copy(color = textColor),
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
        Text(text = "Quick Access", style = MaterialTheme.typography.headlineSmall, color = MaterialTheme.colorScheme.onBackground)
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
        QuickActionType.StudyCalendar -> listOf(AccentPrimary, AccentPurple)
        QuickActionType.Statistics -> listOf(Color(0xFF6366F1), Color(0xFF8B5CF6))
        QuickActionType.Reminders -> listOf(Color(0xFF10B981), Color(0xFF059669))
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
    QuickActionType.StudyCalendar -> Icons.Rounded.DataUsage
    QuickActionType.Statistics -> Icons.Rounded.School
    QuickActionType.Reminders -> Icons.Rounded.Settings
}

@Composable
private fun StudyTopicsSection(topics: List<StudyTopic>, query: String, onTopicClick: (StudyTopic) -> Unit) {
    val isDark = MaterialTheme.colorScheme.background == NightSurface
    val mutedColor = if (isDark) NightMuted else DayMuted
    
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = "Study Topics", style = MaterialTheme.typography.headlineSmall, color = MaterialTheme.colorScheme.onBackground)
                Text(text = "Plan your revision", color = mutedColor, style = MaterialTheme.typography.bodyMedium)
            }
            Text(text = "See all", color = AccentSecondary, style = MaterialTheme.typography.bodyMedium)
        }
        if (topics.isEmpty()) {
            EmptyState(query = query)
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                topics.forEach { topic -> TopicCard(topic, onClick = { onTopicClick(topic) }) }
            }
        }
    }
}

@Composable
private fun TopicCard(topic: StudyTopic, onClick: () -> Unit) {
    val isDark = MaterialTheme.colorScheme.background == NightSurface
    val mutedColor = if (isDark) NightMuted else DayMuted
    val trackColor = if (isDark) Color.White.copy(alpha = 0.1f) else Color.Black.copy(alpha = 0.1f)
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
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
                Text(text = topic.title, color = MaterialTheme.colorScheme.onBackground, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = "${topic.lessons} Lessons",
                    color = mutedColor,
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(10.dp))
                LinearProgressIndicator(
                    progress = topic.completedPercentage / 100f,
                    modifier = Modifier.fillMaxWidth(),
                    trackColor = trackColor,
                    color = AccentPrimary
                )
            }
            Text(
                text = "${topic.completedPercentage}%",
                color = MaterialTheme.colorScheme.onBackground,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.width(40.dp),
                textAlign = TextAlign.End
            )
        }
    }
}

@Composable
private fun EmptyState(query: String) {
    val isDark = MaterialTheme.colorScheme.background == NightSurface
    val mutedColor = if (isDark) NightMuted else DayMuted
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
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
                    .background(if (isDark) Color.White.copy(alpha = 0.08f) else Color.Black.copy(alpha = 0.05f), CircleShape)
                    .padding(8.dp)
            )
            Text(
                text = if (query.isBlank()) "No topics yet" else "No matches for \"$query\"",
                color = MaterialTheme.colorScheme.onBackground,
                style = MaterialTheme.typography.titleMedium,
                textAlign = TextAlign.Center
            )
            Text(
                text = "Try another keyword or clear the search to keep revising.",
                color = mutedColor,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center
            )
        }
    }
}

private fun topicIconGradient(category: TopicCategory) = when (category) {
    TopicCategory.ProcessingModes -> Brush.linearGradient(listOf(AccentPrimary, AccentCyan))
    TopicCategory.Databases -> Brush.linearGradient(listOf(Color(0xFF2C2F88), AccentPurple))
    TopicCategory.Cybersecurity -> Brush.linearGradient(listOf(Color(0xFF184451), AccentCyan))
    TopicCategory.Programming -> Brush.linearGradient(listOf(AccentPurple, Color(0xFFFB6FFF)))
    TopicCategory.Hardware -> Brush.linearGradient(listOf(Color(0xFF7A5CFF), Color(0xFF2BD9DF)))
    TopicCategory.Python -> Brush.linearGradient(listOf(Color(0xFF3776AB), Color(0xFFFFD43B)))
    TopicCategory.SQL -> Brush.linearGradient(listOf(Color(0xFF00758F), Color(0xFFE97451)))
}

private fun TopicCategory.icon() = when (this) {
    TopicCategory.ProcessingModes -> Icons.Rounded.DataUsage
    TopicCategory.Databases -> Icons.Rounded.Storage
    TopicCategory.Cybersecurity -> Icons.Rounded.Security
    TopicCategory.Programming -> Icons.Rounded.MenuBook
    TopicCategory.Hardware -> Icons.Rounded.Settings
    TopicCategory.Python -> Icons.Rounded.Code
    TopicCategory.SQL -> Icons.Rounded.TableChart
}

private sealed class StudyDestination(val route: String) {
    data object Welcome : StudyDestination("welcome")
    data object Home : StudyDestination("home")
    data object Course : StudyDestination("course")
    data object Game : StudyDestination("game")
    data object Profile : StudyDestination("me")
    data object ProcessingModes : StudyDestination("processingModes")
    data object ProcessingModeDetail : StudyDestination("processingModes/{modeId}") {
        fun create(modeId: String) = "processingModes/$modeId"
    }
    data object PythonTopics : StudyDestination("pythonTopics")
    data object PythonTopicDetail : StudyDestination("pythonTopics/{topicId}") {
        fun create(topicId: String) = "pythonTopics/$topicId"
    }
    data object SQLTopics : StudyDestination("sqlTopics")
    data object SQLTopicDetail : StudyDestination("sqlTopics/{topicId}") {
        fun create(topicId: String) = "sqlTopics/$topicId"
    }
    data object CybersecurityTopics : StudyDestination("cybersecurityTopics")
    data object CybersecurityTopicDetail : StudyDestination("cybersecurityTopics/{topicId}") {
        fun create(topicId: String) = "cybersecurityTopics/$topicId"
    }
    data object SortingGame : StudyDestination("sortingGame")
    data object SavedItems : StudyDestination("savedItems")
    data object QuizSelection : StudyDestination("quizSelection")
    data object QuizTaking : StudyDestination("quiz/{topicId}/{topicName}") {
        fun create(topicId: String, topicName: String) = "quiz/$topicId/$topicName"
    }
    data object QuizResults : StudyDestination("quizResults/{topicId}/{topicName}/{total}/{correct}/{duration}") {
        fun create(topicId: String, topicName: String, total: Int, correct: Int, duration: Long) =
            "quizResults/$topicId/$topicName/$total/$correct/$duration"
    }
    data object Calendar : StudyDestination("calendar")
    data object Statistics : StudyDestination("statistics")
    data object Reminders : StudyDestination("reminders")
    data object Settings : StudyDestination("settings")
}

@Preview(showBackground = true)
@Composable
private fun HomeScreenPreview() {
    SunsetTheme {
        Surface(color = NightSurface) {
            HomeScreen(
                username = "Alex",
                query = "",
                onQueryChange = {},
                actions = StudyContentRepository.quickAccess,
                topics = StudyContentRepository.studyTopics,
                onQuickActionClick = {},
                onTopicClick = {},
                onOpenSettings = {}
            )
        }
    }
}
