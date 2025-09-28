'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Database, Play, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

export default function SQLPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM students;')
  const [queryResult, setQueryResult] = useState('')

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const runSQLQuery = () => {
    // Simulate SQL query execution
    const sampleResults = [
      'Query executed successfully!',
      'Results:',
      '| ID | Name     | Grade |',
      '|----|----------|-------|',
      '| 1  | Alice    | A     |',
      '| 2  | Bob      | B+    |',
      '| 3  | Charlie  | A-    |',
    ].join('\n')
    
    setQueryResult(sampleResults)
  }

  const resetQuery = () => {
    setSqlQuery('SELECT * FROM students;')
    setQueryResult('')
  }

  const sqlSections = [
    {
      id: 'basics',
      title: 'SQL Basics',
      content: (
        <div className="space-y-4">
          <p className="text-secondary">
            SQL (Structured Query Language) is a programming language designed for managing and manipulating relational databases.
          </p>
          <ul className="list-disc list-inside text-secondary space-y-2">
            <li>SELECT: Retrieve data from tables</li>
            <li>INSERT: Add new data to tables</li>
            <li>UPDATE: Modify existing data</li>
            <li>DELETE: Remove data from tables</li>
            <li>CREATE: Create new tables or databases</li>
            <li>ALTER: Modify table structure</li>
          </ul>
        </div>
      )
    },
    {
      id: 'select',
      title: 'SELECT Statements',
      content: (
        <div className="space-y-4">
          <p className="text-secondary">The SELECT statement is used to query data from one or more tables.</p>
          <div className="bg-tertiary rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Basic Syntax:</h4>
            <pre className="text-sm text-secondary">
{`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column1 ASC/DESC;`}
            </pre>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Examples:</h4>
            <pre className="text-sm text-blue-700 dark:text-blue-300">
{`-- Select all columns from students table
SELECT * FROM students;

-- Select specific columns
SELECT name, age FROM students;

-- Select with condition
SELECT * FROM students WHERE age > 18;`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'joins',
      title: 'JOIN Operations',
      content: (
        <div className="space-y-4">
          <p className="text-secondary">JOINs combine rows from multiple tables based on related columns.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">INNER JOIN</h4>
              <p className="text-sm text-green-700 dark:text-green-300">Returns records with matching values in both tables.</p>
              <pre className="text-xs mt-2 text-green-600 dark:text-green-400">
{`SELECT s.name, c.course_name
FROM students s
INNER JOIN courses c
ON s.course_id = c.id;`}
              </pre>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">LEFT JOIN</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">Returns all records from left table, matching from right.</p>
              <pre className="text-xs mt-2 text-purple-600 dark:text-purple-400">
{`SELECT s.name, c.course_name
FROM students s
LEFT JOIN courses c
ON s.course_id = c.id;`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'functions',
      title: 'SQL Functions',
      content: (
        <div className="space-y-4">
          <p className="text-secondary">SQL provides built-in functions for data manipulation and analysis.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-tertiary rounded-lg p-3">
              <h4 className="font-semibold text-primary mb-2">Aggregate Functions</h4>
              <ul className="text-sm text-secondary space-y-1">
                <li>COUNT()</li>
                <li>SUM()</li>
                <li>AVG()</li>
                <li>MIN()</li>
                <li>MAX()</li>
              </ul>
            </div>
            <div className="bg-tertiary rounded-lg p-3">
              <h4 className="font-semibold text-primary mb-2">String Functions</h4>
              <ul className="text-sm text-secondary space-y-1">
                <li>CONCAT()</li>
                <li>UPPER()</li>
                <li>LOWER()</li>
                <li>LENGTH()</li>
                <li>SUBSTRING()</li>
              </ul>
            </div>
            <div className="bg-tertiary rounded-lg p-3">
              <h4 className="font-semibold text-primary mb-2">Date Functions</h4>
              <ul className="text-sm text-secondary space-y-1">
                <li>NOW()</li>
                <li>DATE()</li>
                <li>YEAR()</li>
                <li>MONTH()</li>
                <li>DAY()</li>
              </ul>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Database className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            SQL Database Guide
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Master SQL fundamentals with interactive examples and practical exercises
          </p>
        </motion.div>

        {/* Interactive SQL Query Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-secondary border border-secondary rounded-2xl p-6 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Try SQL Queries</h2>
          <p className="text-secondary mb-4">Write and execute SQL queries in the editor below:</p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">SQL Query Editor</label>
              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full h-32 p-3 bg-tertiary border border-secondary rounded-xl text-primary font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your SQL query here..."
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={runSQLQuery}
                  className="primary-btn px-4 py-2 text-sm inline-flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Run Query
                </button>
                <button
                  onClick={resetQuery}
                  className="px-4 py-2 text-sm bg-tertiary text-secondary border border-secondary rounded-full hover:bg-secondary transition-colors inline-flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">Query Results</label>
              <div className="bg-gray-900 text-green-400 p-3 rounded-xl h-32 overflow-auto font-mono text-sm">
                {queryResult || 'Click "Run Query" to see results...'}
              </div>
            </div>
          </div>
        </motion.section>

        {/* SQL Concepts Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {sqlSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-secondary border border-secondary rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-tertiary transition-colors duration-200 flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
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

        {/* Quick Reference */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">Common Data Types</h3>
              <ul className="text-sm text-secondary space-y-1">
                <li><code className="bg-tertiary px-1 rounded">INT</code> - Integer numbers</li>
                <li><code className="bg-tertiary px-1 rounded">VARCHAR(n)</code> - Variable-length strings</li>
                <li><code className="bg-tertiary px-1 rounded">DATE</code> - Date values</li>
                <li><code className="bg-tertiary px-1 rounded">DECIMAL(p,s)</code> - Decimal numbers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Useful Keywords</h3>
              <ul className="text-sm text-secondary space-y-1">
                <li><code className="bg-tertiary px-1 rounded">DISTINCT</code> - Remove duplicates</li>
                <li><code className="bg-tertiary px-1 rounded">LIMIT</code> - Limit number of results</li>
                <li><code className="bg-tertiary px-1 rounded">GROUP BY</code> - Group rows</li>
                <li><code className="bg-tertiary px-1 rounded">HAVING</code> - Filter groups</li>
              </ul>
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