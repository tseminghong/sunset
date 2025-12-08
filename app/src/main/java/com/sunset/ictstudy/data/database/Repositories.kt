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
        val sampleQuestions = mutableListOf(
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
        
        // Python Programming Questions
        sampleQuestions.addAll(listOf(
            QuizQuestion(
                topicId = "python_basics",
                questionText = "What is the correct way to declare a variable in Python?",
                options = """["int x = 5", "var x = 5", "x = 5", "let x = 5"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_basics",
                questionText = "Which of these is NOT a valid Python data type?",
                options = """["int", "float", "char", "str"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_basics",
                questionText = "What does the type() function return?",
                options = """["The value of a variable", "The data type of a variable", "The memory address", "The variable name"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_basics",
                questionText = "Which operator is used for exponentiation in Python?",
                options = """["^", "**", "exp()", "pow"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_basics",
                questionText = "What is the output of: print(10 // 3)?",
                options = """["3.333", "3", "4", "3.0"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            
            QuizQuestion(
                topicId = "python_control_flow",
                questionText = "Which keyword is used for conditional branching in Python?",
                options = """["switch", "if", "case", "when"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_control_flow",
                questionText = "What does the 'elif' keyword stand for?",
                options = """["else if", "elseif", "elif function", "end if"]""",
                correctAnswer = 0,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_control_flow",
                questionText = "Which loop is best when you don't know the number of iterations?",
                options = """["for loop", "while loop", "do-while loop", "foreach loop"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_control_flow",
                questionText = "What does the 'break' statement do in a loop?",
                options = """["Pauses the loop", "Skips current iteration", "Exits the loop completely", "Restarts the loop"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_control_flow",
                questionText = "What is the output of: range(1, 5)?",
                options = """["[1, 2, 3, 4, 5]", "[1, 2, 3, 4]", "[0, 1, 2, 3, 4]", "[2, 3, 4, 5]"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            
            QuizQuestion(
                topicId = "python_functions",
                questionText = "Which keyword is used to define a function in Python?",
                options = """["function", "def", "func", "define"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_functions",
                questionText = "What does a function return if there's no return statement?",
                options = """["0", "None", "False", "Empty string"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_functions",
                questionText = "Which parameter type allows any number of arguments?",
                options = """["*args", "**kwargs", "...params", "[]args"]""",
                correctAnswer = 0,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_functions",
                questionText = "What is a lambda function?",
                options = """["A built-in function", "An anonymous function", "A class method", "A recursive function"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_functions",
                questionText = "How do you import a specific function from a module?",
                options = """["import module.function", "from module import function", "include module.function", "use function from module"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            
            QuizQuestion(
                topicId = "python_data_structures",
                questionText = "Which data structure is mutable and ordered in Python?",
                options = """["Tuple", "List", "Set", "String"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_data_structures",
                questionText = "How do you access the last element of a list?",
                options = """["list[end]", "list[-1]", "list[last]", "list.last()"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_data_structures",
                questionText = "Which method adds an element to the end of a list?",
                options = """["add()", "append()", "insert()", "push()"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_data_structures",
                questionText = "What makes a set different from a list?",
                options = """["Sets are ordered", "Sets allow duplicates", "Sets store unique values", "Sets are immutable"]""",
                correctAnswer = 2,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_data_structures",
                questionText = "How do you create an empty dictionary?",
                options = """["dict = []", "dict = {}", "dict = ()", "dict = set()"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            
            QuizQuestion(
                topicId = "python_oop",
                questionText = "What is the constructor method in a Python class?",
                options = """["__init__()", "constructor()", "__new__()", "create()"]""",
                correctAnswer = 0,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_oop",
                questionText = "Which keyword is used to create a class?",
                options = """["class", "def", "object", "struct"]""",
                correctAnswer = 0,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_oop",
                questionText = "What is inheritance in OOP?",
                options = """["Creating multiple objects", "One class acquiring properties of another", "Hiding data", "Method overloading"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_oop",
                questionText = "How do you make an attribute private in Python?",
                options = """["private keyword", "Prefix with __", "Prefix with _", "Use @private decorator"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_oop",
                questionText = "What is polymorphism?",
                options = """["Multiple inheritance", "Same method name, different implementations", "Data hiding", "Object creation"]""",
                correctAnswer = 1,
                difficulty = "hard"
            ),
            
            QuizQuestion(
                topicId = "python_file_handling",
                questionText = "Which mode opens a file for reading?",
                options = """["'w'", "'r'", "'a'", "'x'"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_file_handling",
                questionText = "What does the 'with' statement ensure?",
                options = """["File is created", "File is automatically closed", "File is encrypted", "File is compressed"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_file_handling",
                questionText = "Which exception is raised when a file is not found?",
                options = """["FileError", "IOError", "FileNotFoundError", "PathError"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "python_file_handling",
                questionText = "What does 'a' mode do when opening a file?",
                options = """["Reads the file", "Overwrites the file", "Appends to the file", "Creates a new file"]""",
                correctAnswer = 2,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "python_file_handling",
                questionText = "Which block always executes in exception handling?",
                options = """["try", "except", "finally", "else"]""",
                correctAnswer = 2,
                difficulty = "medium"
            )
        ))
        
        // SQL Database Questions
        sampleQuestions.addAll(listOf(
            QuizQuestion(
                topicId = "sql_basics",
                questionText = "Which SQL command is used to retrieve data from a database?",
                options = """["GET", "SELECT", "RETRIEVE", "FETCH"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_basics",
                questionText = "What does PRIMARY KEY constraint ensure?",
                options = """["Unique and NOT NULL", "Only unique values", "Only NOT NULL", "Foreign key reference"]""",
                correctAnswer = 0,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_basics",
                questionText = "Which command is used to add new records to a table?",
                options = """["ADD", "INSERT", "CREATE", "PUT"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_basics",
                questionText = "What does the WHERE clause do?",
                options = """["Sorts results", "Filters rows", "Joins tables", "Groups data"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_basics",
                questionText = "Which constraint prevents duplicate values in a column?",
                options = """["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            
            QuizQuestion(
                topicId = "sql_queries",
                questionText = "Which SQL clause sorts query results?",
                options = """["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_queries",
                questionText = "What does COUNT(*) return?",
                options = """["Sum of values", "Average value", "Number of rows", "Maximum value"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_queries",
                questionText = "Which clause is used to filter grouped data?",
                options = """["WHERE", "HAVING", "FILTER", "GROUP FILTER"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_queries",
                questionText = "What does DISTINCT do in a SELECT statement?",
                options = """["Sorts rows", "Removes duplicates", "Counts rows", "Filters nulls"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_queries",
                questionText = "Which aggregate function calculates the average?",
                options = """["SUM()", "AVG()", "MEAN()", "AVERAGE()"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            
            QuizQuestion(
                topicId = "sql_joins",
                questionText = "Which JOIN returns only matching rows from both tables?",
                options = """["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"]""",
                correctAnswer = 2,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_joins",
                questionText = "What does LEFT JOIN return?",
                options = """["Only matching rows", "All from left, matching from right", "All from right, matching from left", "All rows from both tables"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_joins",
                questionText = "What is a foreign key?",
                options = """["A unique identifier", "A reference to another table's primary key", "An index", "A constraint"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_joins",
                questionText = "Which relationship type requires a junction table?",
                options = """["One-to-One", "One-to-Many", "Many-to-Many", "None of these"]""",
                correctAnswer = 2,
                difficulty = "hard"
            ),
            QuizQuestion(
                topicId = "sql_joins",
                questionText = "What does the ON clause specify in a JOIN?",
                options = """["Table names", "Join condition", "Column list", "Sort order"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            
            QuizQuestion(
                topicId = "sql_data_modification",
                questionText = "Which command modifies existing data?",
                options = """["MODIFY", "UPDATE", "CHANGE", "ALTER"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_data_modification",
                questionText = "What happens if you DELETE without a WHERE clause?",
                options = """["Deletes first row", "Deletes last row", "Deletes all rows", "Throws an error"]""",
                correctAnswer = 2,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_data_modification",
                questionText = "Which command adds a new column to a table?",
                options = """["ADD COLUMN", "ALTER TABLE ADD", "INSERT COLUMN", "CREATE COLUMN"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_data_modification",
                questionText = "What does TRUNCATE do?",
                options = """["Deletes specific rows", "Removes all rows quickly", "Drops the table", "Archives data"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_data_modification",
                questionText = "Which is faster for clearing a table?",
                options = """["DELETE", "TRUNCATE", "DROP", "REMOVE"]""",
                correctAnswer = 1,
                difficulty = "hard"
            ),
            
            QuizQuestion(
                topicId = "sql_transactions",
                questionText = "Which command saves transaction changes permanently?",
                options = """["SAVE", "COMMIT", "APPLY", "FINISH"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_transactions",
                questionText = "What does ROLLBACK do?",
                options = """["Saves changes", "Undoes changes", "Restarts transaction", "Commits partially"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_transactions",
                questionText = "What does the 'A' in ACID stand for?",
                options = """["Automatic", "Atomicity", "Asynchronous", "Advanced"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_transactions",
                questionText = "Which constraint references another table's primary key?",
                options = """["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "CHECK"]""",
                correctAnswer = 2,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_transactions",
                questionText = "What does CASCADE do in a foreign key?",
                options = """["Prevents deletion", "Automatically updates/deletes related rows", "Creates backup", "Logs changes"]""",
                correctAnswer = 1,
                difficulty = "hard"
            ),
            
            QuizQuestion(
                topicId = "sql_design",
                questionText = "What is the goal of normalization?",
                options = """["Increase redundancy", "Reduce redundancy", "Add more tables", "Improve speed"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_design",
                questionText = "What does 1NF require?",
                options = """["No duplicates", "Atomic values in cells", "Primary key exists", "No null values"]""",
                correctAnswer = 1,
                difficulty = "medium"
            ),
            QuizQuestion(
                topicId = "sql_design",
                questionText = "What is data redundancy?",
                options = """["Backup data", "Duplicate data", "Missing data", "Encrypted data"]""",
                correctAnswer = 1,
                difficulty = "easy"
            ),
            QuizQuestion(
                topicId = "sql_design",
                questionText = "When might denormalization be beneficial?",
                options = """["To save space", "To improve read performance", "To reduce errors", "To enforce constraints"]""",
                correctAnswer = 1,
                difficulty = "hard"
            ),
            QuizQuestion(
                topicId = "sql_design",
                questionText = "What does an ER diagram show?",
                options = """["Error reports", "Entity relationships", "Execution results", "Export records"]""",
                correctAnswer = 1,
                difficulty = "easy"
            )
        ))
        
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
