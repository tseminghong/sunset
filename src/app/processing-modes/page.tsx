'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Clock, Users, Layers, Zap, Timer, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProcessingModesPage() {
  const { t } = useLanguage()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const processingSections = [
    {
      id: 'batch',
      title: 'Batch Processing',
      icon: <Layers className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Batch processing executes jobs in groups without user interaction, typically during off-peak hours.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Characteristics</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  <span>Jobs are collected and processed as a group</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  <span>No user interaction during processing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  <span>Efficient use of computer resources</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></div>
                  <span>Results available after completion</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Examples & Applications</h4>
              <div className="space-y-3">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Payroll Processing</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Monthly salary calculations for all employees
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Bank Statement Generation</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Creating monthly statements for all customers
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Scientific Computing</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Large-scale data analysis and simulations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Advantages & Disadvantages</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-600 mb-2">✓ Advantages</h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• High throughput and efficiency</li>
                  <li>• Lower cost per transaction</li>
                  <li>• Optimal resource utilization</li>
                  <li>• Suitable for repetitive tasks</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-600 mb-2">✗ Disadvantages</h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• No immediate results</li>
                  <li>• Limited user interaction</li>
                  <li>• Errors affect entire batch</li>
                  <li>• Not suitable for urgent tasks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'online',
      title: 'Online Processing',
      icon: <Zap className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Online processing handles transactions immediately as they occur, providing instant results and feedback.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Key Features</h4>
              <div className="space-y-3">
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3 flex items-center">
                  <Clock className="h-5 w-5 text-red-600 dark:text-red-300 mr-3" />
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200">Real-time Processing</h5>
                    <p className="text-xs text-red-700 dark:text-red-300">Immediate transaction handling</p>
                  </div>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3 flex items-center">
                  <Users className="h-5 w-5 text-red-600 dark:text-red-300 mr-3" />
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200">Interactive</h5>
                    <p className="text-xs text-red-700 dark:text-red-300">Direct user interaction required</p>
                  </div>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3 flex items-center">
                  <RefreshCw className="h-5 w-5 text-red-600 dark:text-red-300 mr-3" />
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200">Immediate Response</h5>
                    <p className="text-xs text-red-700 dark:text-red-300">Instant feedback and results</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Common Applications</h4>
              <div className="space-y-2">
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-3 py-2">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">ATM Transactions</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">Immediate cash withdrawals and deposits</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-3 py-2">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">Online Shopping</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">Real-time inventory and payment processing</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-3 py-2">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">Airline Reservations</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">Instant seat booking and confirmation</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded px-3 py-2">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">Stock Trading</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">Real-time buy/sell order execution</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Types of Online Processing</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3 text-center">
                <Timer className="h-8 w-8 text-green-600 dark:text-green-300 mx-auto mb-2" />
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Real-time</h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Immediate processing with strict time constraints
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3 text-center">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-300 mx-auto mb-2" />
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Near Real-time</h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Processing with minimal acceptable delay
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3 text-center">
                <RefreshCw className="h-8 w-8 text-green-600 dark:text-green-300 mx-auto mb-2" />
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Interactive</h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  User-driven processing with immediate feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'distributed',
      title: 'Distributed Processing',
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Distributed processing spreads computational tasks across multiple computers or processors working together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Architecture Types</h4>
              <div className="space-y-3">
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Client-Server</h5>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Clients request services from centralized servers
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Peer-to-Peer (P2P)</h5>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    All nodes can act as both client and server
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Grid Computing</h5>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Coordinated resource sharing across organizations
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Cloud Computing</h5>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    On-demand access to shared computing resources
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Benefits & Challenges</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-green-600 mb-2">✓ Benefits</h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Improved performance and scalability</li>
                    <li>• Better fault tolerance and reliability</li>
                    <li>• Cost-effective resource sharing</li>
                    <li>• Geographic distribution possible</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-600 mb-2">✗ Challenges</h5>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Network communication overhead</li>
                    <li>• Complex synchronization requirements</li>
                    <li>• Security and data consistency issues</li>
                    <li>• Debugging and testing complexity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3">Real-world Examples</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <h5 className="font-medium text-primary mb-1">Google Search</h5>
                <p className="text-xs text-secondary">Distributed across thousands of servers</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <h5 className="font-medium text-primary mb-1">Bitcoin Network</h5>
                <p className="text-xs text-secondary">Peer-to-peer cryptocurrency mining</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <h5 className="font-medium text-primary mb-1">Netflix Streaming</h5>
                <p className="text-xs text-secondary">Content delivery network (CDN)</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <h5 className="font-medium text-primary mb-1">SETI@home</h5>
                <p className="text-xs text-secondary">Volunteer distributed computing</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'parallel',
      title: 'Parallel Processing',
      icon: <Layers className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Parallel processing executes multiple instructions simultaneously using multiple processors or cores.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Types of Parallelism</h4>
              <div className="space-y-3">
                <div className="bg-orange-100 dark:bg-orange-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Instruction-Level</h5>
                  <p className="text-xs text-orange-700 dark:text-orange-300">
                    Multiple instructions executed simultaneously within a single processor
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Data Parallelism</h5>
                  <p className="text-xs text-orange-700 dark:text-orange-300">
                    Same operation performed on multiple data elements simultaneously
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Task Parallelism</h5>
                  <p className="text-xs text-orange-700 dark:text-orange-300">
                    Different tasks executed simultaneously on separate processors
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-3">Parallel Architectures</h4>
              <div className="space-y-2">
                <div className="bg-teal-100 dark:bg-teal-800/30 rounded px-3 py-2">
                  <p className="font-medium text-teal-800 dark:text-teal-200 text-sm">SIMD</p>
                  <p className="text-xs text-teal-700 dark:text-teal-300">Single Instruction, Multiple Data</p>
                </div>
                <div className="bg-teal-100 dark:bg-teal-800/30 rounded px-3 py-2">
                  <p className="font-medium text-teal-800 dark:text-teal-200 text-sm">MIMD</p>
                  <p className="text-xs text-teal-700 dark:text-teal-300">Multiple Instruction, Multiple Data</p>
                </div>
                <div className="bg-teal-100 dark:bg-teal-800/30 rounded px-3 py-2">
                  <p className="font-medium text-teal-800 dark:text-teal-200 text-sm">SMP</p>
                  <p className="text-xs text-teal-700 dark:text-teal-300">Symmetric Multi-Processing</p>
                </div>
                <div className="bg-teal-100 dark:bg-teal-800/30 rounded px-3 py-2">
                  <p className="font-medium text-teal-800 dark:text-teal-200 text-sm">MPP</p>
                  <p className="text-xs text-teal-700 dark:text-teal-300">Massively Parallel Processing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3">Performance Considerations</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h5 className="font-semibold text-primary mb-1">Speedup</h5>
                <p className="text-xs text-secondary">
                  Performance gain from parallel execution vs sequential
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <h5 className="font-semibold text-primary mb-1">Scalability</h5>
                <p className="text-xs text-secondary">
                  Ability to maintain performance as problem size increases
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Layers className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h5 className="font-semibold text-primary mb-1">Efficiency</h5>
                <p className="text-xs text-secondary">
                  How well parallel resources are utilized
                </p>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Data Processing Modes
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Comprehensive guide to different computer processing methods and architectures
          </p>
        </motion.div>

        {/* Processing Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {processingSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-secondary border border-secondary rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-tertiary transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="text-indigo-600 dark:text-indigo-400">
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

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-secondary border border-secondary rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Processing Mode Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="text-left p-3 font-semibold text-primary">Aspect</th>
                  <th className="text-left p-3 font-semibold text-primary">Batch</th>
                  <th className="text-left p-3 font-semibold text-primary">Online</th>
                  <th className="text-left p-3 font-semibold text-primary">Distributed</th>
                  <th className="text-left p-3 font-semibold text-primary">Parallel</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                <tr className="border-b border-secondary">
                  <td className="p-3 font-medium">Response Time</td>
                  <td className="p-3">Hours/Days</td>
                  <td className="p-3">Seconds</td>
                  <td className="p-3">Varies</td>
                  <td className="p-3">Fast</td>
                </tr>
                <tr className="border-b border-secondary">
                  <td className="p-3 font-medium">User Interaction</td>
                  <td className="p-3">None</td>
                  <td className="p-3">High</td>
                  <td className="p-3">Varies</td>
                  <td className="p-3">Low</td>
                </tr>
                <tr className="border-b border-secondary">
                  <td className="p-3 font-medium">Resource Usage</td>
                  <td className="p-3">High Efficiency</td>
                  <td className="p-3">Variable</td>
                  <td className="p-3">Distributed</td>
                  <td className="p-3">High Performance</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Best For</td>
                  <td className="p-3">Large datasets</td>
                  <td className="p-3">Real-time apps</td>
                  <td className="p-3">Scalable systems</td>
                  <td className="p-3">Compute-intensive</td>
                </tr>
              </tbody>
            </table>
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