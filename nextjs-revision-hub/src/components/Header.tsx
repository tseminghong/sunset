'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Moon, Sun, Menu, X, User } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onAuthClick: () => void
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sql', label: 'SQL' },
    { href: '/software', label: 'Software' },
    { href: '/hardware', label: 'Hardware' },
    { href: '/processing-modes', label: 'Processing' },
    { href: '/dse', label: 'DSE Prep' },
    { href: '/html-learning', label: 'HTML Tool' },
  ]

  const handleUserMenuClick = () => {
    if (user) {
      setIsUserMenuOpen(!isUserMenuOpen)
    } else {
      onAuthClick()
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">HPCSS ICT</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-secondary hover:text-primary font-medium transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Auth button */}
            <div className="relative">
              <button
                onClick={handleUserMenuClick}
                className={cn(
                  "btn-press-effect transition-all duration-300",
                  user
                    ? "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-secondary hover:text-primary border border-secondary font-semibold text-sm"
                    : "primary-btn px-6 py-2"
                )}
              >
                {user ? (
                  <>
                    <User className="h-4 w-4" />
                    {user.username}
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* User dropdown menu */}
              {user && isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-secondary border border-secondary rounded-2xl p-2 shadow-lg z-50">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      onAuthClick()
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-colors btn-press-effect"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-secondary hover:text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  )
}