// ignore_for_file: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'dart:js' as js;

/// Bridge to communicate with GSAP library loaded in index.html
class GSAPBridge {
  static bool _initialized = false;

  /// Check if GSAP is available
  static bool get isAvailable {
    try {
      return js.context.hasProperty('gsap');
    } catch (e) {
      return false;
    }
  }

  /// Initialize GSAP (call this once when app starts)
  static void initialize() {
    if (_initialized || !isAvailable) return;

    try {
      // Verify GSAP is loaded
      if (js.context.hasProperty('gsap')) {
        print('✅ GSAP initialized successfully');
        _initialized = true;
      }
    } catch (e) {
      print('❌ Error initializing GSAP: $e');
    }
  }

  /// Animate an element using GSAP
  /// 
  /// Example:
  /// ```dart
  /// GSAPBridge.animateTo('.my-class', {
  ///   'x': 100,
  ///   'opacity': 0.5,
  ///   'duration': 1.0
  /// });
  /// ```
  static void animateTo(String selector, Map<String, dynamic> properties) {
    if (!isAvailable) return;

    try {
      js.context.callMethod('animateElement', [
        selector,
        js.JsObject.jsify(properties),
        properties['duration'] ?? 1.0
      ]);
    } catch (e) {
      print('Error animating element: $e');
    }
  }

  /// Scroll to an element smoothly
  /// 
  /// Example:
  /// ```dart
  /// GSAPBridge.scrollToElement('#section-2', duration: 1.5);
  /// ```
  static void scrollToElement(String selector, {double duration = 1.0}) {
    if (!isAvailable) return;

    try {
      js.context.callMethod('scrollToElement', [selector, duration]);
    } catch (e) {
      print('Error scrolling to element: $e');
    }
  }

  /// Apply smooth scroll to current page
  static void applySmoothScroll() {
    if (!isAvailable) return;

    try {
      // Get the Flutter content container
      final flutterView = html.document.querySelector('flutter-view') ??
          html.document.querySelector('flt-glass-pane');
      
      if (flutterView != null) {
        // Apply smooth scrolling CSS
        flutterView.style.overflow = 'hidden';
        
        print('✅ Smooth scroll applied to Flutter view');
      }
    } catch (e) {
      print('Error applying smooth scroll: $e');
    }
  }

  /// Animate fade in effect
  static void fadeIn(String selector, {double duration = 0.6, double delay = 0}) {
    animateTo(selector, {
      'opacity': 1,
      'y': 0,
      'duration': duration,
      'delay': delay,
      'ease': 'power2.out'
    });
  }

  /// Animate fade out effect
  static void fadeOut(String selector, {double duration = 0.4}) {
    animateTo(selector, {
      'opacity': 0,
      'duration': duration,
      'ease': 'power2.in'
    });
  }

  /// Scale animation
  static void scale(String selector, double scale, {double duration = 0.5}) {
    animateTo(selector, {
      'scale': scale,
      'duration': duration,
      'ease': 'back.out(1.7)'
    });
  }

  /// Slide in from left
  static void slideInLeft(String selector, {double duration = 0.8, double delay = 0}) {
    animateTo(selector, {
      'x': 0,
      'opacity': 1,
      'duration': duration,
      'delay': delay,
      'ease': 'power3.out'
    });
  }

  /// Slide in from right
  static void slideInRight(String selector, {double duration = 0.8, double delay = 0}) {
    animateTo(selector, {
      'x': 0,
      'opacity': 1,
      'duration': duration,
      'delay': delay,
      'ease': 'power3.out'
    });
  }

  /// Parallax effect on scroll
  static void parallaxEffect(String selector, double speed) {
    if (!isAvailable) return;

    try {
      js.context['gsap'].callMethod('to', [
        selector,
        js.JsObject.jsify({
          'yPercent': -50 * speed,
          'ease': 'none',
          'scrollTrigger': {
            'trigger': selector,
            'start': 'top bottom',
            'end': 'bottom top',
            'scrub': true
          }
        })
      ]);
    } catch (e) {
      print('Error applying parallax: $e');
    }
  }

  /// Stagger animation for multiple elements
  static void staggerIn(String selector, {
    double duration = 0.6,
    double stagger = 0.1,
    String direction = 'from-bottom'
  }) {
    if (!isAvailable) return;

    Map<String, dynamic> from = {};
    switch (direction) {
      case 'from-bottom':
        from = {'y': 50, 'opacity': 0};
        break;
      case 'from-top':
        from = {'y': -50, 'opacity': 0};
        break;
      case 'from-left':
        from = {'x': -50, 'opacity': 0};
        break;
      case 'from-right':
        from = {'x': 50, 'opacity': 0};
        break;
    }

    try {
      js.context['gsap'].callMethod('from', [
        selector,
        js.JsObject.jsify({
          ...from,
          'duration': duration,
          'stagger': stagger,
          'ease': 'power2.out'
        })
      ]);
    } catch (e) {
      print('Error applying stagger: $e');
    }
  }

  /// Kill all GSAP animations
  static void killAll() {
    if (!isAvailable) return;

    try {
      js.context['gsap'].callMethod('killTweensOf', ['*']);
    } catch (e) {
      print('Error killing animations: $e');
    }
  }

  /// Refresh ScrollTrigger (call after layout changes)
  static void refreshScrollTrigger() {
    if (!isAvailable) return;

    try {
      js.context['ScrollTrigger'].callMethod('refresh', []);
    } catch (e) {
      print('Error refreshing ScrollTrigger: $e');
    }
  }
}
