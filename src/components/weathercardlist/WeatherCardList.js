import React from 'react';
import {nanoid} from 'nanoid'
import WeatherCard from '../weathercard/WeatherCard';

import './weathercardlist.css';

export default function WeatherCardList(props){
    const {weatherDataList, theme, deleteWeatherCard} = props.data
    const weatherCardToHtml = weatherDataList.map((city) => {
        return (
            <WeatherCard
                key={nanoid()}
                data={{ theme, deleteWeatherCard, cityInfo: city }}
            />
        );
    });
    return (
        <section className="weather-list">
            {weatherCardToHtml}
        </section>
    )
}

