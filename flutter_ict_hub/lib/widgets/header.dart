import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../providers/auth_provider.dart';
import '../utils/animations.dart';

class Header extends StatefulWidget {
  final VoidCallback onAuthClick;
  final bool isScrolled;

  const Header({
    required this.onAuthClick,
    this.isScrolled = false,
    Key? key,
  }) : super(key: key);

  @override
  State<Header> createState() => _HeaderState();
}

class _HeaderState extends State<Header> {
  bool _isMobileMenuOpen = false;

  @override
  Widget build(BuildContext context) {
    return Consumer3<ThemeProvider, LanguageProvider, AuthProvider>(
      builder: (context, themeProvider, langProvider, authProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgColor = AppColors.getBgSecondary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentColor = AppColors.getAccentPrimary(isDark);

        return Container(
          decoration: BoxDecoration(
            color: bgColor.withOpacity(0.7),
            boxShadow: [
              if (widget.isScrolled)
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                // Logo
                FadeInTransition(
                  child: Text(
                    'HPCSS ICT',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: textPrimary,
                    ),
                  ),
                ),
                const Spacer(),
                // Desktop Menu
                if (MediaQuery.of(context).size.width > 768)
                  Row(
                    children: [
                      _buildNavLink(context, 'Home', textSecondary, textPrimary),
                      const SizedBox(width: 24),
                      _buildNavLink(context, 'Resources', textSecondary, textPrimary),
                      const SizedBox(width: 24),
                      _buildNavLink(context, 'About', textSecondary, textPrimary),
                    ],
                  ),
                const Spacer(),
                // Language Switcher
                Tooltip(
                  message: 'Change Language',
                  child: PopupMenuButton<String>(
                    offset: const Offset(0, 40),
                    itemBuilder: (context) => [
                      PopupMenuItem(
                        value: 'en',
                        child: Row(
                          children: [
                            const Text('🇺🇸'),
                            const SizedBox(width: 8),
                            Text(langProvider.t('language.english')),
                          ],
                        ),
                      ),
                      PopupMenuItem(
                        value: 'zh',
                        child: Row(
                          children: [
                            const Text('🇨🇳'),
                            const SizedBox(width: 8),
                            Text(langProvider.t('language.chinese')),
                          ],
                        ),
                      ),
                    ],
                    onSelected: (value) {
                      langProvider.setLanguage(value);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(8),
                      child: Text(
                        langProvider.language.toUpperCase(),
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: accentColor,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                // Theme Toggle
                Tooltip(
                  message: 'Toggle Theme',
                  child: IconButton(
                    icon: Icon(
                      themeProvider.isDarkMode
                          ? Icons.wb_sunny
                          : Icons.dark_mode,
                      color: textSecondary,
                    ),
                    onPressed: () => themeProvider.toggleTheme(),
                  ),
                ),
                const SizedBox(width: 8),
                // Auth Button
                if (authProvider.user != null)
                  PopupMenuButton<String>(
                    offset: const Offset(0, 40),
                    itemBuilder: (context) => [
                      PopupMenuItem(
                        value: 'profile',
                        child: Text(langProvider.t('auth.profile')),
                      ),
                      PopupMenuItem(
                        value: 'logout',
                        child: Text(langProvider.t('auth.logout')),
                      ),
                    ],
                    onSelected: (value) {
                      if (value == 'logout') {
                        authProvider.logout();
                      }
                    },
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.account_circle),
                          const SizedBox(width: 8),
                          Text(authProvider.user?.username ?? 'User'),
                        ],
                      ),
                    ),
                  )
                else
                  ElevatedButton(
                    onPressed: widget.onAuthClick,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: accentColor,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 10,
                      ),
                    ),
                    child: Text(
                      langProvider.t('auth.login'),
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                // Mobile Menu Button
                if (MediaQuery.of(context).size.width <= 768) ...[
                  const SizedBox(width: 8),
                  IconButton(
                    icon: Icon(
                      _isMobileMenuOpen ? Icons.close : Icons.menu,
                      color: textSecondary,
                    ),
                    onPressed: () {
                      setState(() => _isMobileMenuOpen = !_isMobileMenuOpen);
                    },
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildNavLink(
    BuildContext context,
    String label,
    Color textSecondary,
    Color textPrimary,
  ) {
    return MouseRegion(
      onEnter: (_) {},
      child: Text(
        label,
        style: TextStyle(
          color: textSecondary,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
