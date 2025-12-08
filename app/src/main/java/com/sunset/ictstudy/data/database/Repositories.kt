package com.sunset.ictstudy.data.database

import android.content.Context
import kotlinx.coroutines.flow.Flow
import java.util.Calendar

class FavoritesRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val favoritesDao = db.favoritesDao()
    
    suspend fun addFavorite(itemId: String, title: String, subtitle: String, type: String) {
        favoritesDao.addFavorite(
            FavoriteLesson(
                itemId = itemId,
                title = title,
                subtitle = subtitle,
                type = type
            )
        )
    }
    
    suspend fun removeFavorite(itemId: String) {
        favoritesDao.removeFavoriteById(itemId)
    }
    
    fun getAllFavorites(): Flow<List<FavoriteLesson>> {
        return favoritesDao.getAllFavorites()
    }
    
    fun isFavorited(itemId: String): Flow<Boolean> {
        return favoritesDao.isFavorited(itemId)
    }
    
    suspend fun toggleFavorite(itemId: String, title: String, subtitle: String, type: String) {
        if (favoritesDao.isFavoritedSync(itemId)) {
            favoritesDao.removeFavoriteById(itemId)
        } else {
            addFavorite(itemId, title, subtitle, type)
        }
    }
}

class StudySessionRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val sessionDao = db.studySessionDao()
    
    suspend fun createSession(
        title: String,
        description: String,
        topicId: String?,
        scheduledDate: Long,
        durationMinutes: Int
    ): Long {
        return sessionDao.addSession(
            StudySession(
                title = title,
                description = description,
                topicId = topicId,
                scheduledDate = scheduledDate,
                durationMinutes = durationMinutes
            )
        )
    }
    
    suspend fun deleteSession(session: StudySession) {
        sessionDao.deleteSession(session)
    }
    
    fun getSessionsForMonth(year: Int, month: Int): Flow<List<StudySession>> {
        val calendar = Calendar.getInstance()
        calendar.set(year, month, 1, 0, 0, 0)
        val startDate = calendar.timeInMillis
        
        calendar.add(Calendar.MONTH, 1)
        calendar.add(Calendar.DAY_OF_MONTH, -1)
        val endDate = calendar.timeInMillis
        
        return sessionDao.getSessionsInRange(startDate, endDate)
    }
    
    fun getAllSessions(): Flow<List<StudySession>> {
        return sessionDao.getAllSessions()
    }
    
    fun getUpcomingSessions(): Flow<List<StudySession>> {
        return sessionDao.getUpcomingSessions(System.currentTimeMillis())
    }
    
    suspend fun markComplete(sessionId: Int, completed: Boolean) {
        sessionDao.markSessionComplete(sessionId, completed)
    }
}

class QuizRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val quizDao = db.quizDao()
    
    suspend fun addSampleQuestions() {
        // Add sample questions for Processing Modes
        val sampleQuestions = listOf(
            QuizQuestion(
                topicId = "processing_modes",
                questionText = "Which processing mode handles transactions immediately as they occur?",
                options = """["Batch Processing", "Online Processing", "Real-time Processing", "Distributed Processing"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "processing_modes",
                questionText = "What is the main advantage of Batch Processing?",
                options = """["Real-time feedback", "Handles huge data workloads efficiently", "Immediate response", "Interactive processing"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "processing_modes",
                questionText = "Which processing mode is best for stock trading systems?",
                options = """["Batch Processing", "Online Processing", "Real-time Processing", "Offline Processing"]""",
                correctAnswer = 2,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "processing_modes",
                questionText = "Distributed processing divides workload across:",
                options = """["One powerful computer", "Multiple networked computers", "Cloud only", "Mobile devices"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "processing_modes",
                questionText = "What challenge is associated with Real-time Processing?",
                options = """["Low cost", "Simple setup", "High infrastructure cost", "Slow response"]""",
                correctAnswer = 2,
                difficulty = "hard"
            )
        )
        quizDao.insertQuestions(sampleQuestions)
    }
    
    suspend fun getQuestionsForTopic(topicId: String, count: Int = 5): List<QuizQuestion> {
        val allQuestions = quizDao.getQuestionsForTopic(topicId)
        return allQuestions.shuffled().take(count)
    }
    
    suspend fun saveQuizResult(topicId: String, total: Int, correct: Int, durationSeconds: Int) {
        quizDao.saveQuizResult(
            QuizResult(
                topicId = topicId,
                questionsTotal = total,
                questionsCorrect = correct,
                durationSeconds = durationSeconds
            )
        )
    }
    
    fun getQuizHistory(): Flow<List<QuizResult>> {
        return quizDao.getRecentResults()
    }
    
    suspend fun getAverageScore(topicId: String): Double {
        return quizDao.getAverageScoreForTopic(topicId) ?: 0.0
    }
}

class LessonNotesRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val notesDao = db.lessonNotesDao()
    
    suspend fun createNote(lessonId: String, title: String, content: String): Long {
        return notesDao.insertNote(
            LessonNote(
                lessonId = lessonId,
                title = title,
                content = content
            )
        )
    }
    
    suspend fun updateNote(noteId: Int, title: String, content: String) {
        notesDao.updateNote(noteId, title, content, System.currentTimeMillis())
    }
    
    suspend fun deleteNote(note: LessonNote) {
        notesDao.deleteNote(note)
    }
    
    fun getNotesForLesson(lessonId: String): Flow<List<LessonNote>> {
        return notesDao.getNotesForLesson(lessonId)
    }
    
    fun getAllNotes(): Flow<List<LessonNote>> {
        return notesDao.getAllNotes()
    }
    
    fun getNoteCount(lessonId: String): Flow<Int> {
        return notesDao.getNoteCountForLesson(lessonId)
    }
}

class StudyActivityRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val activityDao = db.studyActivityDao()
    
    suspend fun recordStudySession(minutesStudied: Int, lessonsCompleted: Int = 0, quizzesTaken: Int = 0) {
        val today = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault())
            .format(java.util.Date())
        
        val existing = activityDao.getActivityForDate(today)
        if (existing != null) {
            activityDao.recordActivity(
                existing.copy(
                    sessionsCount = existing.sessionsCount + 1,
                    minutesStudied = existing.minutesStudied + minutesStudied,
                    lessonsCompleted = existing.lessonsCompleted + lessonsCompleted,
                    quizzesTaken = existing.quizzesTaken + quizzesTaken
                )
            )
        } else {
            activityDao.recordActivity(
                StudyActivity(
                    date = today,
                    sessionsCount = 1,
                    minutesStudied = minutesStudied,
                    lessonsCompleted = lessonsCompleted,
                    quizzesTaken = quizzesTaken
                )
            )
        }
    }
    
    fun getRecentActivity(days: Int = 30): Flow<List<StudyActivity>> {
        return activityDao.getRecentActivity(days)
    }
    
    suspend fun getCurrentStreak(): Int {
        val calendar = Calendar.getInstance()
        val dateFormat = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault())
        var streak = 0
        
        // Check backwards from today
        for (i in 0..365) {
            val date = dateFormat.format(calendar.time)
            val activity = activityDao.getActivityForDate(date)
            
            if (activity != null && activity.sessionsCount > 0) {
                streak++
                calendar.add(Calendar.DAY_OF_YEAR, -1)
            } else if (i > 0) {
                // Only break if not today (allow grace for today)
                break
            } else {
                calendar.add(Calendar.DAY_OF_YEAR, -1)
            }
        }
        
        return streak
    }
    
    suspend fun getTotalStats(): StudyStats {
        return StudyStats(
            totalMinutes = activityDao.getTotalMinutesStudied() ?: 0,
            totalLessons = activityDao.getTotalLessonsCompleted() ?: 0,
            currentStreak = getCurrentStreak()
        )
    }
}

data class StudyStats(
    val totalMinutes: Int,
    val totalLessons: Int,
    val currentStreak: Int
)

class StudyReminderRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val reminderDao = db.studyReminderDao()
    
    suspend fun createReminder(
        title: String,
        message: String,
        hour: Int,
        minute: Int,
        daysOfWeek: List<Int> // 0=Sunday, 1=Monday, etc.
    ): Long {
        val daysJson = daysOfWeek.joinToString(",", "[", "]")
        return reminderDao.insertReminder(
            StudyReminder(
                title = title,
                message = message,
                hour = hour,
                minute = minute,
                daysOfWeek = daysJson
            )
        )
    }
    
    suspend fun updateReminder(
        reminderId: Int,
        title: String,
        message: String,
        hour: Int,
        minute: Int,
        daysOfWeek: List<Int>
    ) {
        val daysJson = daysOfWeek.joinToString(",", "[", "]")
        reminderDao.updateReminder(reminderId, title, message, hour, minute, daysJson)
    }
    
    suspend fun deleteReminder(reminder: StudyReminder) {
        reminderDao.deleteReminder(reminder)
    }
    
    suspend fun toggleReminder(reminderId: Int, enabled: Boolean) {
        reminderDao.toggleReminder(reminderId, enabled)
    }
    
    fun getAllReminders(): Flow<List<StudyReminder>> {
        return reminderDao.getAllReminders()
    }
    
    fun getEnabledReminders(): Flow<List<StudyReminder>> {
        return reminderDao.getEnabledReminders()
    }
}
