import React from 'react';

function Card(props) {

    var image_src = "http://openweathermap.org/img/wn/" + props.id + "@2x.png";

    return(
        <div className="card-item">
            <h3>{props.day}</h3>
            <img src={image_src}/>
            <h4>{props.weather}</h4>
            <h3>{props.temp} °C</h3>
        </div>
        // <div className="card-item">
        //     <h3>Day</h3>
        //     <img src={image_src}/>
        //     <h4>weather</h4>
        //     <h3>temp</h3>
        // </div>
    )
}

export default Card;

/*<h3>{props.day}</h3>
            <h4>{props.weather}</h4>
            <h3>{props.temp} °C</h3>*/