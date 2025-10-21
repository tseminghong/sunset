import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../providers/resource_provider.dart';
import '../providers/theme_provider.dart';
import '../utils/animations.dart';

class TagFilter extends StatefulWidget {
  final List<String> tags;
  final String activeTag;
  final Function(String) onTagChange;

  const TagFilter({
    required this.tags,
    required this.activeTag,
    required this.onTagChange,
    Key? key,
  }) : super(key: key);

  @override
  State<TagFilter> createState() => _TagFilterState();
}

class _TagFilterState extends State<TagFilter> {
  late ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer2<ThemeProvider, ResourceProvider>(
      builder: (context, themeProvider, resourceProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final accentColor = AppColors.getAccentPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final bgTertiary = AppColors.getBgTertiary(isDark);

        return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          controller: _scrollController,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: List.generate(
                widget.tags.length,
                (index) {
                  final tag = widget.tags[index];
                  final isActive = resourceProvider.activeTag == tag;

                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: AppScaleTransition(
                      duration: const Duration(milliseconds: 400),
                      delay: index * 50,
                      child: FilterChip(
                        label: Text(tag.isEmpty ? 'All' : tag),
                        selected: isActive,
                        onSelected: (selected) {
                          widget.onTagChange(tag);
                        },
                        backgroundColor:
                            isActive ? accentColor : Colors.transparent,
                        labelStyle: TextStyle(
                          color: isActive ? Colors.white : textSecondary,
                          fontWeight:
                              isActive ? FontWeight.bold : FontWeight.normal,
                        ),
                        side: BorderSide(
                          color: isActive ? accentColor : bgTertiary,
                          width: 1.5,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        );
      },
    );
  }
}
