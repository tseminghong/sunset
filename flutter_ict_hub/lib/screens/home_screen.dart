import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/colors.dart';
import '../data/resources.dart';
import '../providers/resource_provider.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../utils/animations.dart';
import '../utils/responsive.dart';
import '../widgets/header.dart';
import '../widgets/hero_section.dart';
import '../widgets/tag_filter.dart';
import '../widgets/resource_card.dart';
import '../widgets/search_bar.dart';
import '../widgets/auth_modal.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isAuthModalOpen = false;
  bool _isScrolled = false;
  late ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    final isScrolled = _scrollController.offset > 10;
    if (isScrolled != _isScrolled) {
      setState(() => _isScrolled = isScrolled);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer3<ThemeProvider, LanguageProvider, ResourceProvider>(
      builder: (context, themeProvider, langProvider, resourceProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgPrimary = AppColors.getBgPrimary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final bgSecondary = AppColors.getBgSecondary(isDark);

        return Scaffold(
          backgroundColor: bgPrimary,
          body: CustomScrollView(
            controller: _scrollController,
            slivers: [
              // Header
              SliverAppBar(
                floating: true,
                snap: true,
                backgroundColor: bgSecondary.withOpacity(0.7),
                elevation: 0,
                toolbarHeight: 64,
                flexibleSpace: FlexibleSpaceBar(
                  collapseMode: CollapseMode.pin,
                  background: Header(
                    onAuthClick: () =>
                        setState(() => _isAuthModalOpen = true),
                    isScrolled: _isScrolled,
                  ),
                ),
              ),
              // Main content
              SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal:
                        MediaQuery.of(context).size.width > 1024 ? 48 : 16,
                    vertical: 32,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Hero Section
                      FadeInTransition(
                        child: const HeroSection(),
                      ),
                      const SizedBox(height: 48),
                      // Search Bar
                      AppSearchBar(
                        onSearchChanged: (term) {
                          resourceProvider.setSearchTerm(term);
                        },
                      ),
                      const SizedBox(height: 32),
                      // Tag Filter
                      SlideUpTransition(
                        duration: const Duration(milliseconds: 600),
                        delay: 200,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            TagFilter(
                              tags: allTags,
                              activeTag: resourceProvider.activeTag,
                              onTagChange: (tag) {
                                resourceProvider.setActiveTag(tag);
                              },
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 48),
                      // Resources Title
                      SlideUpTransition(
                        duration: const Duration(milliseconds: 600),
                        delay: 300,
                        child: Text(
                          langProvider.t('home.featured_resources'),
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: textPrimary,
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Resources Grid
                      if (resourceProvider.filteredResources.isNotEmpty)
                        ResponsiveWidget(
                          mobileBuilder: (context) => Column(
                            children: List.generate(
                              resourceProvider.filteredResources.length,
                              (index) => Padding(
                                padding: const EdgeInsets.only(bottom: 24),
                                child: ResourceCard(
                                  resource:
                                      resourceProvider.filteredResources[index],
                                  index: index,
                                ),
                              ),
                            ),
                          ),
                          tabletBuilder: (context) => GridView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate:
                                const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 24,
                              mainAxisSpacing: 24,
                            ),
                            itemCount:
                                resourceProvider.filteredResources.length,
                            itemBuilder: (context, index) => ResourceCard(
                              resource: resourceProvider
                                  .filteredResources[index],
                              index: index,
                            ),
                          ),
                          desktopBuilder: (context) => GridView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate:
                                const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 3,
                              crossAxisSpacing: 24,
                              mainAxisSpacing: 24,
                            ),
                            itemCount:
                                resourceProvider.filteredResources.length,
                            itemBuilder: (context, index) => ResourceCard(
                              resource: resourceProvider
                                  .filteredResources[index],
                              index: index,
                            ),
                          ),
                        )
                      else
                        SlideUpTransition(
                          child: Center(
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 48),
                              child: Column(
                                children: [
                                  Icon(
                                    Icons.search_off,
                                    size: 48,
                                    color: textSecondary.withOpacity(0.5),
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    langProvider.t('home.no_resources'),
                                    style: TextStyle(
                                      color: textSecondary,
                                      fontSize: 16,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      const SizedBox(height: 48),
                      // About Section
                      SlideUpTransition(
                        duration: const Duration(milliseconds: 800),
                        delay: 400,
                        distance: 75,
                        child: Container(
                          decoration: BoxDecoration(
                            color: bgSecondary,
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(
                              color: AppColors.getBgTertiary(isDark),
                              width: 1,
                            ),
                          ),
                          padding: const EdgeInsets.all(40),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(
                                langProvider.t('home.about_title'),
                                style: TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color: textPrimary,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 20),
                              Text(
                                langProvider.t('home.about_desc'),
                                style: TextStyle(
                                  fontSize: 16,
                                  color: textSecondary,
                                  height: 1.6,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                langProvider.t('home.about_desc2'),
                                style: TextStyle(
                                  fontSize: 16,
                                  color: textSecondary,
                                  height: 1.6,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 48),
                      // Footer
                      FadeInTransition(
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            vertical: 24,
                            horizontal: 16,
                          ),
                          child: Column(
                            children: [
                              Divider(
                                color: AppColors.getBgTertiary(isDark),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                '© 2024 HPCSS ICT Revision Hub. All rights reserved.',
                                style: TextStyle(
                                  color: textSecondary,
                                  fontSize: 14,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          floatingActionButton: _buildFloatingActionButton(
            context,
            isDark,
          ),
        );
      },
    );
  }

  Widget _buildFloatingActionButton(BuildContext context, bool isDark) {
    return FloatingActionButton(
      onPressed: () {
        _scrollController.animateTo(
          0,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      },
      backgroundColor: AppColors.getAccentPrimary(isDark),
      child: const Icon(Icons.arrow_upward),
    );
  }
}
