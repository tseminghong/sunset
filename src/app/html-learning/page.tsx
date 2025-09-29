'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Code, Eye, Play, RotateCcw, Copy, Check } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HTMLLearningPage() {
  const { t } = useLanguage()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .highlight {
            background-color: yellow;
            padding: 2px 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Learning!</h1>
        <p>This is a <strong>paragraph</strong> with some <em>emphasized text</em>.</p>
        <p>Here's a <span class="highlight">highlighted section</span> of text.</p>
        
        <h2>My Favorite Foods:</h2>
        <ul>
            <li>Pizza</li>
            <li>Ice Cream</li>
            <li>Chocolate</li>
        </ul>
        
        <h2>Learning Resources:</h2>
        <ol>
            <li><a href="https://www.w3schools.com/html/">W3Schools HTML Tutorial</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN Web Docs</a></li>
        </ol>
        
        <p><button onclick="alert('Hello from HTML!')">Click me!</button></p>
    </div>
</body>
</html>`)
  const [copiedCode, setCopiedCode] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const resetCode = () => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`)
  }

  const htmlSections = [
    {
      id: 'basics',
      title: t('courses.html.sections.basics'),
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            HTML (HyperText Markup Language) is the standard markup language for creating web pages.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Key Concepts</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li>• <strong>Elements:</strong> Building blocks of HTML</li>
                <li>• <strong>Tags:</strong> Markup that defines elements</li>
                <li>• <strong>Attributes:</strong> Additional information about elements</li>
                <li>• <strong>Content:</strong> Text and media between tags</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">HTML Structure</h4>
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3 text-xs">
                <pre className="text-green-700 dark:text-green-300">
{`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Heading</h1>
    <p>Paragraph</p>
  </body>
</html>`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Common HTML Tags</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { tag: '<h1> - <h6>', desc: 'Headings (largest to smallest)' },
                { tag: '<p>', desc: 'Paragraphs of text' },
                { tag: '<a>', desc: 'Links to other pages' },
                { tag: '<img>', desc: 'Images' },
                { tag: '<ul>, <ol>', desc: 'Unordered and ordered lists' },
                { tag: '<div>', desc: 'Generic container element' },
                { tag: '<span>', desc: 'Inline container' },
                { tag: '<br>', desc: 'Line break' },
                { tag: '<strong>', desc: 'Important text (bold)' },
                { tag: '<em>', desc: 'Emphasized text (italic)' }
              ].map((item, index) => (
                <div key={index} className="bg-purple-100 dark:bg-purple-800/30 rounded p-2">
                  <code className="text-xs font-mono text-purple-800 dark:text-purple-200 block mb-1">
                    {item.tag}
                  </code>
                  <p className="text-xs text-purple-700 dark:text-purple-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'attributes',
      title: t('courses.html.sections.attributes'),
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            HTML attributes provide additional information about elements and are specified in the opening tag.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Global Attributes</h4>
              <div className="space-y-2">
                <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                  <code className="text-sm font-mono text-red-800 dark:text-red-200">id</code>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    Unique identifier for an element
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                  <code className="text-sm font-mono text-red-800 dark:text-red-200">class</code>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    CSS class name(s) for styling
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                  <code className="text-sm font-mono text-red-800 dark:text-red-200">style</code>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    Inline CSS styling
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/30 rounded p-2">
                  <code className="text-sm font-mono text-red-800 dark:text-red-200">title</code>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    Tooltip text on hover
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Specific Attributes</h4>
              <div className="space-y-2">
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded p-2">
                  <code className="text-sm font-mono text-yellow-800 dark:text-yellow-200">href</code>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Link destination (&lt;a&gt; tag)
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded p-2">
                  <code className="text-sm font-mono text-yellow-800 dark:text-yellow-200">src</code>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Image source (&lt;img&gt; tag)
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded p-2">
                  <code className="text-sm font-mono text-yellow-800 dark:text-yellow-200">alt</code>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Alternative text (&lt;img&gt; tag)
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded p-2">
                  <code className="text-sm font-mono text-yellow-800 dark:text-yellow-200">target</code>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Link target window (&lt;a&gt; tag)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-3">Attribute Examples</h4>
            <div className="bg-teal-100 dark:bg-teal-800/30 rounded-lg p-3">
              <pre className="text-sm text-teal-700 dark:text-teal-300">
{`<!-- Link with attributes -->
<a href="https://www.example.com" target="_blank" title="Visit Example">
  Click here
</a>

<!-- Image with attributes -->
<img src="photo.jpg" alt="A beautiful sunset" width="400" height="300">

<!-- Div with class and id -->
<div id="header" class="navigation-bar main-header">
  Content here
</div>`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'forms',
      title: t('courses.html.sections.forms'),
      content: (
        <div className="space-y-6">
          <p className="text-secondary">
            HTML forms collect user input and send data to web servers for processing.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Form Elements</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded p-2">
                  <code className="text-indigo-800 dark:text-indigo-200">&lt;input&gt;</code>
                  <span className="text-indigo-700 dark:text-indigo-300 ml-2">Text, password, email, etc.</span>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded p-2">
                  <code className="text-indigo-800 dark:text-indigo-200">&lt;textarea&gt;</code>
                  <span className="text-indigo-700 dark:text-indigo-300 ml-2">Multi-line text input</span>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded p-2">
                  <code className="text-indigo-800 dark:text-indigo-200">&lt;select&gt;</code>
                  <span className="text-indigo-700 dark:text-indigo-300 ml-2">Dropdown menu</span>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded p-2">
                  <code className="text-indigo-800 dark:text-indigo-200">&lt;button&gt;</code>
                  <span className="text-indigo-700 dark:text-indigo-300 ml-2">Clickable button</span>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-3">Input Types</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'text', 'password', 'email', 'number',
                  'date', 'checkbox', 'radio', 'file',
                  'submit', 'reset', 'button', 'hidden'
                ].map(type => (
                  <div key={type} className="bg-pink-100 dark:bg-pink-800/30 rounded px-2 py-1">
                    <code className="text-pink-800 dark:text-pink-200">{type}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-3">Complete Form Example</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              <pre>
{`<form action="/submit" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="1" max="120">
  </div>
  
  <div>
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="hk">Hong Kong</option>
      <option value="cn">China</option>
      <option value="us">United States</option>
    </select>
  </div>
  
  <div>
    <input type="checkbox" id="newsletter" name="newsletter">
    <label for="newsletter">Subscribe to newsletter</label>
  </div>
  
  <div>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</form>`}
              </pre>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            {t('courses.html.title')}
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            {t('courses.html.description')}
          </p>
        </motion.div>

        {/* Interactive HTML Editor */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-secondary border border-secondary rounded-2xl p-6 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">{t('courses.html.editor.title')}</h2>
          <p className="text-secondary mb-6">
            {t('courses.html.editor.description')}
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* HTML Editor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-secondary">{t('courses.html.editor.codeLabel')}</label>
                <div className="flex gap-2">
                  <button
                    onClick={copyCode}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={resetCode}
                    className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                </div>
              </div>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-96 p-3 bg-gray-900 text-green-400 font-mono text-sm resize-none rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your HTML code here..."
              />
            </div>
            
            {/* Live Preview */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-secondary">{t('courses.html.editor.previewLabel')}</label>
              <div className="bg-white border border-secondary rounded-xl h-96 overflow-auto">
                <iframe
                  srcDoc={htmlCode}
                  title="HTML Preview"
                  className="w-full h-full border-0 rounded-xl"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Try These Examples:</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { label: 'Add a heading', code: '<h2>My New Heading</h2>' },
                { label: 'Create a link', code: '<a href="https://google.com">Visit Google</a>' },
                { label: 'Insert an image', code: '<img src="https://via.placeholder.com/200" alt="Sample">' },
                { label: 'Make a list', code: '<ul><li>Item 1</li><li>Item 2</li></ul>' },
                { label: 'Add a button', code: '<button onclick="alert(\'Hello!\')">Click Me</button>' },
                { label: 'Create a table', code: '<table border="1"><tr><th>Name</th><th>Age</th></tr><tr><td>John</td><td>25</td></tr></table>' }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setHtmlCode(prev => prev + '\n' + example.code)}
                  className="text-left p-2 bg-blue-100 dark:bg-blue-800/30 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-700/30 transition-colors"
                >
                  <div className="font-medium text-blue-800 dark:text-blue-200">{example.label}</div>
                  <code className="text-blue-600 dark:text-blue-400 block mt-1 text-xs">{example.code}</code>
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* HTML Learning Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {htmlSections.map((section, index) => (
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

        {/* HTML Resources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">{t('courses.html.resources.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <Code className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-primary mb-2">W3Schools</h3>
              <p className="text-sm text-secondary mb-3">Comprehensive HTML tutorials with examples</p>
              <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Visit W3Schools →
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <Eye className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-primary mb-2">MDN Web Docs</h3>
              <p className="text-sm text-secondary mb-3">Mozilla&apos;s official web development documentation</p>
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer"
                 className="text-green-600 hover:text-green-800 text-sm font-medium">
                Visit MDN →
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <Play className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-primary mb-2">CodePen</h3>
              <p className="text-sm text-secondary mb-3">Online code editor for front-end development</p>
              <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer"
                 className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Visit CodePen →
              </a>
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