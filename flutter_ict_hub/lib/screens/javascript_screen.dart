import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';
import 'dart:html' as html;
// ignore: avoid_web_libraries_in_flutter
import 'dart:ui_web' as ui_web;

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
  String _iframeId = 'js-runner-${DateTime.now().millisecondsSinceEpoch}';

  final List<Map<String, String>> _lessons = [
    {
      'title': '1. Introduction to JavaScript',
      'content':
          'JavaScript adds interactivity to web pages. It runs in every modern browser and on servers (Node.js).',
      'code': 'console.log("Hello, JavaScript!");\nconsole.log("Welcome to the course!");',
    },
    {
      'title': '2. Variables & Data Types',
      'content':
          'Declare variables with let (mutable), const (immutable), or var (function-scoped).',
      'code':
          'const siteName = "LearnJS";\nlet visits = 0;\nvisits += 1;\nconsole.log("Site:", siteName);\nconsole.log("Visits:", visits);\nconsole.log("Type:", typeof visits);',
    },
    {
      'title': '3. Arrays & Methods',
      'content': 'Arrays store ordered lists. Use map, filter, reduce for transformations.',
      'code':
          'const nums = [1, 2, 3, 4, 5];\nconsole.log("Original:", nums);\n\nconst doubled = nums.map(n => n * 2);\nconsole.log("Doubled:", doubled);\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);',
    },
    {
      'title': '4. Functions',
      'content': 'Functions encapsulate reusable logic. Arrow functions are more concise.',
      'code':
          'const add = (a, b) => a + b;\nfunction multiply(a, b) {\n  return a * b;\n}\n\nconsole.log("Add 2+3:", add(2, 3));\nconsole.log("Multiply 2*3:", multiply(2, 3));\n\nconst greet = name => `Hello, \${name}!`;\nconsole.log(greet("World"));',
    },
    {
      'title': '5. Objects',
      'content': 'Objects hold key-value pairs. Access properties with dot or bracket notation.',
      'code':
          'const user = {\n  id: 1,\n  name: "Alice",\n  age: 25,\n  active: true\n};\n\nconsole.log("User:", user);\nconsole.log("Name:", user.name);\n\nuser.role = "admin";\nconsole.log("Keys:", Object.keys(user));\nconsole.log("Values:", Object.values(user));',
    },
    {
      'title': '6. Loops & Iteration',
      'content': 'Use for, while, forEach, for...of to iterate through data.',
      'code':
          'console.log("For loop:");\nfor (let i = 1; i <= 3; i++) {\n  console.log(`Iteration \${i}`);\n}\n\nconsole.log("\\nForEach:");\n[10, 20, 30].forEach((num, idx) => {\n  console.log(`Index \${idx}: \${num}`);\n});',
    },
    {
      'title': '7. DOM Manipulation',
      'content': 'The DOM represents HTML as objects. Use querySelector to select and modify elements.',
      'code':
          '// Note: This runs in browser context\nconsole.log("Document title:", document.title);\nconsole.log("Body background:", document.body.style.background);\n\n// Try changing background color:\n// document.body.style.background = "lightblue";',
    },
    {
      'title': '8. Conditional Logic',
      'content': 'Use if/else, switch, and ternary operators for decision making.',
      'code':
          'const score = 85;\n\nif (score >= 90) {\n  console.log("Grade: A");\n} else if (score >= 80) {\n  console.log("Grade: B");\n} else {\n  console.log("Grade: C");\n}\n\nconst status = score >= 60 ? "Pass" : "Fail";\nconsole.log("Status:", status);',
    },
    {
      'title': '9. String Methods',
      'content': 'JavaScript provides powerful string manipulation methods.',
      'code':
          'const text = "  Hello World  ";\n\nconsole.log("Original:", text);\nconsole.log("Trimmed:", text.trim());\nconsole.log("Uppercase:", text.toUpperCase());\nconsole.log("Replace:", text.replace("World", "JavaScript"));\nconsole.log("Split:", text.trim().split(" "));',
    },
    {
      'title': '10. Modern Features',
      'content': 'ES6+ brings destructuring, spread operator, template literals, and more.',
      'code':
          'const arr = [1, 2, 3];\nconst [first, ...rest] = arr;\nconsole.log("First:", first);\nconsole.log("Rest:", rest);\n\nconst obj = { a: 1, b: 2 };\nconst extended = { ...obj, c: 3 };\nconsole.log("Extended:", extended);\n\nconst name = "Dev";\nconsole.log(`Hello, \${name}!`);',
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
    _registerIframe();
  }

  void _registerIframe() {
    // ignore: undefined_prefixed_name
    ui_web.platformViewRegistry.registerViewFactory(
      _iframeId,
      (int viewId) {
        final iframe = html.IFrameElement()
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '0px'
          ..style.display = 'none';
        return iframe;
      },
    );
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
    final code = _codeController.text;
    
    // Create HTML with the JavaScript code to execute
    final htmlContent = '''
    <!DOCTYPE html>
    <html>
    <head><title>JS Runner</title></head>
    <body>
      <script>
        const originalConsoleLog = console.log;
        const logs = [];
        
        console.log = function(...args) {
          logs.push(args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch (e) {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' '));
          originalConsoleLog.apply(console, args);
        };
        
        try {
          $code
          window.parent.postMessage({ type: 'logs', data: logs }, '*');
        } catch (error) {
          window.parent.postMessage({ 
            type: 'error', 
            data: error.toString() 
          }, '*');
        }
      </script>
    </body>
    </html>
    ''';

    // Create temporary iframe to run code
    final iframe = html.IFrameElement()
      ..style.display = 'none';
    html.document.body?.append(iframe);
    
    // Listen for messages from iframe
    html.window.onMessage.listen((event) {
      if (event.data is Map) {
        final data = event.data as Map;
        if (data['type'] == 'logs') {
          setState(() {
            _output = (data['data'] as List).join('\n');
          });
        } else if (data['type'] == 'error') {
          setState(() {
            _output = '❌ Error: ${data['data']}';
          });
        }
      }
      iframe.remove();
    });
    
    // Load the HTML content
    iframe.srcdoc = htmlContent;
  }

  @override
  Widget build(BuildContext context) {
    final lesson = _lessons[_currentLesson];
    final progress = (_currentLesson + 1) / _lessons.length;

    return ContentScreen(
      title: 'JavaScript Course',
      description: 'Interactive JavaScript lessons with live code execution',
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

              // Code editor and output side by side
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Code editor
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Code Editor:',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 12),
                        Container(
                          height: 400,
                          decoration: BoxDecoration(
                            color: Colors.grey[900],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: TextField(
                            controller: _codeController,
                            maxLines: null,
                            expands: true,
                            style: const TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 13,
                              color: Colors.greenAccent,
                              height: 1.5,
                            ),
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                              contentPadding: EdgeInsets.all(16),
                              hintText: '// Write JavaScript code here...',
                              hintStyle: TextStyle(color: Colors.grey),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  // Output
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Console Output:',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            ElevatedButton.icon(
                              onPressed: _runCode,
                              icon: const Icon(Icons.play_arrow),
                              label: const Text('Run'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.green,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 20, vertical: 10),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Container(
                          height: 400,
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.black87,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.grey[700]!),
                          ),
                          child: SingleChildScrollView(
                            child: Text(
                              _output.isEmpty ? '// Output will appear here after running code' : _output,
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 12,
                                color: _output.isEmpty ? Colors.grey : Colors.white,
                                height: 1.4,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
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
              onPressed: _currentLesson < _lessons.length - 1 ? _nextLesson : null,
              icon: const Icon(Icons.arrow_forward),
              label: const Text('Next'),
            ),
          ],
        ),
      ],
    );
  }
}
