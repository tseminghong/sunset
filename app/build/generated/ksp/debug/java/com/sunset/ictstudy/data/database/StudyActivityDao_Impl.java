package com.sunset.ictstudy.data.database;

import android.database.Cursor;
import android.os.CancellationSignal;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.room.CoroutinesRoom;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import java.lang.Class;
import java.lang.Exception;
import java.lang.Integer;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import javax.annotation.processing.Generated;
import kotlin.Unit;
import kotlin.coroutines.Continuation;
import kotlinx.coroutines.flow.Flow;

@Generated("androidx.room.RoomProcessor")
@SuppressWarnings({"unchecked", "deprecation"})
public final class StudyActivityDao_Impl implements StudyActivityDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<StudyActivity> __insertionAdapterOfStudyActivity;

  public StudyActivityDao_Impl(@NonNull final RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfStudyActivity = new EntityInsertionAdapter<StudyActivity>(__db) {
      @Override
      @NonNull
      protected String createQuery() {
        return "INSERT OR REPLACE INTO `study_activity` (`date`,`sessionsCount`,`minutesStudied`,`lessonsCompleted`,`quizzesTaken`) VALUES (?,?,?,?,?)";
      }

      @Override
      protected void bind(@NonNull final SupportSQLiteStatement statement,
          @NonNull final StudyActivity entity) {
        statement.bindString(1, entity.getDate());
        statement.bindLong(2, entity.getSessionsCount());
        statement.bindLong(3, entity.getMinutesStudied());
        statement.bindLong(4, entity.getLessonsCompleted());
        statement.bindLong(5, entity.getQuizzesTaken());
      }
    };
  }

  @Override
  public Object recordActivity(final StudyActivity activity,
      final Continuation<? super Unit> $completion) {
    return CoroutinesRoom.execute(__db, true, new Callable<Unit>() {
      @Override
      @NonNull
      public Unit call() throws Exception {
        __db.beginTransaction();
        try {
          __insertionAdapterOfStudyActivity.insert(activity);
          __db.setTransactionSuccessful();
          return Unit.INSTANCE;
        } finally {
          __db.endTransaction();
        }
      }
    }, $completion);
  }

  @Override
  public Object getActivityForDate(final String date,
      final Continuation<? super StudyActivity> $completion) {
    final String _sql = "SELECT * FROM study_activity WHERE date = ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    _statement.bindString(_argIndex, date);
    final CancellationSignal _cancellationSignal = DBUtil.createCancellationSignal();
    return CoroutinesRoom.execute(__db, false, _cancellationSignal, new Callable<StudyActivity>() {
      @Override
      @Nullable
      public StudyActivity call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfSessionsCount = CursorUtil.getColumnIndexOrThrow(_cursor, "sessionsCount");
          final int _cursorIndexOfMinutesStudied = CursorUtil.getColumnIndexOrThrow(_cursor, "minutesStudied");
          final int _cursorIndexOfLessonsCompleted = CursorUtil.getColumnIndexOrThrow(_cursor, "lessonsCompleted");
          final int _cursorIndexOfQuizzesTaken = CursorUtil.getColumnIndexOrThrow(_cursor, "quizzesTaken");
          final StudyActivity _result;
          if (_cursor.moveToFirst()) {
            final String _tmpDate;
            _tmpDate = _cursor.getString(_cursorIndexOfDate);
            final int _tmpSessionsCount;
            _tmpSessionsCount = _cursor.getInt(_cursorIndexOfSessionsCount);
            final int _tmpMinutesStudied;
            _tmpMinutesStudied = _cursor.getInt(_cursorIndexOfMinutesStudied);
            final int _tmpLessonsCompleted;
            _tmpLessonsCompleted = _cursor.getInt(_cursorIndexOfLessonsCompleted);
            final int _tmpQuizzesTaken;
            _tmpQuizzesTaken = _cursor.getInt(_cursorIndexOfQuizzesTaken);
            _result = new StudyActivity(_tmpDate,_tmpSessionsCount,_tmpMinutesStudied,_tmpLessonsCompleted,_tmpQuizzesTaken);
          } else {
            _result = null;
          }
          return _result;
        } finally {
          _cursor.close();
          _statement.release();
        }
      }
    }, $completion);
  }

  @Override
  public Flow<List<StudyActivity>> getRecentActivity(final int days) {
    final String _sql = "SELECT * FROM study_activity ORDER BY date DESC LIMIT ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    _statement.bindLong(_argIndex, days);
    return CoroutinesRoom.createFlow(__db, false, new String[] {"study_activity"}, new Callable<List<StudyActivity>>() {
      @Override
      @NonNull
      public List<StudyActivity> call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfSessionsCount = CursorUtil.getColumnIndexOrThrow(_cursor, "sessionsCount");
          final int _cursorIndexOfMinutesStudied = CursorUtil.getColumnIndexOrThrow(_cursor, "minutesStudied");
          final int _cursorIndexOfLessonsCompleted = CursorUtil.getColumnIndexOrThrow(_cursor, "lessonsCompleted");
          final int _cursorIndexOfQuizzesTaken = CursorUtil.getColumnIndexOrThrow(_cursor, "quizzesTaken");
          final List<StudyActivity> _result = new ArrayList<StudyActivity>(_cursor.getCount());
          while (_cursor.moveToNext()) {
            final StudyActivity _item;
            final String _tmpDate;
            _tmpDate = _cursor.getString(_cursorIndexOfDate);
            final int _tmpSessionsCount;
            _tmpSessionsCount = _cursor.getInt(_cursorIndexOfSessionsCount);
            final int _tmpMinutesStudied;
            _tmpMinutesStudied = _cursor.getInt(_cursorIndexOfMinutesStudied);
            final int _tmpLessonsCompleted;
            _tmpLessonsCompleted = _cursor.getInt(_cursorIndexOfLessonsCompleted);
            final int _tmpQuizzesTaken;
            _tmpQuizzesTaken = _cursor.getInt(_cursorIndexOfQuizzesTaken);
            _item = new StudyActivity(_tmpDate,_tmpSessionsCount,_tmpMinutesStudied,_tmpLessonsCompleted,_tmpQuizzesTaken);
            _result.add(_item);
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public Flow<List<StudyActivity>> getActivityInRange(final String startDate,
      final String endDate) {
    final String _sql = "SELECT * FROM study_activity WHERE date >= ? AND date <= ? ORDER BY date ASC";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 2);
    int _argIndex = 1;
    _statement.bindString(_argIndex, startDate);
    _argIndex = 2;
    _statement.bindString(_argIndex, endDate);
    return CoroutinesRoom.createFlow(__db, false, new String[] {"study_activity"}, new Callable<List<StudyActivity>>() {
      @Override
      @NonNull
      public List<StudyActivity> call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfSessionsCount = CursorUtil.getColumnIndexOrThrow(_cursor, "sessionsCount");
          final int _cursorIndexOfMinutesStudied = CursorUtil.getColumnIndexOrThrow(_cursor, "minutesStudied");
          final int _cursorIndexOfLessonsCompleted = CursorUtil.getColumnIndexOrThrow(_cursor, "lessonsCompleted");
          final int _cursorIndexOfQuizzesTaken = CursorUtil.getColumnIndexOrThrow(_cursor, "quizzesTaken");
          final List<StudyActivity> _result = new ArrayList<StudyActivity>(_cursor.getCount());
          while (_cursor.moveToNext()) {
            final StudyActivity _item;
            final String _tmpDate;
            _tmpDate = _cursor.getString(_cursorIndexOfDate);
            final int _tmpSessionsCount;
            _tmpSessionsCount = _cursor.getInt(_cursorIndexOfSessionsCount);
            final int _tmpMinutesStudied;
            _tmpMinutesStudied = _cursor.getInt(_cursorIndexOfMinutesStudied);
            final int _tmpLessonsCompleted;
            _tmpLessonsCompleted = _cursor.getInt(_cursorIndexOfLessonsCompleted);
            final int _tmpQuizzesTaken;
            _tmpQuizzesTaken = _cursor.getInt(_cursorIndexOfQuizzesTaken);
            _item = new StudyActivity(_tmpDate,_tmpSessionsCount,_tmpMinutesStudied,_tmpLessonsCompleted,_tmpQuizzesTaken);
            _result.add(_item);
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public Object getStreakCount(final String startDate,
      final Continuation<? super Integer> $completion) {
    final String _sql = "SELECT COUNT(*) FROM study_activity WHERE date >= ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    _statement.bindString(_argIndex, startDate);
    final CancellationSignal _cancellationSignal = DBUtil.createCancellationSignal();
    return CoroutinesRoom.execute(__db, false, _cancellationSignal, new Callable<Integer>() {
      @Override
      @NonNull
      public Integer call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final Integer _result;
          if (_cursor.moveToFirst()) {
            final int _tmp;
            _tmp = _cursor.getInt(0);
            _result = _tmp;
          } else {
            _result = 0;
          }
          return _result;
        } finally {
          _cursor.close();
          _statement.release();
        }
      }
    }, $completion);
  }

  @Override
  public Object getTotalMinutesStudied(final Continuation<? super Integer> $completion) {
    final String _sql = "SELECT SUM(minutesStudied) FROM study_activity";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final CancellationSignal _cancellationSignal = DBUtil.createCancellationSignal();
    return CoroutinesRoom.execute(__db, false, _cancellationSignal, new Callable<Integer>() {
      @Override
      @Nullable
      public Integer call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final Integer _result;
          if (_cursor.moveToFirst()) {
            final Integer _tmp;
            if (_cursor.isNull(0)) {
              _tmp = null;
            } else {
              _tmp = _cursor.getInt(0);
            }
            _result = _tmp;
          } else {
            _result = null;
          }
          return _result;
        } finally {
          _cursor.close();
          _statement.release();
        }
      }
    }, $completion);
  }

  @Override
  public Object getTotalLessonsCompleted(final Continuation<? super Integer> $completion) {
    final String _sql = "SELECT SUM(lessonsCompleted) FROM study_activity";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    final CancellationSignal _cancellationSignal = DBUtil.createCancellationSignal();
    return CoroutinesRoom.execute(__db, false, _cancellationSignal, new Callable<Integer>() {
      @Override
      @Nullable
      public Integer call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final Integer _result;
          if (_cursor.moveToFirst()) {
            final Integer _tmp;
            if (_cursor.isNull(0)) {
              _tmp = null;
            } else {
              _tmp = _cursor.getInt(0);
            }
            _result = _tmp;
          } else {
            _result = null;
          }
          return _result;
        } finally {
          _cursor.close();
          _statement.release();
        }
      }
    }, $completion);
  }

  @NonNull
  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
