import 'package:flutter/material.dart';

class ResponsiveHelper {
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 768;

  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= 768 &&
      MediaQuery.of(context).size.width < 1024;

  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= 1024;

  static double getScreenWidth(BuildContext context) =>
      MediaQuery.of(context).size.width;

  static double getScreenHeight(BuildContext context) =>
      MediaQuery.of(context).size.height;

  static double getResponsiveFontSize(
    BuildContext context, {
    required double mobileSize,
    double? tabletSize,
    required double desktopSize,
  }) {
    final width = getScreenWidth(context);
    if (width < 768) return mobileSize;
    if (width < 1024) return tabletSize ?? mobileSize;
    return desktopSize;
  }

  static int getGridColumns(BuildContext context) {
    final width = getScreenWidth(context);
    if (width < 768) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  }

  static EdgeInsets getResponsivePadding(BuildContext context) {
    final width = getScreenWidth(context);
    if (width < 768) {
      return const EdgeInsets.symmetric(horizontal: 16, vertical: 12);
    } else if (width < 1024) {
      return const EdgeInsets.symmetric(horizontal: 24, vertical: 16);
    } else {
      return const EdgeInsets.symmetric(horizontal: 32, vertical: 20);
    }
  }

  static double getResponsiveValue(
    BuildContext context, {
    required double mobileValue,
    double? tabletValue,
    required double desktopValue,
  }) {
    final width = getScreenWidth(context);
    if (width < 768) return mobileValue;
    if (width < 1024) return tabletValue ?? mobileValue;
    return desktopValue;
  }
}

class ResponsiveWidget extends StatelessWidget {
  final WidgetBuilder mobileBuilder;
  final WidgetBuilder? tabletBuilder;
  final WidgetBuilder desktopBuilder;

  const ResponsiveWidget({
    required this.mobileBuilder,
    this.tabletBuilder,
    required this.desktopBuilder,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 768) {
          return mobileBuilder(context);
        } else if (constraints.maxWidth < 1024) {
          return (tabletBuilder ?? mobileBuilder)(context);
        } else {
          return desktopBuilder(context);
        }
      },
    );
  }
}
