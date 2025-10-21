import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';
import 'dart:html' as html;
// ignore: avoid_web_libraries_in_flutter
import 'dart:ui_web' as ui_web;

class HTMLScreen extends StatefulWidget {
  const HTMLScreen({super.key});

  @override
  State<HTMLScreen> createState() => _HTMLScreenState();
}

class _HTMLScreenState extends State<HTMLScreen> {
  final TextEditingController _htmlController = TextEditingController(
    text: '''<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      color: white;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    h1 { color: #fff; text-align: center; }
    button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover { background: #45a049; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to HTML Learning!</h1>
    <p>Edit the code on the left and see live changes here.</p>
    <button onclick="alert('Hello World!')">Click Me</button>
  </div>
</body>
</html>''',
  );

  String _iframeId = 'html-preview-${DateTime.now().millisecondsSinceEpoch}';

  @override
  void initState() {
    super.initState();
    _registerIframe();
    _updatePreview();
  }

  void _registerIframe() {
    // Register the iframe for web platform
    // ignore: undefined_prefixed_name
    ui_web.platformViewRegistry.registerViewFactory(
      _iframeId,
      (int viewId) {
        final iframe = html.IFrameElement()
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%';
        return iframe;
      },
    );
  }

  void _updatePreview() {
    Future.delayed(const Duration(milliseconds: 100), () {
      final iframe = html.document.getElementById(_iframeId) as html.IFrameElement?;
      if (iframe != null) {
        iframe.srcdoc = _htmlController.text;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'HTML Learning Tool',
      description: 'Interactive HTML editor with live preview',
      icon: Icons.code,
      sections: [
        ContentSection(
          id: 'editor',
          title: 'Live HTML Editor',
          content: _buildEditor(),
        ),
        ContentSection(
          id: 'guide',
          title: 'HTML Quick Guide',
          content: _buildGuide(),
        ),
      ],
    );
  }

  Widget _buildEditor() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'HTML Code Editor:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Code Editor
            Expanded(
              child: Container(
                height: 500,
                decoration: BoxDecoration(
                  color: Colors.grey[900],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextField(
                  controller: _htmlController,
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
                    hintText: '<!-- Write HTML here -->',
                    hintStyle: TextStyle(color: Colors.grey),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            // Live Preview
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Live Preview:',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      ElevatedButton.icon(
                        onPressed: _updatePreview,
                        icon: const Icon(Icons.refresh, size: 18),
                        label: const Text('Refresh'),
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Container(
                    height: 500,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.grey),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: HtmlElementView(viewType: _iframeId),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const Text(
          '💡 Tip: Edit the HTML code and click "Refresh" to see your changes!',
          style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic),
        ),
      ],
    );
  }

  Widget _buildGuide() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildGuideSection('Basic Structure', [
          '<html> - Root element',
          '<head> - Contains metadata',
          '<title> - Page title',
          '<body> - Visible content',
        ]),
        const SizedBox(height: 16),
        _buildGuideSection('Common Tags', [
          '<h1> to <h6> - Headings',
          '<p> - Paragraph',
          '<a href="url"> - Link',
          '<img src="url"> - Image',
          '<div> - Container',
          '<span> - Inline container',
          '<button> - Button',
          '<input> - Form input',
        ]),
        const SizedBox(height: 16),
        _buildGuideSection('Semantic HTML', [
          '<header> - Page or section header',
          '<nav> - Navigation links',
          '<main> - Main content',
          '<article> - Independent content',
          '<section> - Thematic grouping',
          '<footer> - Page or section footer',
        ]),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.blue[50],
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.blue),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '🎨 Styling Tips:',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text('• Add CSS in <style> tags inside <head>'),
              Text('• Use class="name" for reusable styles'),
              Text('• Use id="name" for unique elements'),
              Text('• Inline styles: style="property: value;"'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildGuideSection(String title, List<String> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        ...items.map((item) => Padding(
              padding: const EdgeInsets.only(bottom: 6, left: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 6, right: 8),
                    width: 6,
                    height: 6,
                    decoration: const BoxDecoration(
                      color: Colors.blue,
                      shape: BoxShape.circle,
                    ),
                  ),
                  Expanded(
                    child: Text(
                      item,
                      style: const TextStyle(fontSize: 14, fontFamily: 'monospace'),
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  @override
  void dispose() {
    _htmlController.dispose();
    super.dispose();
  }
}
