import React, { useState } from "react";
import { nanoid } from "nanoid";
import SearchBar from "./components/search/SearchBar";
import ToggleButton from "./components/togglebutton/ToggleButton";
import WeatherCardList from "./components/weathercardlist/WeatherCardList";

export default function App() {
    const [city, setCity] = useState("");
    const [weatherDataList, setWeatherDataList] = useState([]);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState("dark");

    const getWeatherData = async (e) => {
        e.preventDefault();
        const cityName = city.trim();
        if (cityName === "") {
            setError("You need to enter a city name before submitting.");
        } else {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather/?q=${cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            if (data.cod === "404") {
                setError(
                    `Sorry the city your entered (${cityName}) does not seem to exists.`
                );
                setCity("");
            } else {
                setWeatherDataList((prevList) => {
                    return [saveWeatherData(data), ...prevList];
                });
                setCity("");
                setError(null);
            }
        }
    };

    const deleteWeatherCard = (id) => {
        setWeatherDataList((prevList) => {
            return prevList.filter((city) => city.id !== id);
        });
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === "dark" ? "warm" : "dark";
        });
    };

    const saveWeatherData = (data) => {
        return {
            id: nanoid(),
            city_name: cleanCityName(data.name),
            global_temp: data.weather[0].main,
            main_temp: data.main.temp.toFixed(1),
            feels_like: data.main.feels_like.toFixed(1),
            timezone: data.timezone,
            wind_speed: data.wind.speed,
            clouds: data.clouds.all,
            humidity: data.main.humidity,
        };
    };

    const cleanCityName = (city) => {
        if (city.startsWith('Arrondissement')){
            return city.split(' ')[2]
        } else {
            return city
        }
    }

    document.body.style.backgroundColor =
        theme === "dark" ? "#1b262c" : "#B73E3E";

    return (
        <React.Fragment>
            <header className="header">
                <SearchBar
                    data={{ error, theme, city, setCity, getWeatherData }}
                />
                <ToggleButton data={{ toggleTheme, theme }} />
            </header>
            <main className={`main--container ${theme === "warm" ? "main--container__warm" : ""}`}>
                {error ? <p className="error-search">{error}</p> : null}
                
                {weatherDataList.length > 0 ? (
                    <WeatherCardList
                        data={{ theme, deleteWeatherCard, weatherDataList }}
                    />
                ) : (
                    <p className="empty-search">
                        Type a city in the search bar to get its detail
                    </p>
                )}
            </main>
            <footer></footer>
        </React.Fragment>
    );
}
