import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class HTMLScreen extends StatelessWidget {
  const HTMLScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'HTML Learning',
      description: 'Interactive HTML editor with live preview and comprehensive web development guide',
      icon: Icons.web,
      sections: [
        ContentSection(
          id: 'basics',
          title: 'HTML Basics',
          content: _buildBasicsContent(),
        ),
        ContentSection(
          id: 'elements',
          title: 'Common HTML Elements',
          content: _buildElementsContent(),
        ),
        ContentSection(
          id: 'forms',
          title: 'Forms and Input',
          content: _buildFormsContent(),
        ),
        ContentSection(
          id: 'semantic',
          title: 'Semantic HTML',
          content: _buildSemanticContent(),
        ),
      ],
    );
  }

  Widget _buildBasicsContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'HTML (HyperText Markup Language) is the standard markup language for creating web pages.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.grey[900],
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Text(
            '<!DOCTYPE html>\n'
            '<html lang="en">\n'
            '<head>\n'
            '  <meta charset="UTF-8">\n'
            '  <title>My Page</title>\n'
            '</head>\n'
            '<body>\n'
            '  <h1>Hello World!</h1>\n'
            '  <p>This is a paragraph.</p>\n'
            '</body>\n'
            '</html>',
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 12,
              color: Colors.greenAccent,
              height: 1.5,
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Key Concepts:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        const _BulletPoint('Tags - Building blocks of HTML (e.g., <p>, <div>, <h1>)'),
        const _BulletPoint('Attributes - Additional information about elements'),
        const _BulletPoint('Nesting - Elements can contain other elements'),
        const _BulletPoint('Closing Tags - Most tags require opening and closing'),
      ],
    );
  }

  Widget _buildElementsContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Headings:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          '<h1> to <h6> - Six levels of headings, h1 being the largest',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Text Formatting:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        _BulletPoint('<p> - Paragraph'),
        _BulletPoint('<strong> - Bold text (semantic importance)'),
        _BulletPoint('<em> - Italic text (semantic emphasis)'),
        _BulletPoint('<br> - Line break'),
        _BulletPoint('<hr> - Horizontal rule'),
        SizedBox(height: 16),
        Text(
          'Links and Images:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        _BulletPoint('<a href="url">Link Text</a> - Hyperlink'),
        _BulletPoint('<img src="image.jpg" alt="description"> - Image'),
        SizedBox(height: 16),
        Text(
          'Lists:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        _BulletPoint('<ul> - Unordered list (bullets)'),
        _BulletPoint('<ol> - Ordered list (numbers)'),
        _BulletPoint('<li> - List item'),
      ],
    );
  }

  Widget _buildFormsContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'HTML forms collect user input and send data to a server.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.grey[900],
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Text(
            '<form action="/submit" method="post">\n'
            '  <label for="name">Name:</label>\n'
            '  <input type="text" id="name" name="name">\n'
            '  \n'
            '  <label for="email">Email:</label>\n'
            '  <input type="email" id="email" name="email">\n'
            '  \n'
            '  <button type="submit">Submit</button>\n'
            '</form>',
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 12,
              color: Colors.greenAccent,
              height: 1.5,
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Common Input Types:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        const _BulletPoint('text - Single-line text input'),
        const _BulletPoint('email - Email address validation'),
        const _BulletPoint('password - Hidden password input'),
        const _BulletPoint('checkbox - Multiple selections'),
        const _BulletPoint('radio - Single selection from group'),
        const _BulletPoint('submit - Submit button'),
      ],
    );
  }

  Widget _buildSemanticContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Semantic HTML uses meaningful tags that describe their content, improving accessibility and SEO.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Semantic Elements:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('<header> - Page or section header'),
        _BulletPoint('<nav> - Navigation links'),
        _BulletPoint('<main> - Main content area'),
        _BulletPoint('<article> - Self-contained content'),
        _BulletPoint('<section> - Thematic grouping of content'),
        _BulletPoint('<aside> - Sidebar or related content'),
        _BulletPoint('<footer> - Page or section footer'),
        SizedBox(height: 16),
        Text(
          'Benefits:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Better accessibility for screen readers'),
        _BulletPoint('Improved SEO ranking'),
        _BulletPoint('Easier code maintenance'),
        _BulletPoint('Clearer document structure'),
      ],
    );
  }
}

class _BulletPoint extends StatelessWidget {
  final String text;

  const _BulletPoint(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, left: 8),
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
              text,
              style: const TextStyle(fontSize: 14, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
