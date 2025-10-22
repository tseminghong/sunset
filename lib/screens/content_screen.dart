import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/colors.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../utils/animations.dart';
import '../widgets/header.dart';
import '../widgets/smooth_scroll.dart';

class ContentScreen extends StatefulWidget {
  final String title;
  final String description;
  final IconData icon;
  final List<ContentSection> sections;
  final Widget? interactiveWidget;

  const ContentScreen({
    required this.title,
    required this.description,
    required this.icon,
    required this.sections,
    this.interactiveWidget,
    Key? key,
  }) : super(key: key);

  @override
  State<ContentScreen> createState() => _ContentScreenState();
}

class _ContentScreenState extends State<ContentScreen> {
  final Map<String, bool> _expandedSections = {};

  @override
  Widget build(BuildContext context) {
    return Consumer2<ThemeProvider, LanguageProvider>(
      builder: (context, themeProvider, langProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgPrimary = AppColors.getBgPrimary(isDark);
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final bgTertiary = AppColors.getBgTertiary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentPrimary = AppColors.getAccentPrimary(isDark);

        return Scaffold(
          backgroundColor: bgPrimary,
          body: CustomScrollView(
            physics: const BouncingScrollPhysics(
              parent: AlwaysScrollableScrollPhysics(),
            ),
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
                    onAuthClick: () {},
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
                          accentPrimary,
                          textPrimary,
                          textSecondary,
                        ),
                      ),

                      const SizedBox(height: 48),

                      // Interactive Widget (if provided)
                      if (widget.interactiveWidget != null) ...[
                        SlideUpTransition(
                          delay: 200,
                          child: widget.interactiveWidget!,
                        ),
                        const SizedBox(height: 48),
                      ],

                      // Content Sections
                      SlideUpTransition(
                        delay: widget.interactiveWidget != null ? 400 : 200,
                        child: _buildSections(
                          bgSecondary,
                          bgTertiary,
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
    Color accentPrimary,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Column(
      children: [
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: accentPrimary,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Icon(
            widget.icon,
            size: 48,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 24),
        Text(
          widget.title,
          style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.bold,
            color: textPrimary,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        Text(
          widget.description,
          style: TextStyle(
            fontSize: 18,
            color: textSecondary,
            height: 1.6,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildSections(
    Color bgSecondary,
    Color bgTertiary,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Column(
      children: widget.sections.asMap().entries.map((entry) {
        final index = entry.key;
        final section = entry.value;
        final isExpanded = _expandedSections[section.id] ?? false;

        return ScrollFadeIn(
          duration: const Duration(milliseconds: 600),
          offset: 50.0,
          child: AppScaleTransition(
            delay: index * 100,
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: bgSecondary,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: bgTertiary,
                  width: 1,
                ),
              ),
              child: Column(
              children: [
                InkWell(
                  onTap: () {
                    setState(() {
                      _expandedSections[section.id] = !isExpanded;
                    });
                  },
                  borderRadius: BorderRadius.circular(16),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          section.title,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w600,
                            color: textPrimary,
                          ),
                        ),
                        Icon(
                          isExpanded
                              ? Icons.keyboard_arrow_up
                              : Icons.keyboard_arrow_down,
                          color: textSecondary,
                        ),
                      ],
                    ),
                  ),
                ),
                AnimatedCrossFade(
                  firstChild: const SizedBox.shrink(),
                  secondChild: Container(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          height: 1,
                          color: bgTertiary,
                        ),
                        const SizedBox(height: 20),
                        section.content,
                      ],
                    ),
                  ),
                  crossFadeState: isExpanded
                      ? CrossFadeState.showSecond
                      : CrossFadeState.showFirst,
                  duration: const Duration(milliseconds: 300),
                ),
              ],
            ),
          ),
        )
      );
      }).toList(),
    );
  }
}

class ContentSection {
  final String id;
  final String title;
  final Widget content;

  ContentSection({
    required this.id,
    required this.title,
    required this.content,
  });
}
