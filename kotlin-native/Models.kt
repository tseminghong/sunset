package com.hpccss.ict.data.model

/**
 * Resource Data Model
 * 
 * Represents a learning resource (course, tutorial, guide, etc.)
 * Corresponds to the TypeScript interface in src/types/index.ts
 */
data class Resource(
    val id: String,
    val title: String,
    val description: String,
    val category: String,
    val tags: List<String>,
    val url: String,
    val difficulty: Difficulty = Difficulty.BEGINNER,
    val duration: String? = null, // e.g., "30 min", "2 hours"
    val progress: Float? = null, // 0.0 to 1.0
    val isFavorite: Boolean = false,
    val lastAccessed: Long? = null, // Timestamp
    val thumbnailUrl: String? = null
)

/**
 * Difficulty levels for resources
 */
enum class Difficulty {
    BEGINNER,
    INTERMEDIATE,
    ADVANCED
}

/**
 * Course Data Model
 * 
 * Represents a structured learning course
 */
data class Course(
    val id: String,
    val title: String,
    val description: String,
    val category: String,
    val tags: List<String>,
    val lessons: List<Lesson>,
    val difficulty: Difficulty = Difficulty.BEGINNER,
    val duration: String? = null,
    val progress: Float = 0f,
    val isFavorite: Boolean = false,
    val thumbnailUrl: String? = null
)

/**
 * Lesson within a course
 */
data class Lesson(
    val id: String,
    val title: String,
    val description: String,
    val content: String, // Markdown content
    val duration: String? = null,
    val isCompleted: Boolean = false,
    val order: Int
)

/**
 * Tag for filtering resources
 */
data class Tag(
    val id: String,
    val name: String,
    val category: String? = null,
    val count: Int = 0 // Number of resources with this tag
)

/**
 * User preferences and settings
 */
data class UserPreferences(
    val theme: Theme = Theme.SYSTEM,
    val language: Language = Language.ENGLISH,
    val notificationsEnabled: Boolean = true,
    val offlineMode: Boolean = false
)

enum class Theme {
    LIGHT,
    DARK,
    SYSTEM
}

enum class Language {
    ENGLISH,
    SPANISH,
    FRENCH,
    GERMAN,
    CHINESE,
    JAPANESE
}
