# ICT Revision Hub - App Design Flow Chart

## Architecture Overview

The ICT Revision Hub is a native Android app built with Kotlin and Jetpack Compose, following a single-activity architecture with Compose Navigation.

## Navigation Flow Chart

```mermaid
flowchart TD
    Start([App Launch]) --> MainActivity[MainActivity<br/>Theme: SunsetTheme]
    MainActivity --> NavHost[IctStudyApp<br/>NavHost Controller]
    
    NavHost --> Home[Home Screen<br/>Route: home]
    
    %% Home Screen Components
    Home --> HomeHeader[Header Section<br/>Greeting + Settings Icon]
    Home --> SearchBar[Search Bar<br/>Filter Topics]
    Home --> QuickAccess[Quick Acc  ess Cards]
    Home --> TopicsList[Study Topics List<br/>Filterable by Search]
    
    %% Quick Access Actions
    QuickAccess --> QA1[Continue Learning<br/>Future Route]
    QuickAccess --> QA2[Saved Items<br/>Future Route]
    QuickAccess --> QA3[Practice Quiz<br/>Future Route]
    QuickAccess --> QA4[Processing Modes]
    
    QA4 -->|Navigate| ProcessingList[Processing Modes List<br/>Route: processingModes]
    
    %% Processing Modes List
    ProcessingList --> PMList[Mode Cards<br/>• Batch Processing<br/>• Online Processing<br/>• Real-time Processing<br/>• Distributed Processing<br/>• Parallel Processing]
    
    PMList -->|Tap Card| ProcessingDetail[Processing Mode Detail<br/>Route: processingModes/:modeId]
    
    %% Processing Mode Detail Sections
    ProcessingDetail --> DetailHeader[Header<br/>Back + Bookmark + Mark as Read]
    ProcessingDetail --> DetailSections[Content Sections]
    
    DetailSections --> Def[Definition & Concepts]
    DetailSections --> Types[Types Grid<br/>Interactive Cards]
    DetailSections --> Adv[Advantages<br/>Icon List]
    DetailSections --> Dis[Disadvantages<br/>Icon List]
    DetailSections --> Use[Use Cases<br/>Bullet List]
    DetailSections --> Best[Best Practices<br/>Bullet List]
    
    ProcessingDetail -->|Back| ProcessingList
    ProcessingList -->|Back| Home
    
    %% Future Routes
    TopicsList -.->|Future| TopicDetail[Topic Detail Screen]
    QA1 -.->|Future| LastSession[Last Session Resume]
    QA2 -.->|Future| SavedScreen[Saved Items Screen]
    QA3 -.->|Future| QuizScreen[Quiz Module]
    HomeHeader -.->|Future| SettingsScreen[Settings Screen]
    
    style Start fill:#1F7BFF
    style Home fill:#4FC0FF
    style ProcessingList fill:#706CFF
    style ProcessingDetail fill:#3AD2FF
    style NavHost fill:#1FC15A
```

## State Management

```mermaid
flowchart LR
    subgraph App State
        ReadStates[Read States Map<br/>modeId → Boolean]
        SearchQuery[Search Query<br/>String]
        BookmarkStates[Bookmark States<br/>Future Implementation]
    end
    
    subgraph Data Layer
        StudyRepo[StudyContentRepository<br/>• Quick Actions<br/>• Study Topics]
        ProcessingRepo[ProcessingModesRepository<br/>• Processing Modes<br/>• Mode Details]
    end
    
    IctStudyApp[IctStudyApp<br/>NavHost] --> ReadStates
    HomeRoute[HomeRoute] --> SearchQuery
    HomeRoute --> StudyRepo
    
    ProcessingModesScreen[Processing Modes Screen] --> ProcessingRepo
    ProcessingDetailScreen[Processing Detail Screen] --> ProcessingRepo
    ProcessingDetailScreen --> ReadStates
    
    ReadStates -->|Persist in Session| IctStudyApp
```

## UI Component Hierarchy

```mermaid
flowchart TD
    MainActivity --> SunsetTheme
    SunsetTheme --> IctStudyApp
    
    IctStudyApp --> NavHost
    
    NavHost --> HomeRoute
    NavHost --> ProcessingModesRoute
    NavHost --> ProcessingDetailRoute
    
    HomeRoute --> HomeScreen
    
    HomeScreen --> HeaderSection
    HomeScreen --> SearchBar
    HomeScreen --> QuickAccessSection
    HomeScreen --> StudyTopicsSection
    
    QuickAccessSection --> QuickAccessCard1[Continue Learning Card]
    QuickAccessSection --> QuickAccessCard2[Saved Items Card]
    QuickAccessSection --> QuickAccessCard3[Practice Quiz Card]
    QuickAccessSection --> QuickAccessCard4[Processing Modes Card]
    
    StudyTopicsSection --> TopicCard1[Topic Card<br/>with Progress]
    StudyTopicsSection --> TopicCard2[...]
    StudyTopicsSection --> EmptyState[Empty State<br/>No Results]
    
    ProcessingModesRoute --> ProcessingModesScreen
    ProcessingModesScreen --> ProcessingModeCard1[Mode Card<br/>Progress Donut]
    ProcessingModesScreen --> ProcessingModeCard2[Mode Card<br/>Completed Badge]
    
    ProcessingDetailRoute --> ProcessingModeDetailScreen
    ProcessingModeDetailScreen --> DetailHeader
    ProcessingModeDetailScreen --> BulletList
    ProcessingModeDetailScreen --> TypesGrid
    ProcessingModeDetailScreen --> InfoList
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant HomeScreen
    participant NavController
    participant ProcessingList
    participant ProcessingDetail
    participant Repository
    participant State
    
    User->>HomeScreen: Tap "Processing Modes"
    HomeScreen->>NavController: navigate(processingModes)
    NavController->>ProcessingList: Show List
    ProcessingList->>Repository: getProcessingModes()
    Repository-->>ProcessingList: List<ProcessingMode>
    ProcessingList-->>User: Display Cards
    
    User->>ProcessingList: Tap Mode Card
    ProcessingList->>NavController: navigate(processingModes/batch)
    NavController->>ProcessingDetail: Show Detail
    ProcessingDetail->>Repository: getMode("batch")
    Repository-->>ProcessingDetail: ProcessingMode + Details
    ProcessingDetail->>State: readStates["batch"]
    State-->>ProcessingDetail: isRead = false
    ProcessingDetail-->>User: Display Content
    
    User->>ProcessingDetail: Tap "Mark as Read"
    ProcessingDetail->>State: updateReadState("batch", true)
    State-->>ProcessingDetail: Updated
    ProcessingDetail-->>User: Show Completed Badge
    
    User->>ProcessingDetail: Tap Back
    ProcessingDetail->>NavController: popBackStack()
    NavController->>ProcessingList: Return to List
    ProcessingList->>State: readStates["batch"]
    State-->>ProcessingList: isRead = true
    ProcessingList-->>User: Show Completed Badge
```

## Theme & Styling

- **Color Palette**: Dark theme with gradient accents
  - `NightSurface`: `#060C1A`
  - `NightCard`: `#121C2F`
  - `AccentPrimary`: `#1F7BFF`
  - `AccentCyan`: `#4FC0FF`
  - `AccentPurple`: `#706CFF`
  
- **Typography**: Material 3 default type scale
- **Icons**: Material Icons Rounded Extended
- **Shapes**: RoundedCornerShape (14-28dp radius)
- **Gradients**: Linear gradients for cards and backgrounds

## Firebase Integration

```mermaid
flowchart LR
    App[Android App] --> GoogleServices[Google Services Plugin]
    GoogleServices --> FirebaseConfig[google-services.json]
    
    App --> FirebaseBOM[Firebase BoM 34.6.0]
    FirebaseBOM --> Analytics[Firebase Analytics]
    FirebaseBOM --> Future1[Crashlytics<br/>Future]
    FirebaseBOM --> Future2[Performance<br/>Future]
    FirebaseBOM --> Future3[Remote Config<br/>Future]
```

## Build & CI/CD

```mermaid
flowchart TD
    Push[Push/PR to android/main] --> GHActions[GitHub Actions<br/>Android CI]
    Tag[Tag v*.*.* ] --> GHActions
    
    GHActions --> Setup[Setup Environment<br/>• Java 17<br/>• Android SDK<br/>• Gradle Cache]
    
    Setup --> BuildDebug[Build Debug APK<br/>./gradlew assembleDebug]
    BuildDebug --> UploadDebug[Upload Debug Artifact]
    
    Tag --> BuildRelease[Build Release APK<br/>./gradlew assembleRelease]
    BuildRelease --> UploadRelease[Upload Release Artifact]
    UploadRelease --> CreateRelease[Create GitHub Release<br/>Attach APK]
```

## Future Enhancements

1. **Topic Detail Screens**: Comprehensive topic exploration with lessons and quizzes
2. **Saved Items**: Bookmark and organize favorite topics
3. **Practice Quizzes**: Interactive quiz module with progress tracking
4. **Settings**: Theme customization, analytics opt-in, notification preferences
5. **Offline Support**: Local database with Room for offline access
6. **Search Enhancement**: Full-text search across all content
7. **Progress Sync**: Cloud sync with Firebase Firestore
8. **Gamification**: Achievements, streaks, and leaderboards
