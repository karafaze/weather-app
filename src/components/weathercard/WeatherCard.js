import React from "react";
import './weathercard.css';

export default function WeatherCard(props) {
    const {theme, deleteWeatherCard, cityInfo } = props.data;

    const getTime = (timezone) => {
        const date = new Date();
        const localTimeInMilliseconds = date.getTime();
        // multiply by 60_000 to convert minutes to milliseconds
        const localTimeOffsetInMilliseconds = date.getTimezoneOffset() * 60000;
        const utcDateInMilliseconds =
            localTimeInMilliseconds + localTimeOffsetInMilliseconds;
        const clientTime = new Date(utcDateInMilliseconds + timezone * 1000);
        return `${clientTime.getHours()}h${clientTime.getMinutes()}`;
    };

    return (
        <article
            className={`weather--single ${
                theme === "warm" ? "weather--single__warm" : ""
            }`}
        >
            <i
                onClick={() => deleteWeatherCard(cityInfo.id)}
                className="ri-close-line delete-btn"
            ></i>
            <div
                className={`weather--main ${
                    theme === "warm" ? "weather--main__warm" : ""
                }`}
            >
                <p className="weather--main__global">{cityInfo.global_temp}</p>
                <div className="weather--main__degree">
                    <p>{cityInfo.main_temp}°C</p>
                    <span>(Feels like : {cityInfo.feels_like}°C)</span>
                </div>
            </div>
            <div className="weather--detail">
                <h2 className="weather--city">{cityInfo.city_name}</h2>
                <h3 className="weather--time">
                    Current time : {getTime(cityInfo.timezone)}
                </h3>
            </div>
            <div
                className={`weather--additionnal ${
                    theme === "warm" ? "weather--additionnal__warm" : ""
                }`}
            >
                <p>Wind : {cityInfo.wind_speed}</p>
                <p>Clouds : {cityInfo.clouds}</p>
                <p>Humidity : {cityInfo.humidity}</p>
            </div>
        </article>
    );
}
