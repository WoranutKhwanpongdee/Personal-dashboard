import React, { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'

export default function KeyboardHelp() {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?') {
        setShowHelp(true)
      }
      if (e.key === 'Escape') {
        setShowHelp(false)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!showHelp) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
      <div className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
          </div>
          <button onClick={() => setShowHelp(false)} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/80">เพิ่ม Todo ใหม่</span>
            <kbd className="glass-button px-2 py-1 text-sm">Ctrl/Cmd + T</kbd>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/80">เปลี่ยนธีม Dark/Light</span>
            <kbd className="glass-button px-2 py-1 text-sm">Ctrl/Cmd + D</kbd>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white/80">เปิด Help นี้</span>
            <kbd className="glass-button px-2 py-1 text-sm">?</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">ปิด Help</span>
            <kbd className="glass-button px-2 py-1 text-sm">Esc</kbd>
          </div>
        </div>
        <div className="mt-4 text-center text-white/40 text-xs">
          กด ? เพื่อเปิด Help อีกครั้ง
        </div>
      </div>
    </div>
  )
}