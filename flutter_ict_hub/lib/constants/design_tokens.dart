import 'package:flutter/material.dart';

/// Design tokens for consistent UI across the app
class DesignTokens {
  // Border Radius - Unified corner radius system
  static const double radiusXS = 8.0;      // Extra small - Buttons, chips, small cards
  static const double radiusSM = 12.0;     // Small - Input fields, small containers
  static const double radiusMD = 16.0;     // Medium - Cards, modals
  static const double radiusLG = 20.0;     // Large - Hero sections, main cards
  static const double radiusXL = 24.0;     // Extra large - Feature cards, sections
  static const double radiusXXL = 32.0;    // Extra extra large - Special highlights

  // Animation Durations
  static const Duration durationFast = Duration(milliseconds: 200);
  static const Duration durationNormal = Duration(milliseconds: 300);
  static const Duration durationSlow = Duration(milliseconds: 500);
  static const Duration durationXSlow = Duration(milliseconds: 800);

  // Animation Curves
  static const Curve curveDefault = Curves.easeOutCubic;
  static const Curve curveEmphasized = Curves.easeInOutCubic;
  static const Curve curveDecelerate = Curves.decelerate;
  static const Curve curveAccelerate = Curves.easeIn;

  // Hover Effects
  static const double hoverScale = 1.02;
  static const double hoverScaleSmall = 1.05;
  static const double hoverScaleLarge = 1.08;
  static const double hoverElevation = 8.0;
  static const double hoverElevationLarge = 12.0;

  // Shadows
  static List<BoxShadow> shadowSM(Color color) => [
    BoxShadow(
      color: color.withOpacity(0.1),
      blurRadius: 8,
      offset: const Offset(0, 2),
    ),
  ];

  static List<BoxShadow> shadowMD(Color color) => [
    BoxShadow(
      color: color.withOpacity(0.15),
      blurRadius: 16,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> shadowLG(Color color) => [
    BoxShadow(
      color: color.withOpacity(0.2),
      blurRadius: 24,
      offset: const Offset(0, 8),
    ),
  ];

  static List<BoxShadow> shadowHover(Color color) => [
    BoxShadow(
      color: color.withOpacity(0.25),
      blurRadius: 32,
      offset: const Offset(0, 12),
      spreadRadius: 2,
    ),
  ];

  // Spacing
  static const double spaceXS = 8.0;
  static const double spaceSM = 12.0;
  static const double spaceMD = 16.0;
  static const double spaceLG = 24.0;
  static const double spaceXL = 32.0;
  static const double spaceXXL = 48.0;

  // Transitions
  static const Duration transitionDuration = Duration(milliseconds: 300);
  
  /// Create a smooth border radius
  static BorderRadius radius(double size) => BorderRadius.circular(size);
  
  /// Standard card decoration
  static BoxDecoration cardDecoration({
    required Color backgroundColor,
    required Color borderColor,
    Color? shadowColor,
    double radius = radiusMD,
    bool isHovered = false,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: borderColor, width: 1),
      boxShadow: isHovered 
        ? shadowHover(shadowColor ?? Colors.black)
        : shadowMD(shadowColor ?? Colors.black),
    );
  }

  /// Elevated card decoration with stronger shadow
  static BoxDecoration elevatedCardDecoration({
    required Color backgroundColor,
    required Color borderColor,
    Color? shadowColor,
    double radius = radiusLG,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: borderColor, width: 1),
      boxShadow: shadowLG(shadowColor ?? Colors.black),
    );
  }

  /// Button decoration
  static BoxDecoration buttonDecoration({
    required Color backgroundColor,
    double radius = radiusXS,
    bool isHovered = false,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(radius),
      boxShadow: isHovered 
        ? shadowMD(Colors.black)
        : shadowSM(Colors.black),
    );
  }
}

/// Widget for smooth hover effects
class AnimatedHoverCard extends StatefulWidget {
  final Widget child;
  final double scale;
  final Duration duration;
  final VoidCallback? onTap;

  const AnimatedHoverCard({
    Key? key,
    required this.child,
    this.scale = DesignTokens.hoverScale,
    this.duration = DesignTokens.transitionDuration,
    this.onTap,
  }) : super(key: key);

  @override
  State<AnimatedHoverCard> createState() => _AnimatedHoverCardState();
}

class _AnimatedHoverCardState extends State<AnimatedHoverCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: widget.onTap != null ? SystemMouseCursors.click : SystemMouseCursors.basic,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedScale(
          scale: _isHovered ? widget.scale : 1.0,
          duration: widget.duration,
          curve: DesignTokens.curveDefault,
          child: widget.child,
        ),
      ),
    );
  }
}

/// Widget for smooth hover effects with elevation
class AnimatedHoverElevation extends StatefulWidget {
  final Widget child;
  final double elevation;
  final Duration duration;
  final VoidCallback? onTap;
  final Color shadowColor;

  const AnimatedHoverElevation({
    Key? key,
    required this.child,
    this.elevation = DesignTokens.hoverElevation,
    this.duration = DesignTokens.transitionDuration,
    this.onTap,
    this.shadowColor = Colors.black,
  }) : super(key: key);

  @override
  State<AnimatedHoverElevation> createState() => _AnimatedHoverElevationState();
}

class _AnimatedHoverElevationState extends State<AnimatedHoverElevation> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: widget.onTap != null ? SystemMouseCursors.click : SystemMouseCursors.basic,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: widget.duration,
          curve: DesignTokens.curveDefault,
          decoration: BoxDecoration(
            boxShadow: _isHovered
                ? DesignTokens.shadowHover(widget.shadowColor)
                : DesignTokens.shadowMD(widget.shadowColor),
          ),
          child: widget.child,
        ),
      ),
    );
  }
}
