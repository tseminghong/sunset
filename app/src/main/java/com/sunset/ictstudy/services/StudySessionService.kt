package com.sunset.ictstudy.services

import android.app.*
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import androidx.core.app.NotificationCompat
import com.sunset.ictstudy.MainActivity
import com.sunset.ictstudy.R
import com.sunset.ictstudy.data.database.StudyActivityRepository
import com.sunset.ictstudy.notifications.LiveAlertManager
import kotlinx.coroutines.*
import java.util.concurrent.TimeUnit

/**
 * StudySessionService - Foreground service for active study sessions
 * Integrates with Android 16 Live Update notifications to show real-time progress
 */
class StudySessionService : Service() {
    
    companion object {
        const val CHANNEL_ID = "study_session_channel"
        const val PROGRESS_CHANNEL_ID = "study_progress_channel"
        const val NOTIFICATION_ID = 1001
        
        // Live Update notification extras (Android 16+)
        private const val EXTRA_REQUEST_PROMOTED_ONGOING = "android.extra.EXTRA_REQUEST_PROMOTED_ONGOING"
        private const val EXTRA_SHORT_CRITICAL_TEXT = "android.extra.EXTRA_SHORT_CRITICAL_TEXT"
        
        // Intent extras
        const val EXTRA_TOPIC_ID = "topic_id"
        const val EXTRA_TOPIC_NAME = "topic_name"
        const val EXTRA_DURATION_MINUTES = "duration_minutes"
        const val EXTRA_USE_PROGRESS_NOTIFICATION = "use_progress_notification"
        
        // Actions
        const val ACTION_START = "action_start"
        const val ACTION_PAUSE = "action_pause"
        const val ACTION_RESUME = "action_resume"
        const val ACTION_STOP = "action_stop"
        
        // Service state
        var isRunning = false
        var isPaused = false
        var currentTopicName: String? = null
        var elapsedSeconds = 0
        var totalSeconds = 0
        var isStudyMode = false  // New flag for study mode
    }
    
    private val serviceScope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    private var timerJob: Job? = null
    private var wakeLock: PowerManager.WakeLock? = null
    private lateinit var liveAlertManager: LiveAlertManager
    private lateinit var studyActivityRepository: StudyActivityRepository
    
    private var topicId: String = ""
    private var topicName: String = ""
    private var durationMinutes: Int = 25
    private var useProgressNotification: Boolean = false
    private var autoSaveCounter: Int = 0  // Track seconds for auto-save
    
    override fun onCreate() {
        super.onCreate()
        liveAlertManager = LiveAlertManager(this)
        studyActivityRepository = StudyActivityRepository(this)
        createNotificationChannel()
        createProgressNotificationChannel()
        acquireWakeLock()
    }
    
    /**
     * Check if the app can post promoted (Live Update) notifications
     * Requires Android 16+ (VANILLA_ICE_CREAM)
     */
    private fun canPostPromotedNotifications(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            val notificationManager = getSystemService(NotificationManager::class.java)
            return notificationManager.canPostPromotedNotifications()
        }
        return false
    }
    
    /**
     * Check if a notification has the characteristics to be promoted
     * This validates the notification meets Live Update requirements
     */
    private fun hasPromotableCharacteristics(notification: Notification): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            return notification.hasPromotableCharacteristics()
        }
        return false
    }
    
    /**
     * Check if a notification is currently promoted as a Live Update
     */
    private fun isPromoted(notification: Notification): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            return (notification.flags and Notification.FLAG_PROMOTED_ONGOING) != 0
        }
        return false
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -> {
                topicId = intent.getStringExtra(EXTRA_TOPIC_ID) ?: ""
                topicName = intent.getStringExtra(EXTRA_TOPIC_NAME) ?: "Study Session"
                durationMinutes = intent.getIntExtra(EXTRA_DURATION_MINUTES, 25)
                useProgressNotification = intent.getBooleanExtra(EXTRA_USE_PROGRESS_NOTIFICATION, true)
                isStudyMode = (durationMinutes >= 120) // Study mode uses longer sessions
                
                startStudySession()
            }
            ACTION_PAUSE -> pauseStudySession()
            ACTION_RESUME -> resumeStudySession()
            ACTION_STOP -> stopStudySession()
        }
        
        return START_STICKY
    }
    
    private fun startStudySession() {
        isRunning = true
        isPaused = false
        currentTopicName = topicName
        elapsedSeconds = 0
        totalSeconds = durationMinutes * 60
        
        // Start foreground service
        val notification = createForegroundNotification()
        startForeground(NOTIFICATION_ID, notification)
        
        // Start timer
        startTimer()
    }
    
    private fun pauseStudySession() {
        isPaused = true
        timerJob?.cancel()
        updateLiveNotification()
    }
    
    private fun resumeStudySession() {
        isPaused = false
        startTimer()
    }
    
    private fun stopStudySession() {
        // Save session data
        saveStudySession()
        
        if (isStudyMode) {
            // In study mode, keep the notification but make it non-ongoing
            // This allows it to persist even when app is closed
            val persistentNotification = createPersistentStudyModeNotification()
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.notify(NOTIFICATION_ID, persistentNotification)
            
            // Stop foreground but keep notification
            stopForeground(STOP_FOREGROUND_DETACH)
        } else {
            stopForeground(STOP_FOREGROUND_REMOVE)
        }
        
        // Clean up
        isRunning = false
        isPaused = false
        currentTopicName = null
        timerJob?.cancel()
        stopSelf()
    }
    
    private fun startTimer() {
        timerJob?.cancel()
        timerJob = serviceScope.launch {
            while (elapsedSeconds < totalSeconds && isActive && !isPaused) {
                delay(1000) // Update every second
                elapsedSeconds++
                autoSaveCounter++
                
                // Auto-save progress every 60 seconds
                if (autoSaveCounter >= 60) {
                    saveStudySession()
                    autoSaveCounter = 0
                }
                
                // Update live notification every second
                updateLiveNotification()
                
                // Check if session completed
                if (elapsedSeconds >= totalSeconds) {
                    onSessionCompleted()
                    break
                }
            }
        }
    }
    
    private fun updateLiveNotification() {
        val elapsedMinutes = elapsedSeconds / 60
        val totalMinutes = totalSeconds / 60
        val progress = (elapsedSeconds.toFloat() / totalSeconds * 100).toInt()
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            // Use Progress-centric notification if enabled
            if (useProgressNotification) {
                updateProgressCentricNotification(elapsedMinutes, totalMinutes, progress)
            }
            // Use Live Alert if supported (Android 16+)
            else if (liveAlertManager.canShowLiveAlerts()) {
                liveAlertManager.showStudyProgressLiveUpdate(
                    topicName = topicName,
                    elapsedMinutes = elapsedMinutes,
                    totalMinutes = totalMinutes,
                    progress = progress,
                    isPaused = isPaused
                )
            } else {
                // Fallback to regular notification update
                updateForegroundNotification(elapsedMinutes, totalMinutes, progress)
            }
        }
    }
    
    private fun updateForegroundNotification(
        elapsedMinutes: Int,
        totalMinutes: Int,
        progress: Int
    ) {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val pauseIntent = Intent(this, StudySessionService::class.java).apply {
            action = if (isPaused) ACTION_RESUME else ACTION_PAUSE
        }
        val pausePendingIntent = PendingIntent.getService(
            this, 0, pauseIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val stopIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 1, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val remainingMinutes = totalMinutes - elapsedMinutes
        val statusText = if (isPaused) {
            "Paused at $elapsedMinutes min"
        } else {
            "$elapsedMinutes / $totalMinutes min • $remainingMinutes min left"
        }
        
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Studying: $topicName")
            .setContentText(statusText)
            .setStyle(NotificationCompat.BigTextStyle()
                .bigText("$statusText\n\nProgress: $progress%\nKeep going! You're making great progress."))
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentIntent(pendingIntent)
            .setProgress(100, progress, false)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
        
        // Add action buttons
        builder.addAction(
            if (isPaused) android.R.drawable.ic_media_play else android.R.drawable.ic_media_pause,
            if (isPaused) "Resume" else "Pause",
            pausePendingIntent
        )
        builder.addAction(
            android.R.drawable.ic_delete,
            "Stop",
            stopPendingIntent
        )
        
        // Live Update features (Android 16+)
        val notification = builder.build()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            // Status chip: Show elapsed time if < 7 characters, otherwise show icon only
            val chipText = if (elapsedMinutes < 100) {
                "${elapsedMinutes}m"
            } else {
                val hours = elapsedMinutes / 60
                val mins = elapsedMinutes % 60
                if (hours < 10) "${hours}h${mins}m" else "${hours}h"
            }
            notification.extras.putBoolean(EXTRA_REQUEST_PROMOTED_ONGOING, true)
            notification.extras.putCharSequence(EXTRA_SHORT_CRITICAL_TEXT, chipText)
        }
        
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(NOTIFICATION_ID, notification)
    }
    
    private fun onSessionCompleted() {
        // Show completion notification
        showCompletionNotification()
        
        // Save completed session
        saveStudySession(completed = true)
        
        stopStudySession()
    }
    
    private fun showCompletionNotification() {
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Study Session Completed! 🎉")
            .setContentText("You studied $topicName for ${durationMinutes} minutes")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .build()
        
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(NOTIFICATION_ID + 100, notification)
    }
    
    private fun createForegroundNotification(): Notification {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val pauseIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_PAUSE
        }
        val pausePendingIntent = PendingIntent.getService(
            this, 0, pauseIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val stopIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 1, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        // Live Update notification meeting all requirements
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Studying: $topicName")  // Required: contentTitle
            .setContentText("Starting study session...")
            .setStyle(NotificationCompat.BigTextStyle()
                .bigText("Focus time started for $topicName\n\nStay focused and track your progress!"))
            .setSmallIcon(R.drawable.ic_launcher_foreground)  // Required: small icon
            .setContentIntent(pendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "Pause", pausePendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "Stop", stopPendingIntent)
            .setOngoing(true)  // Required: FLAG_ONGOING_EVENT
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOnlyAlertOnce(true)
        
        // Request Live Update promotion (Android 16+)
        val notification = builder.build()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            notification.extras.putBoolean(EXTRA_REQUEST_PROMOTED_ONGOING, true)
            notification.extras.putCharSequence(EXTRA_SHORT_CRITICAL_TEXT, "0m")
        }
        
        return notification
    }
    
    private fun createPersistentStudyModeNotification(): Notification {
        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val resumeIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_RESUME
        }
        val resumePendingIntent = PendingIntent.getService(
            this, 0, resumeIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val stopIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 1, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val elapsedMinutes = elapsedSeconds / 60
        val elapsedHours = elapsedMinutes / 60
        val remainingMinutes = elapsedMinutes % 60
        
        val timeText = if (elapsedHours > 0) {
            "${elapsedHours}h ${remainingMinutes}m studied"
        } else {
            "$elapsedMinutes min studied"
        }
        
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Study Mode: $topicName")
            .setContentText(timeText)
            .setStyle(NotificationCompat.BigTextStyle()
                .bigText("$timeText\n\nTap Resume to continue your study session\nor End Session to finish."))
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentIntent(pendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "Resume", resumePendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "End Session", stopPendingIntent)
            .setOngoing(true)  // Keep as ongoing for Live Update
            .setAutoCancel(false)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOnlyAlertOnce(true)
        
        // Live Update features for persistent notification
        val notification = builder.build()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            // Status chip for elapsed time
            val chipText = if (elapsedHours > 0) {
                "${elapsedHours}h${remainingMinutes}m"
            } else {
                "${elapsedMinutes}m"
            }
            notification.extras.putBoolean(EXTRA_REQUEST_PROMOTED_ONGOING, true)
            notification.extras.putCharSequence(EXTRA_SHORT_CRITICAL_TEXT, chipText)
        }
        
        return notification
    }
    
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Study Sessions",
                NotificationManager.IMPORTANCE_DEFAULT  // Must be DEFAULT or higher for Live Updates
            ).apply {
                description = "Active study session notifications with Live Updates"
                setShowBadge(true)
                enableVibration(false)  // Reduce disruption
                setSound(null, null)  // Silent for ongoing sessions
            }
            
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }
    
    private fun createProgressNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                PROGRESS_CHANNEL_ID,
                "Study Progress",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Progress-centric study session notifications with real-time updates"
                setShowBadge(true)
                enableVibration(false)
                lockscreenVisibility = Notification.VISIBILITY_PUBLIC
            }
            
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }
    
    /**
     * Progress-centric notification (Android 16+)
     * Optimized for showing ongoing task progress with FLAG_ONLY_UPDATE_PROGRESS
     * Enhanced with Live Update support
     */
    private fun updateProgressCentricNotification(
        elapsedMinutes: Int,
        totalMinutes: Int,
        progress: Int
    ) {
        val contentIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val pauseIntent = Intent(this, StudySessionService::class.java).apply {
            action = if (isPaused) ACTION_RESUME else ACTION_PAUSE
        }
        val pausePendingIntent = PendingIntent.getService(
            this, 0, pauseIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        val stopIntent = Intent(this, StudySessionService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 1, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        // Calculate remaining time
        val remainingSeconds = totalSeconds - elapsedSeconds
        val remainingMinutes = remainingSeconds / 60
        val remainingSecondsDisplay = remainingSeconds % 60
        
        val statusText = if (isPaused) {
            "Paused at $elapsedMinutes min"
        } else {
            "$remainingMinutes:${String.format("%02d", remainingSecondsDisplay)} remaining"
        }
        
        val builder = NotificationCompat.Builder(this, PROGRESS_CHANNEL_ID)
            .setContentTitle(topicName)
            .setContentText(statusText)
            .setStyle(NotificationCompat.BigTextStyle()
                .bigText("$statusText\n\nProgress: $progress% ($elapsedMinutes / $totalMinutes min)\nKeep going!"))
            .setSubText("$elapsedMinutes / $totalMinutes min")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setProgress(100, progress, false)
            .setContentIntent(contentIntent)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        
        // Add actions
        if (isPaused) {
            builder.addAction(
                android.R.drawable.ic_media_play,
                "Resume",
                pausePendingIntent
            )
        } else {
            builder.addAction(
                android.R.drawable.ic_media_pause,
                "Pause",
                pausePendingIntent
            )
        }
        builder.addAction(
            android.R.drawable.ic_delete,
            "Stop",
            stopPendingIntent
        )
        
        // Live Update features (Android 16+)
        val notification = builder.build()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            // Status chip with remaining time
            val chipText = if (remainingMinutes < 100) {
                "${remainingMinutes}m"
            } else {
                val hours = remainingMinutes / 60
                val mins = remainingMinutes % 60
                if (hours < 10) "${hours}h${mins}m" else "${hours}h"
            }
            notification.extras.putBoolean(EXTRA_REQUEST_PROMOTED_ONGOING, true)
            notification.extras.putCharSequence(EXTRA_SHORT_CRITICAL_TEXT, chipText)
        }
        
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(NOTIFICATION_ID, notification)
    }
    
    private fun acquireWakeLock() {
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(
            PowerManager.PARTIAL_WAKE_LOCK,
            "StudyApp::StudySessionWakeLock"
        ).apply {
            acquire(TimeUnit.HOURS.toMillis(2)) // Max 2 hours
        }
    }
    
    private fun saveStudySession(completed: Boolean = false) {
        // Use runBlocking to ensure data is saved synchronously
        runBlocking {
            try {
                // Calculate actual study time in minutes
                val studyMinutes = elapsedSeconds / 60
                
                // Only save if there was actual study time
                if (studyMinutes > 0) {
                    studyActivityRepository.recordStudySession(
                        minutesStudied = studyMinutes,
                        lessonsCompleted = if (completed) 1 else 0
                    )
                    android.util.Log.d("StudySessionService", "Saved $studyMinutes minutes of study time")
                }
            } catch (e: Exception) {
                android.util.Log.e("StudySessionService", "Error saving study session", e)
                e.printStackTrace()
            }
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        
        // Save any remaining progress before destroying
        if (elapsedSeconds > 0) {
            saveStudySession()
        }
        
        timerJob?.cancel()
        serviceScope.cancel()
        wakeLock?.release()
        isRunning = false
        isPaused = false
        currentTopicName = null
    }
    
    override fun onBind(intent: Intent?): IBinder? = null
}
