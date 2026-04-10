import React, { useState, useEffect } from 'react'
import { Quote, RefreshCw, Sparkles } from 'lucide-react'
import axios from 'axios'

const fallbackQuotes = [
  "ความสำเร็จไม่ได้เกิดจากความบังเอิญ แต่มันเกิดจากความพยายาม",
  "จงเป็นตัวของตัวเองที่ดีที่สุดในรุ่นของคุณ",
  "ทุกปัญหามักมีทางออกเสมอ",
  "การเรียนรู้ไม่มีวันสิ้นสุด",
  "วันนี้ดีที่สุดที่จะเริ่มต้น"
]

export default function QuoteWidget() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.quotable.io/random')
      setQuote({ text: response.data.content, author: response.data.author })
    } catch (error) {
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length)
      setQuote({ text: fallbackQuotes[randomIndex], author: 'คำคมแนะนำ' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Quote className="w-5 h-5 text-yellow-300" />
          คำคมประจำวัน
        </h2>
        <button
          onClick={fetchQuote}
          className="glass-button p-2 text-white"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-white/50">
          <Sparkles className="w-8 h-8 mx-auto mb-2 animate-pulse" />
          กำลังโหลดคำคม...
        </div>
      ) : (
        quote && (
          <div>
            <p className="text-lg italic text-white/90 mb-3 leading-relaxed">
              "{quote.text}"
            </p>
            <p className="text-right text-white/60">
              — {quote.author}
            </p>
          </div>
        )
      )}
    </div>
  )
}