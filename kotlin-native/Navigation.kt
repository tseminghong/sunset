package com.hpccss.ict.ui.navigation

/**
 * Navigation Routes
 * 
 * Defines all navigation destinations in the app
 */
sealed class Screen(val route: String) {
    // Main navigation
    object Home : Screen("home")
    object Courses : Screen("courses")
    object About : Screen("about")
    object Settings : Screen("settings")
    
    // Course routes
    object CourseDetail : Screen("course/{courseId}") {
        fun createRoute(courseId: String) = "course/$courseId"
    }
    
    object LessonDetail : Screen("lesson/{lessonId}") {
        fun createRoute(lessonId: String) = "lesson/$lessonId"
    }
    
    // Subject-specific routes (matching your Next.js routes)
    object DSE : Screen("dse")
    object Hardware : Screen("hardware")
    object Software : Screen("software")
    object Python : Screen("python")
    object JavaScript : Screen("javascript")
    object SQL : Screen("sql")
    object HTMLLearning : Screen("html-learning")
    object ProcessingModes : Screen("processing-modes")
}

/**
 * Bottom navigation items
 */
sealed class BottomNavItem(
    val screen: Screen,
    val title: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    object Home : BottomNavItem(
        screen = Screen.Home,
        title = "Home",
        icon = androidx.compose.material.icons.Icons.Default.Home
    )
    
    object Courses : BottomNavItem(
        screen = Screen.Courses,
        title = "Courses",
        icon = androidx.compose.material.icons.Icons.Default.School
    )
    
    object About : BottomNavItem(
        screen = Screen.About,
        title = "About",
        icon = androidx.compose.material.icons.Icons.Default.Info
    )
    
    object Settings : BottomNavItem(
        screen = Screen.Settings,
        title = "Settings",
        icon = androidx.compose.material.icons.Icons.Default.Settings
    )
}

// List of bottom nav items for easy iteration
val bottomNavItems = listOf(
    BottomNavItem.Home,
    BottomNavItem.Courses,
    BottomNavItem.About,
    BottomNavItem.Settings
)
