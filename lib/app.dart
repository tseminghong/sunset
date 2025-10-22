import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'constants/colors.dart';
import 'providers/theme_provider.dart';
import 'screens/home_screen.dart';
import 'screens/about_screen.dart';
import 'screens/courses_screen.dart';
import 'screens/sql_screen.dart';
import 'screens/hardware_screen.dart';
import 'screens/software_screen.dart';
import 'screens/python_screen.dart';
import 'screens/javascript_screen.dart';
import 'screens/html_screen.dart';
import 'screens/dse_screen.dart';
import 'screens/processing_modes_screen.dart';
import 'widgets/gsap_widgets.dart';
import 'utils/gsap_bridge.dart' if (dart.library.html) 'utils/gsap_bridge.dart';

final _router = GoRouter(
  initialLocation: '/',
  debugLogDiagnostics: false,
  routes: [
    GoRoute(
      path: '/',
      name: 'home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/about',
      name: 'about',
      builder: (context, state) => const AboutScreen(),
    ),
    GoRoute(
      path: '/courses',
      name: 'courses',
      builder: (context, state) => const CoursesScreen(),
    ),
    GoRoute(
      path: '/sql',
      name: 'sql',
      builder: (context, state) => const SQLScreen(),
    ),
    GoRoute(
      path: '/hardware',
      name: 'hardware',
      builder: (context, state) => const HardwareScreen(),
    ),
    GoRoute(
      path: '/software',
      name: 'software',
      builder: (context, state) => const SoftwareScreen(),
    ),
    GoRoute(
      path: '/python',
      name: 'python',
      builder: (context, state) => const PythonScreen(),
    ),
    GoRoute(
      path: '/javascript',
      name: 'javascript',
      builder: (context, state) => const JavaScriptScreen(),
    ),
    GoRoute(
      path: '/html-learning',
      name: 'html',
      builder: (context, state) => const HTMLScreen(),
    ),
    GoRoute(
      path: '/dse',
      name: 'dse',
      builder: (context, state) => const DSEScreen(),
    ),
    GoRoute(
      path: '/processing-modes',
      name: 'processing',
      builder: (context, state) => const ProcessingModesScreen(),
    ),
  ],
  errorBuilder: (context, state) => Scaffold(
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.error_outline, size: 64, color: Colors.red),
          const SizedBox(height: 16),
          Text('Page not found: ${state.uri}'),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () => context.go('/'),
            child: const Text('Go Home'),
          ),
        ],
      ),
    ),
  ),
);

class ICTRevisionHubApp extends StatefulWidget {
  const ICTRevisionHubApp({Key? key}) : super(key: key);

  @override
  State<ICTRevisionHubApp> createState() => _ICTRevisionHubAppState();
}

class _ICTRevisionHubAppState extends State<ICTRevisionHubApp> {
  @override
  void initState() {
    super.initState();
    // Initialize GSAP on web platform
    WidgetsBinding.instance.addPostFrameCallback((_) {
      try {
        GSAPBridge.initialize();
        GSAPBridge.applySmoothScroll();
      } catch (e) {
        print('GSAP not available: $e');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, _) {
        final isDarkMode = themeProvider.isDarkMode;

        return MaterialApp.router(
          title: 'HPCSS ICT Revision Hub',
          debugShowCheckedModeBanner: false,
          theme: _buildLightTheme(),
          darkTheme: _buildDarkTheme(),
          themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
          routerConfig: _router,
          // Apply GSAP-like smooth scroll behavior globally
          scrollBehavior: const GSAPScrollBehavior(),
        );
      },
    );
  }

  ThemeData _buildLightTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.lightBgPrimary,
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.lightBgSecondary,
        foregroundColor: AppColors.lightTextPrimary,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      textTheme: TextTheme(
        displayLarge: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        displayMedium: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        displaySmall: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        headlineMedium: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        headlineSmall: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        titleLarge: TextStyle(
          color: AppColors.lightTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: TextStyle(color: AppColors.lightTextSecondary),
        bodyMedium: TextStyle(color: AppColors.lightTextSecondary),
        bodySmall: TextStyle(color: AppColors.lightTextTertiary),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.lightBgTertiary,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.lightBorderSecondary),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.lightBorderSecondary),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide:
              const BorderSide(color: AppColors.lightAccentPrimary, width: 2),
        ),
        labelStyle: TextStyle(color: AppColors.lightTextSecondary),
        hintStyle: TextStyle(color: AppColors.lightTextTertiary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.lightAccentPrimary,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.lightBgTertiary,
        selectedColor: AppColors.lightAccentPrimary,
        labelStyle: TextStyle(color: AppColors.lightTextSecondary),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }

  ThemeData _buildDarkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.darkBgPrimary,
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.darkBgSecondary,
        foregroundColor: AppColors.darkTextPrimary,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      textTheme: TextTheme(
        displayLarge: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        displayMedium: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        displaySmall: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        headlineMedium: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        headlineSmall: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        titleLarge: TextStyle(
          color: AppColors.darkTextPrimary,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: TextStyle(color: AppColors.darkTextSecondary),
        bodyMedium: TextStyle(color: AppColors.darkTextSecondary),
        bodySmall: TextStyle(color: AppColors.darkTextTertiary),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.darkBgTertiary,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.darkBorderSecondary),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.darkBorderSecondary),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide:
              const BorderSide(color: AppColors.darkAccentPrimary, width: 2),
        ),
        labelStyle: TextStyle(color: AppColors.darkTextSecondary),
        hintStyle: TextStyle(color: AppColors.darkTextTertiary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.darkAccentPrimary,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.darkBgTertiary,
        selectedColor: AppColors.darkAccentPrimary,
        labelStyle: TextStyle(color: AppColors.darkTextSecondary),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }
}
