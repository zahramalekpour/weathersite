import getWeatherData from "./utiles/HttpReq.js";
import { showModal, removeModal } from "./utiles/modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");
const modalButton = document.getElementById("modal-button");
const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const renderCreateWeather = data => {
  if (!data){
    return ;
  }
    console.log(data)
  const weatherJSX = `
    <h1> ${data.name}, ${data.sys.country} </h1>
    <div id="main"> 
      <img alt="weather-icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        <span> ${data.weather[0].main} </span>
        <p>${Math.round(data.main.temp)}°C </p>
        <div id="info"> <p>humidity:</p> <span>${data.main.humidity}%</span> 
         <p> windspeed:</p><span>${data.wind.speed}m/s</span> </div>.
      </div> 
    `;
    weatherContainer.innerHTML = weatherJSX;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather =  (data) => {
  if (!data){
    return ;
  }
  forecastContainer.innerHTML = "";
   data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
   console.log(data);
   data.forEach((i) => {
    const forecastJSX = `
    <div>
      <img alt="weather-icon" src="https://openweathermap.org/img/w/${
        i.weather[0].icon
      }.png" />
      <h3> ${getWeekDay(i.dt)}</h3> 
      <p> ${Math.round(i.main.temp)} °C </p>
      <span>${i.weather[0].main} </span> 
      </div>
      `;
      forecastContainer.innerHTML += forecastJSX;
   } );
  };

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    showModal("please enter a city name!");
    return;
  };

  const currentData = await getWeatherData("current", cityName);
  renderCreateWeather(currentData);

  const forecastData = await getWeatherData("forecast",cityName)
  console.log(forecastData)
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const{latitude, longitude} = position.coord;
  const currentData = await getCurrentWeatherByCoordiantes(latitude, longitude);
  console.log(currentData);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByCoordinates(
    latitude, longitude);  
    renderForecastWeather(forecastData);
};


const errorCallback = (error) => {
  showModal(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback)
  } else {
    showModal("your browser doesn't support geolocation!")
  }
};
 const initeHandler = async () =>{
   const currentData = await getWeatherData("current", "tehran");
  renderCreateWeather(currentData);

  const forecastData = await getWeatherData("forecast", "tehran");
  console.log(forecastData)
  renderForecastWeather(forecastData);
 };



searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initeHandler);