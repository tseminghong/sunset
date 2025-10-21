import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';
import 'dart:async';

class PythonScreen extends StatefulWidget {
  const PythonScreen({super.key});

  @override
  State<PythonScreen> createState() => _PythonScreenState();
}

class _PythonScreenState extends State<PythonScreen>
    with SingleTickerProviderStateMixin {
  String _selectedAlgorithm = 'bubble';
  List<int> _array = [64, 34, 25, 12, 22, 11, 90];
  List<int> _displayArray = [];
  int _currentStep = 0;
  int _compareIndex1 = -1;
  int _compareIndex2 = -1;
  bool _isPlaying = false;
  Timer? _timer;
  String _message = 'Click Play to start';
  late AnimationController _animController;

  @override
  void initState() {
    super.initState();
    _displayArray = List.from(_array);
    _animController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    _animController.dispose();
    super.dispose();
  }

  void _play() {
    if (_isPlaying) return;
    setState(() {
      _isPlaying = true;
      _displayArray = List.from(_array);
      _currentStep = 0;
      _compareIndex1 = -1;
      _compareIndex2 = -1;
    });

    _timer = Timer.periodic(const Duration(milliseconds: 800), (timer) {
      if (_selectedAlgorithm == 'bubble') {
        _bubbleSortStep();
      } else if (_selectedAlgorithm == 'selection') {
        _selectionSortStep();
      } else if (_selectedAlgorithm == 'linear') {
        _linearSearchStep();
      }
    });
  }

  void _pause() {
    _timer?.cancel();
    setState(() {
      _isPlaying = false;
    });
  }

  void _reset() {
    _timer?.cancel();
    setState(() {
      _isPlaying = false;
      _displayArray = List.from(_array);
      _currentStep = 0;
      _compareIndex1 = -1;
      _compareIndex2 = -1;
      _message = 'Click Play to start';
    });
  }

  void _bubbleSortStep() {
    final n = _displayArray.length;
    final pass = _currentStep ~/ (n - 1);
    final j = _currentStep % (n - 1);

    if (pass >= n - 1) {
      _timer?.cancel();
      setState(() {
        _isPlaying = false;
        _message = 'Bubble Sort Complete!';
        _compareIndex1 = -1;
        _compareIndex2 = -1;
      });
      return;
    }

    if (j < n - pass - 1) {
      setState(() {
        _compareIndex1 = j;
        _compareIndex2 = j + 1;
        if (_displayArray[j] > _displayArray[j + 1]) {
          final temp = _displayArray[j];
          _displayArray[j] = _displayArray[j + 1];
          _displayArray[j + 1] = temp;
          _message = 'Swapped ${_displayArray[j + 1]} and ${_displayArray[j]}';
        } else {
          _message =
              'No swap needed: ${_displayArray[j]} <= ${_displayArray[j + 1]}';
        }
        _currentStep++;
      });
    } else {
      setState(() {
        _currentStep++;
      });
    }
  }

  void _selectionSortStep() {
    final n = _displayArray.length;
    if (_currentStep >= n - 1) {
      _timer?.cancel();
      setState(() {
        _isPlaying = false;
        _message = 'Selection Sort Complete!';
        _compareIndex1 = -1;
        _compareIndex2 = -1;
      });
      return;
    }

    int minIndex = _currentStep;
    for (int j = _currentStep + 1; j < n; j++) {
      if (_displayArray[j] < _displayArray[minIndex]) {
        minIndex = j;
      }
    }

    setState(() {
      _compareIndex1 = _currentStep;
      _compareIndex2 = minIndex;
      if (minIndex != _currentStep) {
        final temp = _displayArray[_currentStep];
        _displayArray[_currentStep] = _displayArray[minIndex];
        _displayArray[minIndex] = temp;
        _message =
            'Swapped ${_displayArray[_currentStep]} with ${_displayArray[minIndex]}';
      } else {
        _message = 'Element ${_displayArray[_currentStep]} already in place';
      }
      _currentStep++;
    });
  }

  void _linearSearchStep() {
    final target = 22; // Search for 22
    if (_currentStep >= _displayArray.length) {
      _timer?.cancel();
      setState(() {
        _isPlaying = false;
        _message = 'Linear Search Complete - Not Found';
        _compareIndex1 = -1;
      });
      return;
    }

    setState(() {
      _compareIndex1 = _currentStep;
      if (_displayArray[_currentStep] == target) {
        _message = 'Found $target at index $_currentStep!';
        _timer?.cancel();
        _isPlaying = false;
      } else {
        _message =
            'Checking index $_currentStep: ${_displayArray[_currentStep]}';
        _currentStep++;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'Python Algorithms',
      description: 'Interactive algorithm visualizations',
      icon: Icons.code,
      sections: [
        ContentSection(
          id: 'visualizer',
          title: 'Algorithm Visualizer',
          content: _buildVisualizer(),
        ),
        ContentSection(
          id: 'code',
          title: 'Algorithm Code',
          content: _buildCodeSection(),
        ),
      ],
    );
  }

  Widget _buildVisualizer() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Algorithm selector
        const Text(
          'Select Algorithm:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          children: [
            ChoiceChip(
              label: const Text('Bubble Sort'),
              selected: _selectedAlgorithm == 'bubble',
              onSelected: (selected) {
                if (selected && !_isPlaying) {
                  setState(() {
                    _selectedAlgorithm = 'bubble';
                    _reset();
                  });
                }
              },
            ),
            ChoiceChip(
              label: const Text('Selection Sort'),
              selected: _selectedAlgorithm == 'selection',
              onSelected: (selected) {
                if (selected && !_isPlaying) {
                  setState(() {
                    _selectedAlgorithm = 'selection';
                    _reset();
                  });
                }
              },
            ),
            ChoiceChip(
              label: const Text('Linear Search'),
              selected: _selectedAlgorithm == 'linear',
              onSelected: (selected) {
                if (selected && !_isPlaying) {
                  setState(() {
                    _selectedAlgorithm = 'linear';
                    _reset();
                  });
                }
              },
            ),
          ],
        ),
        const SizedBox(height: 24),

        // Array visualization
        const Text(
          'Array Visualization:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        Container(
          height: 250,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: List.generate(_displayArray.length, (index) {
              final isComparing = index == _compareIndex1 || index == _compareIndex2;
              return AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                width: 40,
                height: _displayArray[index] * 2.0,
                decoration: BoxDecoration(
                  color: isComparing ? Colors.red : Colors.blue,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Center(
                  child: Text(
                    '${_displayArray[index]}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              );
            }),
          ),
        ),
        const SizedBox(height: 16),

        // Status message
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              const Icon(Icons.info_outline, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  _message,
                  style: const TextStyle(fontSize: 14),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Control buttons
        Row(
          children: [
            ElevatedButton.icon(
              onPressed: _isPlaying ? null : _play,
              icon: const Icon(Icons.play_arrow),
              label: const Text('Play'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                foregroundColor: Colors.white,
              ),
            ),
            const SizedBox(width: 12),
            ElevatedButton.icon(
              onPressed: _isPlaying ? _pause : null,
              icon: const Icon(Icons.pause),
              label: const Text('Pause'),
            ),
            const SizedBox(width: 12),
            ElevatedButton.icon(
              onPressed: _reset,
              icon: const Icon(Icons.refresh),
              label: const Text('Reset'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCodeSection() {
    String code = '';
    String explanation = '';

    if (_selectedAlgorithm == 'bubble') {
      code = '''def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr''';
      explanation =
          'Bubble Sort repeatedly swaps adjacent elements if they are in wrong order. Time Complexity: O(n²)';
    } else if (_selectedAlgorithm == 'selection') {
      code = '''def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr''';
      explanation =
          'Selection Sort finds the minimum element and places it at the beginning. Time Complexity: O(n²)';
    } else if (_selectedAlgorithm == 'linear') {
      code = '''def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1''';
      explanation =
          'Linear Search checks each element sequentially until the target is found. Time Complexity: O(n)';
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          explanation,
          style: const TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.grey[900],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            code,
            style: const TextStyle(
              fontFamily: 'monospace',
              fontSize: 13,
              color: Colors.greenAccent,
              height: 1.5,
            ),
          ),
        ),
      ],
    );
  }
}
