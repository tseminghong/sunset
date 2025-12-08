# Android 16 Live Update Notifications for Study Sessions

## Overview
This implementation adds Android 16 Live Update notification support for study sessions, providing real-time progress tracking similar to ColorOS Live Alerts and iOS Dynamic Island.

## Features

### 1. **StudySessionService** - Foreground Service
A dedicated foreground service that manages active study sessions with live progress updates.

**Key Features**:
- Real-time countdown timer (updates every second)
- Pause/Resume functionality
- Automatic completion detection
- Wake lock management to prevent sleep during sessions
- Session persistence and statistics tracking

**Service Actions**:
- `ACTION_START` - Start new study session
- `ACTION_PAUSE` - Pause current session
- `ACTION_RESUME` - Resume paused session  
- `ACTION_STOP` - Stop and save session

**Intent Extras**:
- `EXTRA_TOPIC_ID` - Topic identifier
- `EXTRA_TOPIC_NAME` - Display name for notification
- `EXTRA_DURATION_MINUTES` - Total session duration (default: 25 minutes)

### 2. **Live Update Notifications**
Enhanced notification system that provides dynamic, real-time updates in the notification shade.

**Android 16+ Features**:
- `FLAG_PROMOTED_ONGOING` - Promotes notification to Live Update area
- `hasPromotableCharacteristics()` - Validates notification eligibility
- `canPostPromotedNotifications()` - Checks user permission
- RemoteViews for custom layouts with live data

**Notification Updates**:
- **Every second** during active sessions
- Shows: Topic name, elapsed time, total time, progress bar
- Interactive controls: Pause/Resume, Stop buttons
- Status indicator: "In Progress" or "Paused"

**Visual Elements**:
```
┌─────────────────────────────────┐
│ Python Programming              │
│ 12 min / 25 min                 │
│ ████████░░░░░░░░ 48%            │
│             [Pause]  [Stop]     │
└─────────────────────────────────┘
```

### 3. **StudySessionControls** - UI Component
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

### 4. **LiveAlertManager Enhancements**
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

**Total**: 400+ lines of new code

## Resources

- [Android Foreground Services](https://developer.android.com/develop/background-work/services/foreground-services)
- [RemoteViews Documentation](https://developer.android.com/reference/android/widget/RemoteViews)
- [Notification Best Practices](https://developer.android.com/develop/ui/views/notifications)
- [ColorOS Live Alerts](https://www.oppo.com/en/newsroom/coloros-live-alerts)
