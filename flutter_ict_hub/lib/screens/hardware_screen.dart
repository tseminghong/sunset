import 'package:flutter/material.dart';
import 'package:flutter_ict_hub/screens/content_screen.dart';

class HardwareScreen extends StatelessWidget {
  const HardwareScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ContentScreen(
      title: 'Computer Hardware',
      description: 'Essential guide to computer components and how they work together',
      icon: Icons.computer,
      sections: [
        ContentSection(
          id: 'cpu',
          title: 'Central Processing Unit (CPU)',
          content: _buildCPUContent(),
        ),
        ContentSection(
          id: 'memory',
          title: 'Memory Systems',
          content: _buildMemoryContent(),
        ),
        ContentSection(
          id: 'motherboard',
          title: 'Motherboard & Components',
          content: _buildMotherboardContent(),
        ),
        ContentSection(
          id: 'storage',
          title: 'Storage Devices',
          content: _buildStorageContent(),
        ),
        ContentSection(
          id: 'power',
          title: 'Power Supply Unit (PSU)',
          content: _buildPowerContent(),
        ),
      ],
    );
  }

  Widget _buildCPUContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'The CPU is the "brain" of the computer, executing instructions and performing calculations.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'CPU Components:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _InfoCard(
          title: 'Control Unit',
          description: 'Manages execution of instructions and coordinates other components',
          color: Colors.blue,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Arithmetic Logic Unit (ALU)',
          description: 'Performs mathematical calculations and logical operations',
          color: Colors.blue,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Registers',
          description: 'Small, fast storage locations for temporary data',
          color: Colors.blue,
        ),
        SizedBox(height: 16),
        Text(
          'Performance Factors:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Clock Speed (GHz) - Number of cycles per second'),
        _BulletPoint('Number of Cores - Independent processing units'),
        _BulletPoint('Cache Memory - Ultra-fast memory close to CPU'),
        SizedBox(height: 16),
        Text(
          'Popular Manufacturers: Intel (Core i3/i5/i7/i9), AMD (Ryzen)',
          style: TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
        ),
      ],
    );
  }

  Widget _buildMemoryContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Computer memory systems store data and instructions for the CPU to access.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Primary Memory (RAM):',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Volatile (loses data when power off)'),
        _BulletPoint('Fast access speed'),
        _BulletPoint('Directly accessible by CPU'),
        _BulletPoint('Types: DDR4 RAM (current), DDR5 RAM (latest)'),
        SizedBox(height: 16),
        Text(
          'Memory Hierarchy (Fastest to Slowest):',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _InfoCard(
          title: '1. CPU Registers',
          description: 'Fastest, Smallest capacity',
          color: Colors.red,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: '2. Cache Memory (L1, L2, L3)',
          description: 'Very Fast, Small capacity',
          color: Colors.orange,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: '3. Main Memory (RAM)',
          description: 'Fast, Medium capacity',
          color: Colors.yellow,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: '4. Secondary Storage (SSD/HDD)',
          description: 'Slower, Large capacity',
          color: Colors.green,
        ),
      ],
    );
  }

  Widget _buildMotherboardContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'The motherboard is the main circuit board connecting all computer components together.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Key Components:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _InfoCard(
          title: 'CPU Socket',
          description: 'Physical connection point for the processor',
          color: Colors.green,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'RAM Slots',
          description: 'DIMM slots for system memory installation',
          color: Colors.green,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Expansion Slots',
          description: 'PCIe slots for graphics cards and other components',
          color: Colors.green,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'BIOS/UEFI Chip',
          description: 'Firmware that initializes hardware during boot',
          color: Colors.green,
        ),
        SizedBox(height: 16),
        Text(
          'Ports & Connectors:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('USB 2.0/3.0/3.1 ports for peripherals'),
        _BulletPoint('SATA for HDD/SSD connections'),
        _BulletPoint('M.2 slots for NVMe SSDs'),
        _BulletPoint('Audio jacks and network (RJ45) port'),
      ],
    );
  }

  Widget _buildStorageContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Storage devices permanently store data, programs, and operating systems.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'Types of Storage:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _InfoCard(
          title: 'Hard Disk Drives (HDD)',
          description: 'Mechanical moving parts • Large capacity, low cost • Slower speed • 1TB - 18TB typical',
          color: Colors.blue,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Solid State Drives (SSD)',
          description: 'No moving parts • Fast access speed • Higher cost per GB • 256GB - 8TB typical',
          color: Colors.purple,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Flash Memory',
          description: 'Portable storage • USB drives, SD cards • Non-volatile • 8GB - 1TB typical',
          color: Colors.orange,
        ),
        SizedBox(height: 16),
        Text(
          'Key Differences:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Speed: SSD > HDD (5-10x faster boot times)'),
        _BulletPoint('Durability: SSD more resistant to physical shock'),
        _BulletPoint('Cost: HDD cheaper per GB'),
        _BulletPoint('Lifespan: Both reliable, SSD has limited write cycles'),
      ],
    );
  }

  Widget _buildPowerContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'The PSU converts AC power from the wall outlet to DC power used by computer components.',
          style: TextStyle(fontSize: 14, height: 1.6),
        ),
        SizedBox(height: 16),
        Text(
          'PSU Specifications:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _InfoCard(
          title: 'Wattage',
          description: 'Total power output capacity (300W - 1600W+). Higher wattage supports more powerful components.',
          color: Colors.amber,
        ),
        SizedBox(height: 8),
        _InfoCard(
          title: 'Efficiency Rating',
          description: '80 PLUS certification: Bronze (82%), Silver (85%), Gold (88%), Platinum (90%), Titanium (92%)',
          color: Colors.amber,
        ),
        SizedBox(height: 16),
        Text(
          'PSU Types:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        _BulletPoint('Non-Modular: All cables permanently attached (cheaper, cable clutter)'),
        _BulletPoint('Semi-Modular: Essential cables fixed, others detachable'),
        _BulletPoint('Fully Modular: All cables detachable (clean builds, more expensive)'),
        SizedBox(height: 16),
        Text(
          '💡 Tip: Choose PSU wattage with 20-30% headroom above your system\'s peak power draw.',
          style: TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
        ),
      ],
    );
  }
}

class _InfoCard extends StatelessWidget {
  final String title;
  final String description;
  final Color color;

  const _InfoCard({
    required this.title,
    required this.description,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(isDark ? 0.15 : 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            description,
            style: TextStyle(
              fontSize: 12,
              color: color.withOpacity(0.8),
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _BulletPoint extends StatelessWidget {
  final String text;

  const _BulletPoint(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, left: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 6, right: 8),
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
              shape: BoxShape.circle,
            ),
          ),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(fontSize: 14, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
