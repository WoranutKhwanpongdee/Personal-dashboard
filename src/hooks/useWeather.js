import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = '179b4de1ab71a18fc44152d42c3b5d9c' 

export function useWeather(city = 'Bangkok') {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=th`
        )
        setWeather(response.data)
        setError(null)
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลสภาพอากาศได้')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading, error }
}
