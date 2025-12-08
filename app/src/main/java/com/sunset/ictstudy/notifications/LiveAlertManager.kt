package com.sunset.ictstudy.notifications

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.widget.RemoteViews
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.sunset.ictstudy.MainActivity
import com.sunset.ictstudy.R

/**
 * LiveAlertManager handles OPPO ColorOS Live Alert notifications
 * (Android's version of Dynamic Island)
 * 
 * Requirements:
 * - Target SDK 36+
 * - Use FLAG_PROMOTED_ONGOING for live alerts
 * - Check hasPromotableCharacteristics() and canPostPromotedNotifications()
 * - Use RemoteViews for dynamic content
 * - Support specific content types: Music, Navigation, Downloads, Calls/Messages
 */
class LiveAlertManager(private val context: Context) {
    
    companion object {
        const val LIVE_ALERT_CHANNEL_ID = "live_alerts"
        const val LIVE_ALERT_CHANNEL_NAME = "Live Alerts"
        
        // Notification IDs for different types
        const val STUDY_TIMER_NOTIFICATION_ID = 2001
        const val STUDY_PROGRESS_NOTIFICATION_ID = 2002
        const val QUIZ_PROGRESS_NOTIFICATION_ID = 2003
        
        // Actions
        const val ACTION_PAUSE_TIMER = "com.sunset.ictstudy.ACTION_PAUSE_TIMER"
        const val ACTION_RESUME_TIMER = "com.sunset.ictstudy.ACTION_RESUME_TIMER"
        const val ACTION_STOP_TIMER = "com.sunset.ictstudy.ACTION_STOP_TIMER"
    }
    
    private val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    
    init {
        createLiveAlertChannel()
    }
    
    private fun createLiveAlertChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                LIVE_ALERT_CHANNEL_ID,
                LIVE_ALERT_CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Dynamic live alerts for study sessions and progress"
                enableVibration(false) // Live alerts are visual, not intrusive
                setShowBadge(true)
                lockscreenVisibility = Notification.VISIBILITY_PUBLIC
            }
            
            notificationManager.createNotificationChannel(channel)
        }
    }
    
    /**
     * Check if the device supports promoted notifications (Live Alerts)
     * Available on API 36+
     */
    fun canShowLiveAlerts(): Boolean {
        return if (Build.VERSION.SDK_INT >= 36) {
            try {
                // Check if user has enabled promoted notifications for this app
                notificationManager.canPostPromotedNotifications()
            } catch (e: Exception) {
                false
            }
        } else {
            false
        }
    }
    
    /**
     * Create a study timer Live Alert with dynamic countdown
     * This shows in the status bar area like Dynamic Island
     */
    @RequiresApi(Build.VERSION_CODES.N)
    fun showStudyTimerLiveAlert(
        totalMinutes: Int,
        elapsedMinutes: Int,
        isPaused: Boolean = false
    ): Boolean {
        if (!canShowLiveAlerts()) {
            return showFallbackStudyTimer(totalMinutes, elapsedMinutes, isPaused)
        }
        
        // Create custom layout using RemoteViews
        val notificationLayout = RemoteViews(context.packageName, R.layout.notification_study_timer)
        notificationLayout.setTextViewText(R.id.timer_title, "Study Session")
        notificationLayout.setTextViewText(
            R.id.timer_text, 
            "${elapsedMinutes}/${totalMinutes} min"
        )
        notificationLayout.setProgressBar(
            R.id.timer_progress,
            totalMinutes,
            elapsedMinutes,
            false
        )
        
        // Control buttons
        val pauseIntent = createActionIntent(ACTION_PAUSE_TIMER)
        val resumeIntent = createActionIntent(ACTION_RESUME_TIMER)
        val stopIntent = createActionIntent(ACTION_STOP_TIMER)
        
        if (isPaused) {
            notificationLayout.setOnClickPendingIntent(R.id.control_button, resumeIntent)
            notificationLayout.setTextViewText(R.id.control_button_text, "Resume")
        } else {
            notificationLayout.setOnClickPendingIntent(R.id.control_button, pauseIntent)
            notificationLayout.setTextViewText(R.id.control_button_text, "Pause")
        }
        notificationLayout.setOnClickPendingIntent(R.id.stop_button, stopIntent)
        
        val contentIntent = PendingIntent.getActivity(
            context,
            0,
            Intent(context, MainActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, LIVE_ALERT_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle("Study Timer")
            .setContentText("${elapsedMinutes}/${totalMinutes} minutes")
            .setCustomContentView(notificationLayout)
            .setCustomBigContentView(notificationLayout)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setOngoing(true)
            .setContentIntent(contentIntent)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .build()
        
        // Add promoted notification flag for Live Alert
        if (Build.VERSION.SDK_INT >= 36) {
            notification.flags = notification.flags or Notification.FLAG_PROMOTED_ONGOING
            
            // Check if notification can be promoted
            if (hasPromotableCharacteristics(notification)) {
                notificationManager.notify(STUDY_TIMER_NOTIFICATION_ID, notification)
                return true
            }
        }
        
        notificationManager.notify(STUDY_TIMER_NOTIFICATION_ID, notification)
        return true
    }
    
    /**
     * Show study progress Live Alert (for overall completion)
     */
    fun showStudyProgressLiveAlert(
        topicName: String,
        completedLessons: Int,
        totalLessons: Int
    ): Boolean {
        if (!canShowLiveAlerts()) {
            return showFallbackProgress(topicName, completedLessons, totalLessons)
        }
        
        val notificationLayout = RemoteViews(context.packageName, R.layout.notification_study_progress)
        notificationLayout.setTextViewText(R.id.progress_title, topicName)
        notificationLayout.setTextViewText(
            R.id.progress_text,
            "$completedLessons of $totalLessons lessons"
        )
        notificationLayout.setProgressBar(
            R.id.progress_bar,
            totalLessons,
            completedLessons,
            false
        )
        
        val contentIntent = PendingIntent.getActivity(
            context,
            0,
            Intent(context, MainActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notification = NotificationCompat.Builder(context, LIVE_ALERT_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle(topicName)
            .setContentText("$completedLessons/$totalLessons lessons complete")
            .setCustomContentView(notificationLayout)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setOngoing(true)
            .setContentIntent(contentIntent)
            .build()
        
        if (Build.VERSION.SDK_INT >= 36) {
            notification.flags = notification.flags or Notification.FLAG_PROMOTED_ONGOING
        }
        
        notificationManager.notify(STUDY_PROGRESS_NOTIFICATION_ID, notification)
        return true
    }
    
    /**
     * Dismiss a live alert notification
     */
    fun dismissLiveAlert(notificationId: Int) {
        notificationManager.cancel(notificationId)
    }
    
    /**
     * Dismiss all live alerts
     */
    fun dismissAllLiveAlerts() {
        notificationManager.cancel(STUDY_TIMER_NOTIFICATION_ID)
        notificationManager.cancel(STUDY_PROGRESS_NOTIFICATION_ID)
        notificationManager.cancel(QUIZ_PROGRESS_NOTIFICATION_ID)
    }
    
    /**
     * Open Live Alert settings for the app
     */
    fun openLiveAlertSettings() {
        if (Build.VERSION.SDK_INT >= 36) {
            val intent = Intent("android.settings.APP_NOTIFICATION_SETTINGS").apply {
                putExtra("android.provider.extra.APP_PACKAGE", context.packageName)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            try {
                context.startActivity(intent)
            } catch (e: Exception) {
                // Fallback to general notification settings
                openNotificationSettings()
            }
        } else {
            openNotificationSettings()
        }
    }
    
    private fun openNotificationSettings() {
        val intent = Intent().apply {
            action = "android.settings.APP_NOTIFICATION_SETTINGS"
            putExtra("app_package", context.packageName)
            putExtra("app_uid", context.applicationInfo.uid)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
    }
    
    /**
     * Check if notification has promotable characteristics
     * Available on API 36+
     */
    private fun hasPromotableCharacteristics(notification: Notification): Boolean {
        return if (Build.VERSION.SDK_INT >= 36) {
            try {
                // This method checks if the notification meets Live Alert criteria
                notification.hasPromotableCharacteristics()
            } catch (e: Exception) {
                false
            }
        } else {
            false
        }
    }
    
    private fun createActionIntent(action: String): PendingIntent {
        val intent = Intent(action).apply {
            setPackage(context.packageName)
        }
        return PendingIntent.getBroadcast(
            context,
            action.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
    }
    
    // Fallback methods for devices that don't support Live Alerts
    
    private fun showFallbackStudyTimer(
        totalMinutes: Int,
        elapsedMinutes: Int,
        isPaused: Boolean
    ): Boolean {
        val notification = NotificationCompat.Builder(context, LIVE_ALERT_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle("Study Timer")
            .setContentText("${elapsedMinutes}/${totalMinutes} minutes")
            .setProgress(totalMinutes, elapsedMinutes, false)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setOngoing(true)
            .build()
        
        notificationManager.notify(STUDY_TIMER_NOTIFICATION_ID, notification)
        return true
    }
    
    private fun showFallbackProgress(
        topicName: String,
        completedLessons: Int,
        totalLessons: Int
    ): Boolean {
        val notification = NotificationCompat.Builder(context, LIVE_ALERT_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle(topicName)
            .setContentText("$completedLessons/$totalLessons lessons complete")
            .setProgress(totalLessons, completedLessons, false)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()
        
        notificationManager.notify(STUDY_PROGRESS_NOTIFICATION_ID, notification)
        return true
    }
}
