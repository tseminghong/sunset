package com.sunset.ictstudy.data

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AdminPanelSettings
import androidx.compose.material.icons.rounded.BugReport
import androidx.compose.material.icons.rounded.Fingerprint
import androidx.compose.material.icons.rounded.Lock
import androidx.compose.material.icons.rounded.Shield
import androidx.compose.material.icons.rounded.VpnKey
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector

/** Data model for Cybersecurity topics. */
data class CybersecurityTopic(
    val id: String,
    val title: String,
    val description: String,
    val progressPercent: Int,
    val isCompleted: Boolean,
    val accent: Color,
    val icon: ImageVector,
    val detail: CybersecurityTopicDetail
)

data class CybersecurityTopicDetail(
    val summary: String,
    val definition: String,
    val keyCharacteristics: List<String> = emptyList(),
    val concepts: List<InfoItem> = emptyList(),
    val advantages: List<InfoItem> = emptyList(),
    val challenges: List<InfoItem> = emptyList(),
    val commonApplications: List<String> = emptyList(),
    val securityExamples: List<SecurityExample> = emptyList()
)

data class SecurityExample(
    val title: String,
    val description: String,
    val implementation: String
)

object CybersecurityRepository {
    val cybersecurityTopics: List<CybersecurityTopic> = listOf(
        CybersecurityTopic(
            id = "authentication_authorization",
            title = "Authentication & Authorization",
            description = "Learn about user identity verification and access control.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF0078D4),
            icon = Icons.Rounded.Fingerprint,
            detail = CybersecurityTopicDetail(
                summary = "Authentication verifies user identity, while authorization determines access rights and permissions.",
                definition = "Authentication is the process of verifying whether a user is who they claim to be by checking credentials. Authorization maps appropriate resources and permissions to authenticated users.",
                keyCharacteristics = listOf(
                    "Authentication checks username and password credentials",
                    "Authorization assigns proper access rights to users",
                    "Two-Factor Authentication (2FA) adds extra security layer",
                    "Access control prevents unauthorized resource access"
                ),
                concepts = listOf(
                    InfoItem("Authentication", "Verify/identify user identity - check credentials"),
                    InfoItem("Authorization", "Map resources and permissions to verified users"),
                    InfoItem("2FA Components", "Something you know (password), have (SMS code), are (biometrics)"),
                    InfoItem("Access Rights", "Assign proper permissions to user groups")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "Password Best Practices",
                        description = "Strong password management prevents unauthorized access",
                        implementation = """• Use combination of uppercase, lowercase, digits, symbols
• Don't use username or personal info (birthday)
• Use different passwords for multiple systems
• Change passwords regularly
• Enable Two-Factor Authentication (2FA):
  - Something you know: Password
  - Something you have: SMS code
  - Something you are: Face ID, Fingerprint, Voiceprint"""
                    ),
                    SecurityExample(
                        title = "Access Control Implementation",
                        description = "Proper permission management ensures security",
                        implementation = """• Assign permissions based on user roles
• Use principle of least privilege
• Regularly review and update access rights
• Implement group-based permissions
• Log access attempts for auditing"""
                    )
                ),
                commonApplications = listOf(
                    "Online banking login systems",
                    "Enterprise resource management",
                    "Cloud service access control",
                    "Mobile app authentication",
                    "Government secure portals"
                )
            )
        ),
        CybersecurityTopic(
            id = "encryption_pki",
            title = "Encryption & PKI",
            description = "Understand encryption methods and Public Key Infrastructure.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF107C10),
            icon = Icons.Rounded.VpnKey,
            detail = CybersecurityTopicDetail(
                summary = "PKI uses asymmetric encryption with public-private key pairs for secure communication and digital signatures.",
                definition = "Public Key Infrastructure (PKI) is a framework using asymmetric encryption with public and private key pairs. Symmetric encryption uses the same key for encryption and decryption.",
                keyCharacteristics = listOf(
                    "Asymmetric encryption: Public key encrypts, private key decrypts",
                    "Symmetric encryption: Same key for both operations",
                    "PKI provides data confidentiality and authentication",
                    "Digital signatures ensure non-repudiation"
                ),
                concepts = listOf(
                    InfoItem("PKI Application 1 - Data Protection", "Public key encrypts data, private key decrypts - protects from disclosure"),
                    InfoItem("PKI Application 2 - Digital Signature", "Private key signs, public key verifies - proves sender identity"),
                    InfoItem("Symmetric Encryption", "Password converts to key (128-bit) - same key encrypts/decrypts"),
                    InfoItem("Non-repudiation", "Digital signatures cannot be denied - legally binding")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "PKI - Secure Banking (HSBC Example)",
                        description = "Protecting sensitive financial data during transmission",
                        implementation = """Purpose: Protect data from disclosure

Process:
1. User obtains bank's public key
2. User encrypts data with bank's public key
3. Only bank can decrypt with its private key
4. Data remains confidential during transmission

Use case: Online banking transactions"""
                    ),
                    SecurityExample(
                        title = "Digital Signatures (E-Contract)",
                        description = "Proving sender identity and ensuring non-repudiation",
                        implementation = """Purpose: Electronic signature verification

Process:
1. Sender signs document with private key
2. Recipient verifies using sender's public key
3. Signature proves sender's identity
4. Cannot be denied (non-repudiable)

Use case: Legal contracts, official documents"""
                    ),
                    SecurityExample(
                        title = "WiFi Symmetric Encryption",
                        description = "Securing wireless network communications",
                        implementation = """Process:
1. Password converts to 128-bit encryption key
2. Same key encrypts and decrypts data
3. Both parties must have the same key
4. Use WPA3, WPA2, or TKIP protocols

Attack vector: Brute force key guessing
Protection: Strong password + regular updates"""
                    )
                ),
                commonApplications = listOf(
                    "HTTPS secure web browsing",
                    "Email encryption (PGP/GPG)",
                    "WiFi network security (WPA2/WPA3)",
                    "Digital signatures for documents",
                    "VPN encrypted connections"
                )
            )
        ),
        CybersecurityTopic(
            id = "privacy_threats",
            title = "Privacy Threats",
            description = "Identify and protect against common privacy threats.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFD83B01),
            icon = Icons.Rounded.Shield,
            detail = CybersecurityTopicDetail(
                summary = "Privacy threats include hacking, phishing, eavesdropping, spamming, and unauthorized data collection.",
                definition = "Privacy threats are malicious activities that compromise user data confidentiality, steal personal information, or invade digital privacy through various attack vectors.",
                keyCharacteristics = listOf(
                    "Hacking steals sensitive information from systems",
                    "Phishing tricks users into revealing credentials",
                    "Eavesdropping intercepts network communications",
                    "Cookies track browsing history and behavior"
                ),
                concepts = listOf(
                    InfoItem("Hacking", "Unauthorized access to systems to steal information"),
                    InfoItem("Eavesdropping", "Intercepting data from wireless/wired networks"),
                    InfoItem("Phishing", "Fraudulent messages (email/SMS) to steal credentials"),
                    InfoItem("Spamming", "Sending junk mail - never reply or unsubscribe"),
                    InfoItem("Cookies", "Store browsing history for tracking purposes")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "Anti-Phishing Measures",
                        description = "Recognizing and avoiding phishing attacks",
                        implementation = """Warning signs:
• Urgent or threatening language
• Suspicious sender email addresses
• Requests for personal information
• Unexpected attachments or links
• Grammar and spelling errors

Protection:
• Verify sender identity independently
• Don't click suspicious links
• Check URL before entering credentials
• Report phishing attempts"""
                    ),
                    SecurityExample(
                        title = "Spam Management",
                        description = "Handling unwanted junk mail",
                        implementation = """Best practices:
• Use email spam filters
• Never reply to spam messages
• Don't click 'unsubscribe' in spam emails
• Use separate email for online registrations
• Report spam to email provider

Email systems should filter spam automatically"""
                    ),
                    SecurityExample(
                        title = "Cookie Privacy",
                        description = "Managing browser tracking and privacy",
                        implementation = """Cookie management:
• Regularly clear browser cookies
• Use private/incognito browsing mode
• Block third-party cookies in settings
• Use browser privacy extensions
• Review cookie consent carefully

Cookies store: browsing history, preferences, login sessions"""
                    )
                ),
                commonApplications = listOf(
                    "Email security and spam filtering",
                    "Browser privacy settings",
                    "Network traffic monitoring",
                    "Identity theft prevention",
                    "Personal data protection"
                )
            )
        ),
        CybersecurityTopic(
            id = "network_attacks",
            title = "Network Attacks",
            description = "Understanding DDoS, SQL injection, and XSS attacks.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFC50F1F),
            icon = Icons.Rounded.BugReport,
            detail = CybersecurityTopicDetail(
                summary = "Network attacks exploit vulnerabilities in web servers and applications through DDoS, SQL injection, and XSS attacks.",
                definition = "Network attacks target web servers and applications using various techniques to disrupt services, steal data, or execute malicious code.",
                keyCharacteristics = listOf(
                    "DDoS overwhelms servers with massive traffic",
                    "SQL injection exploits database vulnerabilities",
                    "XSS attacks inject malicious scripts",
                    "Input validation prevents injection attacks"
                ),
                concepts = listOf(
                    InfoItem("DDoS Attack", "Massive traffic overloads server, causing service disruption"),
                    InfoItem("SQL Injection", "Malicious SQL code inserted through user input fields"),
                    InfoItem("XSS Attack", "Cross-Site Scripting injects malicious scripts into web pages"),
                    InfoItem("Input Validation", "Never execute user input directly in commands")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "DDoS Attack Defense",
                        description = "Protecting web servers from overload attacks",
                        implementation = """Attack method:
• Large traffic volume sent to server
• Overwhelms server resources
• Service becomes unavailable

Defense strategies:
• Use CDN (Content Delivery Network)
• Implement rate limiting
• Deploy DDoS protection services
• Scale infrastructure automatically
• Monitor traffic patterns"""
                    ),
                    SecurityExample(
                        title = "SQL Injection Prevention",
                        description = "Securing database queries from malicious input",
                        implementation = """Attack example:
User input: ' OR '1'='1
Query becomes: SELECT * FROM users WHERE username='' OR '1'='1'
Result: Returns all users (bypasses authentication)

Prevention:
• Use parameterized queries/prepared statements
• Validate and sanitize all user input
• Use stored procedures
• Implement input filtering
• Apply least privilege database permissions"""
                    ),
                    SecurityExample(
                        title = "XSS Attack Mitigation",
                        description = "Preventing malicious script injection",
                        implementation = """Attack method:
Inject: <script>malicious_code()</script>
Executes when other users view the page

Prevention:
• Encode HTML output
• Validate and sanitize input
• Use Content Security Policy (CSP)
• Implement HttpOnly cookies
• Never execute user input directly"""
                    )
                ),
                commonApplications = listOf(
                    "Web application firewalls (WAF)",
                    "Database security measures",
                    "Input validation libraries",
                    "DDoS protection services",
                    "Security code reviews"
                )
            )
        ),
        CybersecurityTopic(
            id = "malware_types",
            title = "Malware Types",
            description = "Identify viruses, worms, trojans, and ransomware.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF8B0000),
            icon = Icons.Rounded.BugReport,
            detail = CybersecurityTopicDetail(
                summary = "Malware includes viruses, worms, trojans, spyware, adware, and ransomware - each with unique infection and damage methods.",
                definition = "Malware (malicious software) encompasses various harmful programs designed to damage systems, steal data, or disrupt operations.",
                keyCharacteristics = listOf(
                    "Virus requires user to run infected program",
                    "Worms exploit security loopholes automatically",
                    "Trojans disguise as legitimate programs",
                    "Ransomware encrypts files and demands payment"
                ),
                concepts = listOf(
                    InfoItem("Virus", "Requires user execution - has duplication and outbreak phases"),
                    InfoItem("Worm", "Enters via security loopholes (bugs, backdoors) - self-spreading"),
                    InfoItem("Trojan Horse", "Appears legitimate but contains malicious code"),
                    InfoItem("Spyware", "Monitors keystrokes, mouse actions, screens - steals info"),
                    InfoItem("Adware", "Displays excessive unwanted advertisements"),
                    InfoItem("Browser Hijacker", "Takes over browser functions and settings"),
                    InfoItem("Ransomware", "Encrypts files, demands cryptocurrency ransom")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "Virus Infection Process",
                        description = "Understanding virus lifecycle and common outbreak dates",
                        implementation = """Phases:
1. Infection: User runs infected program
2. Duplication: Virus copies itself to other files
3. Outbreak: Activates on specific dates

Common outbreak dates:
• Black Friday
• April Fool's Day
• Friday the 13th
• Specific anniversaries

Prevention:
• Don't run unknown programs
• Keep antivirus updated
• Scan downloads before opening"""
                    ),
                    SecurityExample(
                        title = "Worm Defense Strategy",
                        description = "Protecting against self-spreading malware",
                        implementation = """Entry points:
• Security loopholes in software
• Software bugs and backdoors
• Unpatched vulnerabilities

Defense:
• Patch systems regularly
• Enable automatic updates
• Use firewall to block unnecessary ports
• Keep all software up-to-date
• Disable unused services"""
                    ),
                    SecurityExample(
                        title = "Ransomware Protection",
                        description = "Preventing and responding to ransomware attacks",
                        implementation = """Attack process:
1. Infects system through phishing/exploit
2. Encrypts data files systematically
3. Demands cryptocurrency ransom
4. Threatens permanent data loss

Protection:
• Regular offline backups (3-2-1 rule)
• Keep systems updated
• Email attachment scanning
• User security training
• Network segmentation
• Never pay ransom (no guarantee)"""
                    )
                ),
                commonApplications = listOf(
                    "Antivirus software detection",
                    "Email attachment scanning",
                    "Backup and recovery systems",
                    "Network intrusion prevention",
                    "Security awareness training"
                ),
                challenges = listOf(
                    InfoItem("Zero-day Exploits", "New vulnerabilities unknown to security software", DetailTone.Caution),
                    InfoItem("Ransomware Evolution", "Increasingly sophisticated encryption methods", DetailTone.Caution),
                    InfoItem("Social Engineering", "Users remain weakest link in security chain", DetailTone.Caution)
                )
            )
        ),
        CybersecurityTopic(
            id = "security_measures",
            title = "Security Measures & Prevention",
            description = "Implement comprehensive security protections.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF0F7B0F),
            icon = Icons.Rounded.AdminPanelSettings,
            detail = CybersecurityTopicDetail(
                summary = "Comprehensive security requires browser settings, antivirus software, firewalls, encryption, and VPN protection.",
                definition = "Security measures are preventive controls and protective mechanisms implemented to safeguard systems, networks, and data from cyber threats.",
                keyCharacteristics = listOf(
                    "Multi-layered defense provides comprehensive protection",
                    "Regular updates essential for security effectiveness",
                    "User education critical for security success",
                    "Firewall controls network traffic and access"
                ),
                concepts = listOf(
                    InfoItem("Browser Security", "Higher security settings reduce script execution risks"),
                    InfoItem("Antivirus Protection", "Live scan + regular virus data updates"),
                    InfoItem("Firewall Functions", "Filter traffic, block unauthorized access, monitor ports"),
                    InfoItem("WiFi Encryption", "WPA3 > WPA2 > TKIP protocols"),
                    InfoItem("VPN", "Secure encrypted tunnel to remote networks")
                ),
                securityExamples = listOf(
                    SecurityExample(
                        title = "Browser Security Configuration",
                        description = "Hardening browser against threats",
                        implementation = """Settings:
• Set higher security level
• Block pop-ups and redirects
• Disable auto-downloads
• Clear cache regularly
• Enable safe browsing warnings

Extensions:
• Install ONLY verified extensions
• Review permissions carefully
• Examples: Ad blockers (caution with translations)
• Regularly audit installed extensions"""
                    ),
                    SecurityExample(
                        title = "Antivirus Best Practices",
                        description = "Comprehensive malware protection",
                        implementation = """Configuration:
• Enable live/active scanning
• Schedule regular full scans
• Update virus definitions daily
• Enable real-time protection
• Scan external drives automatically
• Configure quarantine settings

Maintenance:
• Keep software updated
• Review scan logs
• Configure exclusions carefully"""
                    ),
                    SecurityExample(
                        title = "Firewall Configuration",
                        description = "Network traffic filtering and protection",
                        implementation = """Functions:
• Filter suspicious traffic (e.g., password attempts)
• Block unauthorized access/connections
• Stop unsolicited attempts (repeated login failures)
• Block unnecessary ports
• Allow only useful ports (80-HTTP, 443-HTTPS)

Rules:
• Deny by default, allow by exception
• Log blocked attempts
• Regular rule reviews"""
                    ),
                    SecurityExample(
                        title = "WiFi Security Setup",
                        description = "Securing wireless network connections",
                        implementation = """Encryption protocols (strongest to weakest):
1. WPA3 (recommended)
2. WPA2
3. TKIP
4. WEP (obsolete - don't use)

Additional measures:
• Change default router password
• Hide SSID broadcast
• MAC address filtering
• Regular firmware updates
• Use strong encryption key"""
                    ),
                    SecurityExample(
                        title = "VPN (Virtual Private Network)",
                        description = "Secure remote network access",
                        implementation = """Purpose:
• Remotely establish secure connection
• Encrypt all network traffic
• Become member of internal network
• Access internal resources securely

Benefits:
• End-to-end encryption
• IP address masking
• Bypass geographic restrictions
• Secure public WiFi usage
• Privacy protection"""
                    )
                ),
                commonApplications = listOf(
                    "Corporate network security",
                    "Remote work infrastructure",
                    "Public WiFi protection",
                    "Home network security",
                    "Cloud service access"
                ),
                advantages = listOf(
                    InfoItem("Defense in Depth", "Multiple security layers increase protection", DetailTone.Positive),
                    InfoItem("Automated Protection", "Real-time scanning prevents infections", DetailTone.Positive),
                    InfoItem("Network Isolation", "VPN and firewall secure connections", DetailTone.Positive)
                )
            )
        )
    )
    
    fun getTopic(id: String): CybersecurityTopic? = cybersecurityTopics.firstOrNull { it.id == id }
}
