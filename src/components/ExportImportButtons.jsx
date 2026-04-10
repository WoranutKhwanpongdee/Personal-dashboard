import React from 'react'
import { Download, Upload, Trash2 } from 'lucide-react'

export default function ExportImportButtons({ todos, setTodos, setNotes }) {
  const exportData = () => {
    const data = {
      todos: todos,
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.todos) setTodos(data.todos)
        if (data.notes) localStorage.setItem('notes', JSON.stringify(data.notes))
        alert('นำเข้าข้อมูลสำเร็จ!')
        window.location.reload()
      } catch (error) {
        alert('ไฟล์ไม่ถูกต้อง')
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลทั้งหมด? (Todo + Notes)')) {
      localStorage.removeItem('todos')
      localStorage.removeItem('notes')
      alert('ลบข้อมูลเรียบร้อย')
      window.location.reload()
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={exportData} className="glass-button px-3 py-2 text-white text-sm flex items-center gap-1">
        <Download className="w-4 h-4" />
        Backup
      </button>
      <label className="glass-button px-3 py-2 text-white text-sm flex items-center gap-1 cursor-pointer">
        <Upload className="w-4 h-4" />
        Restore
        <input type="file" accept=".json" onChange={importData} className="hidden" />
      </label>
      <button onClick={clearAllData} className="glass-button px-3 py-2 text-red-300 text-sm flex items-center gap-1 hover:text-red-200">
        <Trash2 className="w-4 h-4" />
        ล้างข้อมูล
      </button>
    </div>
  )
}