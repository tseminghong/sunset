class Resource {
  final String href;
  final String tags;
  final String icon;
  final String title;
  final String description;
  final String linkText;
  final String? progressKey;
  final int? totalLessons;

  Resource({
    required this.href,
    required this.tags,
    required this.icon,
    required this.title,
    required this.description,
    required this.linkText,
    this.progressKey,
    this.totalLessons,
  });

  List<String> getTags() {
    return tags
        .split(',')
        .map((tag) => tag.trim())
        .toList();
  }

  bool isExternalLink() {
    return href.startsWith('http') || 
           href.endsWith('.html') || 
           href.endsWith('.apk');
  }

  factory Resource.fromJson(Map<String, dynamic> json) {
    return Resource(
      href: json['href'] as String,
      tags: json['tags'] as String,
      icon: json['icon'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      linkText: json['linkText'] as String,
      progressKey: json['progressKey'] as String?,
      totalLessons: json['totalLessons'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'href': href,
      'tags': tags,
      'icon': icon,
      'title': title,
      'description': description,
      'linkText': linkText,
      'progressKey': progressKey,
      'totalLessons': totalLessons,
    };
  }
}
