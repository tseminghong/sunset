package com.sunset.ictstudy.notifications

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

/**
 * Firebase Cloud Messaging service for dynamic Live Alert updates
 * This allows server-side updates to Live Alert notifications
 */
class LiveAlertFCMService : FirebaseMessagingService() {
    
    companion object {
        private const val TAG = "LiveAlertFCMService"
        
        // Notification types from FCM payload
        private const val TYPE_STUDY_TIMER = "study_timer"
        private const val TYPE_STUDY_PROGRESS = "study_progress"
        private const val TYPE_QUIZ_UPDATE = "quiz_update"
    }
    
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        
        Log.d(TAG, "Message received from: ${message.from}")
        
        // Check if message contains a data payload
        message.data.isNotEmpty().let {
            Log.d(TAG, "Message data payload: ${message.data}")
            handleDataPayload(message.data)
        }
        
        // Check if message contains a notification payload
        message.notification?.let {
            Log.d(TAG, "Message Notification Body: ${it.body}")
        }
    }
    
    private fun handleDataPayload(data: Map<String, String>) {
        val type = data["type"] ?: return
        val liveAlertManager = LiveAlertManager(applicationContext)
        
        when (type) {
            TYPE_STUDY_TIMER -> {
                val totalMinutes = data["total_minutes"]?.toIntOrNull() ?: 25
                val elapsedMinutes = data["elapsed_minutes"]?.toIntOrNull() ?: 0
                val isPaused = data["is_paused"]?.toBoolean() ?: false
                
                liveAlertManager.showStudyTimerLiveAlert(
                    totalMinutes = totalMinutes,
                    elapsedMinutes = elapsedMinutes,
                    isPaused = isPaused
                )
            }
            
            TYPE_STUDY_PROGRESS -> {
                val topicName = data["topic_name"] ?: "Study Topic"
                val completedLessons = data["completed_lessons"]?.toIntOrNull() ?: 0
                val totalLessons = data["total_lessons"]?.toIntOrNull() ?: 10
                
                liveAlertManager.showStudyProgressLiveAlert(
                    topicName = topicName,
                    completedLessons = completedLessons,
                    totalLessons = totalLessons
                )
            }
            
            TYPE_QUIZ_UPDATE -> {
                // Handle quiz progress updates
                Log.d(TAG, "Quiz update received")
            }
        }
    }
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, "Refreshed FCM token: $token")
        
        // TODO: Send token to your server for targeted notifications
        sendTokenToServer(token)
    }
    
    private fun sendTokenToServer(token: String) {
        // TODO: Implement server communication
        // You would send this token to your backend to enable
        // server-triggered Live Alert updates
        Log.d(TAG, "Sending token to server: $token")
    }
}
