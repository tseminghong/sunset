import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

/// A wrapper that provides smooth scrolling similar to GSAP ScrollSmoother
/// Implements momentum-based smooth scrolling with easing
class SmoothScrollWrapper extends StatefulWidget {
  final Widget child;
  final double smoothness;
  final ScrollController? controller;

  const SmoothScrollWrapper({
    super.key,
    required this.child,
    this.smoothness = 1.5,
    this.controller,
  });

  @override
  State<SmoothScrollWrapper> createState() => _SmoothScrollWrapperState();
}

class _SmoothScrollWrapperState extends State<SmoothScrollWrapper>
    with SingleTickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _animController;
  double _targetOffset = 0;
  double _currentOffset = 0;
  bool _isAutoScrolling = false;

  @override
  void initState() {
    super.initState();
    _scrollController = widget.controller ?? ScrollController();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 16), // ~60fps
    )..addListener(_updateScroll);

    _scrollController.addListener(_onUserScroll);
    _animController.repeat();
  }

  @override
  void dispose() {
    _animController.dispose();
    if (widget.controller == null) {
      _scrollController.dispose();
    }
    super.dispose();
  }

  void _onUserScroll() {
    if (!_isAutoScrolling) {
      setState(() {
        _targetOffset = _scrollController.offset;
      });
    }
  }

  void _updateScroll() {
    if (_currentOffset == _targetOffset) return;

    // Smooth interpolation (lerp) towards target
    final diff = _targetOffset - _currentOffset;
    final delta = diff / (widget.smoothness * 10);

    if (diff.abs() < 0.5) {
      _currentOffset = _targetOffset;
    } else {
      _currentOffset += delta;
    }

    if (_scrollController.hasClients && !_isAutoScrolling) {
      _isAutoScrolling = true;
      _scrollController.jumpTo(_currentOffset);
      _isAutoScrolling = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      controller: _scrollController,
      physics: const BouncingScrollPhysics(),
      child: widget.child,
    );
  }
}

/// Scroll behavior that enables smooth scrolling on all platforms
class SmoothScrollBehavior extends ScrollBehavior {
  const SmoothScrollBehavior();

  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    return const BouncingScrollPhysics();
  }

  @override
  Widget buildScrollbar(
    BuildContext context,
    Widget child,
    ScrollableDetails details,
  ) {
    return child;
  }

  @override
  Widget buildOverscrollIndicator(
    BuildContext context,
    Widget child,
    ScrollableDetails details,
  ) {
    return child;
  }
}

/// A scroll animation that fades in elements as they enter viewport
class ScrollFadeIn extends StatefulWidget {
  final Widget child;
  final Duration duration;
  final Curve curve;
  final double offset;

  const ScrollFadeIn({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 600),
    this.curve = Curves.easeOut,
    this.offset = 50.0,
  });

  @override
  State<ScrollFadeIn> createState() => _ScrollFadeInState();
}

class _ScrollFadeInState extends State<ScrollFadeIn>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacityAnimation;
  late Animation<double> _slideAnimation;
  bool _hasAnimated = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    _opacityAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: widget.curve,
    ));

    _slideAnimation = Tween<double>(
      begin: widget.offset,
      end: 0.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: widget.curve,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _checkVisibility(BuildContext context) {
    if (_hasAnimated) return;

    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return;

    final position = box.localToGlobal(Offset.zero);
    final screenHeight = MediaQuery.of(context).size.height;

    // Trigger animation when element is 80% visible on screen
    if (position.dy < screenHeight * 0.8 && position.dy > -box.size.height) {
      _hasAnimated = true;
      _controller.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkVisibility(context);
    });

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, _slideAnimation.value),
          child: Opacity(
            opacity: _opacityAnimation.value,
            child: widget.child,
          ),
        );
      },
    );
  }
}

/// Parallax scroll effect for backgrounds
class ParallaxScroll extends StatefulWidget {
  final Widget child;
  final double speed;

  const ParallaxScroll({
    super.key,
    required this.child,
    this.speed = 0.5,
  });

  @override
  State<ParallaxScroll> createState() => _ParallaxScrollState();
}

class _ParallaxScrollState extends State<ParallaxScroll> {
  double _offset = 0;

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (notification) {
        if (notification is ScrollUpdateNotification) {
          setState(() {
            _offset = notification.metrics.pixels * widget.speed;
          });
        }
        return false;
      },
      child: Transform.translate(
        offset: Offset(0, -_offset),
        child: widget.child,
      ),
    );
  }
}
