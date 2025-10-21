import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../constants/design_tokens.dart';
import '../providers/resource_provider.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';

class AppSearchBar extends StatefulWidget {
  final ValueChanged<String> onSearchChanged;

  const AppSearchBar({
    required this.onSearchChanged,
    Key? key,
  }) : super(key: key);

  @override
  State<AppSearchBar> createState() => _AppSearchBarState();
}

class _AppSearchBarState extends State<AppSearchBar> {
  late TextEditingController _controller;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer3<ThemeProvider, ResourceProvider, LanguageProvider>(
      builder: (context, themeProvider, resourceProvider, langProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentColor = AppColors.getAccentPrimary(isDark);

        return Padding(
          padding: const EdgeInsets.all(16),
          child: AnimatedContainer(
            duration: DesignTokens.durationNormal,
            curve: DesignTokens.curveDefault,
            decoration: BoxDecoration(
              color: bgSecondary,
              borderRadius: BorderRadius.circular(DesignTokens.radiusMD),
              border: Border.all(
                color: _isFocused ? accentColor : Colors.transparent,
                width: 2,
              ),
              boxShadow: _isFocused
                  ? DesignTokens.shadowLG(accentColor)
                  : DesignTokens.shadowMD(Colors.black),
            ),
            child: Focus(
              onFocusChange: (hasFocus) {
                setState(() => _isFocused = hasFocus);
              },
              child: TextField(
                controller: _controller,
                onChanged: widget.onSearchChanged,
                decoration: InputDecoration(
                  hintText: langProvider.t('search.placeholder'),
                  hintStyle: TextStyle(color: textSecondary.withOpacity(0.5)),
                  prefixIcon: AnimatedRotation(
                    turns: _isFocused ? 0.5 : 0,
                    duration: DesignTokens.durationSlow,
                    child: Icon(Icons.search, color: _isFocused ? accentColor : textSecondary),
                  ),
                  suffixIcon: _controller.text.isNotEmpty
                      ? IconButton(
                          icon: Icon(Icons.clear, color: textSecondary),
                          onPressed: () {
                            _controller.clear();
                            widget.onSearchChanged('');
                          },
                        )
                      : null,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 16,
                  ),
                ),
                style: TextStyle(color: textSecondary),
              ),
            ),
          ),
        );
      },
    );
  }
}
