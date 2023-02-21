import React, { useState } from "react";

export default function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({})
    // const weatherDataRef = useRef(null)
    const getWeatherData = async (e) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
            const data = await response.json()  
            setWeatherData(data)
    }
    return (
        <React.Fragment>
            <h1>Weather App</h1>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value.trim())}
            />
            <button 
                onClick={getWeatherData}
                
            >Get weather</button>
            <p>City : {weatherData.name ? weatherData.name : ''}</p>
            <p>Temperature : {weatherData.main ? weatherData.main.temp : ''}</p>
        </React.Fragment>
    );
}