import React, { Component } from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';

const API_KEY = '429736441cf3572838aa10530929f7cd';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			temperature : undefined,
			city : undefined,
			city1 : undefined,
			country : undefined,
			country1 : undefined,
			min_temp : undefined,
			max_temp : undefined,
			icon : undefined,
			description : "",
			error : false
		};
		this.weatherIcon = {
			ThunderStorm : "wi wi-thunderstorm",
			Drizzle : "wi wi-sleet",
			Rain : "wi wi-storm-showers",
			Snow : "wi wi-snow",
			Atmosphere : "wi wi-fog",
			Clear : "wi wi-day-sunny",
			Clouds : "wi wi-day-fog"
		};
	}


	getWeatherIcon(weatherIcon,rangeId) {
		if(rangeId>=200&&rangeId<=232)
		{
			this.setState({icon : weatherIcon.ThunderStorm});
		}
		else if(rangeId>=300&&rangeId<=321)
                {
                        this.setState({icon : weatherIcon.Drizzle});
		}
		else if(rangeId>=500&&rangeId<=521)
                {
                        this.setState({icon : weatherIcon.Rain});
		}
		else if(rangeId>=600&&rangeId<=622)
                {
                        this.setState({icon : weatherIcon.Snow});
		}
		else if(rangeId>=701&&rangeId<=781)
                {
                        this.setState({icon : weatherIcon.Atmosphere});
		}
		else if(rangeId===800)
                {
                        this.setState({icon : weatherIcon.Clear});
		}
		else if(rangeId>=801&&rangeId<=804)
                {
                        this.setState({icon : weatherIcon.Clouds});
		}
		else
		{
			this.setState({icon : weatherIcon.Clouds})
		}
	}

	getWeather = async () => {

		if(this.state.country && this.state.city) {
			const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${API_KEY}&units=metric`);
    			const response = await api_call.json();
			this.setState ({
				city1 : `${this.state.city}, ${this.state.country}`,
				temperature : response.main.temp,
				temp_max : response.main.temp_max,
				temp_min : response.main.temp_min,
				description : response.weather[0].description,
				error : false
			});
			this.getWeatherIcon(this.weatherIcon,response.weather[0].id);
			console.log(response);
		}
		else {
			this.setState({error : true})
		}
	}

	getTemp = (temp) => {
		if(temp)
		{
			return(
				<span>{Math.floor(temp)}&deg;</span>
			)
		}
		else
		{
			return (
				<span></span>
			)
		}
	}

	isError = (error) => {
		if(error===true) {
			return(<div className="offset-5 text-danger">Pls Enter City and Country</div>);
		}
		else {
			return(<div></div>);
		}
	}


	render() {
		return (
			<div className="App">
				<form className="pt-5">
                                <div className="row">
                                        <div className="col-sm-3 offset-3">
                                                <input type="text" onChange={event => this.setState({city : event.target.value})} autoComplete="off" className="form-control form1" placeholder="Enter the City"/>
                                   	   </div>
                                      	  <div className="col-sm-3">
                                       	         <input type="text" onChange={event => this.setState({country : event.target.value})} autoComplete="off" className="form-control form1" placeholder="Enter the Country"/>
                                 	       </div>
                                      		 <div className="pr-3">
                                      	 	         <button type="button" className="btn btn-success" onClick={() => this.getWeather() } >Search</button>
                                	        </div>
                         	       </div>
					<div className="row">
						{this.isError(this.state.error)}			
					</div>
				 </form>
				<div className="text-center">
                       			<h1 className="pt-5 pd-3">{this.state.city1}</h1>
                       			<div className="py-3 icon-weather"><i className={this.state.icon}></i></div>
                       			<h1 className="pt-1 pd-5">{this.getTemp(this.state.temperature)}</h1>
                       			<h1 className="py-5">
                        		       	<span className="px-4">{this.getTemp(this.state.temp_min)}</span>
                               			<span className="px-4">{this.getTemp(this.state.temp_max)}</span>
                       			</h1>
                       	 		<h2 className="pt-4">{this.state.description}</h2>
               			</div>
			</div>
		)
	}
}

export default App;
