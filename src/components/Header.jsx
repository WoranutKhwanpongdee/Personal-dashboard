import React from 'react'
import { Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <header className="glass-card p-6 mb-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Personal Dashboard
            </h1>
          </div>
          <p className="text-white/70 mt-1">
            สวัสดีครับ/ค่ะ! ยินดีต้อนรับสู่แดชบอร์ดส่วนตัว
          </p>
        </div>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="glass-button p-3 text-white"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}