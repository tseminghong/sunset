import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

/// High-performance smooth scrolling physics with GSAP-like feel
class GSAPScrollPhysics extends ScrollPhysics {
  final double dampingRatio;
  final double velocityMultiplier;

  const GSAPScrollPhysics({
    super.parent,
    this.dampingRatio = 0.85,
    this.velocityMultiplier = 1.2,
  });

  @override
  GSAPScrollPhysics applyTo(ScrollPhysics? ancestor) {
    return GSAPScrollPhysics(
      parent: buildParent(ancestor),
      dampingRatio: dampingRatio,
      velocityMultiplier: velocityMultiplier,
    );
  }

  @override
  double applyPhysicsToUserOffset(ScrollMetrics position, double offset) {
    // Apply smooth damping to user offset
    return offset * dampingRatio;
  }

  @override
  double applyBoundaryConditions(ScrollMetrics position, double value) {
    // Allow smooth overscroll
    if (value < position.pixels &&
        position.pixels <= position.minScrollExtent) {
      return value - position.pixels;
    }
    if (position.maxScrollExtent <= position.pixels &&
        position.pixels < value) {
      return value - position.pixels;
    }
    if (value < position.minScrollExtent &&
        position.minScrollExtent < position.pixels) {
      return value - position.minScrollExtent;
    }
    if (position.pixels < position.maxScrollExtent &&
        position.maxScrollExtent < value) {
      return value - position.maxScrollExtent;
    }
    return 0.0;
  }

  @override
  Simulation? createBallisticSimulation(
      ScrollMetrics position, double velocity) {
    // Custom smooth deceleration
    if (velocity.abs() < tolerance.velocity || position.outOfRange) {
      return super.createBallisticSimulation(position, velocity);
    }

    // Apply velocity multiplier for smoother feel
    final double adjustedVelocity = velocity * velocityMultiplier;

    return ScrollSpringSimulation(
      spring,
      position.pixels,
      position.pixels + adjustedVelocity * 0.3,
      adjustedVelocity,
      tolerance: tolerance,
    );
  }

  @override
  SpringDescription get spring => const SpringDescription(
        mass: 0.5,
        stiffness: 100.0,
        damping: 15.0,
      );
}

/// Smooth scroll behavior for entire app
class GSAPScrollBehavior extends ScrollBehavior {
  const GSAPScrollBehavior();

  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    return const GSAPScrollPhysics(
      parent: AlwaysScrollableScrollPhysics(),
    );
  }

  @override
  Widget buildOverscrollIndicator(
      BuildContext context, Widget child, ScrollableDetails details) {
    // Return child without overscroll indicator for cleaner look
    return child;
  }
}

/// Widget that fades in when it enters the viewport with GSAP-like animation
class GSAPFadeIn extends StatefulWidget {
  final Widget child;
  final Duration duration;
  final Duration delay;
  final Offset slideOffset;
  final Curve curve;

  const GSAPFadeIn({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 800),
    this.delay = Duration.zero,
    this.slideOffset = const Offset(0, 30),
    this.curve = Curves.easeOutCubic,
  });

  @override
  State<GSAPFadeIn> createState() => _GSAPFadeInState();
}

class _GSAPFadeInState extends State<GSAPFadeIn>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacityAnimation;
  late Animation<Offset> _slideAnimation;
  bool _hasAnimated = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    _opacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: widget.curve),
    );

    _slideAnimation = Tween<Offset>(
      begin: widget.slideOffset,
      end: Offset.zero,
    ).animate(
      CurvedAnimation(parent: _controller, curve: widget.curve),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _checkVisibility() {
    if (_hasAnimated) return;

    final RenderObject? renderObject = context.findRenderObject();
    if (renderObject == null) return;

    final RenderAbstractViewport viewport =
        RenderAbstractViewport.of(renderObject);

    final double vpHeight = viewport.paintBounds.height;
    final RevealedOffset vpOffset =
        viewport.getOffsetToReveal(renderObject, 0.0);

    final scrollable = Scrollable.maybeOf(context);
    if (scrollable == null) return;

    final double deltaTop = vpOffset.offset - scrollable.position.pixels;
    final double deltaBottom = deltaTop + renderObject.paintBounds.height;

    // Check if widget is in viewport
    if (deltaTop < vpHeight && deltaBottom > 0) {
      _hasAnimated = true;
      Future.delayed(widget.delay, () {
        if (mounted) {
          _controller.forward();
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) => _checkVisibility());

    return NotificationListener<ScrollNotification>(
      onNotification: (notification) {
        _checkVisibility();
        return false;
      },
      child: FadeTransition(
        opacity: _opacityAnimation,
        child: Transform.translate(
          offset: _slideAnimation.value,
          child: widget.child,
        ),
      ),
    );
  }
}

/// Parallax scrolling effect
class GSAPParallax extends StatelessWidget {
  final Widget child;
  final double speed;
  final Alignment alignment;

  const GSAPParallax({
    super.key,
    required this.child,
    this.speed = 0.5,
    this.alignment = Alignment.center,
  });

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (notification) {
        return true;
      },
      child: LayoutBuilder(
        builder: (context, constraints) {
          return AnimatedBuilder(
            animation: Listenable.merge([
              if (Scrollable.maybeOf(context) != null)
                Scrollable.of(context).position
            ]),
            builder: (context, child) {
              final scrollable = Scrollable.maybeOf(context);
              if (scrollable == null) return this.child;

              final RenderObject? renderObject = context.findRenderObject();
              if (renderObject == null) return this.child;

              final viewport = RenderAbstractViewport.of(renderObject);

              final vpOffset = viewport.getOffsetToReveal(renderObject, 0.0);
              final deltaTop = vpOffset.offset - scrollable.position.pixels;
              final offset = deltaTop * speed * -1;

              return Transform.translate(
                offset: Offset(0, offset),
                child: this.child,
              );
            },
          );
        },
      ),
    );
  }
}

/// Scale animation on scroll
class GSAPScaleOnScroll extends StatelessWidget {
  final Widget child;
  final double minScale;
  final double maxScale;

  const GSAPScaleOnScroll({
    super.key,
    required this.child,
    this.minScale = 0.8,
    this.maxScale = 1.0,
  });

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (notification) => true,
      child: LayoutBuilder(
        builder: (context, constraints) {
          return AnimatedBuilder(
            animation: Listenable.merge([
              if (Scrollable.maybeOf(context) != null)
                Scrollable.of(context).position
            ]),
            builder: (context, child) {
              final scrollable = Scrollable.maybeOf(context);
              if (scrollable == null) {
                return Transform.scale(scale: maxScale, child: this.child);
              }

              final RenderObject? renderObject = context.findRenderObject();
              if (renderObject == null) {
                return Transform.scale(scale: maxScale, child: this.child);
              }

              final viewport = RenderAbstractViewport.of(renderObject);

              final vpHeight = viewport.paintBounds.height;
              final vpOffset = viewport.getOffsetToReveal(renderObject, 0.0);
              final deltaTop = vpOffset.offset - scrollable.position.pixels;

              // Calculate scale based on position in viewport
              final progress = (deltaTop / vpHeight).clamp(0.0, 1.0);
              final scale = minScale + (maxScale - minScale) * progress;

              return Transform.scale(
                scale: scale,
                child: this.child,
              );
            },
          );
        },
      ),
    );
  }
}

/// Smooth page transition with GSAP-like easing
class GSAPPageRoute<T> extends PageRouteBuilder<T> {
  final Widget page;
  final Duration transitionDuration;

  GSAPPageRoute({
    required this.page,
    this.transitionDuration = const Duration(milliseconds: 600),
  }) : super(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionDuration: transitionDuration,
          reverseTransitionDuration: transitionDuration,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            // Curved animation with GSAP-like easing
            final curvedAnimation = CurvedAnimation(
              parent: animation,
              curve: Curves.easeOutCubic,
              reverseCurve: Curves.easeInCubic,
            );

            // Fade + Slide transition
            return FadeTransition(
              opacity: curvedAnimation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0.05, 0),
                  end: Offset.zero,
                ).animate(curvedAnimation),
                child: child,
              ),
            );
          },
        );
}
