# Flutter ICT Hub - Architecture & Data Flow

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Flutter App Layer                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              UI Layer (Widgets)                         │  │
│  │  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │  │
│  │  │  Header   │  │HeroSection│  │ResourceCard │  ...   │  │
│  │  └─────▲─────┘  └─────▲─────┘  └──────▲──────┘       │  │
│  │        │              │              │                │  │
│  ├────────┼──────────────┼──────────────┼────────────────┤  │
│  │        │              │              │                │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Provider Layer (State Management)       │  │  │
│  │  │                                                 │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌────────────┐   │  │  │
│  │  │  │ Theme    │  │  Auth    │  │ Language   │   │  │  │
│  │  │  │ Provider │  │ Provider │  │ Provider   │   │  │  │
│  │  │  └──────────┘  └──────────┘  └────────────┘   │  │  │
│  │  │                                                 │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │     ResourceProvider (Search/Filter)     │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │        │              │              │                │  │
│  ├────────┼──────────────┼──────────────┼────────────────┤  │
│  │        │              │              │                │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Service Layer                          │  │  │
│  │  │                                                 │  │  │
│  │  │  ┌──────────────┐  ┌──────────────────────┐   │  │  │
│  │  │  │   Storage    │  │  Auth Service        │   │  │  │
│  │  │  │  Service     │  │  (API calls)         │   │  │  │
│  │  │  └──────────────┘  └──────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │        │                    │                        │  │
│  └────────┼────────────────────┼────────────────────────┘  │
│           │                    │                           │
│  ┌────────▼────────────────────▼────────────────────────┐  │
│  │         Data Layer                                  │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐  │  │
│  │  │  SharedPrefs   │  │  HTTP Client             │  │  │
│  │  │  (Local Storage)│  │  (Network Requests)     │  │  │
│  │  └────────────────┘  └──────────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
│           │                    │                           │
└───────────┼────────────────────┼───────────────────────────┘
            │                    │
            ▼                    ▼
        ┌─────────┐         ┌──────────────────────┐
        │  Local  │         │  Remote API          │
        │  Data   │         │  login-system...     │
        └─────────┘         └──────────────────────┘
```

---

## 🔄 Data Flow Diagram

### User Authentication Flow

```
┌─────────────┐
│   User      │
│ Taps Login  │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│  AuthModal Widget    │
│ (Collects credentials)
└──────┬───────────────┘
       │ username, password
       ▼
┌──────────────────────┐
│  AuthProvider.login()│
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│  HTTP POST Request       │
│  /login endpoint         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────┐
│  Authentication API  │
│  (Remote Server)     │
└──────┬───────────────┘
       │ JWT Token
       ▼
┌──────────────────────────┐
│  StorageService.save()   │
│  Token + Profile         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────┐
│  SharedPreferences   │
│  (Local Storage)     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Header Updated      │
│  Shows Username      │
└──────────────────────┘
```

### Search & Filter Flow

```
┌──────────────────┐
│   User Types     │
│   Search Term    │
└────────┬─────────┘
         │
         ▼
┌────────────────────────┐
│ SearchBar Widget       │
│ onSearchChanged(term)  │
└────────┬───────────────┘
         │
         ▼
┌───────────────────────────┐
│ ResourceProvider          │
│ .setSearchTerm(term)      │
│ notifyListeners()         │
└────────┬──────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Consumer<ResourceProvider>  │
│ rebuilds                    │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ resourceProvider.filtered   │
│ Resources computed          │
│ - Filter by tag             │
│ - Filter by search term     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ UI Updates                  │
│ Shows filtered cards        │
│ with animations             │
└─────────────────────────────┘
```

### Theme Toggle Flow

```
┌──────────────────┐
│   User Clicks    │
│   Theme Button   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│  Header IconButton       │
│  onPressed toggle theme  │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  ThemeProvider.toggleTheme() │
└────────┬─────────────────────┘
         │
         ├─────────────────────────┐
         ▼                         ▼
    ┌─────────────┐         ┌──────────────┐
    │  Dark Mode  │         │ Light Mode   │
    │   → Save    │         │   → Save     │
    │ to storage  │         │  to storage  │
    └────┬────────┘         └────┬─────────┘
         │                       │
         └───────┬───────────────┘
                 │
                 ▼
         ┌──────────────────┐
         │ StorageService   │
         │ .setTheme()      │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ SharedPreferences│
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ Entire App       │
         │ Rebuilds with    │
         │ new theme        │
         └──────────────────┘
```

---

## 📊 State Management Hierarchy

```
MultiProvider (main.dart)
│
├── Provider<StorageService>
│   └── Provides local storage access
│       • Gets/sets theme
│       • Gets/sets language
│       • Gets/sets auth token
│       • Gets/sets profile
│       • Gets/sets notifications
│
├── ChangeNotifierProvider<ThemeProvider>
│   ├── Depends on: StorageService
│   ├── Notifies: All widgets using theme
│   └── State:
│       • theme: 'light' | 'dark' | 'system'
│       • isDarkMode: computed boolean
│
├── ChangeNotifierProvider<LanguageProvider>
│   ├── Depends on: StorageService
│   ├── Notifies: All text/i18n widgets
│   └── State:
│       • language: 'en' | 'zh'
│       • t(key): Get string function
│
├── ChangeNotifierProvider<AuthProvider>
│   ├── Depends on: StorageService
│   ├── Calls: Remote API (HTTP)
│   ├── Notifies: Header, Auth Modal
│   └── State:
│       • user: AuthUser | null
│       • isAuthenticated: boolean
│       • isLoading: boolean
│
└── ChangeNotifierProvider<ResourceProvider>
    ├── Depends on: StorageService
    ├── Notifies: Home screen grid
    └── State:
        • activeTag: string
        • searchTerm: string
        • filteredResources: List<Resource>
        • progress: Map<key, int>
```

---

## 🎯 Component Dependency Tree

```
ICTRevisionHubApp (MaterialApp)
│
├── HomeScreen (StatefulWidget)
│   │
│   ├── [Consumer: ThemeProvider, LanguageProvider, ResourceProvider]
│   │
│   ├── CustomScrollView
│   │   │
│   │   ├── SliverAppBar
│   │   │   └── Header
│   │   │       ├── [Consumer: Theme, Language, Auth]
│   │   │       ├── Theme Toggle Button
│   │   │       ├── Language Switcher
│   │   │       └── Auth Button
│   │   │
│   │   └── SliverToBoxAdapter
│   │       └── Column
│   │           │
│   │           ├── HeroSection (animated)
│   │           │   ├── Floating background elements
│   │           │   ├── Title (animated reveal)
│   │           │   ├── Subtitle (fade in)
│   │           │   └── CTA Button
│   │           │
│   │           ├── SearchBar
│   │           │   └── TextField
│   │           │
│   │           ├── TagFilter
│   │           │   └── [FilterChip] × 15
│   │           │       └── [Consumer: ResourceProvider]
│   │           │
│   │           ├── Resources Title
│   │           │
│   │           ├── ResponsiveWidget
│   │           │   ├── Mobile: Column of cards
│   │           │   ├── Tablet: 2-column GridView
│   │           │   └── Desktop: 3-column GridView
│   │           │       │
│   │           │       └── ResourceCard × N
│   │           │           ├── Image placeholder
│   │           │           ├── Title
│   │           │           ├── Description
│   │           │           ├── Progress bar (optional)
│   │           │           ├── Tags
│   │           │           └── Link CTA
│   │           │
│   │           ├── About Section (animated)
│   │           │   ├── Title
│   │           │   └── Description
│   │           │
│   │           └── Footer
│   │               └── Copyright text
│   │
│   ├── AuthModal (Dialog)
│   │   ├── [Consumer: Theme, Language, Auth]
│   │   ├── Username TextField
│   │   ├── Password TextField
│   │   ├── Login/Signup Button
│   │   └── Toggle to switch mode
│   │
│   └── FloatingActionButton
│       └── Scroll to top
│
└── GoRouter (Navigation)
    └── Route('/') → HomeScreen
```

---

## 🔗 Data Model Relationships

```
┌──────────────────────────────────────────────────────────┐
│                    Resource                              │
├──────────────────────────────────────────────────────────┤
│ - href: String                                           │
│ - tags: String (comma-separated)                        │
│ - icon: String (SVG)                                    │
│ - title: String                                         │
│ - description: String                                   │
│ - linkText: String                                      │
│ - progressKey?: String                                  │
│ - totalLessons?: int                                    │
│                                                          │
│ Methods:                                                 │
│ - getTags(): List<String>                               │
│ - isExternalLink(): bool                                │
│ - toJson() / fromJson()                                 │
└──────────────────────────────────────────────────────────┘
                         △
                         │
                    references
                         │
     ┌──────────────────┴──────────────────┐
     │                                     │
┌────────────────────────────┐  ┌──────────────────────────┐
│   ResourceProvider         │  │  StorageService          │
├────────────────────────────┤  ├──────────────────────────┤
│ - resources: List          │  │ - prefs: SharedPrefs     │
│ - activeTag: String        │  │                          │
│ - searchTerm: String       │  │ Methods:                 │
│ - filteredResources: List  │  │ - getProgress(key)       │
│                            │  │ - setProgress(key, val)  │
│ Methods:                   │  │ - getTheme()             │
│ - setActiveTag()           │  │ - setTheme()             │
│ - setSearchTerm()          │  │ - getLanguage()          │
│ - getProgress()            │  │ - setLanguage()          │
│ - setProgress()            │  │ - getAuthToken()         │
│ - resetFilters()           │  │ - setAuthToken()         │
└────────────────────────────┘  └──────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                    AuthUser                              │
├──────────────────────────────────────────────────────────┤
│ - username: String                                       │
│ - id?: String                                            │
│ - email?: String                                         │
│                                                          │
│ Methods:                                                 │
│ - toJson() / fromJson()                                  │
└──────────────────────────────────────────────────────────┘
                         △
                         │
                    manages
                         │
┌──────────────────────────────────────────────────────────┐
│                  AuthProvider                            │
├──────────────────────────────────────────────────────────┤
│ - user: AuthUser?                                        │
│ - isLoading: bool                                        │
│ - isAuthenticated: bool (computed)                       │
│                                                          │
│ Methods:                                                 │
│ - login(username, password)                              │
│ - signup(username, password)                             │
│ - logout()                                               │
│ - refreshProfile()                                       │
│                                                          │
│ API Calls:                                               │
│ - POST /login                                            │
│ - POST /register                                         │
│ - POST /logout                                           │
│ - GET /me                                                │
└──────────────────────────────────────────────────────────┘
```

---

## 🎨 Theme Color Flow

```
AppColors class (constants/colors.dart)
│
├── Light Theme
│   ├── Background Primary: #EFF1F5
│   ├── Background Secondary: #FFFFFF
│   ├── Background Tertiary: #E8EAF0
│   ├── Text Primary: #111113
│   ├── Text Secondary: #5c5c62
│   ├── Accent Primary: #0091FF
│   └── Border: rgba(0,0,0,0.08)
│
└── Dark Theme
    ├── Background Primary: #000000
    ├── Background Secondary: #121213
    ├── Background Tertiary: #2C2C2E
    ├── Text Primary: #F5F5F7
    ├── Text Secondary: #a0a0a8
    ├── Accent Primary: #0091FF
    └── Border: rgba(255,255,255,0.08)
         │
         ▼ (passed to ThemeProvider)
         │
         ├── consumed by all widgets via
         │   Consumer<ThemeProvider>
         │
         └── applied to:
             ├── Scaffold backgroundColor
             ├── Widget colors
             ├── Text colors
             ├── Border colors
             └── Button colors
```

---

## 📱 Responsive Breakpoints

```
ResponsiveWidget / ResponsiveHelper
│
├── Mobile (< 768px)
│   ├── Font sizes: small
│   ├── Layout: Column (1 card per row)
│   ├── Padding: 16px
│   └── Grid columns: 1
│
├── Tablet (768px - 1024px)
│   ├── Font sizes: medium
│   ├── Layout: 2-column grid
│   ├── Padding: 24px
│   └── Grid columns: 2
│
└── Desktop (> 1024px)
    ├── Font sizes: large
    ├── Layout: 3-column grid
    ├── Padding: 48px
    └── Grid columns: 3
```

---

## 🔄 Animation Pipeline

```
Animation Source
│
├── Text Reveal (HeroSection)
│   └── SplitText → Character stagger animation
│
├── Fade In (Global)
│   └── TweenAnimationBuilder: opacity 0→1
│
├── Slide Up (Global)
│   └── TweenAnimationBuilder: offset animation
│
├── Scale (Card Hover)
│   └── AnimationController: 1.0 → 1.02
│
├── Floating (Background elements)
│   └── AnimationController: continuous loop
│       • Duration: 3-6 seconds
│       • Curve: sineCurve
│
└── Stagger (Grid cards)
    └── SlideUp with delay = index * 100ms
        • Card 1: delay 0ms
        • Card 2: delay 100ms
        • Card 3: delay 200ms
        • ...
```

---

This architecture provides a clean, scalable foundation for the Flutter ICT Hub application!

