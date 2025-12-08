package com.sunset.ictstudy.data.database;

import androidx.annotation.NonNull;
import androidx.room.DatabaseConfiguration;
import androidx.room.InvalidationTracker;
import androidx.room.RoomDatabase;
import androidx.room.RoomOpenHelper;
import androidx.room.migration.AutoMigrationSpec;
import androidx.room.migration.Migration;
import androidx.room.util.DBUtil;
import androidx.room.util.TableInfo;
import androidx.sqlite.db.SupportSQLiteDatabase;
import androidx.sqlite.db.SupportSQLiteOpenHelper;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.processing.Generated;

@Generated("androidx.room.RoomProcessor")
@SuppressWarnings({"unchecked", "deprecation"})
public final class AppDatabase_Impl extends AppDatabase {
  private volatile ProgressDao _progressDao;

  private volatile FavoritesDao _favoritesDao;

  private volatile StudySessionDao _studySessionDao;

  private volatile QuizDao _quizDao;

  private volatile LessonNotesDao _lessonNotesDao;

  private volatile StudyActivityDao _studyActivityDao;

  private volatile StudyReminderDao _studyReminderDao;

  @Override
  @NonNull
  protected SupportSQLiteOpenHelper createOpenHelper(@NonNull final DatabaseConfiguration config) {
    final SupportSQLiteOpenHelper.Callback _openCallback = new RoomOpenHelper(config, new RoomOpenHelper.Delegate(3) {
      @Override
      public void createAllTables(@NonNull final SupportSQLiteDatabase db) {
        db.execSQL("CREATE TABLE IF NOT EXISTS `lesson_progress` (`lessonId` TEXT NOT NULL, `isCompleted` INTEGER NOT NULL, `completedAt` INTEGER, PRIMARY KEY(`lessonId`))");
        db.execSQL("CREATE TABLE IF NOT EXISTS `favorite_lessons` (`itemId` TEXT NOT NULL, `title` TEXT NOT NULL, `subtitle` TEXT NOT NULL, `type` TEXT NOT NULL, `savedAt` INTEGER NOT NULL, PRIMARY KEY(`itemId`))");
        db.execSQL("CREATE TABLE IF NOT EXISTS `study_sessions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `title` TEXT NOT NULL, `description` TEXT NOT NULL, `topicId` TEXT, `scheduledDate` INTEGER NOT NULL, `durationMinutes` INTEGER NOT NULL, `isCompleted` INTEGER NOT NULL, `createdAt` INTEGER NOT NULL)");
        db.execSQL("CREATE TABLE IF NOT EXISTS `quiz_questions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `topicId` TEXT NOT NULL, `questionText` TEXT NOT NULL, `options` TEXT NOT NULL, `correctAnswer` INTEGER NOT NULL, `difficulty` TEXT NOT NULL)");
        db.execSQL("CREATE TABLE IF NOT EXISTS `quiz_results` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `topicId` TEXT NOT NULL, `questionsTotal` INTEGER NOT NULL, `questionsCorrect` INTEGER NOT NULL, `completedAt` INTEGER NOT NULL, `durationSeconds` INTEGER NOT NULL)");
        db.execSQL("CREATE TABLE IF NOT EXISTS `lesson_notes` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `lessonId` TEXT NOT NULL, `title` TEXT NOT NULL, `content` TEXT NOT NULL, `createdAt` INTEGER NOT NULL, `updatedAt` INTEGER NOT NULL)");
        db.execSQL("CREATE TABLE IF NOT EXISTS `study_activity` (`date` TEXT NOT NULL, `sessionsCount` INTEGER NOT NULL, `minutesStudied` INTEGER NOT NULL, `lessonsCompleted` INTEGER NOT NULL, `quizzesTaken` INTEGER NOT NULL, PRIMARY KEY(`date`))");
        db.execSQL("CREATE TABLE IF NOT EXISTS `study_reminders` (`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `title` TEXT NOT NULL, `message` TEXT NOT NULL, `hour` INTEGER NOT NULL, `minute` INTEGER NOT NULL, `daysOfWeek` TEXT NOT NULL, `isEnabled` INTEGER NOT NULL, `createdAt` INTEGER NOT NULL)");
        db.execSQL("CREATE TABLE IF NOT EXISTS room_master_table (id INTEGER PRIMARY KEY,identity_hash TEXT)");
        db.execSQL("INSERT OR REPLACE INTO room_master_table (id,identity_hash) VALUES(42, 'fe398317068345de4332841ae24aa857')");
      }

      @Override
      public void dropAllTables(@NonNull final SupportSQLiteDatabase db) {
        db.execSQL("DROP TABLE IF EXISTS `lesson_progress`");
        db.execSQL("DROP TABLE IF EXISTS `favorite_lessons`");
        db.execSQL("DROP TABLE IF EXISTS `study_sessions`");
        db.execSQL("DROP TABLE IF EXISTS `quiz_questions`");
        db.execSQL("DROP TABLE IF EXISTS `quiz_results`");
        db.execSQL("DROP TABLE IF EXISTS `lesson_notes`");
        db.execSQL("DROP TABLE IF EXISTS `study_activity`");
        db.execSQL("DROP TABLE IF EXISTS `study_reminders`");
        final List<? extends RoomDatabase.Callback> _callbacks = mCallbacks;
        if (_callbacks != null) {
          for (RoomDatabase.Callback _callback : _callbacks) {
            _callback.onDestructiveMigration(db);
          }
        }
      }

      @Override
      public void onCreate(@NonNull final SupportSQLiteDatabase db) {
        final List<? extends RoomDatabase.Callback> _callbacks = mCallbacks;
        if (_callbacks != null) {
          for (RoomDatabase.Callback _callback : _callbacks) {
            _callback.onCreate(db);
          }
        }
      }

      @Override
      public void onOpen(@NonNull final SupportSQLiteDatabase db) {
        mDatabase = db;
        internalInitInvalidationTracker(db);
        final List<? extends RoomDatabase.Callback> _callbacks = mCallbacks;
        if (_callbacks != null) {
          for (RoomDatabase.Callback _callback : _callbacks) {
            _callback.onOpen(db);
          }
        }
      }

      @Override
      public void onPreMigrate(@NonNull final SupportSQLiteDatabase db) {
        DBUtil.dropFtsSyncTriggers(db);
      }

      @Override
      public void onPostMigrate(@NonNull final SupportSQLiteDatabase db) {
      }

      @Override
      @NonNull
      public RoomOpenHelper.ValidationResult onValidateSchema(
          @NonNull final SupportSQLiteDatabase db) {
        final HashMap<String, TableInfo.Column> _columnsLessonProgress = new HashMap<String, TableInfo.Column>(3);
        _columnsLessonProgress.put("lessonId", new TableInfo.Column("lessonId", "TEXT", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonProgress.put("isCompleted", new TableInfo.Column("isCompleted", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonProgress.put("completedAt", new TableInfo.Column("completedAt", "INTEGER", false, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysLessonProgress = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesLessonProgress = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoLessonProgress = new TableInfo("lesson_progress", _columnsLessonProgress, _foreignKeysLessonProgress, _indicesLessonProgress);
        final TableInfo _existingLessonProgress = TableInfo.read(db, "lesson_progress");
        if (!_infoLessonProgress.equals(_existingLessonProgress)) {
          return new RoomOpenHelper.ValidationResult(false, "lesson_progress(com.sunset.ictstudy.data.database.LessonProgress).\n"
                  + " Expected:\n" + _infoLessonProgress + "\n"
                  + " Found:\n" + _existingLessonProgress);
        }
        final HashMap<String, TableInfo.Column> _columnsFavoriteLessons = new HashMap<String, TableInfo.Column>(5);
        _columnsFavoriteLessons.put("itemId", new TableInfo.Column("itemId", "TEXT", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsFavoriteLessons.put("title", new TableInfo.Column("title", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsFavoriteLessons.put("subtitle", new TableInfo.Column("subtitle", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsFavoriteLessons.put("type", new TableInfo.Column("type", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsFavoriteLessons.put("savedAt", new TableInfo.Column("savedAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysFavoriteLessons = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesFavoriteLessons = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoFavoriteLessons = new TableInfo("favorite_lessons", _columnsFavoriteLessons, _foreignKeysFavoriteLessons, _indicesFavoriteLessons);
        final TableInfo _existingFavoriteLessons = TableInfo.read(db, "favorite_lessons");
        if (!_infoFavoriteLessons.equals(_existingFavoriteLessons)) {
          return new RoomOpenHelper.ValidationResult(false, "favorite_lessons(com.sunset.ictstudy.data.database.FavoriteLesson).\n"
                  + " Expected:\n" + _infoFavoriteLessons + "\n"
                  + " Found:\n" + _existingFavoriteLessons);
        }
        final HashMap<String, TableInfo.Column> _columnsStudySessions = new HashMap<String, TableInfo.Column>(8);
        _columnsStudySessions.put("id", new TableInfo.Column("id", "INTEGER", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("title", new TableInfo.Column("title", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("description", new TableInfo.Column("description", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("topicId", new TableInfo.Column("topicId", "TEXT", false, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("scheduledDate", new TableInfo.Column("scheduledDate", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("durationMinutes", new TableInfo.Column("durationMinutes", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("isCompleted", new TableInfo.Column("isCompleted", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudySessions.put("createdAt", new TableInfo.Column("createdAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysStudySessions = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesStudySessions = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoStudySessions = new TableInfo("study_sessions", _columnsStudySessions, _foreignKeysStudySessions, _indicesStudySessions);
        final TableInfo _existingStudySessions = TableInfo.read(db, "study_sessions");
        if (!_infoStudySessions.equals(_existingStudySessions)) {
          return new RoomOpenHelper.ValidationResult(false, "study_sessions(com.sunset.ictstudy.data.database.StudySession).\n"
                  + " Expected:\n" + _infoStudySessions + "\n"
                  + " Found:\n" + _existingStudySessions);
        }
        final HashMap<String, TableInfo.Column> _columnsQuizQuestions = new HashMap<String, TableInfo.Column>(6);
        _columnsQuizQuestions.put("id", new TableInfo.Column("id", "INTEGER", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizQuestions.put("topicId", new TableInfo.Column("topicId", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizQuestions.put("questionText", new TableInfo.Column("questionText", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizQuestions.put("options", new TableInfo.Column("options", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizQuestions.put("correctAnswer", new TableInfo.Column("correctAnswer", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizQuestions.put("difficulty", new TableInfo.Column("difficulty", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysQuizQuestions = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesQuizQuestions = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoQuizQuestions = new TableInfo("quiz_questions", _columnsQuizQuestions, _foreignKeysQuizQuestions, _indicesQuizQuestions);
        final TableInfo _existingQuizQuestions = TableInfo.read(db, "quiz_questions");
        if (!_infoQuizQuestions.equals(_existingQuizQuestions)) {
          return new RoomOpenHelper.ValidationResult(false, "quiz_questions(com.sunset.ictstudy.data.database.QuizQuestion).\n"
                  + " Expected:\n" + _infoQuizQuestions + "\n"
                  + " Found:\n" + _existingQuizQuestions);
        }
        final HashMap<String, TableInfo.Column> _columnsQuizResults = new HashMap<String, TableInfo.Column>(6);
        _columnsQuizResults.put("id", new TableInfo.Column("id", "INTEGER", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizResults.put("topicId", new TableInfo.Column("topicId", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizResults.put("questionsTotal", new TableInfo.Column("questionsTotal", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizResults.put("questionsCorrect", new TableInfo.Column("questionsCorrect", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizResults.put("completedAt", new TableInfo.Column("completedAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsQuizResults.put("durationSeconds", new TableInfo.Column("durationSeconds", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysQuizResults = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesQuizResults = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoQuizResults = new TableInfo("quiz_results", _columnsQuizResults, _foreignKeysQuizResults, _indicesQuizResults);
        final TableInfo _existingQuizResults = TableInfo.read(db, "quiz_results");
        if (!_infoQuizResults.equals(_existingQuizResults)) {
          return new RoomOpenHelper.ValidationResult(false, "quiz_results(com.sunset.ictstudy.data.database.QuizResult).\n"
                  + " Expected:\n" + _infoQuizResults + "\n"
                  + " Found:\n" + _existingQuizResults);
        }
        final HashMap<String, TableInfo.Column> _columnsLessonNotes = new HashMap<String, TableInfo.Column>(6);
        _columnsLessonNotes.put("id", new TableInfo.Column("id", "INTEGER", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonNotes.put("lessonId", new TableInfo.Column("lessonId", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonNotes.put("title", new TableInfo.Column("title", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonNotes.put("content", new TableInfo.Column("content", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonNotes.put("createdAt", new TableInfo.Column("createdAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsLessonNotes.put("updatedAt", new TableInfo.Column("updatedAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysLessonNotes = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesLessonNotes = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoLessonNotes = new TableInfo("lesson_notes", _columnsLessonNotes, _foreignKeysLessonNotes, _indicesLessonNotes);
        final TableInfo _existingLessonNotes = TableInfo.read(db, "lesson_notes");
        if (!_infoLessonNotes.equals(_existingLessonNotes)) {
          return new RoomOpenHelper.ValidationResult(false, "lesson_notes(com.sunset.ictstudy.data.database.LessonNote).\n"
                  + " Expected:\n" + _infoLessonNotes + "\n"
                  + " Found:\n" + _existingLessonNotes);
        }
        final HashMap<String, TableInfo.Column> _columnsStudyActivity = new HashMap<String, TableInfo.Column>(5);
        _columnsStudyActivity.put("date", new TableInfo.Column("date", "TEXT", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyActivity.put("sessionsCount", new TableInfo.Column("sessionsCount", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyActivity.put("minutesStudied", new TableInfo.Column("minutesStudied", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyActivity.put("lessonsCompleted", new TableInfo.Column("lessonsCompleted", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyActivity.put("quizzesTaken", new TableInfo.Column("quizzesTaken", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysStudyActivity = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesStudyActivity = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoStudyActivity = new TableInfo("study_activity", _columnsStudyActivity, _foreignKeysStudyActivity, _indicesStudyActivity);
        final TableInfo _existingStudyActivity = TableInfo.read(db, "study_activity");
        if (!_infoStudyActivity.equals(_existingStudyActivity)) {
          return new RoomOpenHelper.ValidationResult(false, "study_activity(com.sunset.ictstudy.data.database.StudyActivity).\n"
                  + " Expected:\n" + _infoStudyActivity + "\n"
                  + " Found:\n" + _existingStudyActivity);
        }
        final HashMap<String, TableInfo.Column> _columnsStudyReminders = new HashMap<String, TableInfo.Column>(8);
        _columnsStudyReminders.put("id", new TableInfo.Column("id", "INTEGER", true, 1, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("title", new TableInfo.Column("title", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("message", new TableInfo.Column("message", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("hour", new TableInfo.Column("hour", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("minute", new TableInfo.Column("minute", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("daysOfWeek", new TableInfo.Column("daysOfWeek", "TEXT", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("isEnabled", new TableInfo.Column("isEnabled", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        _columnsStudyReminders.put("createdAt", new TableInfo.Column("createdAt", "INTEGER", true, 0, null, TableInfo.CREATED_FROM_ENTITY));
        final HashSet<TableInfo.ForeignKey> _foreignKeysStudyReminders = new HashSet<TableInfo.ForeignKey>(0);
        final HashSet<TableInfo.Index> _indicesStudyReminders = new HashSet<TableInfo.Index>(0);
        final TableInfo _infoStudyReminders = new TableInfo("study_reminders", _columnsStudyReminders, _foreignKeysStudyReminders, _indicesStudyReminders);
        final TableInfo _existingStudyReminders = TableInfo.read(db, "study_reminders");
        if (!_infoStudyReminders.equals(_existingStudyReminders)) {
          return new RoomOpenHelper.ValidationResult(false, "study_reminders(com.sunset.ictstudy.data.database.StudyReminder).\n"
                  + " Expected:\n" + _infoStudyReminders + "\n"
                  + " Found:\n" + _existingStudyReminders);
        }
        return new RoomOpenHelper.ValidationResult(true, null);
      }
    }, "fe398317068345de4332841ae24aa857", "d08ed2157d2514b72417d0cd09cdd53c");
    final SupportSQLiteOpenHelper.Configuration _sqliteConfig = SupportSQLiteOpenHelper.Configuration.builder(config.context).name(config.name).callback(_openCallback).build();
    final SupportSQLiteOpenHelper _helper = config.sqliteOpenHelperFactory.create(_sqliteConfig);
    return _helper;
  }

  @Override
  @NonNull
  protected InvalidationTracker createInvalidationTracker() {
    final HashMap<String, String> _shadowTablesMap = new HashMap<String, String>(0);
    final HashMap<String, Set<String>> _viewTables = new HashMap<String, Set<String>>(0);
    return new InvalidationTracker(this, _shadowTablesMap, _viewTables, "lesson_progress","favorite_lessons","study_sessions","quiz_questions","quiz_results","lesson_notes","study_activity","study_reminders");
  }

  @Override
  public void clearAllTables() {
    super.assertNotMainThread();
    final SupportSQLiteDatabase _db = super.getOpenHelper().getWritableDatabase();
    try {
      super.beginTransaction();
      _db.execSQL("DELETE FROM `lesson_progress`");
      _db.execSQL("DELETE FROM `favorite_lessons`");
      _db.execSQL("DELETE FROM `study_sessions`");
      _db.execSQL("DELETE FROM `quiz_questions`");
      _db.execSQL("DELETE FROM `quiz_results`");
      _db.execSQL("DELETE FROM `lesson_notes`");
      _db.execSQL("DELETE FROM `study_activity`");
      _db.execSQL("DELETE FROM `study_reminders`");
      super.setTransactionSuccessful();
    } finally {
      super.endTransaction();
      _db.query("PRAGMA wal_checkpoint(FULL)").close();
      if (!_db.inTransaction()) {
        _db.execSQL("VACUUM");
      }
    }
  }

  @Override
  @NonNull
  protected Map<Class<?>, List<Class<?>>> getRequiredTypeConverters() {
    final HashMap<Class<?>, List<Class<?>>> _typeConvertersMap = new HashMap<Class<?>, List<Class<?>>>();
    _typeConvertersMap.put(ProgressDao.class, ProgressDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(FavoritesDao.class, FavoritesDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(StudySessionDao.class, StudySessionDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(QuizDao.class, QuizDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(LessonNotesDao.class, LessonNotesDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(StudyActivityDao.class, StudyActivityDao_Impl.getRequiredConverters());
    _typeConvertersMap.put(StudyReminderDao.class, StudyReminderDao_Impl.getRequiredConverters());
    return _typeConvertersMap;
  }

  @Override
  @NonNull
  public Set<Class<? extends AutoMigrationSpec>> getRequiredAutoMigrationSpecs() {
    final HashSet<Class<? extends AutoMigrationSpec>> _autoMigrationSpecsSet = new HashSet<Class<? extends AutoMigrationSpec>>();
    return _autoMigrationSpecsSet;
  }

  @Override
  @NonNull
  public List<Migration> getAutoMigrations(
      @NonNull final Map<Class<? extends AutoMigrationSpec>, AutoMigrationSpec> autoMigrationSpecs) {
    final List<Migration> _autoMigrations = new ArrayList<Migration>();
    return _autoMigrations;
  }

  @Override
  public ProgressDao progressDao() {
    if (_progressDao != null) {
      return _progressDao;
    } else {
      synchronized(this) {
        if(_progressDao == null) {
          _progressDao = new ProgressDao_Impl(this);
        }
        return _progressDao;
      }
    }
  }

  @Override
  public FavoritesDao favoritesDao() {
    if (_favoritesDao != null) {
      return _favoritesDao;
    } else {
      synchronized(this) {
        if(_favoritesDao == null) {
          _favoritesDao = new FavoritesDao_Impl(this);
        }
        return _favoritesDao;
      }
    }
  }

  @Override
  public StudySessionDao studySessionDao() {
    if (_studySessionDao != null) {
      return _studySessionDao;
    } else {
      synchronized(this) {
        if(_studySessionDao == null) {
          _studySessionDao = new StudySessionDao_Impl(this);
        }
        return _studySessionDao;
      }
    }
  }

  @Override
  public QuizDao quizDao() {
    if (_quizDao != null) {
      return _quizDao;
    } else {
      synchronized(this) {
        if(_quizDao == null) {
          _quizDao = new QuizDao_Impl(this);
        }
        return _quizDao;
      }
    }
  }

  @Override
  public LessonNotesDao lessonNotesDao() {
    if (_lessonNotesDao != null) {
      return _lessonNotesDao;
    } else {
      synchronized(this) {
        if(_lessonNotesDao == null) {
          _lessonNotesDao = new LessonNotesDao_Impl(this);
        }
        return _lessonNotesDao;
      }
    }
  }

  @Override
  public StudyActivityDao studyActivityDao() {
    if (_studyActivityDao != null) {
      return _studyActivityDao;
    } else {
      synchronized(this) {
        if(_studyActivityDao == null) {
          _studyActivityDao = new StudyActivityDao_Impl(this);
        }
        return _studyActivityDao;
      }
    }
  }

  @Override
  public StudyReminderDao studyReminderDao() {
    if (_studyReminderDao != null) {
      return _studyReminderDao;
    } else {
      synchronized(this) {
        if(_studyReminderDao == null) {
          _studyReminderDao = new StudyReminderDao_Impl(this);
        }
        return _studyReminderDao;
      }
    }
  }
}
