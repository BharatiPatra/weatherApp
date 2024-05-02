import React, { useState } from "react";
import "./weatherApp.css";
import clear from "../../assets/Images/clear.png";
import search from "../../assets/Images/search.png";
import cloud from "../../assets/Images/cloud.png";
import humidity from "../../assets/Images/humidity.png";
import wind from "../../assets/Images/wind.png";
import drizzle from "../../assets/Images/drizzle.png";
import rain from "../../assets/Images/rain.png";
import snow from "../../assets/Images/snow.png";

const WeatherApp = () => {
  let api_key = "caf244495697bdccfbdf2c1878477ea5";
  const [cicon, setCicon] = useState(cloud);
  const Search = async () => {
    const element = document.getElementsByClassName("city-input");
    if (element[0].value === " ") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temperature[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setCicon(clear);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setCicon(cloud);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setCicon(drizzle);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n" ||
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setCicon(rain);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setCicon(snow);
    } else {
      setCicon(clear);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="city-input" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            Search();
          }}
        >
          <img src={search} alt="" />
        </div>
      </div>
      <div className="weather-img">
        <img src={cicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidity} />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={wind} />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
