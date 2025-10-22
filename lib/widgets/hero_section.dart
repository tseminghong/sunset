import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../constants/design_tokens.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../utils/animations.dart';

class HeroSection extends StatefulWidget {
  const HeroSection({Key? key}) : super(key: key);

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection>
    with SingleTickerProviderStateMixin {
  late AnimationController _floatingController;

  @override
  void initState() {
    super.initState();
    _floatingController = AnimationController(
      duration: const Duration(seconds: 6),
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
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);

        return SlideUpTransition(
          duration: DesignTokens.durationXSlow,
          distance: 50,
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  bgSecondary,
                  bgSecondary.withOpacity(0.8),
                ],
              ),
              borderRadius: BorderRadius.circular(DesignTokens.radiusXL),
              boxShadow: DesignTokens.shadowLG(Colors.black),
            ),
            padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
            child: Stack(
              children: [
                // Floating background elements
                Positioned(
                  top: 40,
                  left: 40,
                  child: FloatingAnimation(
                    duration: const Duration(seconds: 4),
                    distance: 20,
                    child: Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        color: AppColors.accentBlue.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(DesignTokens.radiusXXL),
                      ),
                    ),
                  ),
                ),
                Positioned(
                  bottom: 40,
                  right: 40,
                  child: FloatingAnimation(
                    duration: const Duration(seconds: 5),
                    distance: 25,
                    delay: 500,
                    child: Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        color: AppColors.accentPurple.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(DesignTokens.radiusXXL),
                      ),
                    ),
                  ),
                ),
                // Content
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      AppScaleTransition(
                        duration: const Duration(milliseconds: 700),
                        delay: 100,
                        child: Text(
                          langProvider.t('hero.title'),
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: MediaQuery.of(context).size.width > 768
                                ? 48
                                : 32,
                            fontWeight: FontWeight.bold,
                            color: textPrimary,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      FadeInTransition(
                        duration: const Duration(milliseconds: 600),
                        delay: 300,
                        child: Text(
                          langProvider.t('hero.subtitle'),
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize:
                                MediaQuery.of(context).size.width > 768 ? 18 : 14,
                            color: textSecondary,
                            height: 1.6,
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      SlideUpTransition(
                        duration: const Duration(milliseconds: 600),
                        delay: 500,
                        child: ElevatedButton.icon(
                          icon: const Icon(Icons.download),
                          label: Text(langProvider.t('hero.download')),
                          style: ElevatedButton.styleFrom(
                            backgroundColor:
                                AppColors.getAccentPrimary(isDark),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 32,
                              vertical: 16,
                            ),
                          ),
                          onPressed: () {
                            // Handle download
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
