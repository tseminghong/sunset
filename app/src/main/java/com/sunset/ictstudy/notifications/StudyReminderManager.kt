package com.sunset.ictstudy.notifications

import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.sunset.ictstudy.MainActivity
import com.sunset.ictstudy.R
import java.util.Calendar

class StudyReminderManager(private val context: Context) {
    
    private val notificationManager = NotificationManagerCompat.from(context)
    private val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    
    companion object {
        const val CHANNEL_ID = "study_reminders"
        const val CHANNEL_NAME = "Study Reminders"
        const val NOTIFICATION_ID_BASE = 1000
        
        // ColorOS specific
        const val COLOROS_CHANNEL_ID = "study_reminders_coloros"
        const val COLOROS_CHANNEL_NAME = "Study Reminders (Live Alert)"
    }
    
    init {
        createNotificationChannels()
    }
    
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Standard notification channel
            val standardChannel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Reminders for your study sessions"
                enableVibration(true)
                enableLights(true)
                setShowBadge(true)
            }
            
            // ColorOS specific channel with live alert support
            val colorOsChannel = NotificationChannel(
                COLOROS_CHANNEL_ID,
                COLOROS_CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Enhanced study reminders with ColorOS live alerts"
                enableVibration(true)
                enableLights(true)
                setShowBadge(true)
                // ColorOS recognizes HIGH importance + full screen intent as live alert
                lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
            }
            
            val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(standardChannel)
            manager.createNotificationChannel(colorOsChannel)
        }
    }
    
    fun scheduleReminder(
        reminderId: Int,
        title: String,
        message: String,
        hour: Int,
        minute: Int,
        daysOfWeek: List<Int>
    ) {
        // Schedule for each selected day of week
        daysOfWeek.forEach { dayOfWeek ->
            val calendar = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, hour)
                set(Calendar.MINUTE, minute)
                set(Calendar.SECOND, 0)
                set(Calendar.DAY_OF_WEEK, dayOfWeek + 1) // Calendar uses 1-7
                
                // If time has passed today, schedule for next week
                if (timeInMillis <= System.currentTimeMillis()) {
                    add(Calendar.WEEK_OF_YEAR, 1)
                }
            }
            
            val intent = Intent(context, StudyReminderReceiver::class.java).apply {
                putExtra("reminderId", reminderId)
                putExtra("title", title)
                putExtra("message", message)
                putExtra("dayOfWeek", dayOfWeek)
            }
            
            val pendingIntent = PendingIntent.getBroadcast(
                context,
                reminderId * 10 + dayOfWeek, // Unique ID per reminder per day
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            
            alarmManager.setRepeating(
                AlarmManager.RTC_WAKEUP,
                calendar.timeInMillis,
                AlarmManager.INTERVAL_DAY * 7, // Weekly repeat
                pendingIntent
            )
        }
    }
    
    fun cancelReminder(reminderId: Int, daysOfWeek: List<Int>) {
        daysOfWeek.forEach { dayOfWeek ->
            val intent = Intent(context, StudyReminderReceiver::class.java)
            val pendingIntent = PendingIntent.getBroadcast(
                context,
                reminderId * 10 + dayOfWeek,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            alarmManager.cancel(pendingIntent)
        }
    }
    
    fun showNotification(reminderId: Int, title: String, message: String) {
        val isColorOS = isColorOSDevice()
        val channelId = if (isColorOS) COLOROS_CHANNEL_ID else CHANNEL_ID
        
        // Intent to open app when notification is tapped
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        
        val pendingIntent = PendingIntent.getActivity(
            context,
            reminderId,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val notificationBuilder = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_REMINDER)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setVibrate(longArrayOf(0, 500, 250, 500))
        
        // ColorOS specific enhancements for live alerts
        if (isColorOS) {
            // Full screen intent makes it appear as live alert on ColorOS
            val fullScreenIntent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
            val fullScreenPendingIntent = PendingIntent.getActivity(
                context,
                reminderId + 10000,
                fullScreenIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            
            notificationBuilder
                .setFullScreenIntent(fullScreenPendingIntent, true)
                .setStyle(NotificationCompat.BigTextStyle().bigText(message))
                .addAction(
                    R.drawable.ic_launcher_foreground,
                    "Start Studying",
                    pendingIntent
                )
        }
        
        try {
            notificationManager.notify(NOTIFICATION_ID_BASE + reminderId, notificationBuilder.build())
        } catch (e: SecurityException) {
            // Handle missing POST_NOTIFICATIONS permission on Android 13+
            e.printStackTrace()
        }
    }
    
    private fun isColorOSDevice(): Boolean {
        return try {
            val manufacturer = Build.MANUFACTURER.lowercase()
            val brand = Build.BRAND.lowercase()
            manufacturer.contains("oppo") || 
            manufacturer.contains("realme") || 
            manufacturer.contains("oneplus") ||
            brand.contains("oppo") ||
            brand.contains("realme") ||
            brand.contains("oneplus")
        } catch (e: Exception) {
            false
        }
    }
}

class StudyReminderReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val reminderId = intent.getIntExtra("reminderId", 0)
        val title = intent.getStringExtra("title") ?: "Study Reminder"
        val message = intent.getStringExtra("message") ?: "Time to study!"
        
        val reminderManager = StudyReminderManager(context)
        reminderManager.showNotification(reminderId, title, message)
    }
}
