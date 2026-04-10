import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    for (let i = firstDay.getDay(); i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
  const today = new Date()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const isToday = (date) => {
    return date.toDateString() === today.toDateString()
  }

  const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5 text-green-300" />
          ปฏิทิน
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="glass-button p-2 text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-white font-medium px-2">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
          </span>
          <button onClick={nextMonth} className="glass-button p-2 text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-white/60 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`
              text-center py-2 rounded-lg text-sm transition-all duration-200
              ${!day.isCurrentMonth && 'text-white/30'}
              ${isToday(day.date) && 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg'}
              ${day.isCurrentMonth && !isToday(day.date) && 'text-white/80 hover:bg-white/10 cursor-pointer'}
            `}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}