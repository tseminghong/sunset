package com.sunset.ictstudy.data

/** Simple snapshot of the student's learning progress and entry points. */
data class QuickAccessAction(
    val id: Int,
    val title: String,
    val subtitle: String,
    val type: QuickActionType
)

enum class QuickActionType {
    ContinueLearning,
    SavedItems,
    PracticeQuiz,
    StudyCalendar,
    Statistics,
    Reminders
}

/** Topic metadata shown in the Study Topics list. */
data class StudyTopic(
    val id: Int,
    val title: String,
    val lessons: Int,
    val completedPercentage: Int,
    val category: TopicCategory
)

enum class TopicCategory {
    ProcessingModes,
    Databases,
    Cybersecurity,
    Programming,
    Hardware,
    Python,
    SQL
}

object StudyContentRepository {
    val quickAccess: List<QuickAccessAction> = listOf(
        QuickAccessAction(
            id = 1,
            title = "Continue",
            subtitle = "Where you left off",
            type = QuickActionType.ContinueLearning
        ),
        QuickAccessAction(
            id = 2,
            title = "Saved Items",
            subtitle = "Your bookmarks",
            type = QuickActionType.SavedItems
        ),
        QuickAccessAction(
            id = 3,
            title = "Practice",
            subtitle = "Flash quizzes",
            type = QuickActionType.PracticeQuiz
        ),
        QuickAccessAction(
            id = 4,
            title = "Calendar",
            subtitle = "Study schedule",
            type = QuickActionType.StudyCalendar
        ),
        QuickAccessAction(
            id = 5,
            title = "Statistics",
            subtitle = "Your progress",
            type = QuickActionType.Statistics
        ),
        QuickAccessAction(
            id = 6,
            title = "Reminders",
            subtitle = "Study alerts",
            type = QuickActionType.Reminders
        )
    )

    val studyTopics: List<StudyTopic> = listOf(
        StudyTopic(
            id = 1,
            title = "Processing Modes",
            lessons = 5,
            completedPercentage = 0,
            category = TopicCategory.ProcessingModes
        ),
        StudyTopic(
            id = 2,
            title = "Databases",
            lessons = 8,
            completedPercentage = 0,
            category = TopicCategory.Databases
        ),
        StudyTopic(
            id = 3,
            title = "Cybersecurity",
            lessons = 15,
            completedPercentage = 0,
            category = TopicCategory.Cybersecurity
        ),
        StudyTopic(
            id = 4,
            title = "Programming",
            lessons = 20,
            completedPercentage = 0,
            category = TopicCategory.Programming
        ),
        StudyTopic(
            id = 5,
            title = "Hardware",
            lessons = 10,
            completedPercentage = 0,
            category = TopicCategory.Hardware
        ),
        StudyTopic(
            id = 6,
            title = "Python Programming",
            lessons = 25,
            completedPercentage = 0,
            category = TopicCategory.Python
        ),
        StudyTopic(
            id = 7,
            title = "SQL Database",
            lessons = 18,
            completedPercentage = 0,
            category = TopicCategory.SQL
        )
    )
}
