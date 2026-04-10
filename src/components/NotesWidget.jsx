import React, { useState } from 'react'
import { FileText, Plus, Trash2, Save, Edit2 } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function NotesWidget() {
  const [notes, setNotes] = useLocalStorage('notes', [])
  const [newNote, setNewNote] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote, createdAt: new Date().toLocaleString() }])
      setNewNote('')
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setEditingText(note.text)
  }

  const saveEdit = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, text: editingText } : note
    ))
    setEditingId(null)
    setEditingText('')
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-green-300" />
        <h2 className="text-xl font-semibold text-white">โน้ตด่วน</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
          placeholder="พิมพ์โน้ตใหม่..."
          className="glass-input flex-1 px-3 py-2 text-white placeholder-white/50"
        />
        <button onClick={addNote} className="glass-button px-4 py-2 text-white">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {notes.length === 0 && (
          <div className="text-center py-8 text-white/40 text-sm">
            ยังไม่มีโน้ต กด + เพื่อเพิ่มเลย
          </div>
        )}
        {notes.map(note => (
          <div key={note.id} className="bg-white/5 rounded-xl p-3 group">
            {editingId === note.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="glass-input flex-1 px-2 py-1 text-sm text-white"
                  autoFocus
                />
                <button onClick={() => saveEdit(note.id)} className="text-green-300 hover:text-green-200">
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <p className="text-white/90 text-sm flex-1">{note.text}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => startEdit(note)} className="text-blue-300 hover:text-blue-200">
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button onClick={() => deleteNote(note.id)} className="text-red-300 hover:text-red-200">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-white/30 text-xs mt-1">{note.createdAt}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}