import React from 'react';

function TodayWeather(props) {

    var image_src = "http://openweathermap.org/img/wn/" + props.id + "@2x.png";

    return (
        <div className="today">
            <h1 className="todayLocation">{props.location}</h1>
            <h2 className="todayDay">Today</h2>
            <h3 className="todayDate">{props.date}</h3>
            <img src={image_src} alt="weather" className="todayImg"/>
            <h2 className="todayWeather">{props.weather}</h2>
            <h1 className="todayTemp">{props.temp} °C</h1>
        </div>
        // <div className="today">
        //     <h1 className="todayLocation">Location</h1>
        //     <h2 className="todayDay">Day</h2>
        //     <h3 className="todayDate">Date</h3>
        //     <img src={image_src} alt="weather" className="todayImg"/>
        //     <h2 className="todayWeather">Weather</h2>
        //     <h1 className="todayTemp">Temp °C</h1>
        // </div>
    )
}

export default TodayWeather;

/*<h1></h1>
            <h2></h2>
            <h3>{props.date}</h3>
            <h2>{props.weather}</h2>
            <h1>{props.temp} °C</h1>
            
                            <TodayWeather/>
*/