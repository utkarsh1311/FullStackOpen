import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ capital, capitalInfo }) => {
	const [weatherData, setWeatherData] = useState();

	let capital_longitude = capitalInfo.latlng[1];
	let capital_latitude = capitalInfo.latlng[0];
	useEffect(() => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${capital_latitude}&lon=${capital_longitude}&appid=${api_key}&units=metric`;
		axios.get(url).then(response => {
			console.log(response.data);
			setWeatherData(response.data);
		});
	}, []);

	if (!weatherData) {
		return <h3>Loading Weather data...</h3>;
	}

	return (
		<>
			<h2>weather in {capital}</h2>
			<p>temperature {weatherData.main.temp} Celcius</p>
			<img
				src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
				alt="weather icon"
			/>
			<p>wind {weatherData.wind.speed}</p>
		</>
	);
};

export default Weather;
