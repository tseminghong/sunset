# Study Session Quick Reference Card

## 🚀 Start a Session

### Using UI Component (Easiest)
```kotlin
StudySessionControls(
    topicId = topic.id,
    topicName = topic.name
)
```

### Using Intent (Advanced)
```kotlin
val intent = Intent(context, StudySessionService::class.java).apply {
    action = StudySessionService.ACTION_START
    putExtra(StudySessionService.EXTRA_TOPIC_ID, "topic_id")
    putExtra(StudySessionService.EXTRA_TOPIC_NAME, "Display Name")
    putExtra(StudySessionService.EXTRA_DURATION_MINUTES, 25)
    putExtra(StudySessionService.EXTRA_USE_PROGRESS_NOTIFICATION, true)
}
ContextCompat.startForegroundService(context, intent)
```

---

## 🎯 Notification Modes

### Progress-Centric (DEFAULT) ⏱️
**Shows**: Countdown timer (remaining time)  
**Best for**: Task completion, focused study  
**Flag**: `EXTRA_USE_PROGRESS_NOTIFICATION = true`

### Live Update (Android 16+) ✨
**Shows**: Elapsed timer (countup)  
**Best for**: Visual engagement  
**Flag**: `EXTRA_USE_PROGRESS_NOTIFICATION = false`

### Auto Fallback
Service automatically uses standard notifications if enhanced modes unavailable.

---

## 🎮 Control Actions

| Action | Intent |
|--------|--------|
| **Pause** | `StudySessionService.ACTION_PAUSE` |
| **Resume** | `StudySessionService.ACTION_RESUME` |
| **Stop** | `StudySessionService.ACTION_STOP` |

---

## ⚙️ Configuration

### Service Constants
```kotlin
// Actions
StudySessionService.ACTION_START
StudySessionService.ACTION_PAUSE
StudySessionService.ACTION_RESUME
StudySessionService.ACTION_STOP

// Intent Extras
StudySessionService.EXTRA_TOPIC_ID              // String
StudySessionService.EXTRA_TOPIC_NAME            // String
StudySessionService.EXTRA_DURATION_MINUTES      // Int (default: 25)
StudySessionService.EXTRA_USE_PROGRESS_NOTIFICATION // Boolean (default: false)

// Notification Channels
"study_progress_channel"  // Progress-centric (IMPORTANCE_DEFAULT)
"live_alerts"             // Live updates (IMPORTANCE_HIGH)
"study_session_channel"   // Fallback (IMPORTANCE_LOW)
```

---

## 📊 Notification Comparison

|  | Progress | Live | Standard |
|---|---|---|---|
| **Android** | 8+ | 16+ | 8+ |
| **Timer** | ⏱️ Countdown | ⏲️ Countup | 📊 Elapsed |
| **Importance** | DEFAULT | HIGH | LOW |
| **Sound** | Start only | Updates | Silent |
| **Battery** | 🔋 Low | 🔋🔋 Medium | 🔋 Very Low |

---

## 🔧 Troubleshooting

### Notifications Not Showing
✅ Settings > Apps > ICT Study > Notifications  
✅ Check channel importance not "None"

### Live Updates Not Working
✅ Requires Android 16+ (`Build.VERSION.SDK_INT >= 36`)  
✅ Check `canPostPromotedNotifications()` permission  
✅ Service auto-falls back ✅

### Timer Not Updating
✅ Disable battery optimization for app  
✅ Check wake lock in logcat: "StudySessionWakeLock"

---

## 💡 Best Practices

### Durations
- **15 min** - Quick review
- **25 min** - Pomodoro (recommended)
- **45 min** - Deep work
- **60 min** - Extended sessions

### Mode Selection
- **Progress-Centric**: Most users (better UX)
- **Live Update**: Android 16+ with Live Alert support
- **Standard**: Automatic fallback

### Battery
- Service uses `PARTIAL_WAKE_LOCK` (minimal drain)
- Wake lock auto-released on completion
- `setOnlyAlertOnce(true)` prevents spam

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `StudySessionService.kt` | Foreground service (400+ lines) |
| `StudySessionControls.kt` | UI component (250 lines) |
| `LiveAlertManager.kt` | Live Update support |
| `notification_study_timer.xml` | RemoteViews layout |

---

## 🔐 Permissions

```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

---

**Status**: ✅ Production Ready  
**Build**: ✅ Successful  
**Android**: SDK 36 (API 36)
