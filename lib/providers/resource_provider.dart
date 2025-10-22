import 'package:flutter/material.dart';
import '../models/resource.dart';
import '../data/resources.dart';
import '../services/storage_service.dart';

class ResourceProvider extends ChangeNotifier {
  final StorageService _storageService;
  
  String _activeTag = 'all';
  String _searchTerm = '';
  List<Resource> _resources = resourcesData;

  ResourceProvider(this._storageService);

  String get activeTag => _activeTag;
  String get searchTerm => _searchTerm;
  List<Resource> get resources => _resources;

  List<Resource> get filteredResources {
    return _resources.where((resource) {
      final matchesTag = _activeTag == 'all' || 
          resource.getTags().contains(_activeTag);
      
      final matchesSearch = _searchTerm.isEmpty ||
          resource.title.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          resource.tags.toLowerCase().contains(_searchTerm.toLowerCase());
      
      return matchesTag && matchesSearch;
    }).toList();
  }

  void setActiveTag(String tag) {
    if (_activeTag != tag) {
      _activeTag = tag;
      notifyListeners();
    }
  }

  void setSearchTerm(String term) {
    if (_searchTerm != term) {
      _searchTerm = term;
      notifyListeners();
    }
  }

  void resetFilters() {
    _activeTag = 'all';
    _searchTerm = '';
    notifyListeners();
  }

  int getProgress(String progressKey) {
    if (progressKey.isEmpty) return 0;
    return _storageService.getProgress(progressKey) ?? 0;
  }

  Future<void> setProgress(String progressKey, int progress) async {
    if (progressKey.isNotEmpty) {
      await _storageService.setProgress(progressKey, progress);
      notifyListeners();
    }
  }
}
