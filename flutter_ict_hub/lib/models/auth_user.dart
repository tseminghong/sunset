class AuthUser {
  final String username;
  final String? id;
  final String? email;

  AuthUser({
    required this.username,
    this.id,
    this.email,
  });

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      username: json['username'] as String,
      id: json['id'] as String?,
      email: json['email'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'id': id,
      'email': email,
    };
  }
}
