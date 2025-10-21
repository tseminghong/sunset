import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';
import '../providers/theme_provider.dart';
import '../providers/language_provider.dart';
import '../providers/auth_provider.dart';
import '../utils/animations.dart';

class AuthModal extends StatefulWidget {
  final bool isOpen;
  final VoidCallback onClose;

  const AuthModal({
    required this.isOpen,
    required this.onClose,
    Key? key,
  }) : super(key: key);

  @override
  State<AuthModal> createState() => _AuthModalState();
}

class _AuthModalState extends State<AuthModal> {
  bool _isLogin = true;
  late TextEditingController _usernameController;
  late TextEditingController _passwordController;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isOpen) return const SizedBox.shrink();

    return Consumer3<ThemeProvider, LanguageProvider, AuthProvider>(
      builder: (context, themeProvider, langProvider, authProvider, child) {
        final isDark = themeProvider.isDarkMode;
        final bgSecondary = AppColors.getBgSecondary(isDark);
        final textPrimary = AppColors.getTextPrimary(isDark);
        final textSecondary = AppColors.getTextSecondary(isDark);
        final accentColor = AppColors.getAccentPrimary(isDark);

        return Dialog(
          backgroundColor: Colors.transparent,
          child: FadeInTransition(
            child: Container(
              width: MediaQuery.of(context).size.width > 600 ? 400 : double.infinity,
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: bgSecondary,
                borderRadius: BorderRadius.circular(24),
              ),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(32),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Header
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            _isLogin
                                ? langProvider.t('auth.login')
                                : langProvider.t('auth.signup'),
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: textPrimary,
                            ),
                          ),
                          IconButton(
                            icon: Icon(Icons.close, color: textSecondary),
                            onPressed: widget.onClose,
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      // Username Field
                      TextField(
                        controller: _usernameController,
                        decoration: InputDecoration(
                          labelText: langProvider.t('auth.username'),
                          prefixIcon: const Icon(Icons.person),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Password Field
                      TextField(
                        controller: _passwordController,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: langProvider.t('auth.password'),
                          prefixIcon: const Icon(Icons.lock),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Login/Signup Button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _isLoading
                              ? null
                              : () async {
                                  setState(() => _isLoading = true);
                                  try {
                                    final username = _usernameController.text;
                                    final password = _passwordController.text;

                                    if (_isLogin) {
                                      final result =
                                          await authProvider.login(username, password);
                                      if (result.success && mounted) {
                                        widget.onClose();
                                      } else if (mounted) {
                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          SnackBar(
                                            content: Text(
                                              result.error ??
                                                  langProvider
                                                      .t('auth.error'),
                                            ),
                                          ),
                                        );
                                      }
                                    } else {
                                      final result = await authProvider
                                          .signup(username, password);
                                      if (result.success && mounted) {
                                        setState(() => _isLogin = true);
                                        _usernameController.clear();
                                        _passwordController.clear();
                                      } else if (mounted) {
                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          SnackBar(
                                            content: Text(
                                              result.error ??
                                                  langProvider
                                                      .t('auth.error'),
                                            ),
                                          ),
                                        );
                                      }
                                    }
                                  } finally {
                                    if (mounted) {
                                      setState(() => _isLoading = false);
                                    }
                                  }
                                },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: accentColor,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor:
                                        AlwaysStoppedAnimation(Colors.white),
                                  ),
                                )
                              : Text(
                                  _isLogin
                                      ? langProvider.t('auth.login')
                                      : langProvider.t('auth.signup'),
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Toggle Button
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            _isLogin
                                ? langProvider.t('auth.dont_have_account')
                                : langProvider.t('auth.already_have_account'),
                            style: TextStyle(color: textSecondary),
                          ),
                          const SizedBox(width: 4),
                          GestureDetector(
                            onTap: () {
                              setState(() => _isLogin = !_isLogin);
                            },
                            child: Text(
                              _isLogin
                                  ? langProvider.t('auth.signup')
                                  : langProvider.t('auth.login'),
                              style: TextStyle(
                                color: accentColor,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
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
