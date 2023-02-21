import React, { useState } from "react";

export default function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const getWeatherData = async (e) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
    };
    return (
        <main className="main--container">
            <form className="form">
                <label htmlFor="city">
                    <i className="ri-map-pin-2-line"></i>
                </label>
                <input
                    id="city"
                    className="form--input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="form--btn">
                    <i className="ri-search-line form--btn__icon"></i>
                </button>
            </form>
            <section className="weather">
                <article className="weather--single">
                    <h2>Paris</h2>
                    <h3>11h59 AM/PM</h3>
                    <div className="weather--main">
                        <div className="weather--main__degree">
                            <p>37 °C</p>
                            <span>Feels like : 27 °C</span>
                        </div>
                        <div className="weather--main__global">
                            Sunny
                        </div>
                    </div>
                    <div className="weather--addtionnal">
                        <p>Wind : 1,75</p>
                        <p>Clouds : 98</p>
                        <p>Humidity : 69</p>
                    </div>
                </article>
            </section>
        </main>
    );
}

// <input
// value={city}
// onChange={(e) => setCity(e.target.value.trim())}
// />
// <button
// onClick={getWeatherData}
