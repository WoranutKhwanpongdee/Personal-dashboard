import React, { useState, useEffect } from 'react'
import { Sun, Moon, Cloud, Sparkles } from 'lucide-react'

export default function Greeting() {
  const [greeting, setGreeting] = useState('')
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('สวัสดีตอนเช้า')
      setIcon(<Sun className="w-6 h-6 text-yellow-400" />)
    } else if (hour < 18) {
      setGreeting('สวัสดีตอนบ่าย')
      setIcon(<Cloud className="w-6 h-6 text-blue-300" />)
    } else {
      setGreeting('สวัสดีตอนเย็น')
      setIcon(<Moon className="w-6 h-6 text-indigo-300" />)
    }
  }, [])

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-white text-lg font-semibold">{greeting}</h3>
          <p className="text-white/60 text-sm">ขอให้เป็นวันที่ดีนะครับ/นะคะ</p>
        </div>
        <Sparkles className="w-4 h-4 text-yellow-400 ml-auto animate-pulse" />
      </div>
    </div>
  )
}