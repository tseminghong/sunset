import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/colors.dart';
import '../data/resources.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../utils/animations.dart';
import '../widgets/header.dart';
import '../widgets/resource_card.dart';

class CoursesScreen extends StatefulWidget {
  const CoursesScreen({Key? key}) : super(key: key);

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  @override
  Widget build(BuildContext context) {
    return Consumer2<ThemeProvider, LanguageProvider>(
      builder: (context, themeProvider, langProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgPrimary = AppColors.getBgPrimary(isDark);
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);

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
                        child: Column(
                          children: [
                            const SizedBox(height: 24),
                            Text(
                              'All Courses',
                              style: TextStyle(
                                fontSize: 40,
                                fontWeight: FontWeight.bold,
                                color: textPrimary,
                              ),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Explore our comprehensive collection of interactive learning materials and courses\ndesigned to help you master ICT concepts.',
                              style: TextStyle(
                                fontSize: 18,
                                color: textSecondary,
                                height: 1.6,
                              ),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 48),
                          ],
                        ),
                      ),

                      // Resources Grid
                      SlideUpTransition(
                        delay: 200,
                        child: _buildResourcesGrid(context),
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

  Widget _buildResourcesGrid(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: MediaQuery.of(context).size.width > 1024
            ? 3
            : MediaQuery.of(context).size.width > 768
                ? 2
                : 1,
        crossAxisSpacing: 24,
        mainAxisSpacing: 24,
        childAspectRatio: 0.85,
      ),
      itemCount: resourcesData.length,
      itemBuilder: (context, index) {
        return ResourceCard(
          resource: resourcesData[index],
          index: index,
        );
      },
    );
  }
}
