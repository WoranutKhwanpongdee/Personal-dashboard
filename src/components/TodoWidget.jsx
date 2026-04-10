import React, { useState } from 'react'
import { CheckSquare, Plus, Trash2, Check, Sparkles } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function TodoWidget() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  }

  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <CheckSquare className="w-5 h-5 text-purple-300" />
          รายการที่ต้องทำ
        </h2>
        <div className="flex gap-1 text-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === 'all' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            ทั้งหมด ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === 'active' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            ค้าง ({stats.active})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === 'completed' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            เสร็จ ({stats.completed})
          </button>
        </div>
      </div>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          id="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เพิ่มรายการใหม่..."
          className="glass-input flex-1 px-4 py-2 text-white placeholder-white/50"
        />
        <button type="submit" className="glass-button px-4 py-2 text-white hover:bg-white/30">
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTodos.length === 0 && (
          <div className="text-center py-8 text-white/50">
            <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
            ไม่มีรายการในหมวดหมู่นี้
          </div>
        )}
        {filteredTodos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-all group">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                ${todo.completed 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent' 
                  : 'border-white/40 hover:border-green-400'
                }`}
            >
              {todo.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className={`flex-1 text-white/90 ${todo.completed ? 'line-through text-white/40' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-200 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}