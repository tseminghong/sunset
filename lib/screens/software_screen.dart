import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class SoftwareScreen extends StatelessWidget {
  const SoftwareScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'Software Engineering',
      description: 'Comprehensive guide to software development concepts, methodologies, and best practices',
      icon: Icons.code,
      sections: [
        ContentSection(
          id: 'types',
          title: 'Types of Software',
          content: _buildTypesContent(),
        ),
        ContentSection(
          id: 'sdlc',
          title: 'Software Development Lifecycle (SDLC)',
          content: _buildSDLCContent(),
        ),
        ContentSection(
          id: 'methodologies',
          title: 'Development Methodologies',
          content: _buildMethodologiesContent(),
        ),
        ContentSection(
          id: 'testing',
          title: 'Software Testing',
          content: _buildTestingContent(),
        ),
      ],
    );
  }

  Widget _buildTypesContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'System Software:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        ..._buildBulletList([
          'Operating Systems: Windows, macOS, Linux',
          'Device Drivers: Hardware communication',
          'Utilities: Disk cleanup, antivirus, backup',
          'Programming Tools: Compilers, debuggers',
        ]),
        const SizedBox(height: 16),
        const Text(
          'Application Software:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        ..._buildBulletList([
          'Productivity: Word processors, spreadsheets',
          'Entertainment: Games, media players',
          'Business: CRM, accounting software',
          'Educational: Learning management systems',
        ]),
        const SizedBox(height: 16),
        const Text(
          'Programming Software:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        const Text(
          'Tools used by developers to create, debug, and maintain software applications.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
      ],
    );
  }

  Widget _buildSDLCContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'The Software Development Lifecycle is a structured process for developing high-quality software efficiently.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        ...['Planning', 'Analysis', 'Design', 'Implementation', 'Testing', 'Deployment', 'Maintenance']
            .asMap()
            .entries
            .map((entry) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 32,
                        height: 32,
                        decoration: BoxDecoration(
                          color: Colors.blue.withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            '${entry.key + 1}',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              entry.value,
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                            ),
                            Text(
                              _getSDLCDescription(entry.value),
                              style: TextStyle(fontSize: 13, color: Colors.grey[600], height: 1.4),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ))
            .toList(),
      ],
    );
  }

  String _getSDLCDescription(String phase) {
    switch (phase) {
      case 'Planning':
        return 'Define project scope, requirements, and timeline';
      case 'Analysis':
        return 'Analyze requirements and create system specifications';
      case 'Design':
        return 'Create system architecture and user interface designs';
      case 'Implementation':
        return 'Write code and build the software system';
      case 'Testing':
        return 'Verify software meets requirements and is bug-free';
      case 'Deployment':
        return 'Release software to production environment';
      case 'Maintenance':
        return 'Ongoing support and updates after deployment';
      default:
        return '';
    }
  }

  Widget _buildMethodologiesContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Waterfall Model:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        const Text(
          'Linear sequential approach where each phase must be completed before the next begins.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 12),
        ...['Simple to understand and manage', 'Clear documentation at each phase', 'Works well for small projects']
            .map((text) => _buildBullet(text, Colors.green))
            .toList(),
        const SizedBox(height: 16),
        const Text(
          'Agile Methodology:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        const Text(
          'Iterative approach with short development cycles (sprints) and continuous feedback.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 12),
        ...['Flexible to changing requirements', 'Customer collaboration', 'Working software delivered frequently']
            .map((text) => _buildBullet(text, Colors.blue))
            .toList(),
        const SizedBox(height: 16),
        const Text(
          'DevOps:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        const Text(
          'Cultural and technical movement emphasizing collaboration between development and operations teams.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
      ],
    );
  }

  Widget _buildTestingContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Software testing ensures applications work correctly and meet requirements before deployment.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        const Text(
          'Types of Testing:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        ..._buildBulletList([
          'Unit Testing: Testing individual components in isolation',
          'Integration Testing: Testing interactions between components',
          'System Testing: Testing complete integrated system',
          'Acceptance Testing: Testing system meets business requirements',
        ]),
        const SizedBox(height: 16),
        const Text(
          'Testing Approaches:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        ..._buildBulletList([
          'Manual Testing: Human testers execute test cases',
          'Automated Testing: Scripts and tools execute tests automatically',
          'Tools: Jest, JUnit, Selenium, Cypress',
        ]),
      ],
    );
  }

  List<Widget> _buildBulletList(List<String> items) {
    return items.map((text) => _buildBullet(text, null)).toList();
  }

  Widget _buildBullet(String text, Color? color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, left: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 6, right: 8),
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: color ?? Colors.blue,
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
