import { useEffect } from 'react'

export function useKeyboardShortcuts({ onAddTodo, onToggleTheme, onOpenHelp }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + T: เพิ่ม Todo
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault()
        onAddTodo?.()
      }
      // Ctrl/Cmd + D: Toggle Dark/Light
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        onToggleTheme?.()
      }
      // ?: แสดง Help
      if (e.key === '?') {
        e.preventDefault()
        onOpenHelp?.()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onAddTodo, onToggleTheme, onOpenHelp])
}