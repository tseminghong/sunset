package com.sunset.ictstudy.data.database

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Entity to track favorited/bookmarked lessons and processing modes
 */
@Entity(tableName = "favorite_lessons")
data class FavoriteLesson(
    @PrimaryKey
    val itemId: String, // Format: "processing_{modeId}" or "topic_{topicId}_{lessonNumber}"
    val title: String,
    val subtitle: String,
    val type: String, // "processing_mode" or "topic_lesson"
    val savedAt: Long = System.currentTimeMillis()
)

/**
 * Entity to track study sessions/calendar events
 */
@Entity(tableName = "study_sessions")
data class StudySession(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val description: String,
    val topicId: String?, // Optional link to specific topic/mode
    val scheduledDate: Long, // Timestamp
    val durationMinutes: Int,
    val isCompleted: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)

/**
 * Entity to store quiz questions
 */
@Entity(tableName = "quiz_questions")
data class QuizQuestion(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val topicId: String, // Which topic this question belongs to
    val questionText: String,
    val options: String, // JSON array of options
    val correctAnswer: Int, // Index of correct option
    val difficulty: String // "easy", "medium", "hard"
)

/**
 * Entity to track quiz results
 */
@Entity(tableName = "quiz_results")
data class QuizResult(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val topicId: String,
    val questionsTotal: Int,
    val questionsCorrect: Int,
    val completedAt: Long = System.currentTimeMillis(),
    val durationSeconds: Int
)

/**
 * Entity to store user notes for lessons
 */
@Entity(tableName = "lesson_notes")
data class LessonNote(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val lessonId: String, // Which lesson this note belongs to
    val title: String,
    val content: String,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

/**
 * Entity to track study streaks
 */
@Entity(tableName = "study_activity")
data class StudyActivity(
    @PrimaryKey
    val date: String, // Format: "yyyy-MM-dd"
    val sessionsCount: Int = 0,
    val minutesStudied: Int = 0,
    val lessonsCompleted: Int = 0,
    val quizzesTaken: Int = 0
)

/**
 * Entity to store study reminders
 */
@Entity(tableName = "study_reminders")
data class StudyReminder(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val message: String,
    val hour: Int, // 0-23
    val minute: Int, // 0-59
    val daysOfWeek: String, // JSON array: [0-6] where 0=Sunday
    val isEnabled: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)
