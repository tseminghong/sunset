import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../constants/colors.dart';
import '../constants/design_tokens.dart';
import '../models/resource.dart';
import '../providers/theme_provider.dart';
import '../utils/animations.dart';

class ResourceCard extends StatefulWidget {
  final Resource resource;
  final int index;

  const ResourceCard({
    required this.resource,
    required this.index,
    Key? key,
  }) : super(key: key);

  @override
  State<ResourceCard> createState() => _ResourceCardState();
}

class _ResourceCardState extends State<ResourceCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: DesignTokens.durationNormal,
      vsync: this,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, _) {
        final isDark = themeProvider.isDarkMode;
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final bgTertiary = AppColors.getBgTertiary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentColor = AppColors.getAccentPrimary(isDark);

        return SlideUpTransition(
          duration: const Duration(milliseconds: 600),
          delay: widget.index * 100,
          child: MouseRegion(
            onEnter: (_) {
              setState(() => _isHovered = true);
              _controller.forward();
            },
            onExit: (_) {
              setState(() => _isHovered = false);
              _controller.reverse();
            },
            child: Transform.scale(
              scale: _isHovered ? DesignTokens.hoverScale : 1.0,
              child: AnimatedBuilder(
                animation: _controller,
                builder: (context, child) {
                  return Transform.translate(
                    offset: Offset(0, -8 * _controller.value),
                    child: child,
                  );
                },
                child: InkWell(
                  onTap: () {
                    // Navigate to the resource page
                    context.go(widget.resource.href);
                  },
                  borderRadius: BorderRadius.circular(DesignTokens.radiusXL),
                  child: Container(
                    decoration: BoxDecoration(
                      color: bgSecondary,
                      borderRadius: BorderRadius.circular(DesignTokens.radiusXL),
                      border: Border.all(
                        color: bgTertiary,
                        width: 1,
                      ),
                      boxShadow: _isHovered
                          ? DesignTokens.shadowHover(Colors.black)
                          : DesignTokens.shadowMD(Colors.black),
                    ),
                    child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Card image/icon area
                      Container(
                        height: 180,
                        decoration: BoxDecoration(
                          color: bgTertiary,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(DesignTokens.radiusXL),
                            topRight: Radius.circular(DesignTokens.radiusXL),
                          ),
                        ),
                        child: Center(
                          child: AppScaleTransition(
                            duration: const Duration(milliseconds: 500),
                            child: SizedBox(
                              width: 48,
                              height: 48,
                              child: CustomPaint(
                                painter: IconPainter(
                                  svg: widget.resource.icon,
                                  color: textSecondary,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      // Card content
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                widget.resource.title,
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: textPrimary,
                                ),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                widget.resource.description,
                                style: TextStyle(
                                  fontSize: 14,
                                  color: textSecondary,
                                  height: 1.5,
                                ),
                                maxLines: 3,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const Spacer(),
                              // Tags
                              Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                children: widget.resource
                                    .getTags()
                                    .take(3)
                                    .map(
                                      (tag) => Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 12,
                                          vertical: 6,
                                        ),
                                        decoration: BoxDecoration(
                                          color: bgTertiary,
                                          borderRadius:
                                              BorderRadius.circular(DesignTokens.radiusLG),
                                        ),
                                        child: Text(
                                          tag,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: textSecondary,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      ),
                                    )
                                    .toList(),
                              ),
                              const SizedBox(height: 12),
                              // Link
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    widget.resource.linkText,
                                    style: TextStyle(
                                      color: accentColor,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  Icon(
                                    Icons.arrow_outward,
                                    color: accentColor,
                                    size: 18,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class IconPainter extends CustomPainter {
  final String svg;
  final Color color;

  IconPainter({required this.svg, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    // Simple placeholder icon drawing
    final paint = Paint()
      ..color = color
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    // Draw a simple circle with lines as placeholder
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), size.width / 2,
        paint);
  }

  @override
  bool shouldRepaint(IconPainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.svg != svg;
  }
}
