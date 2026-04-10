import React, { useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Header from './components/Header'
import WeatherWidget from './components/WeatherWidget'
import CalendarWidget from './components/CalendarWidget'
import TodoWidget from './components/TodoWidget'
import QuoteWidget from './components/QuoteWidget'
import Greeting from './components/Greeting'
import NotesWidget from './components/NotesWidget'
import ExportImportButtons from './components/ExportImportButtons'
import KeyboardHelp from './components/KeyboardHelp'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function DashboardContent() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [showHelp, setShowHelp] = useState(false)
  const { darkMode, setDarkMode } = useTheme()

  useKeyboardShortcuts({
    onAddTodo: () => {
      // Focus on todo input
      const todoInput = document.querySelector('#todo-input')
      if (todoInput) todoInput.focus()
    },
    onToggleTheme: () => setDarkMode(!darkMode),
    onOpenHelp: () => setShowHelp(true)
  })

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 animate-gradient">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-300 dark:bg-orange-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <Greeting />
        
        {/* Action Buttons */}
        <div className="flex justify-end mb-4">
          <ExportImportButtons todos={todos} setTodos={setTodos} setNotes={() => {}} />
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <WeatherWidget />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TodoWidget />
          <NotesWidget />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <QuoteWidget />
        </div>
        
        <div className="mt-6 text-center text-white/40 text-xs">
          💡 Tip: กด <kbd className="px-1 py-0.5 bg-white/10 rounded">?</kbd> เพื่อดู Keyboard Shortcuts
        </div>
      </div>
      
      <KeyboardHelp />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  )
}

export default App