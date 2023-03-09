import React from "react";
import './searchbar.css';

export default function SearchBar(props) {
    const {error, theme, city, setCity, getWeatherData} = props.data
    return (
        <form className="form">
            <input
                placeholder="Type a city..."
                id="city"
                className={`form--input ${error ? "form--input__error" : ""} ${
                    theme === "warm" ? "form--input__warm" : ""
                }`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button
                onClick={getWeatherData}
                className={`form--btn ${error ? "form--btn__error" : ""} ${
                    theme === "warm" ? "form--btn__warm" : ""
                }`}
            >
                <i className="ri-search-line"></i>
            </button>
            <button 
                className={`form--btn__big ${error ? "btn--big__error" : ''} ${theme === 'warm' ? "btn--big__warm" : ''}`}
                onClick={getWeatherData}
            >
                    Quick search
            </button>
        </form>
    );
}
