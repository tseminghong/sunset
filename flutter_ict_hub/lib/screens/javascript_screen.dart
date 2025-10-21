import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class JavaScriptScreen extends StatefulWidget {
  const JavaScriptScreen({super.key});

  @override
  State<JavaScriptScreen> createState() => _JavaScriptScreenState();
}

class _JavaScriptScreenState extends State<JavaScriptScreen>
    with SingleTickerProviderStateMixin {
  int _currentLesson = 0;
  final TextEditingController _codeController = TextEditingController();
  String _output = '';
  late AnimationController _animController;
  late Animation<double> _fadeAnimation;

  final List<Map<String, String>> _lessons = [
    {
      'title': '1. Introduction to JavaScript',
      'content':
          'JavaScript adds interactivity to web pages. It runs in every modern browser and on servers (Node.js). You can manipulate the DOM, make network requests, and build full applications.',
      'code': 'console.log("Hello, JavaScript!");',
    },
    {
      'title': '2. Variables & Data Types',
      'content':
          'Declare variables with let (mutable), const (immutable), or var (function-scoped). Primitive types: string, number, boolean, null, undefined.',
      'code':
          'const siteName = "LearnJS";\nlet visits = 0;\nvisits += 1;\nconsole.log(typeof visits);',
    },
    {
      'title': '3. Strings & Template Literals',
      'content':
          'Template literals use backticks (`) and allow expression interpolation with \${expression}.',
      'code': 'const user = "Ava";\nconsole.log(`Hello \${user}!`);',
    },
    {
      'title': '4. Functions',
      'content':
          'Functions encapsulate reusable logic. Arrow functions are concise; traditional functions have their own "this".',
      'code':
          'const add = (a, b) => a + b;\nfunction multiply(a, b) { return a * b; }\nconsole.log(add(2,3), multiply(2,3));',
    },
    {
      'title': '5. Control Flow',
      'content':
          'Use if, else, switch, loops (for, while, for...of) to control program flow.',
      'code':
          'for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) console.log(i, "even");\n  else console.log(i, "odd");\n}',
    },
    {
      'title': '6. Arrays & Iteration',
      'content':
          'Arrays store ordered lists. Helpful methods: map, filter, reduce, find.',
      'code':
          'const nums = [1, 2, 3, 4];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
    },
    {
      'title': '7. Objects',
      'content':
          'Objects hold key-value pairs. Use dot or bracket notation to access properties.',
      'code':
          'const user = { id: 7, name: "Ava", active: true };\nuser.role = "admin";\nconsole.log(Object.keys(user));',
    },
    {
      'title': '8. DOM Basics',
      'content':
          'The DOM (Document Object Model) represents HTML as nodes. Use querySelector, modify textContent, attributes, and classes.',
      'code': '// In browser:\n// document.body.style.background = "#202830";',
    },
    {
      'title': '9. Events',
      'content':
          'Respond to user actions with addEventListener for clicks, key presses, mouse movements, etc.',
      'code':
          '// document.addEventListener("click", () => console.log("Clicked page"));',
    },
    {
      'title': '10. Next Steps',
      'content':
          'You completed the intro track! Continue with async JS (promises, fetch), modules, tooling, and frameworks. Practice daily with small scripts and projects.',
      'code': 'console.log("Keep coding! 🚀");',
    },
  ];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeInOut,
    );
    _animController.forward();
    _codeController.text = _lessons[0]['code']!;
  }

  @override
  void dispose() {
    _animController.dispose();
    _codeController.dispose();
    super.dispose();
  }

  void _nextLesson() {
    if (_currentLesson < _lessons.length - 1) {
      _animController.reverse().then((_) {
        setState(() {
          _currentLesson++;
          _codeController.text = _lessons[_currentLesson]['code']!;
          _output = '';
        });
        _animController.forward();
      });
    }
  }

  void _prevLesson() {
    if (_currentLesson > 0) {
      _animController.reverse().then((_) {
        setState(() {
          _currentLesson--;
          _codeController.text = _lessons[_currentLesson]['code']!;
          _output = '';
        });
        _animController.forward();
      });
    }
  }

  void _runCode() {
    setState(() {
      _output =
          'JavaScript executed! (Note: Full JS execution requires web environment)\n\n';
      _output += 'Your code:\n${_codeController.text}';
    });
  }

  @override
  Widget build(BuildContext context) {
    final lesson = _lessons[_currentLesson];
    final progress = (_currentLesson + 1) / _lessons.length;

    return ContentScreen(
      title: 'JavaScript Course',
      description: 'Interactive step-by-step JavaScript lessons',
      icon: Icons.javascript,
      sections: [
        ContentSection(
          id: 'course',
          title: 'Interactive Course',
          content: _buildInteractiveCourse(lesson, progress),
        ),
      ],
    );
  }

  Widget _buildInteractiveCourse(Map<String, String> lesson, double progress) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Progress bar
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 8,
            backgroundColor: Colors.grey[300],
            valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Lesson ${_currentLesson + 1} of ${_lessons.length}',
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ),
        const SizedBox(height: 24),

        // Animated lesson content
        FadeTransition(
          opacity: _fadeAnimation,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                lesson['title']!,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                lesson['content']!,
                style: const TextStyle(fontSize: 14, height: 1.6),
              ),
              const SizedBox(height: 24),

              // Code editor
              const Text(
                'Code Editor:',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Container(
                decoration: BoxDecoration(
                  color: Colors.grey[900],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextField(
                  controller: _codeController,
                  maxLines: 8,
                  style: const TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: Colors.greenAccent,
                  ),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.all(16),
                    hintText: '// Write JavaScript code here...',
                    hintStyle: TextStyle(color: Colors.grey),
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Run button
              ElevatedButton.icon(
                onPressed: _runCode,
                icon: const Icon(Icons.play_arrow),
                label: const Text('Run Code'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                ),
              ),
              const SizedBox(height: 16),

              // Output
              if (_output.isNotEmpty) ...[
                const Text(
                  'Output:',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.black87,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _output,
                    style: const TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 12,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ],
          ),
        ),

        // Navigation buttons
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ElevatedButton.icon(
              onPressed: _currentLesson > 0 ? _prevLesson : null,
              icon: const Icon(Icons.arrow_back),
              label: const Text('Previous'),
            ),
            ElevatedButton.icon(
              onPressed:
                  _currentLesson < _lessons.length - 1 ? _nextLesson : null,
              icon: const Icon(Icons.arrow_forward),
              label: const Text('Next'),
            ),
          ],
        ),
      ],
    );
  }
}
