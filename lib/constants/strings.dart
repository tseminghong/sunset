class AppStrings {
  // English Strings
  static const Map<String, String> enStrings = {
    // Navigation
    'nav.home': 'Home',
    'nav.resources': 'Resources',
    'nav.about': 'About',
    'nav.login': 'Login',
    
    // Hero Section
    'hero.title': 'Master ICT Concepts',
    'hero.subtitle': 'Interactive learning platform for mastering Information and Communication Technology',
    'hero.beta': 'Now available on web and mobile',
    'hero.download': 'Download APK',
    
    // Home Page
    'home.featured_resources': 'Featured Resources',
    'home.no_resources': 'No resources found matching your criteria.',
    'home.about_title': 'About ICT Revision Hub',
    'home.about_desc': 'Welcome to the HPCSS ICT Revision Hub - your comprehensive resource for mastering Information and Communication Technology concepts. Our platform offers interactive learning materials, visual algorithms, and practical exercises designed to help students excel in their ICT studies.',
    'home.about_desc2': 'From programming fundamentals to database management, our curated collection of resources provides step-by-step guidance and hands-on experience to build your confidence in ICT.',
    
    // Search & Filter
    'search.placeholder': 'Search resources...',
    'filter.all': 'All',
    'filter.database': 'Database',
    'filter.sql': 'SQL',
    'filter.software': 'Software',
    'filter.theory': 'Theory',
    'filter.hardware': 'Hardware',
    'filter.processing': 'Processing',
    'filter.exam': 'Exam',
    'filter.practice': 'Practice',
    'filter.web': 'Web',
    'filter.html': 'HTML',
    'filter.interactive': 'Interactive',
    'filter.algorithms': 'Algorithms',
    'filter.visualization': 'Visualization',
    'filter.javascript': 'JavaScript',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'Email',
    'auth.remember_me': 'Remember me',
    'auth.forgot_password': 'Forgot password?',
    'auth.dont_have_account': "Don't have an account?",
    'auth.already_have_account': 'Already have an account?',
    'auth.logout': 'Logout',
    'auth.profile': 'Profile',
    'auth.sign_out': 'Sign Out',
    'auth.welcome': 'Welcome',
    'auth.invalid_credentials': 'Invalid credentials',
    'auth.login_success': 'Login successful',
    'auth.signup_success': 'Signup successful',
    'auth.error': 'Error occurred',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.empty': 'No notifications',
    'notifications.mark_all_read': 'Mark all read',
    'notifications.clear_all': 'Clear all',
    'notifications.unread': 'unread',
    
    // Language
    'language.english': 'English',
    'language.chinese': '中文',
    'language.label': 'Language',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.ok': 'OK',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  };
  
  // Chinese Strings (简体中文)
  static const Map<String, String> zhStrings = {
    // Navigation
    'nav.home': '首页',
    'nav.resources': '资源',
    'nav.about': '关于',
    'nav.login': '登录',
    
    // Hero Section
    'hero.title': '掌握 ICT 概念',
    'hero.subtitle': '用于掌握信息和通信技术的交互式学习平台',
    'hero.beta': '现已在网络和移动设备上提供',
    'hero.download': '下载 APK',
    
    // Home Page
    'home.featured_resources': '精选资源',
    'home.no_resources': '找不到符合您标准的资源',
    'home.about_title': '关于 ICT 修订中心',
    'home.about_desc': '欢迎来到 HPCSS ICT 修订中心 - 您掌握信息和通信技术概念的综合资源',
    'home.about_desc2': '从编程基础到数据库管理，我们的精选资源集合提供分步指导和实践经验',
    
    // Search & Filter
    'search.placeholder': '搜索资源...',
    'filter.all': '全部',
    'filter.database': '数据库',
    'filter.sql': 'SQL',
    'filter.software': '软件',
    'filter.theory': '理论',
    'filter.hardware': '硬件',
    'filter.processing': '处理',
    'filter.exam': '考试',
    'filter.practice': '练习',
    'filter.web': '网络',
    'filter.html': 'HTML',
    'filter.interactive': '互动',
    'filter.algorithms': '算法',
    'filter.visualization': '可视化',
    'filter.javascript': 'JavaScript',
    
    // Auth
    'auth.login': '登录',
    'auth.signup': '注册',
    'auth.username': '用户名',
    'auth.password': '密码',
    'auth.email': '电子邮件',
    'auth.remember_me': '记住我',
    'auth.forgot_password': '忘记密码?',
    'auth.dont_have_account': '没有帐户?',
    'auth.already_have_account': '已有帐户?',
    'auth.logout': '登出',
    'auth.profile': '个人资料',
    'auth.sign_out': '退出登录',
    'auth.welcome': '欢迎',
    'auth.invalid_credentials': '无效的凭证',
    'auth.login_success': '登录成功',
    'auth.signup_success': '注册成功',
    'auth.error': '发生错误',
    
    // Notifications
    'notifications.title': '通知',
    'notifications.empty': '无通知',
    'notifications.mark_all_read': '全部标记为已读',
    'notifications.clear_all': '清除全部',
    'notifications.unread': '未读',
    
    // Language
    'language.english': 'English',
    'language.chinese': '中文',
    'language.label': '语言',
    
    // Theme
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.system': '系统',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.cancel': '取消',
    'common.ok': '确定',
    'common.close': '关闭',
    'common.back': '返回',
    'common.next': '下一个',
    'common.previous': '上一个',
  };
  
  static String get(String key, {String language = 'en'}) {
    final strings = language == 'zh' ? zhStrings : enStrings;
    return strings[key] ?? key;
  }
}
