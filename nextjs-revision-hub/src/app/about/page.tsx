'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Users, Target, Award, Mail, Github, ExternalLink } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Educational Excellence',
      description: 'Comprehensive ICT curriculum designed for DSE preparation and beyond.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Interactive Learning',
      description: 'Hands-on practice with real-time feedback and interactive exercises.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Focused Content',
      description: 'Targeted resources covering all essential ICT topics and concepts.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Proven Results',
      description: 'Track record of helping students excel in ICT examinations.'
    }
  ]

  const teamMembers = [
    {
      name: 'HPCSS ICT Department',
      role: 'Educational Team',
      description: 'Dedicated educators passionate about technology and learning.',
      image: '👨‍💻'
    }
  ]

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About HPCSS ICT
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Empowering students with comprehensive ICT education through innovative learning platforms 
            and interactive resources designed for academic excellence.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-secondary rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Our Mission</h2>
          <p className="text-secondary text-center max-w-4xl mx-auto text-lg leading-relaxed">
            To provide accessible, high-quality ICT education that prepares students for success in the DSE 
            examination and equips them with essential digital literacy skills for the 21st century. We believe 
            in making learning engaging, interactive, and practical.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-secondary rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-secondary text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subjects Covered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Subjects Covered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Database Management (SQL)',
              'Computer Hardware',
              'Software Engineering',
              'Web Development (HTML/JavaScript)',
              'Data Processing Modes',
              'ICT in Business',
              'System Analysis & Design',
              'Computer Networks',
              'Programming Fundamentals'
            ].map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-primary font-medium">{subject}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Team</h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-secondary rounded-xl p-6 text-center max-w-sm"
              >
                <div className="text-4xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-secondary text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-secondary rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Get In Touch</h2>
          <p className="text-secondary mb-6">
            Have questions or suggestions? We&apos;d love to hear from you!
          </p>
          <div className="flex justify-center space-x-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="h-4 w-4" />
              Contact Us
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              <Github className="h-4 w-4" />
              GitHub
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}