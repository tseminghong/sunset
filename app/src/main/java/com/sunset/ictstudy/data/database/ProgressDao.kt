package com.sunset.ictstudy.data.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface ProgressDao {
    
    /**
     * Mark a lesson as completed or uncompleted
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun updateProgress(progress: LessonProgress)
    
    /**
     * Get completion status for a specific lesson
     */
    @Query("SELECT * FROM lesson_progress WHERE lessonId = :lessonId")
    fun getProgress(lessonId: String): Flow<LessonProgress?>
    
    /**
     * Get all completed lessons (for syncing across app)
     */
    @Query("SELECT * FROM lesson_progress WHERE isCompleted = 1")
    fun getAllCompletedLessons(): Flow<List<LessonProgress>>
    
    /**
     * Calculate completion percentage for a topic
     * Returns number of completed lessons for a given topic prefix
     */
    @Query("SELECT COUNT(*) FROM lesson_progress WHERE lessonId LIKE :topicPrefix || '%' AND isCompleted = 1")
    fun getCompletedCountForTopic(topicPrefix: String): Flow<Int>
    
    /**
     * Check if a lesson is completed (synchronous for quick checks)
     */
    @Query("SELECT isCompleted FROM lesson_progress WHERE lessonId = :lessonId")
    suspend fun isLessonCompleted(lessonId: String): Boolean?
    
    /**
     * Delete all progress (for reset functionality)
     */
    @Query("DELETE FROM lesson_progress")
    suspend fun clearAllProgress()
}
