package com.sunset.ictstudy.data.database

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface FavoritesDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addFavorite(favorite: FavoriteLesson)
    
    @Delete
    suspend fun removeFavorite(favorite: FavoriteLesson)
    
    @Query("DELETE FROM favorite_lessons WHERE itemId = :itemId")
    suspend fun removeFavoriteById(itemId: String)
    
    @Query("SELECT * FROM favorite_lessons ORDER BY savedAt DESC")
    fun getAllFavorites(): Flow<List<FavoriteLesson>>
    
    @Query("SELECT EXISTS(SELECT 1 FROM favorite_lessons WHERE itemId = :itemId)")
    fun isFavorited(itemId: String): Flow<Boolean>
    
    @Query("SELECT EXISTS(SELECT 1 FROM favorite_lessons WHERE itemId = :itemId)")
    suspend fun isFavoritedSync(itemId: String): Boolean
}

@Dao
interface StudySessionDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addSession(session: StudySession): Long
    
    @Delete
    suspend fun deleteSession(session: StudySession)
    
    @Query("SELECT * FROM study_sessions WHERE scheduledDate >= :startDate AND scheduledDate <= :endDate ORDER BY scheduledDate ASC")
    fun getSessionsInRange(startDate: Long, endDate: Long): Flow<List<StudySession>>
    
    @Query("SELECT * FROM study_sessions ORDER BY scheduledDate ASC")
    fun getAllSessions(): Flow<List<StudySession>>
    
    @Query("UPDATE study_sessions SET isCompleted = :completed WHERE id = :sessionId")
    suspend fun markSessionComplete(sessionId: Int, completed: Boolean)
    
    @Query("SELECT * FROM study_sessions WHERE scheduledDate >= :today AND isCompleted = 0 ORDER BY scheduledDate ASC LIMIT 5")
    fun getUpcomingSessions(today: Long): Flow<List<StudySession>>
}

@Dao
interface QuizDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuestion(question: QuizQuestion): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuestions(questions: List<QuizQuestion>)
    
    @Query("SELECT * FROM quiz_questions WHERE topicId = :topicId")
    suspend fun getQuestionsForTopic(topicId: String): List<QuizQuestion>
    
    @Query("SELECT * FROM quiz_questions WHERE topicId = :topicId AND difficulty = :difficulty")
    suspend fun getQuestionsByDifficulty(topicId: String, difficulty: String): List<QuizQuestion>
    
    @Insert
    suspend fun saveQuizResult(result: QuizResult)
    
    @Query("SELECT * FROM quiz_results WHERE topicId = :topicId ORDER BY completedAt DESC")
    fun getResultsForTopic(topicId: String): Flow<List<QuizResult>>
    
    @Query("SELECT * FROM quiz_results ORDER BY completedAt DESC LIMIT 10")
    fun getRecentResults(): Flow<List<QuizResult>>
    
    @Query("SELECT AVG(questionsCorrect * 100.0 / questionsTotal) FROM quiz_results WHERE topicId = :topicId")
    suspend fun getAverageScoreForTopic(topicId: String): Double?
}
