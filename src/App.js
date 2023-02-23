import React, { useState } from "react";

export default function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null)
    const getWeatherData = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === '404'){
            setWeatherData(null)
            setError(data.message)
            setCity('')
        } else {
            setWeatherData(data);
            setCity('')
            setError(null)
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

    return (
        <main className="main--container">
            <form className="form">
                <input
                    placeholder="Type a city..."
                    id="city"
                    className={`form--input ${error ? 'form--input__error' : ''}`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={getWeatherData} className={`form--btn ${error ? 'form--btn__error' : ''}`}>
                    <i className="ri-search-line"></i>
                </button>
            </form>
            { error ? <p className="error-search">Sorry the city your enter does not seems to exists</p> : null}
            {
                weatherData ? (
                    <section className="weather-list">
                        <article className="weather--single">
                            <div className="weather--main">
                                <p className="weather--main__global">{weatherData.weather[0].main}</p>
                                <div className="weather--main__degree">
                                    <p>{weatherData.main.temp.toFixed(1)}°C</p>
                                    <span>(Feels like : {weatherData.main.feels_like.toFixed(1)}°C)</span>
                                </div>
                            </div>
                            <div className="weather--detail">
                                <h2 className="weather--city">{weatherData.name}</h2>
                                <h3 className="weather--time">Currently : {getTime(weatherData.timezone)}</h3>
                            </div>
                            <div className="weather--additionnal">
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