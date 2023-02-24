import React, { useState } from "react";

export default function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null)
    const [theme, setTheme] = useState('dark');

    const getWeatherData = async (e) => {
        e.preventDefault();
        const cityName = city.trim()
        if (cityName === ''){
            setError('You need to enter a city name before submitting.')
        } else {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            if (data.cod === '404'){
                setWeatherData(null)
                setError('Sorry the city your entered doet not seem to exists.')
                setCity('')
            } else {
                setWeatherData(data);
                setCity('')
                setError(null)
            }
        }
    };

    const getTime = (timezone) => {
        const date = new Date();
        const localTimeInMilliseconds = date.getTime();
        // multiply by 60_000 to convert minutes to milliseconds
        const localTimeOffsetInMilliseconds = date.getTimezoneOffset() * 60000
        const utcDateInMilliseconds = localTimeInMilliseconds + localTimeOffsetInMilliseconds;
        const clientTime = new Date(utcDateInMilliseconds + (timezone * 1000))
        return `${clientTime.getHours()}h${clientTime.getMinutes()}`
    };

    const deleteWeatherCar = () => {
        setWeatherData(null)
    }

    const toggleTheme = () => {
        setTheme(prevTheme => {
            return prevTheme === 'dark' ? 'warm' : 'dark'
        })
    }

    const toggleBtnStyle = {
        marginRight: theme === 'dark' ? 'auto' : 0,
        marginLeft: theme === 'warm' ? 'auto' : 0,
        padding: theme === 'dark' ? '0 .05em 0 0' : '0 0.05em 0 0',
    }

    return (
        <main className={`main--container ${theme === 'warm' ? 'main--container__warm': ''}`}>
            <div className="top-section">
                <form className="form">
                    <input
                        placeholder="Type a city..."
                        id="city"
                        className={`form--input ${error ? 'form--input__error' : ''} ${theme === 'warm' ? 'form--input__warm': ''}`}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={getWeatherData} className={`form--btn ${error ? 'form--btn__error' : ''} ${theme === 'warm' ? 'form--btn__warm': ''}`}>
                        <i className="ri-search-line"></i>
                    </button>
                </form>
                <div 
                    onClick={toggleTheme}
                    className={`toggle-theme--wrapper ${theme === 'warm' ? 'toggle-theme--wrapper__warm' : ''}`}
                >
                    <div
                        style={toggleBtnStyle} 
                        className={`toggle-theme--btn ${theme === 'warm' ? 'toggle-theme--btn__warm' : ''}`}
                    ></div>
                </div>
            </div>
            { error ? <p className="error-search">{error}</p> : null}
            {
                weatherData ? (
                    <section className="weather-list">
                        <article className={`weather--single ${theme === 'warm' ? 'weather--single__warm': ''}`}>
                            <i 
                                onClick={deleteWeatherCar}
                                class="ri-close-line delete-btn"
                            ></i>
                            <div className={`weather--main ${theme === 'warm' ? 'weather--main__warm': ''}`}>
                                <p className="weather--main__global">{weatherData.weather[0].main}</p>
                                <div className="weather--main__degree">
                                    <p>{weatherData.main.temp.toFixed(1)}°C</p>
                                    <span>(Feels like : {weatherData.main.feels_like.toFixed(1)}°C)</span>
                                </div>
                            </div>
                            <div className="weather--detail">
                                <h2 className="weather--city">{weatherData.name}</h2>
                                <h3 className="weather--time">Current time : {getTime(weatherData.timezone)}</h3>
                            </div>
                            <div className={`weather--additionnal ${theme === 'warm' ? 'weather--additionnal__warm': ''}`}>
                                <p>Wind : {weatherData.wind.speed}</p>
                                <p>Clouds : {weatherData.clouds.all}</p>
                                <p>Humidity : {weatherData.main.humidity}</p>
                            </div>
                        </article>
                    </section>
                ) : (
                    <p className="empty-search">Type a city in the search bar to get its detail</p>
                )
            }
        </main>
    );
}