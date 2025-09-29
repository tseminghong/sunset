'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Monitor, Code, Settings, Layers } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SoftwarePage() {
  const { t } = useLanguage()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const softwareSections = [
    {
      id: 'types',
      title: 'Types of Software',
      icon: <Layers className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">System Software</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li><strong>Operating Systems:</strong> Windows, macOS, Linux</li>
                <li><strong>Device Drivers:</strong> Hardware communication</li>
                <li><strong>Utilities:</strong> Disk cleanup, antivirus, backup</li>
                <li><strong>Programming Tools:</strong> Compilers, debuggers</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Application Software</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li><strong>Productivity:</strong> Word processors, spreadsheets</li>
                <li><strong>Entertainment:</strong> Games, media players</li>
                <li><strong>Business:</strong> CRM, accounting software</li>
                <li><strong>Educational:</strong> Learning management systems</li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Programming Software</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
              Tools used by developers to create, debug, and maintain software applications:
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <Code className="h-8 w-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Code Editors</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <Settings className="h-8 w-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Compilers</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                  <Monitor className="h-8 w-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Debuggers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'lifecycle',
      title: 'Software Development Lifecycle (SDLC)',
      icon: <Code className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            The Software Development Lifecycle is a structured process for developing high-quality software efficiently.
          </p>
          <div className="grid gap-4">
            {[
              {
                phase: 'Planning',
                color: 'red',
                description: 'Define project scope, requirements, and timeline',
                activities: ['Requirements gathering', 'Feasibility study', 'Resource allocation']
              },
              {
                phase: 'Analysis',
                color: 'orange',
                description: 'Analyze requirements and create system specifications',
                activities: ['System analysis', 'User story creation', 'Risk assessment']
              },
              {
                phase: 'Design',
                color: 'yellow',
                description: 'Create system architecture and user interface designs',
                activities: ['System design', 'UI/UX design', 'Database design']
              },
              {
                phase: 'Implementation',
                color: 'green',
                description: 'Write code and build the software system',
                activities: ['Coding', 'Code review', 'Unit testing']
              },
              {
                phase: 'Testing',
                color: 'blue',
                description: 'Verify software meets requirements and is bug-free',
                activities: ['Integration testing', 'System testing', 'User acceptance testing']
              },
              {
                phase: 'Deployment',
                color: 'purple',
                description: 'Release software to production environment',
                activities: ['Production deployment', 'User training', 'Go-live support']
              },
              {
                phase: 'Maintenance',
                color: 'gray',
                description: 'Ongoing support and updates after deployment',
                activities: ['Bug fixes', 'Feature updates', 'Performance monitoring']
              }
            ].map((phase, index) => (
              <div key={phase.phase} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full bg-${phase.color}-500 flex items-center justify-center text-white font-bold text-sm`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary mb-1">{phase.phase}</h4>
                  <p className="text-sm text-secondary mb-2">{phase.description}</p>
                  <ul className="text-xs text-secondary space-y-1">
                    {phase.activities.map(activity => (
                      <li key={activity} className="flex items-center">
                        <div className="w-1 h-1 bg-secondary rounded-full mr-2"></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'methodologies',
      title: 'Development Methodologies',
      icon: <Settings className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Waterfall Model</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Linear sequential approach where each phase must be completed before the next begins.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-blue-800 dark:text-blue-200">Advantages:</div>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Simple to understand and manage</li>
                  <li>• Clear documentation at each phase</li>
                  <li>• Works well for small projects</li>
                </ul>
                <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mt-3">Disadvantages:</div>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Inflexible to changing requirements</li>
                  <li>• Late discovery of issues</li>
                  <li>• No working software until late in project</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Agile Methodology</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Iterative approach with short development cycles (sprints) and continuous feedback.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-green-800 dark:text-green-200">Key Principles:</div>
                <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <li>• Individuals over processes</li>
                  <li>• Working software over documentation</li>
                  <li>• Customer collaboration over contracts</li>
                  <li>• Responding to change over plans</li>
                </ul>
                <div className="text-xs font-medium text-green-800 dark:text-green-200 mt-3">Common Frameworks:</div>
                <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <li>• Scrum</li>
                  <li>• Kanban</li>
                  <li>• Extreme Programming (XP)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">DevOps</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
              Cultural and technical movement that emphasizes collaboration between development and operations teams.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <h5 className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-2">Core Practices:</h5>
                <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• Continuous Integration</li>
                  <li>• Continuous Deployment</li>
                  <li>• Infrastructure as Code</li>
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-2">Tools:</h5>
                <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• Docker</li>
                  <li>• Jenkins</li>
                  <li>• Kubernetes</li>
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-2">Benefits:</h5>
                <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• Faster deployment</li>
                  <li>• Better collaboration</li>
                  <li>• Higher reliability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'testing',
      title: 'Software Testing',
      icon: <Monitor className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            Software testing ensures applications work correctly and meet requirements before deployment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Types of Testing</h4>
              <div className="space-y-3">
                <div className="bg-tertiary rounded-lg p-3">
                  <h5 className="font-medium text-primary mb-1">Unit Testing</h5>
                  <p className="text-xs text-secondary">Testing individual components or functions in isolation</p>
                </div>
                <div className="bg-tertiary rounded-lg p-3">
                  <h5 className="font-medium text-primary mb-1">Integration Testing</h5>
                  <p className="text-xs text-secondary">Testing interactions between integrated components</p>
                </div>
                <div className="bg-tertiary rounded-lg p-3">
                  <h5 className="font-medium text-primary mb-1">System Testing</h5>
                  <p className="text-xs text-secondary">Testing complete integrated system</p>
                </div>
                <div className="bg-tertiary rounded-lg p-3">
                  <h5 className="font-medium text-primary mb-1">Acceptance Testing</h5>
                  <p className="text-xs text-secondary">Testing system meets business requirements</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-3">Testing Approaches</h4>
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">Manual Testing</h5>
                  <p className="text-xs text-red-700 dark:text-red-300">Human testers execute test cases manually</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">• Exploratory testing • Usability testing</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Automated Testing</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">Scripts and tools execute tests automatically</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">• Regression testing • Load testing</p>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Testing Tools</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300">Unit Testing:</p>
                    <p className="text-blue-600 dark:text-blue-400">Jest, JUnit, NUnit</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300">E2E Testing:</p>
                    <p className="text-blue-600 dark:text-blue-400">Selenium, Cypress</p>
                  </div>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Software Engineering
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Comprehensive guide to software development concepts, methodologies, and best practices
          </p>
        </motion.div>

        {/* Software Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {softwareSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-secondary border border-secondary rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-tertiary transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-600 dark:text-blue-400">
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

        {/* Software Engineering Principles */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Key Software Engineering Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="font-semibold text-primary mb-2">DRY Principle</h3>
              <p className="text-sm text-secondary">Don&apos;t Repeat Yourself - Reduce code duplication</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Layers className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-primary mb-2">SOLID Principles</h3>
              <p className="text-sm text-secondary">Five design principles for maintainable code</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Settings className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="font-semibold text-primary mb-2">KISS Principle</h3>
              <p className="text-sm text-secondary">Keep It Simple, Stupid - Favor simple solutions</p>
            </div>
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