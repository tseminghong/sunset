package com.sunset.ictstudy.data.database

import android.content.Context
import com.sunset.ictstudy.data.TopicCategory
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class ProgressRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val progressDao = db.progressDao()
    
    /**
     * Mark a processing mode as completed
     */
    suspend fun markProcessingModeComplete(modeId: String, isComplete: Boolean) {
        val lessonId = "processing_$modeId"
        progressDao.updateProgress(
            LessonProgress(
                lessonId = lessonId,
                isCompleted = isComplete,
                completedAt = if (isComplete) System.currentTimeMillis() else null
            )
        )
    }
    
    /**
     * Check if a processing mode is completed
     */
    fun isProcessingModeComplete(modeId: String): Flow<Boolean> {
        return progressDao.getProgress("processing_$modeId")
            .map { it?.isCompleted ?: false }
    }
    
    /**
     * Get all completed processing modes as a map
     */
    fun getAllProcessingModesProgress(): Flow<Map<String, Boolean>> {
        return progressDao.getAllCompletedLessons()
            .map { progressList ->
                progressList
                    .filter { it.lessonId.startsWith("processing_") }
                    .associate { 
                        it.lessonId.removePrefix("processing_") to it.isCompleted
                    }
            }
    }
    
    /**
     * Calculate completion percentage for a study topic
     * For now, Processing Modes has 5 lessons (the 5 modes)
     */
    fun getTopicCompletionPercentage(topicId: Int, category: TopicCategory, totalLessons: Int): Flow<Int> {
        return when (category) {
            TopicCategory.ProcessingModes -> {
                // For processing modes, count completed modes out of 5
                progressDao.getCompletedCountForTopic("processing_")
                    .map { completedCount ->
                        ((completedCount.toFloat() / totalLessons) * 100).toInt()
                    }
            }
            else -> {
                // For other topics, use topic-specific prefix
                val topicPrefix = "topic_${topicId}_"
                progressDao.getCompletedCountForTopic(topicPrefix)
                    .map { completedCount ->
                        ((completedCount.toFloat() / totalLessons) * 100).toInt()
                    }
            }
        }
    }
    
    /**
     * Mark a lesson in a topic as complete
     */
    suspend fun markTopicLessonComplete(topicId: Int, lessonNumber: Int, isComplete: Boolean) {
        val lessonId = "topic_${topicId}_$lessonNumber"
        progressDao.updateProgress(
            LessonProgress(
                lessonId = lessonId,
                isCompleted = isComplete,
                completedAt = if (isComplete) System.currentTimeMillis() else null
            )
        )
    }
    
    /**
     * Clear all progress (for reset)
     */
    suspend fun clearAllProgress() {
        progressDao.clearAllProgress()
    }
}
