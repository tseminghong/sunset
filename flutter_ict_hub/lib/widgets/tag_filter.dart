import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../constants/design_tokens.dart';
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
                      duration: DesignTokens.durationSlow,
                      delay: index * 50,
                      child: _AnimatedFilterChip(
                        label: tag.isEmpty ? 'All' : tag,
                        isActive: isActive,
                        onSelected: () => widget.onTagChange(tag),
                        accentColor: accentColor,
                        textSecondary: textSecondary,
                        bgTertiary: bgTertiary,
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

/// Animated filter chip with hover effect
class _AnimatedFilterChip extends StatefulWidget {
  final String label;
  final bool isActive;
  final VoidCallback onSelected;
  final Color accentColor;
  final Color textSecondary;
  final Color bgTertiary;

  const _AnimatedFilterChip({
    required this.label,
    required this.isActive,
    required this.onSelected,
    required this.accentColor,
    required this.textSecondary,
    required this.bgTertiary,
  });

  @override
  State<_AnimatedFilterChip> createState() => _AnimatedFilterChipState();
}

class _AnimatedFilterChipState extends State<_AnimatedFilterChip> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: AnimatedScale(
        scale: _isHovered ? DesignTokens.hoverScaleSmall : 1.0,
        duration: DesignTokens.durationFast,
        curve: DesignTokens.curveDefault,
        child: GestureDetector(
          onTap: widget.onSelected,
          child: AnimatedContainer(
            duration: DesignTokens.durationNormal,
            curve: DesignTokens.curveDefault,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              color: widget.isActive ? widget.accentColor : Colors.transparent,
              borderRadius: BorderRadius.circular(DesignTokens.radiusLG),
              border: Border.all(
                color: widget.isActive ? widget.accentColor : widget.bgTertiary,
                width: 1.5,
              ),
              boxShadow: _isHovered && widget.isActive
                  ? DesignTokens.shadowMD(widget.accentColor)
                  : null,
            ),
            child: Text(
              widget.label,
              style: TextStyle(
                color: widget.isActive ? Colors.white : widget.textSecondary,
                fontWeight: widget.isActive ? FontWeight.bold : FontWeight.normal,
                fontSize: 14,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
