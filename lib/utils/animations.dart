import 'package:flutter/material.dart';

class AppAnimations {
  // Fade In Animation
  static Widget fadeIn({
    required Widget child,
    Duration duration = const Duration(milliseconds: 600),
    int delay = 0,
  }) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: 1.0),
      duration: Duration(milliseconds: duration.inMilliseconds + delay),
      curve: Curves.easeInOut,
      builder: (context, value, child) {
        return Opacity(opacity: value, child: child);
      },
      child: child,
    );
  }

  // Slide Up Animation
  static Widget slideUp({
    required Widget child,
    Duration duration = const Duration(milliseconds: 600),
    int delay = 0,
    double distance = 50,
  }) {
    return TweenAnimationBuilder<Offset>(
      tween: Tween(begin: Offset(0, distance / 100), end: Offset.zero),
      duration: Duration(milliseconds: duration.inMilliseconds + delay),
      curve: Curves.easeOut,
      builder: (context, offset, child) {
        return Transform.translate(offset: offset * 100, child: child);
      },
      child: child,
    );
  }

  // Scale Animation
  static Widget scale({
    required Widget child,
    Duration duration = const Duration(milliseconds: 400),
    int delay = 0,
  }) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.95, end: 1.0),
      duration: Duration(milliseconds: duration.inMilliseconds + delay),
      curve: Curves.elasticOut,
      builder: (context, value, child) {
        return Transform.scale(scale: value, child: child);
      },
      child: child,
    );
  }

  // Bounce Animation
  static Animation<double> getBounceAnimation(
    AnimationController controller,
  ) {
    return Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: controller, curve: Curves.elasticOut),
    );
  }

  // Stagger Animation
  static List<Animation<double>> getStaggerAnimations(
    AnimationController controller,
    int count, {
    Duration staggerDelay = const Duration(milliseconds: 100),
  }) {
    final animations = <Animation<double>>[];
    final totalDuration = controller.duration!.inMilliseconds +
        (count - 1) * staggerDelay.inMilliseconds;

    for (int i = 0; i < count; i++) {
      final start = (i * staggerDelay.inMilliseconds) / totalDuration;
      final end = ((i + 1) * staggerDelay.inMilliseconds +
              controller.duration!.inMilliseconds) /
          totalDuration;

      animations.add(
        Tween<double>(begin: 0, end: 1).animate(
          CurvedAnimation(
            parent: controller,
            curve: Interval(start, end, curve: Curves.easeOut),
          ),
        ),
      );
    }

    return animations;
  }
}

class FadeInTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final int delay;

  const FadeInTransition({
    required this.child,
    this.duration = const Duration(milliseconds: 600),
    this.delay = 0,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppAnimations.fadeIn(
      child: child,
      duration: duration,
      delay: delay,
    );
  }
}

class SlideUpTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final int delay;
  final double distance;

  const SlideUpTransition({
    required this.child,
    this.duration = const Duration(milliseconds: 600),
    this.delay = 0,
    this.distance = 50,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppAnimations.slideUp(
      child: child,
      duration: duration,
      delay: delay,
      distance: distance,
    );
  }
}

class AppScaleTransition extends StatelessWidget {
  final Widget child;
  final Duration duration;
  final int delay;

  const AppScaleTransition({
    required this.child,
    this.duration = const Duration(milliseconds: 400),
    this.delay = 0,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppAnimations.scale(
      child: child,
      duration: duration,
      delay: delay,
    );
  }
}

// Floating animation for background elements
class FloatingAnimation extends StatefulWidget {
  final Widget child;
  final Duration duration;
  final double distance;
  final int delay;

  const FloatingAnimation({
    required this.child,
    this.duration = const Duration(seconds: 4),
    this.distance = 20,
    this.delay = 0,
    Key? key,
  }) : super(key: key);

  @override
  State<FloatingAnimation> createState() => _FloatingAnimationState();
}

class _FloatingAnimationState extends State<FloatingAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: widget.duration, vsync: this)
      ..repeat(reverse: true);

    _animation = Tween<Offset>(
      begin: Offset(0, widget.distance / 100),
      end: Offset(0, -widget.distance / 100),
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.translate(
          offset: _animation.value * 100,
          child: widget.child,
        );
      },
    );
  }
}
