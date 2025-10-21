import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class DSEScreen extends StatelessWidget {
  const DSEScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'DSE ICT Exam Prep',
      description: 'Comprehensive preparation materials for DSE ICT examination',
      icon: Icons.school,
      sections: [
        ContentSection(
          id: 'overview',
          title: 'Exam Overview',
          content: _buildOverviewContent(),
        ),
        ContentSection(
          id: 'topics',
          title: 'Key Topics',
          content: _buildTopicsContent(),
        ),
        ContentSection(
          id: 'tips',
          title: 'Exam Tips',
          content: _buildTipsContent(),
        ),
        ContentSection(
          id: 'resources',
          title: 'Study Resources',
          content: _buildResourcesContent(),
        ),
      ],
    );
  }

  Widget _buildOverviewContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'The DSE ICT exam tests your understanding of information and communication technology concepts, applications, and implications.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Exam Structure:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Paper 1: Multiple choice questions (40%)'),
        _BulletPoint('Paper 2A: Conventional questions (30%)'),
        _BulletPoint('Paper 2B: Case study (15%)'),
        _BulletPoint('Paper 2C: Practical questions (15%)'),
        SizedBox(height: 16),
        Text(
          'Duration: 2 hours 30 minutes total',
          style: TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
        ),
      ],
    );
  }

  Widget _buildTopicsContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Core Topics to Master:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _TopicCard(
          title: '1. Computer Systems',
          topics: [
            'Hardware components',
            'Software types',
            'Operating systems',
            'Computer architecture',
          ],
        ),
        SizedBox(height: 12),
        _TopicCard(
          title: '2. Networking & Internet',
          topics: [
            'Network types (LAN, WAN)',
            'Network protocols (TCP/IP)',
            'Internet services',
            'Cloud computing',
          ],
        ),
        SizedBox(height: 12),
        _TopicCard(
          title: '3. Databases',
          topics: [
            'Database concepts',
            'SQL queries',
            'Database design',
            'Data integrity',
          ],
        ),
        SizedBox(height: 12),
        _TopicCard(
          title: '4. Programming',
          topics: [
            'Algorithm design',
            'Python/JavaScript basics',
            'Problem-solving',
            'Debugging',
          ],
        ),
        SizedBox(height: 12),
        _TopicCard(
          title: '5. Social Implications',
          topics: [
            'Cybersecurity',
            'Privacy issues',
            'Intellectual property',
            'Digital divide',
          ],
        ),
      ],
    );
  }

  Widget _buildTipsContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Study Strategies:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Practice past papers regularly'),
        _BulletPoint('Understand concepts, don\'t just memorize'),
        _BulletPoint('Create summary notes for each topic'),
        _BulletPoint('Work on practical programming exercises'),
        _BulletPoint('Form study groups for discussion'),
        SizedBox(height: 16),
        Text(
          'During the Exam:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Read questions carefully, identify keywords'),
        _BulletPoint('Manage your time (don\'t spend too long on one question)'),
        _BulletPoint('Show your working for calculation questions'),
        _BulletPoint('Use technical terminology correctly'),
        _BulletPoint('Check your answers if time permits'),
        SizedBox(height: 16),
        Text(
          'Common Mistakes to Avoid:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Misreading question requirements'),
        _BulletPoint('Incomplete answers (not addressing all parts)'),
        _BulletPoint('Mixing up similar concepts'),
        _BulletPoint('Poor time management'),
        _BulletPoint('Leaving questions blank'),
      ],
    );
  }

  Widget _buildResourcesContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recommended Study Materials:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('HKEAA past papers and marking schemes'),
        _BulletPoint('Official DSE ICT curriculum guide'),
        _BulletPoint('ICT textbooks (Form 4-6)'),
        _BulletPoint('Online practice platforms'),
        _BulletPoint('YouTube tutorial channels'),
        SizedBox(height: 16),
        Text(
          'Practice Areas:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('SQL query writing and optimization'),
        _BulletPoint('Python programming challenges'),
        _BulletPoint('Network diagram interpretation'),
        _BulletPoint('Database normalization exercises'),
        _BulletPoint('Case study analysis'),
        SizedBox(height: 16),
        Text(
          '💡 Start preparing at least 3-6 months before the exam for best results!',
          style: TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
        ),
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

class _TopicCard extends StatelessWidget {
  final String title;
  final List<String> topics;

  const _TopicCard({
    required this.title,
    required this.topics,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.blue.withOpacity(isDark ? 0.15 : 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: Colors.blue.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          ...topics.map((topic) => Padding(
                padding: const EdgeInsets.only(left: 8, bottom: 4),
                child: Row(
                  children: [
                    const Text('• ', style: TextStyle(fontSize: 12)),
                    Expanded(
                      child: Text(
                        topic,
                        style: const TextStyle(fontSize: 12, height: 1.4),
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
