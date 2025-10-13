'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface SimpleAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SimpleAuthModal({ isOpen, onClose }: SimpleAuthModalProps) {
  useEffect(() => {
    console.log('SimpleAuthModal - isOpen:', isOpen)
  }, [isOpen])

  if (!isOpen) {
    console.log('SimpleAuthModal - Not rendering (isOpen is false)')
    return null
  }

  console.log('SimpleAuthModal - RENDERING MODAL WITH PORTAL')

  // Use portal to render outside the ScrollSmoother wrapper
  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full relative"
        style={{ zIndex: 100000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ✅ PORTAL MODAL WORKS!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This modal is rendered using React Portal outside the ScrollSmoother wrapper!
        </p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  )
}
