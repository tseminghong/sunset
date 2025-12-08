package com.sunset.ictstudy.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [
        LessonProgress::class,
        FavoriteLesson::class,
        StudySession::class,
        QuizQuestion::class,
        QuizResult::class
    ],
    version = 2,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun progressDao(): ProgressDao
    abstract fun favoritesDao(): FavoritesDao
    abstract fun studySessionDao(): StudySessionDao
    abstract fun quizDao(): QuizDao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "ict_study_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
