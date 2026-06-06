import { useState, useEffect } from 'react'
import { Menu, X, Home, BookOpen, Gamepad2, Newspaper, FileText, MessageCircle, TrendingUp } from 'lucide-react'
import SubjectsPage from './pages/SubjectsPage'
import RoadmapPage from './pages/RoadmapPage'
import GamePage from './pages/GamePage'
import TrendsPage from './pages/TrendsPage'
import NotesPage from './pages/NotesPage'
import PinkyAIPage from './pages/PinkyAIPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pages = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
    { id: 'game', label: 'Anthro Game', icon: Gamepad2 },
    { id: 'trends', label: 'Trends', icon: Newspaper },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'pinky', label: 'Pinky AI', icon: MessageCircle },
  ]

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <DashboardPage />
      case 'subjects': return <SubjectsPage />
      case 'roadmap': return <RoadmapPage />
      case 'game': return <GamePage />
      case 'trends': return <TrendsPage />
      case 'notes': return <NotesPage />
      case 'pinky': return <PinkyAIPage />
      default: return <DashboardPage />
    }
  }

  return (
    <div className="min-h-screen bg-architecture-dark text-architecture-light">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-architecture-blue/80 backdrop-blur-md border-b border-architecture-accent/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-architecture-accent to-architecture-gold rounded-lg flex items-center justify-center font-bold text-architecture-dark">
              AP
            </div>
            <h1 className="text-2xl font-bold gradient-text">ArchVision Pro</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {pages.map(page => {
              const Icon = page.icon
              return (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === page.id
                      ? 'bg-architecture-accent text-white'
                      : 'hover:bg-architecture-accent/20'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{page.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-architecture-accent/20 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-architecture-accent/30 bg-architecture-dark/95 animate-slideIn">
            <div className="px-4 py-3 space-y-2">
              {pages.map(page => {
                const Icon = page.icon
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      setCurrentPage(page.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      currentPage === page.id
                        ? 'bg-architecture-accent text-white'
                        : 'hover:bg-architecture-accent/20'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{page.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-architecture-accent/30 bg-architecture-blue/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">ArchVision Pro</h3>
              <p className="text-sm text-architecture-light/70">
                Your complete companion for becoming a professional architect
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-architecture-light/70">
                <li><a href="#" className="hover:text-architecture-accent">Documentation</a></li>
                <li><a href="#" className="hover:text-architecture-accent">Resources</a></li>
                <li><a href="#" className="hover:text-architecture-accent">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Version</h4>
              <p className="text-sm text-architecture-light/70">v1.0.0 • 2024</p>
              <p className="text-xs text-architecture-light/50 mt-2">Made for Architecture Students</p>
            </div>
          </div>
          <div className="border-t border-architecture-accent/30 mt-8 pt-8 text-center text-sm text-architecture-light/50">
            <p>&copy; 2024 ArchVision Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
