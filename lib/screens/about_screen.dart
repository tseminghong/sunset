import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/colors.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../utils/animations.dart';
import '../widgets/header.dart';

class AboutScreen extends StatefulWidget {
  const AboutScreen({Key? key}) : super(key: key);

  @override
  State<AboutScreen> createState() => _AboutScreenState();
}

class _AboutScreenState extends State<AboutScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _floatingController;
  bool _isAuthModalOpen = false;

  @override
  void initState() {
    super.initState();
    _floatingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _floatingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer2<ThemeProvider, LanguageProvider>(
      builder: (context, themeProvider, langProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgPrimary = AppColors.getBgPrimary(isDark);
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentPrimary = AppColors.getAccentPrimary(isDark);

        return Scaffold(
          backgroundColor: bgPrimary,
          body: CustomScrollView(
            slivers: [
              // Header
              SliverAppBar(
                floating: true,
                snap: true,
                backgroundColor: bgSecondary.withOpacity(0.7),
                elevation: 0,
                toolbarHeight: 64,
                flexibleSpace: FlexibleSpaceBar(
                  background: Header(
                    onAuthClick: () =>
                        setState(() => _isAuthModalOpen = true),
                  ),
                ),
              ),

              // Content
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      // Hero Section
                      FadeInTransition(
                        child: _buildHeroSection(
                          textPrimary,
                          textSecondary,
                          accentPrimary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Mission Section
                      SlideUpTransition(
                        delay: 200,
                        child: _buildMissionSection(
                          bgSecondary,
                          textPrimary,
                          textSecondary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Features Section
                      SlideUpTransition(
                        delay: 400,
                        child: _buildFeaturesSection(
                          bgSecondary,
                          textPrimary,
                          textSecondary,
                          accentPrimary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Subjects Section
                      SlideUpTransition(
                        delay: 600,
                        child: _buildSubjectsSection(
                          isDark,
                          bgSecondary,
                          textPrimary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Team Section
                      SlideUpTransition(
                        delay: 800,
                        child: _buildTeamSection(
                          bgSecondary,
                          textPrimary,
                          textSecondary,
                          accentPrimary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Contact Section
                      SlideUpTransition(
                        delay: 1000,
                        child: _buildContactSection(
                          bgSecondary,
                          textPrimary,
                          textSecondary,
                        ),
                      ),

                      const SizedBox(height: 48),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildHeroSection(
    Color textPrimary,
    Color textSecondary,
    Color accentPrimary,
  ) {
    return Container(
      padding: const EdgeInsets.all(32),
      child: Column(
        children: [
          // Animated Icon
          AnimatedBuilder(
            animation: _floatingController,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(
                  0,
                  10 * _floatingController.value,
                ),
                child: Icon(
                  Icons.school,
                  size: 80,
                  color: accentPrimary,
                ),
              );
            },
          ),

          const SizedBox(height: 24),

          Text(
            'About HPCSS ICT Revision Hub',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: textPrimary,
            ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 16),

          Text(
            'Your comprehensive platform for mastering ICT concepts through interactive learning and practical exercises.',
            style: TextStyle(
              fontSize: 18,
              color: textSecondary,
              height: 1.6,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildMissionSection(
    Color bgSecondary,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: bgSecondary,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            'My Mission',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: textPrimary,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'SYBAU nigga',
            style: TextStyle(
              fontSize: 18,
              color: textSecondary,
              height: 1.6,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturesSection(
    Color bgSecondary,
    Color textPrimary,
    Color textSecondary,
    Color accentPrimary,
  ) {
    final features = [
      {
        'icon': Icons.school,
        'title': 'Educational Excellence',
        'description':
            'Comprehensive learning materials designed for HKDSE ICT students',
      },
      {
        'icon': Icons.group,
        'title': 'Interactive Learning',
        'description':
            'Hands-on exercises and real-time code editors for practical experience',
      },
      {
        'icon': Icons.track_changes,
        'title': 'Focused Content',
        'description':
            'Curriculum-aligned resources targeting key exam topics and concepts',
      },
      {
        'icon': Icons.emoji_events,
        'title': 'Proven Results',
        'description':
            'Track your progress and achieve better exam outcomes',
      },
    ];

    return Column(
      children: [
        Text(
          'What I Offer',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: textPrimary,
          ),
        ),
        const SizedBox(height: 32),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: MediaQuery.of(context).size.width > 1024
                ? 4
                : MediaQuery.of(context).size.width > 768
                    ? 2
                    : 1,
            crossAxisSpacing: 24,
            mainAxisSpacing: 24,
            childAspectRatio: 1.0,
          ),
          itemCount: features.length,
          itemBuilder: (context, index) {
            final feature = features[index];
            return AppScaleTransition(
              delay: index * 100,
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: bgSecondary,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      feature['icon'] as IconData,
                      size: 48,
                      color: accentPrimary,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      feature['title'] as String,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: textPrimary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      feature['description'] as String,
                      style: TextStyle(
                        fontSize: 14,
                        color: textSecondary,
                        height: 1.5,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildSubjectsSection(
    bool isDark,
    Color bgSecondary,
    Color textPrimary,
  ) {
    final subjects = [
      'Database Management (SQL)',
      'Computer Hardware',
      'Software Engineering',
      'Web Development (HTML/JavaScript)',
      'Data Processing Modes',
      'ICT in Business',
      'System Analysis & Design',
      'Computer Networks',
      'Programming Fundamentals',
    ];

    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isDark
              ? [
                  Colors.blue.shade900.withOpacity(0.2),
                  Colors.indigo.shade900.withOpacity(0.2)
                ]
              : [Colors.blue.shade50, Colors.indigo.shade50],
        ),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            'Subjects Covered',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: textPrimary,
            ),
          ),
          const SizedBox(height: 32),
          Wrap(
            spacing: 16,
            runSpacing: 16,
            children: subjects.asMap().entries.map((entry) {
              final index = entry.key;
              final subject = entry.value;
              return AppScaleTransition(
                delay: index * 50,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: bgSecondary,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.05),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: Colors.blue.shade600,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        subject,
                        style: TextStyle(
                          fontWeight: FontWeight.w500,
                          color: textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildTeamSection(
    Color bgSecondary,
    Color textPrimary,
    Color textSecondary,
    Color accentPrimary,
  ) {
    return Column(
      children: [
        Text(
          'Our Team',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: textPrimary,
          ),
        ),
        const SizedBox(height: 32),
        Container(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: bgSecondary,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              const Text(
                '👨‍💻',
                style: TextStyle(fontSize: 64),
              ),
              const SizedBox(height: 16),
              Text(
                'Darren Tsang',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: textPrimary,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Full Stack Developer',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  color: accentPrimary,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Passionate about education technology and creating accessible learning resources for students.',
                style: TextStyle(
                  fontSize: 14,
                  color: textSecondary,
                  height: 1.6,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildContactSection(
    Color bgSecondary,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: bgSecondary,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            'Find me',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: textPrimary,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            "Have questions or suggestions? I'd love to hear from you!",
            style: TextStyle(
              fontSize: 16,
              color: textSecondary,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.center,
            children: [
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.mail),
                label: const Text('Contact Us'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue.shade600,
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.code),
                label: const Text('GitHub'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey.shade800,
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
