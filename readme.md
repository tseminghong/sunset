# HPCSS ICT Revision Hub - Flutter Version

A complete rewrite of the ICT Revision Hub from Next.js to Flutter, targeting both web and mobile (iOS/Android) platforms with a modern, animated UI.

## 🚀 Features

### ✅ Complete Feature Parity
- **Multi-platform**: Web, Android, and iOS
- **Dark/Light Theme**: With system preference detection
- **Search & Filter**: Real-time resource filtering and search
- **Authentication**: JWT-based login/signup system
- **Responsive Design**: Mobile-first approach that scales to desktop
- **Smooth Animations**: Flutter's built-in AnimationController-based animations
- **Internationalization**: English (en) and Chinese (zh) support
- **Local Storage**: Progress tracking and preferences persistence

### 🎨 Visual Features
- **Glassmorphism UI**: Modern glass-effect design
- **Floating Animations**: Smooth floating background elements
- **Hero Animations**: Text reveal animations on hero section
- **Staggered List Animations**: Cards animate in sequence
- **Smooth Transitions**: Page navigation with smooth transitions
- **Responsive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)

### 📚 Content
- 8 Resource categories with detailed cards
- SQL Database Guide
- Software Engineering concepts
- Hardware fundamentals
- Data Processing Modes
- DSE ICT Exam Prep
- HTML Learning Tool
- Python & JavaScript Algorithm Visualizers

## 📦 Technology Stack

### Core
- **Framework**: Flutter 3.x
- **Language**: Dart
- **State Management**: Provider
- **Routing**: GoRouter
- **Storage**: Shared Preferences

### UI & Animations
- **Material Design**: Material 3
- **Animations**: Flutter's AnimationController
- **Icons**: Material Icons

### Other
- **HTTP**: http package
- **Internationalization**: intl
- **Localization**: Custom localization system

## 🛠️ Getting Started

### Prerequisites
- **Flutter SDK**: >= 3.0.0 (https://flutter.dev/docs/get-started/install)
- **Dart SDK**: Included with Flutter
- **Git**: For version control

### Installation

#### 1. Clone the Repository
```bash
cd /path/to/flutter_ict_hub
```

#### 2. Get Dependencies
```bash
flutter pub get
```

#### 3. Run the App

**For Web:**
```bash
flutter run -d chrome
# or
flutter run -d web-server
```

**For Android:**
```bash
flutter run -d android
```

**For iOS:**
```bash
flutter run -d ios
```

**For Development (any platform):**
```bash
flutter run
```

#### 4. Build for Production

**Web:**
```bash
flutter build web --release
```

**Android (APK):**
```bash
flutter build apk --release
```

**Android (AAB for Play Store):**
```bash
flutter build appbundle --release
```

**iOS:**
```bash
flutter build ios --release
```

**macOS:**
```bash
flutter build macos --release
```

## 📁 Project Structure

```
flutter_ict_hub/
├── lib/
│   ├── main.dart                     # App entry point
│   ├── app.dart                      # App configuration & theming
│   │
│   ├── constants/
│   │   ├── colors.dart               # Light/Dark theme colors
│   │   └── strings.dart              # Localized strings (en, zh)
│   │
│   ├── data/
│   │   └── resources.dart            # Resource data (8 courses/guides)
│   │
│   ├── models/
│   │   ├── resource.dart             # Resource model
│   │   ├── auth_user.dart            # User model
│   │   └── app_state.dart            # App state model
│   │
│   ├── providers/                    # State management (Provider)
│   │   ├── theme_provider.dart       # Light/Dark theme state
│   │   ├── auth_provider.dart        # Authentication state
│   │   ├── language_provider.dart    # Language/localization state
│   │   └── resource_provider.dart    # Resource filtering state
│   │
│   ├── services/
│   │   ├── auth_service.dart         # Authentication API calls
│   │   ├── storage_service.dart      # Local storage management
│   │   └── api_client.dart           # HTTP client configuration
│   │
│   ├── widgets/                      # Reusable UI components
│   │   ├── header.dart               # App header with navigation
│   │   ├── hero_section.dart         # Hero section with animations
│   │   ├── resource_card.dart        # Resource card component
│   │   ├── tag_filter.dart           # Tag filter chips
│   │   ├── search_bar.dart           # Search input field
│   │   ├── auth_modal.dart           # Login/signup modal
│   │   └── footer.dart               # Footer component
│   │
│   ├── screens/
│   │   ├── home_screen.dart          # Main home page
│   │   ├── courses_screen.dart       # Courses listing (optional)
│   │   ├── about_screen.dart         # About page (optional)
│   │   └── resource_detail.dart      # Resource detail (optional)
│   │
│   └── utils/
│       ├── animations.dart           # Reusable animation utilities
│       ├── responsive.dart           # Responsive design helpers
│       └── validators.dart           # Input validators
│
├── pubspec.yaml                      # Dependencies & configuration
├── pubspec.lock                      # Locked dependency versions
│
├── web/
│   ├── index.html                    # Web entry point
│   ├── favicon.ico                   # Web favicon
│   └── manifest.json                 # PWA manifest
│
├── android/                          # Android native code
├── ios/                              # iOS native code
└── macos/                            # macOS native code
```

## 🎮 Usage

### Basic Navigation
- **Homepage**: Main landing page with featured resources
- **Search**: Real-time search across resources
- **Filter**: Tag-based filtering system
- **Theme**: Toggle between light/dark themes
- **Language**: Switch between English/中文

### Authentication
1. Click "Login" button in header
2. Enter credentials or sign up
3. System uses JWT tokens for secure authentication
4. User profile accessible from header dropdown

### Resource Access
1. Browse featured resources on homepage
2. Use search and filters to find specific resources
3. Click cards to access external resources
4. Progress tracked locally for courses with lessons

## 🎨 Theming

### Colors
The app uses a modern glassmorphism design with carefully selected colors:

**Light Theme:**
- Background: #EFF1F5 (light gray)
- Text Primary: #111113 (dark gray)
- Accent: #0091FF (blue)

**Dark Theme:**
- Background: #000000 (black)
- Text Primary: #F5F5F7 (light gray)
- Accent: #0091FF (blue)

### Customization
Edit colors in `lib/constants/colors.dart`:
```dart
static const Color lightBgPrimary = Color(0xFFEFF1F5);
static const Color darkBgPrimary = Color(0xFF000000);
```

## 🌍 Localization

Supported languages:
- **English** (en)
- **中文** (zh) - Simplified Chinese

Add more languages in `lib/constants/strings.dart`:
```dart
static const Map<String, String> jaStrings = {
  'nav.home': 'ホーム',
  // ...
};
```

## 📱 Platform-Specific Configuration

### Android (`android/app/build.gradle`)
```gradle
android {
    compileSdkVersion 34
    minSdkVersion 21
    targetSdkVersion 34
}
```

### iOS (`ios/Podfile`)
```ruby
platform :ios, '12.0'
```

### Web (`web/index.html`)
- PWA support enabled
- Responsive viewport configured
- Theme color set to accent blue

## 🚀 Deployment

### Web Deployment
```bash
flutter build web --release
# Deploy the 'build/web' directory to hosting service
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
flutter build web --release
firebase deploy
```

### Google Play Store (Android)
```bash
flutter build appbundle --release
# Upload to Google Play Console
```

### Apple App Store (iOS)
```bash
flutter build ios --release
# Use Xcode to archive and upload to App Store Connect
```

## 🔧 Development Workflow

### Hot Reload
Press 'r' in terminal to hot reload during development:
```bash
flutter run
# Press 'r' to reload
```

### Hot Restart
Press 'R' to hot restart (rebuilds entire app):
```bash
# Press 'R' to restart
```

### Debug Build
```bash
flutter build debug
```

### Profile Build
```bash
flutter build profile
```

### Performance Monitoring
The app includes performance monitoring capabilities. Check `PerformanceMonitor` widget for metrics.

## 📊 Analytics & Monitoring

The app can be extended with analytics:
- **Firebase Analytics**: For usage tracking
- **Crashlytics**: For error reporting
- **Performance Monitoring**: Built-in Flutter profiling

## 🐛 Troubleshooting

### Common Issues

**1. Dependencies not found**
```bash
flutter pub get
flutter pub upgrade
```

**2. Build cache issues**
```bash
flutter clean
flutter pub get
flutter run
```

**3. Platform-specific issues**

**Android:**
```bash
flutter clean
cd android
./gradlew clean
cd ..
flutter run
```

**iOS:**
```bash
flutter clean
cd ios
rm -rf Pods
rm Podfile.lock
cd ..
flutter run
```

**Web:**
```bash
flutter clean
flutter run -d web-server
```

## 📚 Learning Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Documentation](https://dart.dev/guides)
- [Flutter Animation Guide](https://flutter.dev/docs/development/ui/animations)
- [Provider Documentation](https://pub.dev/packages/provider)
- [GoRouter Documentation](https://pub.dev/packages/go_router)

## 📄 License

This project is part of the HPCSS ICT Revision Hub. All rights reserved.

## 👥 Contributors

- **Rewritten in Flutter**: 2024
- **Original Next.js Version**: HPCSS Team

## 🎯 Future Enhancements

- [ ] Advanced search with filters
- [ ] User progress dashboard
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Social sharing features
- [ ] Comments & discussion forums
- [ ] Video tutorials integration
- [ ] Code editor for programming courses

## 📞 Support

For issues, feature requests, or questions:
1. Check existing issues in repository
2. Create detailed bug report with steps to reproduce
3. Include device/platform information
4. Provide console logs if available

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Platform Support**: Web, Android, iOS, macOS, Windows

