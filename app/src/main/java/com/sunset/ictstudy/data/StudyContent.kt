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
    ProcessingModes
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
    Networking,
    Databases,
    Cybersecurity,
    Programming,
    Hardware,
    EmergingTech
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
            title = "Processing Modes",
            subtitle = "Data workflows",
            type = QuickActionType.ProcessingModes
        )
    )

    val studyTopics: List<StudyTopic> = listOf(
        StudyTopic(
            id = 1,
            title = "Networking",
            lessons = 12,
            completedPercentage = 75,
            category = TopicCategory.Networking
        ),
        StudyTopic(
            id = 2,
            title = "Databases",
            lessons = 8,
            completedPercentage = 50,
            category = TopicCategory.Databases
        ),
        StudyTopic(
            id = 3,
            title = "Cybersecurity",
            lessons = 15,
            completedPercentage = 25,
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
            completedPercentage = 40,
            category = TopicCategory.Hardware
        ),
        StudyTopic(
            id = 6,
            title = "Emerging Tech",
            lessons = 6,
            completedPercentage = 15,
            category = TopicCategory.EmergingTech
        )
    )
}
