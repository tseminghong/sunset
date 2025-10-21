import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class ProcessingModesScreen extends StatelessWidget {
  const ProcessingModesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'Data Processing Modes',
      description: 'Understanding different methods of processing data in computer systems',
      icon: Icons.settings_input_component,
      sections: [
        ContentSection(
          id: 'batch',
          title: 'Batch Processing',
          content: _buildBatchContent(),
        ),
        ContentSection(
          id: 'online',
          title: 'Online Processing',
          content: _buildOnlineContent(),
        ),
        ContentSection(
          id: 'realtime',
          title: 'Real-time Processing',
          content: _buildRealtimeContent(),
        ),
        ContentSection(
          id: 'comparison',
          title: 'Comparison & Use Cases',
          content: _buildComparisonContent(),
        ),
      ],
    );
  }

  Widget _buildBatchContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Batch processing executes jobs in groups without user interaction, typically during off-peak hours.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Characteristics:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Jobs are collected and processed as a group'),
        _BulletPoint('No user interaction during processing'),
        _BulletPoint('Efficient use of computer resources'),
        _BulletPoint('Results available after batch completion'),
        _BulletPoint('Scheduled to run at specific times'),
        SizedBox(height: 16),
        Text(
          'Examples:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _ExampleCard(
          title: 'Payroll Processing',
          description: 'Monthly salary calculations for all employees processed together',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Bank Statement Generation',
          description: 'Monthly statements printed for all customers at once',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Utility Bills',
          description: 'Electricity/water bills calculated and printed in batches',
        ),
        SizedBox(height: 16),
        Text(
          'Advantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✓ Efficient for large volumes of data'),
        _BulletPoint('✓ Lower processing costs'),
        _BulletPoint('✓ Can run during off-peak hours'),
        _BulletPoint('✓ Minimal user supervision required'),
        SizedBox(height: 16),
        Text(
          'Disadvantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✗ Delayed results (not immediate)'),
        _BulletPoint('✗ Errors only detected after processing'),
        _BulletPoint('✗ Not suitable for time-critical applications'),
      ],
    );
  }

  Widget _buildOnlineContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Online processing handles transactions immediately as they occur, with direct user interaction.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Characteristics:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Immediate processing of transactions'),
        _BulletPoint('Direct user interaction with system'),
        _BulletPoint('Files and databases updated instantly'),
        _BulletPoint('Quick response time (within seconds)'),
        _BulletPoint('Available 24/7'),
        SizedBox(height: 16),
        Text(
          'Examples:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _ExampleCard(
          title: 'ATM Transactions',
          description: 'Cash withdrawal, balance inquiry processed immediately',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Online Banking',
          description: 'Fund transfers, bill payments processed in real-time',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'E-commerce',
          description: 'Online shopping, inventory updated after each purchase',
        ),
        SizedBox(height: 16),
        Text(
          'Advantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✓ Immediate results and feedback'),
        _BulletPoint('✓ Up-to-date information'),
        _BulletPoint('✓ Better customer service'),
        _BulletPoint('✓ Errors can be corrected immediately'),
        SizedBox(height: 16),
        Text(
          'Disadvantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✗ Higher hardware/software costs'),
        _BulletPoint('✗ Requires reliable network connection'),
        _BulletPoint('✗ More complex security requirements'),
      ],
    );
  }

  Widget _buildRealtimeContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Real-time processing provides instant responses to inputs, critical for time-sensitive applications where delays are unacceptable.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Characteristics:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Immediate processing (milliseconds)'),
        _BulletPoint('Continuous monitoring and response'),
        _BulletPoint('Zero tolerance for delays'),
        _BulletPoint('High reliability required'),
        _BulletPoint('Automatic control systems'),
        SizedBox(height: 16),
        Text(
          'Examples:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _ExampleCard(
          title: 'Air Traffic Control',
          description: 'Real-time tracking of aircraft positions and flight paths',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Medical Monitoring',
          description: 'Patient vital signs monitoring in ICU',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Industrial Control',
          description: 'Manufacturing process control and automation',
        ),
        SizedBox(height: 8),
        _ExampleCard(
          title: 'Stock Trading',
          description: 'High-frequency trading systems',
        ),
        SizedBox(height: 16),
        Text(
          'Advantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✓ Instantaneous response'),
        _BulletPoint('✓ Critical for life-safety systems'),
        _BulletPoint('✓ Prevents dangerous situations'),
        _BulletPoint('✓ Highly accurate and reliable'),
        SizedBox(height: 16),
        Text(
          'Disadvantages:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('✗ Very expensive to implement'),
        _BulletPoint('✗ Requires specialized hardware'),
        _BulletPoint('✗ Complex software development'),
        _BulletPoint('✗ High maintenance costs'),
      ],
    );
  }

  Widget _buildComparisonContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Quick Comparison:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Table(
          border: TableBorder.all(color: Colors.grey.withOpacity(0.3)),
          columnWidths: const {
            0: FlexColumnWidth(2),
            1: FlexColumnWidth(3),
          },
          children: const [
            TableRow(
              decoration: BoxDecoration(color: Colors.blue),
              children: [
                Padding(
                  padding: EdgeInsets.all(8),
                  child: Text('Aspect', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                ),
                Padding(
                  padding: EdgeInsets.all(8),
                  child: Text('Description', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                ),
              ],
            ),
            TableRow(
              children: [
                Padding(padding: EdgeInsets.all(8), child: Text('Response Time')),
                Padding(padding: EdgeInsets.all(8), child: Text('Batch: Hours/Days | Online: Seconds | Real-time: Milliseconds')),
              ],
            ),
            TableRow(
              children: [
                Padding(padding: EdgeInsets.all(8), child: Text('User Interaction')),
                Padding(padding: EdgeInsets.all(8), child: Text('Batch: None | Online: Yes | Real-time: Automatic')),
              ],
            ),
            TableRow(
              children: [
                Padding(padding: EdgeInsets.all(8), child: Text('Cost')),
                Padding(padding: EdgeInsets.all(8), child: Text('Batch: Low | Online: Medium | Real-time: Very High')),
              ],
            ),
            TableRow(
              children: [
                Padding(padding: EdgeInsets.all(8), child: Text('Data Currency')),
                Padding(padding: EdgeInsets.all(8), child: Text('Batch: Delayed | Online: Current | Real-time: Instant')),
              ],
            ),
          ],
        ),
        const SizedBox(height: 16),
        const Text(
          'Choosing the Right Mode:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        const _BulletPoint('Use Batch for: Large volumes, non-urgent, routine tasks'),
        const _BulletPoint('Use Online for: Customer-facing services, immediate updates needed'),
        const _BulletPoint('Use Real-time for: Life-critical systems, process control, safety'),
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

class _ExampleCard extends StatelessWidget {
  final String title;
  final String description;

  const _ExampleCard({
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.green.withOpacity(isDark ? 0.15 : 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: Colors.green.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            description,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}
