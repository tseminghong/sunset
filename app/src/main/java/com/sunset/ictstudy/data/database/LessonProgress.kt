package com.sunset.ictstudy.data.database

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Entity to track completion progress of individual lessons/topics.
 * For study topics (like Databases, Cybersecurity), lessonId format: "topic_{topicId}_{lessonNumber}"
 * For processing modes, lessonId format: "processing_{modeId}"
 */
@Entity(tableName = "lesson_progress")
data class LessonProgress(
    @PrimaryKey
    val lessonId: String,
    val isCompleted: Boolean = false,
    val completedAt: Long? = null // Timestamp when marked complete
)
