# ColorOS Live Alert Implementation Guide

## Overview
This app now supports **OPPO ColorOS Live Alerts** - Android's version of Dynamic Island. Live Alerts provide dynamic, interactive notifications that appear in a compact format at the top of the screen, similar to iOS Dynamic Island.

## Features Implemented

### 1. **API 36 Targeting**
- Updated `targetSdk` to API 36 for Live Alert support
- Added `android.suppressUnsupportedCompileSdk=36` to gradle.properties

### 2. **Live Alert Types**

#### Study Timer Live Alert
- Shows active study session timer
- Displays elapsed/total minutes
- Interactive controls: Pause/Resume/Stop
- Updates dynamically as timer progresses

#### Study Progress Live Alert
- Shows topic completion progress
- Displays completed/total lessons
- Visual progress bar
- Automatically updates when lessons are completed

### 3. **Core Components**

#### LiveAlertManager.kt
Main manager class for Live Alert notifications:
```kotlin
val liveAlertManager = LiveAlertManager(context)

// Show study timer
liveAlertManager.showStudyTimerLiveAlert(
    totalMinutes = 25,
    elapsedMinutes = 10,
    isPaused = false
)

// Show study progress
liveAlertManager.showStudyProgressLiveAlert(
    topicName = "Python Programming",
    completedLessons = 5,
    totalLessons = 25
)

// Check if Live Alerts are available
if (liveAlertManager.canShowLiveAlerts()) {
    // Device supports Live Alerts
}

// Open Live Alert settings
liveAlertManager.openLiveAlertSettings()
```

#### RemoteViews Layouts
Custom notification layouts for dynamic content:
- `notification_study_timer.xml` - Timer interface with controls
- `notification_study_progress.xml` - Progress display

#### LiveAlertActionReceiver.kt
Handles button actions from Live Alerts:
- Pause/Resume timer
- Stop study session
- Update notification state

#### LiveAlertFCMService.kt
Firebase Cloud Messaging integration for server-triggered updates:
- Receives FCM messages
- Updates Live Alerts dynamically
- Supports remote content updates

## Key Android APIs Used

### Promoted Notifications (API 36+)
```kotlin
// Enable Live Alert promotion
notification.flags = notification.flags or Notification.FLAG_PROMOTED_ONGOING

// Check if notification can be promoted
notification.hasPromotableCharacteristics()

// Check user settings
notificationManager.canPostPromotedNotifications()
```

### RemoteViews for Dynamic Content
```kotlin
val notificationLayout = RemoteViews(context.packageName, R.layout.notification_study_timer)
notificationLayout.setTextViewText(R.id.timer_text, "${elapsedMinutes}/${totalMinutes} min")
notificationLayout.setProgressBar(R.id.timer_progress, totalMinutes, elapsedMinutes, false)
```

## User Settings

### Live Alert Permissions
Users can enable/disable Live Alerts in:
1. **Settings > Notifications > Live Alerts**
2. **App Settings > Notifications** (via in-app button)

The app includes:
- Direct link to Live Alert settings
- Test button to preview Live Alert
- Permission status checking

## Notification Categories

Live Alerts support specific content types:

### Progress/Downloads
- Study session timers
- Topic completion progress
- Quiz progress tracking

### Custom Controls
- Pause/Resume study sessions
- Stop timers
- Quick actions

## FCM Integration

### Server-Side Updates
Send FCM messages to update Live Alerts remotely:

```json
{
  "data": {
    "type": "study_timer",
    "total_minutes": "25",
    "elapsed_minutes": "15",
    "is_paused": "false"
  }
}
```

Supported types:
- `study_timer` - Update timer display
- `study_progress` - Update progress bars
- `quiz_update` - Quiz progress updates

## Fallback Support

For devices without Live Alert support (API < 36):
- Standard ongoing notifications are shown
- Same content, simplified UI
- No promoted notification flag
- Basic progress indicators

## Testing

### Test Live Alert
1. Go to **Settings** in the app
2. Scroll to **Notifications** section
3. Tap **Test Live Alert**
4. A sample study timer Live Alert will appear

### Manual Testing
```kotlin
val liveAlertManager = LiveAlertManager(context)

// Test timer
liveAlertManager.showStudyTimerLiveAlert(25, 10, false)

// Test progress
liveAlertManager.showStudyProgressLiveAlert("Python", 5, 25)

// Check availability
val supported = liveAlertManager.canShowLiveAlerts()
```

## Best Practices

1. **Check Availability**: Always check `canShowLiveAlerts()` before showing
2. **Update Frequently**: Update Live Alerts every few seconds for timers
3. **Keep Content Brief**: Use concise text that fits in compact view
4. **Provide Actions**: Include interactive buttons for better UX
5. **Handle Dismissal**: Clean up when user dismisses notification
6. **Respect User Settings**: Honor Do Not Disturb and notification preferences

## ColorOS Specific Notes

- **OPPO/Realme/OnePlus Devices**: Live Alerts work best on these brands
- **High Importance**: Use `IMPORTANCE_HIGH` for Live Alert channel
- **Full Screen Intent**: Required for ColorOS recognition
- **Ongoing Flag**: Must be set for persistent display
- **Visual Updates**: Update RemoteViews for dynamic content

## Permissions Required

- `POST_NOTIFICATIONS` - Android 13+ notification permission
- `USE_FULL_SCREEN_INTENT` - For Live Alert display
- `FOREGROUND_SERVICE` - For ongoing notifications
- `WAKE_LOCK` - For timer updates

All permissions are declared in `AndroidManifest.xml`.

## Future Enhancements

Potential improvements:
- [ ] Music playback controls for study music
- [ ] Navigation to specific lessons
- [ ] Call/message integration for study groups
- [ ] Real-time collaboration updates
- [ ] Pomodoro timer integration
- [ ] Study streak notifications

## Resources

- [Android Notification Best Practices](https://developer.android.com/develop/ui/views/notifications)
- [RemoteViews Documentation](https://developer.android.com/reference/android/widget/RemoteViews)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [ColorOS Developer Guide](https://open.oppomobile.com/)
