import 'package:flutter/material.dart';
import '../services/storage_service.dart';
import '../constants/strings.dart';

class LanguageProvider extends ChangeNotifier {
  final StorageService _storageService;
  late String _language;

  LanguageProvider(this._storageService) {
    _language = _storageService.getLanguagePreference();
  }

  String get language => _language;

  String t(String key) {
    return AppStrings.get(key, language: _language);
  }

  Future<void> setLanguage(String newLanguage) async {
    if (_language != newLanguage) {
      _language = newLanguage;
      await _storageService.setLanguagePreference(newLanguage);
      notifyListeners();
    }
  }
}
