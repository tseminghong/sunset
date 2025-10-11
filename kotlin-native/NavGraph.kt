package com.hpccss.ict.ui.navigation

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.hpccss.ict.ui.screens.*

/**
 * Main Navigation Graph
 * 
 * Sets up navigation between all screens with animated transitions
 */
@Composable
fun NavGraph(
    navController: NavHostController = rememberNavController(),
    startDestination: String = Screen.Home.route
) {
    NavHost(
        navController = navController,
        startDestination = startDestination,
        enterTransition = {
            slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Left,
                animationSpec = tween(300)
            ) + fadeIn(animationSpec = tween(300))
        },
        exitTransition = {
            slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Left,
                animationSpec = tween(300)
            ) + fadeOut(animationSpec = tween(300))
        },
        popEnterTransition = {
            slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Right,
                animationSpec = tween(300)
            ) + fadeIn(animationSpec = tween(300))
        },
        popExitTransition = {
            slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Right,
                animationSpec = tween(300)
            ) + fadeOut(animationSpec = tween(300))
        }
    ) {
        // Home screen
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigateToResource = { resourceId ->
                    // Navigate to resource detail
                },
                onNavigateToCourse = { courseId ->
                    navController.navigate(Screen.CourseDetail.createRoute(courseId))
                }
            )
        }

        // Courses list screen
        composable(Screen.Courses.route) {
            CoursesScreen(
                onCourseClick = { courseId ->
                    navController.navigate(Screen.CourseDetail.createRoute(courseId))
                }
            )
        }

        // Course detail screen
        composable(Screen.CourseDetail.route) { backStackEntry ->
            val courseId = backStackEntry.arguments?.getString("courseId") ?: ""
            CourseDetailScreen(
                courseId = courseId,
                onLessonClick = { lessonId ->
                    navController.navigate(Screen.LessonDetail.createRoute(lessonId))
                },
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }

        // Lesson detail screen
        composable(Screen.LessonDetail.route) { backStackEntry ->
            val lessonId = backStackEntry.arguments?.getString("lessonId") ?: ""
            LessonDetailScreen(
                lessonId = lessonId,
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }

        // About screen
        composable(Screen.About.route) {
            AboutScreen()
        }

        // Settings screen
        composable(Screen.Settings.route) {
            SettingsScreen()
        }

        // Subject-specific screens
        composable(Screen.DSE.route) {
            SubjectScreen(
                subject = "Data Storage and Exchange",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.Hardware.route) {
            SubjectScreen(
                subject = "Hardware",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.Software.route) {
            SubjectScreen(
                subject = "Software",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.Python.route) {
            SubjectScreen(
                subject = "Python Programming",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.JavaScript.route) {
            SubjectScreen(
                subject = "JavaScript",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.SQL.route) {
            SubjectScreen(
                subject = "SQL",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.HTMLLearning.route) {
            SubjectScreen(
                subject = "HTML Learning",
                onBackClick = { navController.popBackStack() }
            )
        }

        composable(Screen.ProcessingModes.route) {
            SubjectScreen(
                subject = "Processing Modes",
                onBackClick = { navController.popBackStack() }
            )
        }
    }
}

/**
 * Main scaffold with bottom navigation
 */
@Composable
fun MainScaffold() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    Scaffold(
        bottomBar = {
            // Only show bottom nav on main screens
            if (currentDestination?.route in bottomNavItems.map { it.screen.route }) {
                NavigationBar {
                    bottomNavItems.forEach { item ->
                        val selected = currentDestination?.hierarchy?.any { 
                            it.route == item.screen.route 
                        } == true

                        NavigationBarItem(
                            icon = {
                                Icon(
                                    imageVector = item.icon,
                                    contentDescription = item.title
                                )
                            },
                            label = { Text(item.title) },
                            selected = selected,
                            onClick = {
                                navController.navigate(item.screen.route) {
                                    // Pop up to the start destination to avoid building up back stack
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    // Avoid multiple copies of same destination
                                    launchSingleTop = true
                                    // Restore state when reselecting a previously selected item
                                    restoreState = true
                                }
                            }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavGraph(
            navController = navController,
            modifier = Modifier.padding(innerPadding)
        )
    }
}
