import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/auth_user.dart';
import '../services/storage_service.dart';

class AuthProvider extends ChangeNotifier {
  final StorageService _storageService;
  AuthUser? _user;
  bool _isLoading = true;

  static const String _authApiBase = 'https://login-system.darrenintr.workers.dev';

  AuthProvider(this._storageService) {
    _loadUser();
  }

  AuthUser? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;

  Future<void> _loadUser() async {
    _isLoading = true;
    final cached = _storageService.getUserProfile();
    if (cached != null) {
      _user = cached;
    }
    await refreshProfile();
    _isLoading = false;
    notifyListeners();
  }

  Future<void> refreshProfile() async {
    final token = _storageService.getAuthToken();
    if (token == null) {
      _user = null;
      notifyListeners();
      return;
    }

    try {
      final response = await http.get(
        Uri.parse('$_authApiBase/me'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final body = jsonDecode(response.body);
        if (body['user'] != null) {
          _user = AuthUser.fromJson(body['user']);
          await _storageService.setUserProfile(_user!);
        }
      } else if (response.statusCode == 401) {
        await _storageService.removeAuthToken();
        await _storageService.removeUserProfile();
        _user = null;
      }
    } catch (e) {
      // Network error, keep cached profile if available
    }
    notifyListeners();
  }

  Future<({bool success, String? error})> login(
    String username,
    String password,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$_authApiBase/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'username': username, 'password': password}),
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final body = jsonDecode(response.body);
        if (body['token'] != null) {
          await _storageService.setAuthToken(body['token']);
          await refreshProfile();
          return (success: true, error: null);
        }
      }
      return (success: false, error: 'Login failed');
    } catch (e) {
      return (success: false, error: 'Network error: ${e.toString()}');
    }
  }

  Future<({bool success, String? error})> signup(
    String username,
    String password,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$_authApiBase/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'username': username, 'password': password}),
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return (success: true, error: null);
      }
      return (success: false, error: 'Signup failed');
    } catch (e) {
      return (success: false, error: 'Network error: ${e.toString()}');
    }
  }

  Future<void> logout() async {
    try {
      final token = _storageService.getAuthToken();
      if (token != null) {
        await http.post(
          Uri.parse('$_authApiBase/logout'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ).timeout(const Duration(seconds: 5));
      }
    } catch (e) {
      // Ignore network errors during logout
    }
    
    await _storageService.removeAuthToken();
    await _storageService.removeUserProfile();
    _user = null;
    notifyListeners();
  }
}
