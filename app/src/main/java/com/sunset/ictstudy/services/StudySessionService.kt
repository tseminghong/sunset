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
    }
    
    private val serviceScope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    private var timerJob: Job? = null
    private var wakeLock: PowerManager.WakeLock? = null
    private lateinit var liveAlertManager: LiveAlertManager
    
    private var topicId: String = ""
    private var topicName: String = ""
    private var durationMinutes: Int = 25
    private var useProgressNotification: Boolean = false
    
    override fun onCreate() {
        super.onCreate()
        liveAlertManager = LiveAlertManager(this)
        createNotificationChannel()
        createProgressNotificationChannel()
        acquireWakeLock()
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -> {
                topicId = intent.getStringExtra(EXTRA_TOPIC_ID) ?: ""
                topicName = intent.getStringExtra(EXTRA_TOPIC_NAME) ?: "Study Session"
                durationMinutes = intent.getIntExtra(EXTRA_DURATION_MINUTES, 25)
                useProgressNotification = intent.getBooleanExtra(EXTRA_USE_PROGRESS_NOTIFICATION, true)
                
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
        isRunning = false
        isPaused = false
        currentTopicName = null
        timerJob?.cancel()
        
        // Save session data here
        saveStudySession()
        
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }
    
    private fun startTimer() {
        timerJob?.cancel()
        timerJob = serviceScope.launch {
            while (elapsedSeconds < totalSeconds && isActive && !isPaused) {
                delay(1000) // Update every second
                elapsedSeconds++
                
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
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(topicName)
            .setContentText("$elapsedMinutes / $totalMinutes min")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setProgress(100, progress, false)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
        
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
        
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Studying: $topicName")
            .setContentText("0 / $durationMinutes min")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentIntent(pendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "Pause", pausePendingIntent)
            .addAction(R.drawable.ic_launcher_foreground, "Stop", stopPendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }
    
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Study Sessions",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Active study session notifications"
                setShowBadge(true)
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
        
        val builder = NotificationCompat.Builder(this, PROGRESS_CHANNEL_ID)
            .setContentTitle(topicName)
            .setContentText(if (isPaused) "Paused at $elapsedMinutes min" else "$remainingMinutes:${String.format("%02d", remainingSecondsDisplay)} remaining")
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
        
        // Use setOnlyAlertOnce to prevent repeated sounds/vibrations for progress updates
        builder.setOnlyAlertOnce(true)
        
        val notification = builder.build()
        
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
        // TODO: Save to Room database
        // This would integrate with StudyActivityRepository
        serviceScope.launch {
            try {
                // Save session with elapsed time, topic, completion status
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        timerJob?.cancel()
        serviceScope.cancel()
        wakeLock?.release()
        isRunning = false
        isPaused = false
        currentTopicName = null
    }
    
    override fun onBind(intent: Intent?): IBinder? = null
}
