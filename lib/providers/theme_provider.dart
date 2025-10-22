import 'package:flutter/material.dart';
import '../services/storage_service.dart';

class ThemeProvider extends ChangeNotifier {
  final StorageService _storageService;
  String _theme = 'system'; // 'light', 'dark', or 'system'

  ThemeProvider(this._storageService) {
    _loadTheme();
  }

  String get theme => _theme;

  bool get isDarkMode {
    if (_theme == 'system') {
      return WidgetsBinding.instance.window.platformDispatcher.views.first.physicalSize !=
          Size.zero;
    }
    return _theme == 'dark';
  }

  void _loadTheme() {
    final saved = _storageService.getThemePreference();
    if (saved != null) {
      _theme = saved;
    } else {
      // Use system preference as default
      _theme = 'system';
    }
    notifyListeners();
  }

  Future<void> setTheme(String newTheme) async {
    if (_theme != newTheme) {
      _theme = newTheme;
      await _storageService.setThemePreference(newTheme);
      notifyListeners();
    }
  }

  void toggleTheme() {
    if (_theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}
