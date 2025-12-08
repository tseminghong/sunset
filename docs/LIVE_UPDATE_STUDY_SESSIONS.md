# Android Study Session Notifications

## Overview
This implementation provides comprehensive study session tracking with three notification modes, optimized for different Android versions and user preferences.

## Notification Modes

### 1. **Progress-Centric Notifications** (Recommended)
Task-focused notifications emphasizing completion progress with countdown timers.

**Features**:
- **Countdown Timer**: Shows remaining time (MM:SS format)
- **Progress Bar**: Visual completion indicator (0-100%)
- **Status Subtitle**: Displays elapsed/total time
- **Optimized Updates**: Uses `setOnlyAlertOnce(true)` to prevent repeated alerts
- **Interactive Controls**: Pause/Resume and Stop actions

**Visual Layout**:
```
┌─────────────────────────────────┐
│ Studying: Python Programming    │
│ ⏱️ 13:25 remaining              │
│ 11:35 / 25:00 elapsed           │
│ ████████████░░░░ 46%            │
│             [Pause]  [Stop]     │
└─────────────────────────────────┘
```

**Channel Configuration**:
- ID: `study_progress_channel`
- Importance: `DEFAULT` (allows sound/vibration on start, silent updates)
- Visibility: `PUBLIC` (shows on lock screen)
- Badge: Enabled

**When to Use**:
- Default mode for all users
- Best for focused studying
- Emphasizes remaining time
- Minimal distractions

### 2. **Live Update Notifications** (Android 16+)
Dynamic island-style notifications for ColorOS and compatible devices.

**Features**:
- `FLAG_PROMOTED_ONGOING` - Promotes notification to Live Update area
- `hasPromotableCharacteristics()` - Validates notification eligibility
- `canPostPromotedNotifications()` - Checks user permission
- RemoteViews for custom layouts with live data

└─────────────────────────────────┘
```

**Channel Configuration**:
- ID: `live_alerts`
- Importance: `HIGH` (always visible, sound/vibration)
- Visibility: `PUBLIC`
- Badge: Enabled

**When to Use**:
- Android 16+ devices with Live Alert support
- ColorOS, OxygenOS, and compatible skins
- Users who prefer visual engagement
- Requires: `canPostPromotedNotifications()` permission

### 3. **Standard Fallback Notifications** (Android 8+)
Basic progress notifications for older devices or when enhanced modes are unavailable.

**Features**:
- Standard notification progress bar
- Simple elapsed/total time display
- Interactive controls (Pause/Stop)
- Minimal resource usage

**Channel Configuration**:
- ID: `study_session_channel`
- Importance: `LOW` (minimal interruption)
- Visibility: `PUBLIC`

---

## StudySessionService Architecture

### Service Configuration
**Type**: Foreground Service  
**Service Type**: `dataSync` (for continuous data synchronization)  
**Wake Lock**: `PARTIAL_WAKE_LOCK` (keeps CPU running during sessions)

### Core Features
- **Real-time Updates**: Every 1 second during active sessions
- **Pause/Resume**: Session state preservation
- **Automatic Completion**: Stops and saves when time expires
- **Statistics Tracking**: Records session data for analytics
- **Multiple Notification Modes**: Automatic selection based on device capabilities

### Service Actions
- `ACTION_START` - Start new study session
- `ACTION_PAUSE` - Pause current session
- `ACTION_RESUME` - Resume paused session  
- `ACTION_STOP` - Stop and save session

### Intent Extras
- `EXTRA_TOPIC_ID` - Topic identifier (String)
- `EXTRA_TOPIC_NAME` - Display name for notification (String)
- `EXTRA_DURATION_MINUTES` - Total session duration (Int, default: 25)
- `EXTRA_USE_PROGRESS_NOTIFICATION` - Use progress-centric mode (Boolean, default: false)

### Notification Selection Logic
```kotlin
fun updateLiveNotification(elapsedMinutes: Int, totalMinutes: Int, progress: Int) {
    when {
        useProgressNotification -> {
            // Mode 1: Progress-centric (countdown, task focus)
            updateProgressCentricNotification(elapsedMinutes, totalMinutes, progress)
        }
        liveAlertManager.canShowLiveAlerts() -> {
            // Mode 2: Live Update (Android 16+, ColorOS)
            liveAlertManager.showStudyProgressLiveUpdate(...)
        }
        else -> {
            // Mode 3: Standard fallback
            updateForegroundNotification(elapsedMinutes, totalMinutes, progress)
        }
    }
}
```

---

## UI Components

### StudySessionControls
Reusable Compose component for starting/controlling study sessions from any screen.

**Features**:
- Duration selection dialog (15, 25, 30, 45, 60 minutes)
- Live timer display during active session
- Pause/Resume/Stop controls
- Status indicator (Active/Paused)
- Seamless integration with service

**Usage**:
```kotlin
StudySessionControls(
    topicId = "python_basics",
    topicName = "Python Basics",
    modifier = Modifier.padding(16.dp)
)
```

### LiveAlertManager Enhancements
Extended the existing Live Alert manager with study session support.

**New Method**:
```kotlin
fun showStudyProgressLiveUpdate(
    topicName: String,
    elapsedMinutes: Int,
    totalMinutes: Int,
    progress: Int,
    isPaused: Boolean
): Boolean
```

**Features**:
- Custom RemoteViews layout
- Interactive notification controls
- Automatic fallback for older Android versions
- Progress bar with percentage
- Pause/Resume state management

---

## Notification Comparison

| Feature | Progress-Centric | Live Update | Standard Fallback |
|---------|------------------|-------------|-------------------|
| **Android Version** | 8+ | 16+ | 8+ |
| **Importance** | DEFAULT | HIGH | LOW |
| **Timer Display** | Countdown (remaining) | Countup (elapsed) | Elapsed only |
| **Progress Bar** | Yes (0-100%) | Yes (0-100%) | Yes (0-100%) |
| **Interactive** | Yes | Yes | Yes |
| **Alert Behavior** | Silent updates | Sound on update | Silent |
| **Visual Priority** | Standard | Promoted/Floating | Minimal |
| **Best For** | Task completion | Engagement | Compatibility |
| **Battery Impact** | Low | Medium | Very Low |

---

## Implementation Details

### Notification Layout (`notification_study_timer.xml`)

**Structure**:
- Topic title (bold, white text)
- Split time display: "12 min / 25 min"
- Horizontal progress bar (blue fill)
- Control buttons (Pause/Resume, Stop)

**Color Scheme**:
- Progress: #1F7BFF (blue)
- Progress background: #33FFFFFF (semi-transparent white)
- Stop button: #FF5252 (red)
- Other text: White

### Service Lifecycle

**Start Session**:
```kotlin
val intent = Intent(context, StudySessionService::class.java).apply {
    action = StudySessionService.ACTION_START
    putExtra(StudySessionService.EXTRA_TOPIC_ID, "topic_id")
    putExtra(StudySessionService.EXTRA_TOPIC_NAME, "Topic Name")
    putExtra(StudySessionService.EXTRA_DURATION_MINUTES, 25)
}
context.startForegroundService(intent)
```

**Service Flow**:
1. Service starts in foreground with initial notification
2. Timer begins counting up from 0 to total duration
3. Every second:
   - Increment elapsed time
   - Update Live Update notification
   - Check for completion
4. On completion:
   - Show completion notification
   - Save session to database
   - Stop service

**Wake Lock**:
- Type: `PARTIAL_WAKE_LOCK`
- Duration: 2 hours maximum
- Keeps CPU running during study session
- Released automatically on service destroy

### Permissions

**Required**:
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

**Android 16+**:
```xml
<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
```

### Manifest Registration

```xml
<service
    android:name="com.sunset.ictstudy.services.StudySessionService"
    android:enabled="true"
    android:exported="false"
    android:foregroundServiceType="dataSync" />
```

## User Experience

### Starting a Session

1. User navigates to any topic detail screen
2. Taps "Start Study Session" button
3. Selects duration from dialog (15/25/30/45/60 minutes)
4. Confirms selection
5. Service starts, notification appears immediately
6. Live updates begin showing real-time progress

### During Session

**Notification Shows**:
- Current topic name
- Elapsed time vs total time
- Visual progress bar
- Pause and Stop buttons

**User Can**:
- Pause/Resume anytime via notification
- Stop session early via notification
- Continue session in background (wake lock active)
- See progress without opening app

### Session Completion

1. Timer reaches total duration
2. Service shows completion notification:
   - "Study Session Completed! 🎉"
   - "You studied [Topic] for [Duration] minutes"
3. Session data saved to database
4. Service stops, notification removed

## Android Version Compatibility

### Android 16+ (API 36+)
- **Full Live Update support**
- Promoted to Dynamic Island-like area
- FLAG_PROMOTED_ONGOING enabled
- Enhanced visibility and interaction

### Android 7+ (API 24+)
- **Standard notifications with RemoteViews**
- Custom layout with live updates
- Interactive buttons functional
- Progress bar updates

### Android 5-6 (API 21-23)
- **Basic progress notifications**
- Simple text and progress bar
- Limited interactivity
- Fallback implementation

## Integration Points

### Topic Detail Screens

Add the StudySessionControls component to any topic detail screen:

```kotlin
@Composable
fun TopicDetailScreen(topic: Topic) {
    LazyColumn {
        // ... topic content ...
        
        item {
            StudySessionControls(
                topicId = topic.id,
                topicName = topic.title
            )
        }
        
        // ... more content ...
    }
}
```

### Database Integration

The service saves session data via:
- `StudyActivityRepository` - Session records
- Tracks: topic ID, duration, completion status, timestamp

**TODO**: Implement `saveStudySession()` method to persist data

### Statistics Integration

Session data can be used for:
- Total study time per topic
- Completion rates
- Study streaks
- Time-of-day patterns
- Topic difficulty analysis

## Testing

### Manual Testing

1. **Start Session**:
   - Verify notification appears immediately
   - Check timer starts at 00:00
   - Confirm topic name displayed correctly

2. **During Session**:
   - Watch timer increment every second
   - Verify progress bar fills
   - Test Pause button (timer stops)
   - Test Resume button (timer continues)
   - Check elapsed/total time accuracy

3. **Completion**:
   - Wait for or fast-forward to completion
   - Verify completion notification appears
   - Check session data saved
   - Confirm service stops

4. **Interruptions**:
   - Test app kill (service continues)
   - Test phone lock (wake lock active)
   - Test notification dismissal (service continues)

### Device Testing

**Android 16+ Devices**:
- OPPO (ColorOS 16+)
- Realme (Realme UI 6+)
- OnePlus (OxygenOS 16+)
- Google Pixel (Android 16+)

**Features to Verify**:
- Live Update promotion
- Dynamic Island-like appearance
- Interactive controls work in compact view
- Smooth updates without lag

## Performance Considerations

**Battery Impact**:
- Wake lock only during active session
- Updates every 1 second (minimal CPU)
- Service stops immediately on completion
- No background polling when not in use

**Memory Usage**:
- Single service instance
- Lightweight notification updates
- Coroutines for async operations
- Proper cleanup on destroy

**Network**:
- No network operations required
- Fully offline functionality
- Optional FCM integration for remote triggers

## Future Enhancements

1. **Multiple Sessions**:
   - Support concurrent sessions
   - Session queue management
   - Priority handling

2. **Advanced Controls**:
   - Adjust duration mid-session
   - Add time to running session
   - Skip to next topic

3. **Smart Notifications**:
   - Break reminders (Pomodoro technique)
   - Focus mode integration
   - Do Not Disturb automation

4. **Analytics**:
   - Session completion rate
   - Optimal study duration
   - Time-of-day productivity
   - Topic mastery correlation

5. **Gamification**:
   - Study streaks
   - Time-based achievements
   - Leaderboards (optional social features)

## Code Files

**New Files**:
1. `services/StudySessionService.kt` - Foreground service
2. `ui/components/StudySessionControls.kt` - UI component
3. `res/layout/notification_study_timer.xml` - Updated layout

**Modified Files**:
1. `notifications/LiveAlertManager.kt` - Added `showStudyProgressLiveUpdate()`
2. `AndroidManifest.xml` - Service registration, permissions
3. `services/StudySessionService.kt` - Progress-centric notifications

**Total**: 500+ lines of new code

---

## Quick Start Guide

### Starting a Study Session

**From UI Component**:
```kotlin
StudySessionControls(
    topicId = topic.id,
    topicName = topic.name,
    modifier = Modifier.fillMaxWidth()
)
```

**From Code (Progress-Centric)**:
```kotlin
val intent = Intent(context, StudySessionService::class.java).apply {
    action = StudySessionService.ACTION_START
    putExtra(StudySessionService.EXTRA_TOPIC_ID, "python_basics")
    putExtra(StudySessionService.EXTRA_TOPIC_NAME, "Python Programming")
    putExtra(StudySessionService.EXTRA_DURATION_MINUTES, 25)
    putExtra(StudySessionService.EXTRA_USE_PROGRESS_NOTIFICATION, true)
}
ContextCompat.startForegroundService(context, intent)
```

### Choosing Notification Mode

**Progress-Centric** (Recommended):
- Shows countdown timer (remaining time)
- Task-focused, minimal distractions
- Default mode for all users
- Set `EXTRA_USE_PROGRESS_NOTIFICATION = true`

**Live Update** (Android 16+):
- Dynamic island-style notifications
- Visual engagement emphasis
- Requires compatible device
- Set `EXTRA_USE_PROGRESS_NOTIFICATION = false`
- Automatically falls back if unavailable

---

## Best Practices

1. **Use Progress-Centric** for most users (better UX)
2. **Session Duration**: 15-25 min (Pomodoro), 30-45 min (lectures), 60 min (deep work)
3. **Battery**: Service uses minimal battery with `PARTIAL_WAKE_LOCK`
4. **Updates**: `setOnlyAlertOnce(true)` prevents notification spam

---

## Troubleshooting

**Notifications Not Showing**:
- Check: Settings > Apps > ICT Study > Notifications
- Verify channel importance not "None"

**Live Updates Not Working**:
- Requires Android 16+ (`Build.VERSION.SDK_INT >= 36`)
- Check `canPostPromotedNotifications()` permission
- Service auto-falls back to standard notifications

**Timer Not Updating**:
- Verify wake lock acquired (check logcat for "StudySessionWakeLock")
- Disable battery optimization for the app

---

## Resources

- [Android Foreground Services](https://developer.android.com/develop/background-work/services/foreground-services)
- [RemoteViews Documentation](https://developer.android.com/reference/android/widget/RemoteViews)
- [Notification Best Practices](https://developer.android.com/develop/ui/views/notifications)
- [ColorOS Live Alerts](https://www.oppo.com/en/newsroom/coloros-live-alerts)
