import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/colors.dart';
import '../providers/theme_provider.dart';
import 'content_screen.dart';

class SQLScreen extends StatefulWidget {
  const SQLScreen({Key? key}) : super(key: key);

  @override
  State<SQLScreen> createState() => _SQLScreenState();
}

class _SQLScreenState extends State<SQLScreen> {
  String _sqlQuery = 'SELECT * FROM students;';
  String _queryResult = '';

  void _runQuery() {
    setState(() {
      _queryResult = '''Query executed successfully!
Results:
| ID | Name     | Grade |
|----|----------|-------|
| 1  | Alice    | A     |
| 2  | Bob      | B+    |
| 3  | Charlie  | A-    |''';
    });
  }

  void _resetQuery() {
    setState(() {
      _sqlQuery = 'SELECT * FROM students;';
      _queryResult = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    final sections = [
      ContentSection(
        id: 'basics',
        title: 'SQL Basics',
        content: Consumer<ThemeProvider>(
          builder: (context, themeProvider, _) {
            final textSecondary =
                AppColors.getTextSecondary(themeProvider.isDarkMode);
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SQL (Structured Query Language) is a programming language designed for managing and manipulating relational databases.',
                  style: TextStyle(color: textSecondary, height: 1.6),
                ),
                const SizedBox(height: 16),
                Text(
                  'Key SQL Commands:',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: textSecondary,
                  ),
                ),
                const SizedBox(height: 8),
                ...['SELECT: Retrieve data from tables',
                    'INSERT: Add new data to tables',
                    'UPDATE: Modify existing data',
                    'DELETE: Remove data from tables',
                    'CREATE: Create new tables or databases',
                    'ALTER: Modify table structure']
                    .map((item) => Padding(
                          padding: const EdgeInsets.only(left: 16, top: 4),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('• ', style: TextStyle(color: textSecondary)),
                              Expanded(
                                child: Text(item,
                                    style: TextStyle(color: textSecondary)),
                              ),
                            ],
                          ),
                        ))
                    .toList(),
              ],
            );
          },
        ),
      ),
      ContentSection(
        id: 'select',
        title: 'SELECT Statements',
        content: Consumer<ThemeProvider>(
          builder: (context, themeProvider, _) {
            final isDark = themeProvider.isDarkMode;
            final textSecondary = AppColors.getTextSecondary(isDark);
            final bgTertiary = AppColors.getBgTertiary(isDark);

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'The SELECT statement is used to query data from one or more tables.',
                  style: TextStyle(color: textSecondary, height: 1.6),
                ),
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: bgTertiary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Basic Syntax:',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: textSecondary,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '''SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1 ASC/DESC;''',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 13,
                          color: textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Examples:',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: Colors.blue.shade900,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '''-- Select all columns from students table
SELECT * FROM students;

-- Select specific columns
SELECT name, age FROM students;

-- Select with condition
SELECT * FROM students WHERE age > 18;''',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 13,
                          color: Colors.blue.shade800,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ),
      ContentSection(
        id: 'joins',
        title: 'JOIN Operations',
        content: Consumer<ThemeProvider>(
          builder: (context, themeProvider, _) {
            final textSecondary =
                AppColors.getTextSecondary(themeProvider.isDarkMode);

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'JOINs combine rows from multiple tables based on related columns.',
                  style: TextStyle(color: textSecondary, height: 1.6),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.green.shade50,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'INNER JOIN',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: Colors.green.shade900,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Returns records with matching values in both tables.',
                              style: TextStyle(
                                fontSize: 13,
                                color: Colors.green.shade800,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              '''SELECT s.name, c.course_name
FROM students s
INNER JOIN courses c
ON s.course_id = c.id;''',
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: Colors.green.shade700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.purple.shade50,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'LEFT JOIN',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: Colors.purple.shade900,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Returns all records from left table, matching from right.',
                              style: TextStyle(
                                fontSize: 13,
                                color: Colors.purple.shade800,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              '''SELECT s.name, c.course_name
FROM students s
LEFT JOIN courses c
ON s.course_id = c.id;''',
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: Colors.purple.shade700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
      ContentSection(
        id: 'functions',
        title: 'SQL Functions',
        content: Consumer<ThemeProvider>(
          builder: (context, themeProvider, _) {
            final isDark = themeProvider.isDarkMode;
            final textSecondary = AppColors.getTextSecondary(isDark);
            final bgTertiary = AppColors.getBgTertiary(isDark);

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SQL provides built-in functions for data manipulation and analysis.',
                  style: TextStyle(color: textSecondary, height: 1.6),
                ),
                const SizedBox(height: 16),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: bgTertiary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Aggregate Functions',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: textSecondary,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(height: 8),
                            ...['COUNT()', 'SUM()', 'AVG()', 'MIN()', 'MAX()']
                                .map((fn) => Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: Text(fn,
                                          style: TextStyle(
                                              color: textSecondary,
                                              fontSize: 13)),
                                    ))
                                .toList(),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: bgTertiary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'String Functions',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: textSecondary,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(height: 8),
                            ...[
                              'CONCAT()',
                              'UPPER()',
                              'LOWER()',
                              'LENGTH()',
                              'SUBSTRING()'
                            ]
                                .map((fn) => Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: Text(fn,
                                          style: TextStyle(
                                              color: textSecondary,
                                              fontSize: 13)),
                                    ))
                                .toList(),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: bgTertiary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Date Functions',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: textSecondary,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(height: 8),
                            ...['NOW()', 'DATE()', 'YEAR()', 'MONTH()', 'DAY()']
                                .map((fn) => Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: Text(fn,
                                          style: TextStyle(
                                              color: textSecondary,
                                              fontSize: 13)),
                                    ))
                                .toList(),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
    ];

    return ContentScreen(
      title: 'SQL Database Guide',
      description:
          'Master database management with SQL. Learn queries, joins, and data manipulation.',
      icon: Icons.storage,
      sections: sections,
      interactiveWidget: _buildInteractiveSection(),
    );
  }

  Widget _buildInteractiveSection() {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final bgTertiary = AppColors.getBgTertiary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);

        return Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: bgSecondary,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: bgTertiary),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Try SQL Queries',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: textPrimary,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Write and execute SQL queries in the editor below:',
                style: TextStyle(color: textSecondary),
              ),
              const SizedBox(height: 24),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'SQL Query Editor',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: textSecondary,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextField(
                          controller: TextEditingController(text: _sqlQuery),
                          onChanged: (value) => _sqlQuery = value,
                          maxLines: 5,
                          style: TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 14,
                            color: textPrimary,
                          ),
                          decoration: InputDecoration(
                            filled: true,
                            fillColor: bgTertiary,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                              borderSide: BorderSide.none,
                            ),
                            hintText: 'Enter your SQL query here...',
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            ElevatedButton.icon(
                              onPressed: _runQuery,
                              icon: const Icon(Icons.play_arrow, size: 18),
                              label: const Text('Run Query'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blue.shade600,
                                foregroundColor: Colors.white,
                              ),
                            ),
                            const SizedBox(width: 8),
                            OutlinedButton.icon(
                              onPressed: _resetQuery,
                              icon: const Icon(Icons.refresh, size: 18),
                              label: const Text('Reset'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 24),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Query Results',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: textSecondary,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          height: 200,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.grey.shade900,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: SingleChildScrollView(
                            child: Text(
                              _queryResult.isEmpty
                                  ? 'Click "Run Query" to see results...'
                                  : _queryResult,
                              style: const TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 13,
                                color: Colors.greenAccent,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
