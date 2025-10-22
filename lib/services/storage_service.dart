import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/auth_user.dart';

class StorageService {
  static const String _themeKey = 'themePreference';
  static const String _languageKey = 'languagePreference';
  static const String _tokenKey = 'auth_jwt_token_v1';
  static const String _profileKey = 'auth_profile_cache_v1';
  static const String _notificationsKey = 'hpcss_notifications';

  final SharedPreferences _prefs;

  StorageService(this._prefs);

  // Theme Management
  String? getThemePreference() => _prefs.getString(_themeKey);
  
  Future<bool> setThemePreference(String theme) =>
      _prefs.setString(_themeKey, theme);

  // Language Management
  String getLanguagePreference() => _prefs.getString(_languageKey) ?? 'en';
  
  Future<bool> setLanguagePreference(String language) =>
      _prefs.setString(_languageKey, language);

  // Auth Token Management
  String? getAuthToken() => _prefs.getString(_tokenKey);
  
  Future<bool> setAuthToken(String token) =>
      _prefs.setString(_tokenKey, token);
  
  Future<bool> removeAuthToken() => _prefs.remove(_tokenKey);

  // User Profile Management
  AuthUser? getUserProfile() {
    final json = _prefs.getString(_profileKey);
    if (json == null) return null;
    try {
      return AuthUser.fromJson(jsonDecode(json));
    } catch (e) {
      return null;
    }
  }
  
  Future<bool> setUserProfile(AuthUser user) =>
      _prefs.setString(_profileKey, jsonEncode(user.toJson()));
  
  Future<bool> removeUserProfile() => _prefs.remove(_profileKey);

  // Notifications Management
  List<Map<String, dynamic>> getNotifications() {
    final json = _prefs.getString(_notificationsKey);
    if (json == null) return [];
    try {
      final list = jsonDecode(json) as List;
      return list.cast<Map<String, dynamic>>();
    } catch (e) {
      return [];
    }
  }
  
  Future<bool> setNotifications(List<Map<String, dynamic>> notifications) =>
      _prefs.setString(_notificationsKey, jsonEncode(notifications));
  
  Future<bool> clearNotifications() => _prefs.remove(_notificationsKey);

  // Progress Tracking
  int? getProgress(String progressKey) => _prefs.getInt(progressKey);
  
  Future<bool> setProgress(String progressKey, int progress) =>
      _prefs.setInt(progressKey, progress);

  // Clear All
  Future<bool> clearAll() => _prefs.clear();
}
