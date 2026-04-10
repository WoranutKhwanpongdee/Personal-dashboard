import React, { useState } from 'react'
import { Cloud, Droplets, Wind, MapPin, RefreshCw, Thermometer } from 'lucide-react'
import { useWeather } from '../hooks/useWeather'

export default function WeatherWidget() {
  const [city, setCity] = useState('Bangkok')
  const [inputCity, setInputCity] = useState('Bangkok')
  const { weather, loading, error } = useWeather(city)

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputCity.trim()) {
      setCity(inputCity.trim())
    }
  }

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Cloud className="w-5 h-5 text-blue-300" />
          สภาพอากาศ
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="ชื่อเมือง..."
            className="glass-input px-3 py-1 text-sm text-white placeholder-white/50"
          />
          <button type="submit" className="glass-button p-2 text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center py-8 text-white/70">กำลังโหลด...</div>
      )}

      {error && (
        <div className="text-center py-8 text-red-300">{error}</div>
      )}

      {weather && !loading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1 text-white/70 mb-1">
                <MapPin className="w-4 h-4" />
                <span>{weather.name}, {weather.sys.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-yellow-300" />
                <span className="text-4xl font-bold text-white">{Math.round(weather.main.temp)}°C</span>
              </div>
              <div className="text-white/70 capitalize mt-1">
                {weather.weather[0].description}
              </div>
            </div>
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].description}
              className="w-16 h-16 drop-shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Droplets className="w-4 h-4 text-blue-300" />
              <span>ความชื้น: {weather.main.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Wind className="w-4 h-4 text-gray-300" />
              <span>ลม: {Math.round(weather.wind.speed)} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}