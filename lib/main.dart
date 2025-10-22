import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'app.dart';
import 'providers/theme_provider.dart';
import 'providers/auth_provider.dart';
import 'providers/language_provider.dart';
import 'providers/resource_provider.dart';
import 'services/storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize SharedPreferences
  final prefs = await SharedPreferences.getInstance();
  final storageService = StorageService(prefs);
  
  runApp(
    MultiProvider(
      providers: [
        Provider<StorageService>(create: (_) => storageService),
        ChangeNotifierProvider(
          create: (context) => ThemeProvider(context.read()),
        ),
        ChangeNotifierProvider(
          create: (context) => LanguageProvider(context.read()),
        ),
        ChangeNotifierProvider(
          create: (context) => AuthProvider(context.read()),
        ),
        ChangeNotifierProvider(
          create: (context) => ResourceProvider(context.read()),
        ),
      ],
      child: const ICTRevisionHubApp(),
    ),
  );
}
