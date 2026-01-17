import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Cloud, Droplets, Wind, Thermometer, Eye, Gauge, Calendar, MapPin, Download } from 'lucide-react';

/**
 * Weather modal - displays detailed weather information and forecasts
 */
export const WeatherModal = ({ isOpen, onClose, lat = 52.1986, lng = 8.5911, location = 'Bünde, Germany', initialForecastDays = 5 }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastDays, setForecastDays] = useState(initialForecastDays);

  // Fetch weather data from OpenWeatherMap API
  // Note: In production, you'd want to use environment variables for the API key
  const fetchWeather = async (days = 5) => {
    setLoading(true);
    try {
      // OpenWeatherMap API call
      // You'll need to add your API key: VITE_OPENWEATHER_API_KEY in .env
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';
      
      if (apiKey === 'demo') {
        // Demo data for development
        setWeatherData({
          temp: 15.5,
          feels_like: 14.2,
          humidity: 68,
          pressure: 1013,
          visibility: 10000,
          wind_speed: 3.2,
          wind_deg: 245,
          clouds: 40,
          description: 'partly cloudy',
          main: 'Clouds',
          icon: '02d'
        });
        
        // Generate demo forecast
        const forecast = [];
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          forecast.push({
            date: date.toISOString().split('T')[0],
            temp_max: 15 + Math.floor(Math.random() * 8),
            temp_min: 8 + Math.floor(Math.random() * 5),
            description: ['clear', 'cloudy', 'rainy', 'partly cloudy'][Math.floor(Math.random() * 4)],
            humidity: 60 + Math.floor(Math.random() * 30),
            wind_speed: 2 + Math.random() * 4,
          });
        }
        setForecastData(forecast);
        setLoading(false);
        return;
      }

      // Real API call (when API key is available)
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );
      const currentData = await currentResponse.json();
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&cnt=${days * 8}`
      );
      const forecastData = await forecastResponse.json();

      setWeatherData({
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        visibility: currentData.visibility / 1000, // Convert to km
        wind_speed: currentData.wind?.speed || 0,
        wind_deg: currentData.wind?.deg || 0,
        clouds: currentData.clouds?.all || 0,
        description: currentData.weather[0]?.description || 'unknown',
        main: currentData.weather[0]?.main || 'Unknown',
        icon: currentData.weather[0]?.icon || '01d'
      });

      // Process forecast data
      const dailyForecast = [];
      const grouped = {};
      forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!grouped[date]) {
          grouped[date] = {
            date,
            temps: [],
            descriptions: [],
            humidities: [],
            wind_speeds: [],
          };
        }
        grouped[date].temps.push(item.main.temp);
        grouped[date].descriptions.push(item.weather[0].description);
        grouped[date].humidities.push(item.main.humidity);
        grouped[date].wind_speeds.push(item.wind?.speed || 0);
      });

      Object.values(grouped).slice(0, days).forEach(day => {
        dailyForecast.push({
          date: day.date,
          temp_max: Math.max(...day.temps),
          temp_min: Math.min(...day.temps),
          description: day.descriptions[Math.floor(day.descriptions.length / 2)],
          humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
          wind_speed: (day.wind_speeds.reduce((a, b) => a + b, 0) / day.wind_speeds.length).toFixed(1),
        });
      });

      setForecastData(dailyForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Use demo data on error
      fetchWeather(days);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWeather(forecastDays);
    }
  }, [isOpen, forecastDays, lat, lng]);

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="WEATHER FORECAST" className="max-w-4xl">
      <div className="space-y-4">
        {/* Location Header */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#0088ff]" />
            <span className="font-mono text-white">{location}</span>
            <span className="text-xs text-slate-500">({lat.toFixed(4)}, {lng.toFixed(4)})</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={forecastDays}
              onChange={(e) => setForecastDays(parseInt(e.target.value))}
              className="px-2 py-1 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs font-mono"
            >
              <option value={3}>3 Days</option>
              <option value={5}>5 Days</option>
              <option value={7}>7 Days</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchWeather(forecastDays)}
              disabled={loading}
            >
              REFRESH
            </Button>
          </div>
        </div>

        {loading && !weatherData ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0088ff] mx-auto mb-4"></div>
            <div className="text-sm text-slate-400">Loading weather data...</div>
          </div>
        ) : weatherData ? (
          <>
            {/* Current Weather */}
            <div className="grid grid-cols-4 gap-3">
              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer size={14} className="text-[#0088ff]" />
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Temperature</div>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{Math.round(weatherData.temp)}°C</div>
                <div className="text-xs text-slate-400 mt-1">Feels like {Math.round(weatherData.feels_like)}°C</div>
              </div>

              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets size={14} className="text-[#0088ff]" />
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Humidity</div>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{weatherData.humidity}%</div>
                <div className="text-xs text-slate-400 mt-1">Clouds: {weatherData.clouds}%</div>
              </div>

              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-2">
                  <Wind size={14} className="text-[#0088ff]" />
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Wind</div>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{weatherData.wind_speed.toFixed(1)} m/s</div>
                <div className="text-xs text-slate-400 mt-1">{getWindDirection(weatherData.wind_deg)}</div>
              </div>

              <div className="border border-[#1a1a1a] p-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge size={14} className="text-[#0088ff]" />
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Pressure</div>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{weatherData.pressure} hPa</div>
                <div className="text-xs text-slate-400 mt-1">Visibility: {weatherData.visibility?.toFixed(1) || 'N/A'} km</div>
              </div>
            </div>

            {/* Condition */}
            <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <Cloud size={32} className="text-[#0088ff]" />
                <div>
                  <div className="text-lg font-mono text-white uppercase">{weatherData.main}</div>
                  <div className="text-sm text-slate-400 capitalize">{weatherData.description}</div>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-[#0088ff]" />
                <div className="text-xs text-slate-500 uppercase tracking-wide">FORECAST ({forecastDays} DAYS)</div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {forecastData?.map((day, index) => (
                  <div key={index} className="border border-[#1a1a1a] p-3 bg-[#0a0a0a] hover:border-[#0088ff]/30 transition-all">
                    <div className="text-xs text-slate-400 mb-2 font-mono">{formatDate(day.date)}</div>
                    <div className="text-lg font-mono font-bold text-white">{Math.round(day.temp_max)}°</div>
                    <div className="text-xs text-slate-500 font-mono">{Math.round(day.temp_min)}°</div>
                    <div className="text-xs text-slate-400 mt-2 capitalize">{day.description}</div>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{day.humidity}%</span>
                      <span>{day.wind_speed} m/s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <Cloud size={48} className="mx-auto mb-4 opacity-50" />
            <p>No weather data available</p>
            <p className="text-xs mt-2">Add VITE_OPENWEATHER_API_KEY to .env for real data</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
