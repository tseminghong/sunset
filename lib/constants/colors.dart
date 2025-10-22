import 'package:flutter/material.dart';

class AppColors {
  // Light theme colors
  static const Color lightBgPrimary = Color(0xFFEFF1F5);
  static const Color lightBgSecondary = Color(0xFFFFFFFF);
  static const Color lightBgTertiary = Color(0xFFE8EAF0);
  static const Color lightGlassColor = Color.fromARGB(115, 255, 255, 255);
  static const Color lightHeaderGlassColor = Color.fromARGB(102, 255, 255, 255);
  
  static const Color lightTextPrimary = Color(0xFF111113);
  static const Color lightTextSecondary = Color(0xFF5c5c62);
  static const Color lightTextTertiary = Color(0xFF8a8a8f);
  
  static const Color lightAccentPrimary = Color(0xFF0091FF);
  static const Color lightAccentPrimaryHover = Color(0xFF007CE6);
  
  static const Color lightBorderSecondary = Color.fromARGB(20, 0, 0, 0);
  
  // Dark theme colors
  static const Color darkBgPrimary = Color(0xFF000000);
  static const Color darkBgSecondary = Color(0xFF121213);
  static const Color darkBgTertiary = Color(0xFF2C2C2E);
  static const Color darkGlassColor = Color.fromARGB(128, 28, 28, 30);
  static const Color darkHeaderGlassColor = Color.fromARGB(102, 28, 28, 30);
  
  static const Color darkTextPrimary = Color(0xFFF5F5F7);
  static const Color darkTextSecondary = Color(0xFFa0a0a8);
  static const Color darkTextTertiary = Color(0xFF636366);
  
  static const Color darkAccentPrimary = Color(0xFF0091FF);
  static const Color darkAccentPrimaryHover = Color(0xFF007CE6);
  
  static const Color darkBorderSecondary = Color.fromARGB(20, 255, 255, 255);
  
  // Accent colors
  static const Color accentBlue = Color(0xFF0091FF);
  static const Color accentPurple = Color(0xFF7C3AED);
  static const Color accentPink = Color(0xFFEC4899);
  static const Color accentRed = Color(0xFFEF4444);
  static const Color accentGreen = Color(0xFF10B981);
  static const Color accentYellow = Color(0xFFFCD34D);
  
  // Get colors based on theme
  static Color getBgPrimary(bool isDark) => isDark ? darkBgPrimary : lightBgPrimary;
  static Color getBgSecondary(bool isDark) => isDark ? darkBgSecondary : lightBgSecondary;
  static Color getBgTertiary(bool isDark) => isDark ? darkBgTertiary : lightBgTertiary;
  static Color getGlassColor(bool isDark) => isDark ? darkGlassColor : lightGlassColor;
  
  static Color getTextPrimary(bool isDark) => isDark ? darkTextPrimary : lightTextPrimary;
  static Color getTextSecondary(bool isDark) => isDark ? darkTextSecondary : lightTextSecondary;
  static Color getTextTertiary(bool isDark) => isDark ? darkTextTertiary : lightTextTertiary;
  
  static Color getAccentPrimary(bool isDark) => isDark ? darkAccentPrimary : lightAccentPrimary;
  static Color getAccentHover(bool isDark) => isDark ? darkAccentPrimaryHover : lightAccentPrimaryHover;
}
