'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Cpu, HardDrive, Monitor, Zap, MemoryStick, CircuitBoard, Smartphone } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'

export default function HardwarePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const hardwareSections = [
    {
      id: 'cpu',
      title: 'Central Processing Unit (CPU)',
      icon: <Cpu className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            The CPU is the "brain" of the computer, executing instructions and performing calculations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">CPU Components</h4>
              <div className="space-y-3">
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Control Unit</h5>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Manages execution of instructions and coordinates other components
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Arithmetic Logic Unit (ALU)</h5>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Performs mathematical calculations and logical operations
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Registers</h5>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Small, fast storage locations for temporary data
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">CPU Performance Factors</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Clock Speed (GHz)</h5>
                  <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                    Number of cycles per second the CPU can execute
                  </p>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded px-2 py-1 text-xs">
                    Higher GHz = Faster processing
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Number of Cores</h5>
                  <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                    Independent processing units within the CPU
                  </p>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded px-2 py-1 text-xs">
                    More cores = Better multitasking
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Cache Memory</h5>
                  <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                    Ultra-fast memory close to CPU cores
                  </p>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded px-2 py-1 text-xs">
                    L1 {'>'} L2 {'>'} L3 cache levels
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Popular CPU Manufacturers</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Intel</h5>
                <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Core i3, i5, i7, i9 series</li>
                  <li>• Xeon (server processors)</li>
                  <li>• x86-64 architecture</li>
                </ul>
              </div>
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">AMD</h5>
                <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Ryzen series</li>
                  <li>• EPYC (server processors)</li>
                  <li>• x86-64 architecture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'memory',
      title: 'Memory Systems',
      icon: <MemoryStick className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Computer memory systems store data and instructions for the CPU to access.
          </p>
          
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Primary Memory (RAM)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Characteristics:</h5>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Volatile (loses data when power off)</li>
                    <li>• Fast access speed</li>
                    <li>• Directly accessible by CPU</li>
                    <li>• Stores running programs and data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Types:</h5>
                  <div className="space-y-2">
                    <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">DDR4 RAM</p>
                      <p className="text-xs text-red-700 dark:text-red-300">Current standard, fast and efficient</p>
                    </div>
                    <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">DDR5 RAM</p>
                      <p className="text-xs text-red-700 dark:text-red-300">Latest standard, even faster</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Secondary Memory (Storage)</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <HardDrive className="h-8 w-8 text-blue-600 dark:text-blue-300 mb-2" />
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Hard Disk Drives (HDD)</h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Mechanical moving parts</li>
                    <li>• Large capacity, low cost</li>
                    <li>• Slower access speed</li>
                    <li>• 1TB - 18TB typical</li>
                  </ul>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <MemoryStick className="h-8 w-8 text-blue-600 dark:text-blue-300 mb-2" />
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Solid State Drives (SSD)</h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• No moving parts</li>
                    <li>• Fast access speed</li>
                    <li>• Higher cost per GB</li>
                    <li>• 256GB - 8TB typical</li>
                  </ul>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                  <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-300 mb-2" />
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Flash Memory</h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Portable storage</li>
                    <li>• USB drives, SD cards</li>
                    <li>• Non-volatile</li>
                    <li>• 8GB - 1TB typical</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Memory Hierarchy</h4>
              <div className="flex flex-col space-y-2">
                {[
                  { level: 'CPU Registers', speed: 'Fastest', size: 'Smallest', color: 'red' },
                  { level: 'Cache Memory', speed: 'Very Fast', size: 'Small', color: 'orange' },
                  { level: 'Main Memory (RAM)', speed: 'Fast', size: 'Medium', color: 'yellow' },
                  { level: 'Secondary Storage', speed: 'Slower', size: 'Large', color: 'green' },
                  { level: 'Tertiary Storage', speed: 'Slowest', size: 'Largest', color: 'blue' }
                ].map((item, index) => (
                  <div key={item.level} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 bg-${item.color}-500 rounded-full`}></div>
                    <div className="flex-1 flex justify-between items-center bg-yellow-100 dark:bg-yellow-800/30 rounded px-3 py-2">
                      <span className="font-medium text-yellow-800 dark:text-yellow-200">{item.level}</span>
                      <div className="flex space-x-4 text-xs text-yellow-700 dark:text-yellow-300">
                        <span>Speed: {item.speed}</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'motherboard',
      title: 'Motherboard & Components',
      icon: <CircuitBoard className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            The motherboard is the main circuit board connecting all computer components together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Key Components</h4>
              <div className="space-y-3">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">CPU Socket</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Physical connection point for the processor
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">RAM Slots</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    DIMM slots for system memory installation
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Expansion Slots</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    PCIe slots for graphics cards and other components
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">BIOS/UEFI Chip</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Firmware that initializes hardware during boot
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Connectors & Ports</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Power Connectors</h5>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• 24-pin ATX power connector</li>
                    <li>• 8-pin CPU power connector</li>
                    <li>• SATA power for storage</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Data Connectors</h5>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• SATA for HDD/SSD</li>
                    <li>• M.2 for NVMe SSDs</li>
                    <li>• USB headers</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">I/O Ports</h5>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• USB 2.0/3.0/3.1 ports</li>
                    <li>• Audio jacks</li>
                    <li>• Network (RJ45) port</li>
                    <li>• Video outputs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'power',
      title: 'Power Supply Unit (PSU)',
      icon: <Zap className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            The PSU converts AC power from the wall outlet to DC power used by computer components.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">PSU Specifications</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Wattage</h5>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                    Total power output capacity (300W - 1600W+)
                  </p>
                  <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-2 py-1 text-xs">
                    Higher wattage supports more powerful components
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Efficiency Rating</h5>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                    80 PLUS certification levels
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-2 py-1">Bronze (82%)</div>
                    <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-2 py-1">Silver (85%)</div>
                    <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-2 py-1">Gold (88%)</div>
                    <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-2 py-1">Platinum (90%)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">PSU Types</h4>
              <div className="space-y-3">
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">Non-Modular</h5>
                  <p className="text-xs text-red-700 dark:text-red-300 mb-1">
                    All cables permanently attached
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    ✓ Cheaper ✗ Cable clutter
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">Semi-Modular</h5>
                  <p className="text-xs text-red-700 dark:text-red-300 mb-1">
                    Essential cables fixed, others detachable
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    ✓ Balance of cost and flexibility
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">Fully Modular</h5>
                  <p className="text-xs text-red-700 dark:text-red-300 mb-1">
                    All cables detachable
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    ✓ Clean builds ✗ More expensive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
            <Cpu className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Computer Hardware
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Essential guide to computer components and how they work together
          </p>
        </motion.div>

        {/* Hardware Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {hardwareSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-secondary border border-secondary rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-tertiary transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="text-green-600 dark:text-green-400">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp className="h-5 w-5 text-secondary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-secondary" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections[section.id] ? 'auto' : 0,
                  opacity: expandedSections[section.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-secondary">
                  {section.content}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Build Your PC Guide */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">PC Building Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Plan & Research', icon: <Monitor className="h-6 w-6" />, desc: 'Define budget and requirements' },
              { step: 2, title: 'Choose Components', icon: <Cpu className="h-6 w-6" />, desc: 'Select compatible parts' },
              { step: 3, title: 'Assemble System', icon: <CircuitBoard className="h-6 w-6" />, desc: 'Install components carefully' },
              { step: 4, title: 'Test & Configure', icon: <Zap className="h-6 w-6" />, desc: 'Boot and install OS' }
            ].map((step, index) => (
              <div key={step.step} className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">STEP {step.step}</div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}