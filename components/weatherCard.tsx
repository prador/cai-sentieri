import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import sunnyAnimation from './lottie-icons/sunny.json'
import cloudyAnimation from './lottie-icons/cloudy.json'
import cloudAnimation from './lottie-icons/cloud.json'
import rainAnimation from './lottie-icons/rain.json'

const getWeatherIcon = description => {
  switch (description) {
    case 'clear sky':
      return <Lottie animationData={sunnyAnimation} height={100} width={100} />
    case 'few clouds':
    case 'scattered clouds':
      return <Lottie animationData={cloudyAnimation} height={100} width={100} />
    case 'broken clouds':
    case 'overcast clouds':
      return <Lottie animationData={cloudAnimation} height={100} width={100} />
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
      return <Lottie animationData={rainAnimation} height={100} width={100} />
    default:
      return <div>help</div>
  }
}

const WeatherCard = ({ data }: { data: any }) => {
  const [weatherData, setWeatherData] = useState<any>()
  const fetchWeather = city => {
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`)
      .then(response => response.json())
      .then(weatherData => {
        const weatherDeets = {
          city: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          temp_min: weatherData.main.temp_min,
          temp_max: weatherData.main.temp_max,
          wind_speed: weatherData.wind.speed,
          temperatureCelsius: (Number(weatherData.main.temp) - 273.15).toFixed(2),
          minTemperatureCelsius: (Number(weatherData.main.temp_min) - 273.15).toFixed(2),
          maxTemperatureCelsius: (Number(weatherData.main.temp_max) - 273.15).toFixed(2),
        }
        setWeatherData(weatherDeets)
        return weatherDeets
      })
    return response
  }
  useEffect(() => {
    fetchWeather('tortona')
  }, [])
  // const weatherData: any = fetchWeather("tortona")
  console.log(weatherData)

  return (
    <div className="weather-card">
      <h2>{weatherData?.city}</h2>
      <div className="h-36 w-36">{getWeatherIcon(weatherData?.description)}</div>
      <h6>{weatherData?.description}</h6>
      <h4>{weatherData?.temperatureCelsius}°</h4>
      <p>
        {weatherData?.minTemperatureCelsius}°/{weatherData?.maxTemperatureCelsius}°
      </p>
      <div>
        Humidity {weatherData?.humidity}% <br />
        Wind Speed {weatherData?.wind_speed} M/s
      </div>
    </div>
  )
}

export default WeatherCard
