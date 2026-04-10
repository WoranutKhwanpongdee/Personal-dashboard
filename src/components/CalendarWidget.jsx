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
    
    // วันก่อนหน้า
    for (let i = firstDay.getDay(); i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // วันในเดือนปัจจุบัน
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    // วันถัดไป
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          ปฏิทิน
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`
              text-center py-2 rounded-lg text-sm
              ${!day.isCurrentMonth && 'text-gray-400 dark:text-gray-600'}
              ${isToday(day.date) && 'bg-blue-500 text-white font-bold'}
              ${day.isCurrentMonth && !isToday(day.date) && 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}
