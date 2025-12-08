# Bottom Navigation & Sorting Game Implementation

## Overview
This implementation adds a modern bottom navigation bar with smooth animations and an interactive sorting algorithm learning game to the ICT Study App.

## Features Implemented

### 1. Bottom Navigation Bar (`BottomNavBar.kt`)
- **4 Main Tabs**: Home, Course, Game, Me
- **Custom Half-Circle Indicator**: Animated circular indicator that appears above the selected tab
- **Smooth Animations**:
  - Spring-based animations with medium bounce damping
  - Color transitions for icon selection
  - Scale animations when tapping tabs
  - Sliding indicator with spring physics

**Key Animation Details**:
- Indicator: Spring animation with `DampingRatioMediumBouncy` and `StiffnessLow`
- Icon scale: 1.0x → 1.1x when selected
- Icon size: 24dp → 28dp when selected
- Color transition: 300ms tween animation
- Label appears only for selected item

### 2. Course Screen (`CourseScreen.kt`)
Central hub for all learning content with 4 categories:
- **Python Programming** (Green) - 15 topics
- **SQL Database** (Blue) - 12 topics
- **Cybersecurity** (Red) - 10 topics
- **Processing Modes** (Orange) - 4 topics

Each course card includes:
- Custom colored icon background
- Topic count indicator
- Chevron navigation arrow
- Smooth transitions to topic details

### 3. Game Screen (`GameScreen.kt`)
Learning games hub featuring:
- **Sorting Algorithms** (Available) - Interactive visualization
- **Search Algorithms** (Coming Soon)
- **Quick Quiz** - Random knowledge tests

Each game card displays:
- Difficulty badge (Beginner/Intermediate/Advanced)
- Category tag (Python/SQL/All Topics)
- Visual icon
- Description

### 4. Sorting Game (`SortingGameScreen.kt`)
Interactive algorithm learning tool with real-time visualization:

**Algorithms**:
- **Bubble Sort**: Adjacent element comparison and swapping
- **Selection Sort**: Finding minimum and swapping

**Features**:
- Visual array bars with animated height
- Color-coded states:
  - **Green**: Sorted elements
  - **Orange**: Currently comparing
  - **Primary Color**: Unsorted elements
- Real-time animations:
  - 500ms delay between steps
  - Scale animation (1.1x) for comparing elements
  - Spring-based bounce effect
- Interactive controls:
  - Play/Pause button
  - Reset/Shuffle array
  - Algorithm selection

**Educational Content**:
- Algorithm explanation cards
- Time complexity information
- Step-by-step visualization
- Best use case descriptions

### 5. Profile Screen (`ProfileScreen.kt`)
User profile and quick access hub:

**Profile Header**:
- Circular avatar with user's first letter
- Username display
- Statistics row:
  - Courses enrolled
  - Lessons completed
  - Current streak

**Quick Actions**:
- Statistics (learning progress)
- Saved Items (bookmarks)
- Reminders (study alerts)
- Settings (preferences)

**Features**:
- Reset profile button
- Color-coded action cards
- Icon-based navigation

## Navigation Structure

### Bottom Nav Routes (Always Visible)
```
home → HomeScreen
course → CourseScreen
game → GameScreen
me → ProfileScreen
```

### Child Routes (Hide Bottom Nav)
```
home → processingModes → detail
home → pythonTopics → detail
home → sqlTopics → detail
home → cybersecurityTopics → detail
game → sortingGame
me → statistics
me → savedItems
me → reminders
me → settings
```

## Animation Specifications

### Bottom Navigation
- **Indicator Movement**: Spring (DampingRatio=MediumBouncy, Stiffness=Low)
- **Icon Scale**: Spring (DampingRatio=MediumBouncy, Stiffness=Medium)
- **Color Change**: Tween 300ms

### Screen Transitions
- **Enter**: SlideInHorizontally + FadeIn (400ms tween)
- **Exit**: SlideOutHorizontally (1/3 offset) + FadeOut (400ms tween)
- **PopEnter**: SlideInHorizontally (-1/3 offset) + FadeIn
- **PopExit**: SlideOutHorizontally + FadeOut

### Sorting Game Animations
- **Comparison**: Scale to 1.1x with spring bounce
- **State Change**: Color tween 300ms
- **Step Delay**: 500ms between algorithm steps

## UI Components

### BottomNavBar
- Surface with 8dp elevation
- 56dp height navigation items
- 20dp height half-circle indicator
- Material 3 color scheme

### Array Visualizer
- Bar height: `value * 3.dp` (dynamic based on array values)
- Rounded top corners (8dp)
- Centered value labels
- Responsive width (fills container)

### Game Cards
- 64dp icon boxes with rounded corners (12dp)
- Difficulty chips with color coding
- Category chips with secondary colors
- Elevation: 2dp

## Technical Details

### State Management
- `rememberNavController()` for navigation
- `currentBackStackEntryAsState()` for route tracking
- `collectAsState()` for preferences flow
- `rememberCoroutineScope()` for suspend functions

### Navigation State Preservation
```kotlin
popUpTo(Home) { saveState = true }
launchSingleTop = true
restoreState = true
```

### Sorting Algorithm Logic
- Generates random arrays (8 elements, values 10-50)
- Bubble Sort: O(n²) with early termination
- Selection Sort: O(n²) with minimum element tracking
- Coroutine-based animation with delays
- State updates for each comparison and swap

## Color Scheme
- **Primary Container**: Half-circle indicator background
- **Primary**: Selected icon color
- **On Surface Variant**: Unselected icon color
- **Surface**: Navigation bar background
- **Secondary Container**: Action cards
- **Error**: Reset button (profile)

## Files Created
1. `ui/components/BottomNavBar.kt` - Navigation bar component
2. `ui/screens/CourseScreen.kt` - Course catalog
3. `ui/screens/GameScreen.kt` - Games hub
4. `ui/screens/SortingGameScreen.kt` - Interactive sorting game
5. `ui/screens/ProfileScreen.kt` - User profile

## Files Modified
1. `ui/screens/HomeScreen.kt`:
   - Added Scaffold wrapper with bottom navigation
   - Added new routes (Course, Game, Profile, SortingGame)
   - Integrated bottom nav visibility logic
   - Added navigation state tracking

## Usage

### Navigating Between Tabs
The bottom navigation bar is visible on all main screens (Home, Course, Game, Me). Tapping a tab:
1. Triggers spring animation for indicator
2. Scales and colors the selected icon
3. Navigates with state preservation
4. Shows label for selected item only

### Playing Sorting Game
1. Navigate to Game tab
2. Tap "Sorting Algorithms"
3. Choose algorithm (Bubble or Selection)
4. Press Play to watch visualization
5. Use Pause to stop at any step
6. Reset to generate new random array

### Accessing Profile Features
1. Navigate to Me tab
2. View your statistics at the top
3. Tap quick action cards to:
   - See detailed statistics
   - Access saved/bookmarked items
   - Manage study reminders
   - Adjust app settings

## Future Enhancements
- Add more sorting algorithms (Quick Sort, Merge Sort)
- Implement Search Algorithms game
- Add user-adjustable animation speed
- Include code snippets for each algorithm
- Add performance comparison charts
- Implement achievement system for completed games
