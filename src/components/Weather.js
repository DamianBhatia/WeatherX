import React from 'react';
import Card from './Card.js';
import TodayWeather from './TodayWeather.js';

const API_KEY = 'da582ac246c13dd4318f09b374b89773';
const API_KEY_GEO = 'd89f4ec4857d48b3932f15ea894ee2fb';
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class Weather extends React.Component {
     
    constructor() {
        super();
        this.state = {
            city: '',
            state: '',
            lat: null,
            lon: null,  
            today: [],
            data: []
        }

        var cardComponents = [];
        var todayComponent = [];

        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    //Update State on submit
    handleChange(event) {
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }

    //Get Longitude and Latitude of desired location
    async getLocation() {
        var location_request = await fetch('https://api.opencagedata.com/geocode/v1/json?q=' + this.state.city + ',' + this.state.state + '&key=' + API_KEY_GEO);
        var location_data = await location_request.json();
        this.setState({
            lat: location_data.results[0].geometry.lat,
            lon: location_data.results[0].geometry.lng
        })
        console.log("TEST")
    }

    //Get weather data for location 
    async getData(event) {

        event.preventDefault();

        await this.getLocation();

        var weather_request = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.lat + '&lon=' + this.state.lon + '&appid=' + API_KEY);
        var weather_data = await weather_request.json();

        this.setState({
            today: weather_data.daily.splice(0, 1),
            data: weather_data.daily.splice(0, 6)
        })

        console.log(this.state)
    }

    render() {
        //Create the card components
        this.cardComponents = this.state.data.map(info => {
            let date = new Date(info.dt*1000);
            let day = days[date.getDay()];
            let temp = Math.round((info.temp.day - 273.15) * 10) / 10;
            let weather = info.weather[0].main;
            let weatherID = info.weather[0].icon;

            return <Card key={Math.random() * 10} day={day} temp={temp} weather={weather} id={weatherID}/>
        })

        this.todayComponent = this.state.today.map(info => {
            let date = new Date(info.dt*1000);
            let curr = days[date.getDay()];
            let temp = Math.round((info.temp.day - 273.15) * 10) / 10;
            let weather = info.weather[0].main;
            let weatherID = info.weather[0].icon;

            return <TodayWeather key={Math.random() * 10} day={curr} date={date.getMonth() + '/' + date.getDate() + '/' + date.getMonth()} temp={temp} weather={weather} location={this.state.city + ', ' + this.state.state} id={weatherID}/>
        })


        return (
            <div>
                <form className="form-input" onSubmit={this.getData}>
                    <input className="city-input" type="text" placeholder="Enter City" name="city" value={this.state.city} onChange={this.handleChange} autoComplete="off"/>
                    <input className="state-input" type="text" placeholder="Enter State/Country" name="state" value={this.state.state} onChange={this.handleChange} autoComplete="off"/>
                    <button className="button-input">Go</button>
                </form>
                {this.todayComponent}
                {this.cardComponents}
            </div>
        )
    }
}