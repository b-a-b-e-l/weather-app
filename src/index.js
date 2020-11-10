function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeatherValues(response) {
  cityCurrent.innerHTML = response.data.name;
  celciusTempreatureNow = response.data.main.temp
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = Math.round(celciusTempreatureNow) + "°C";
  celciusTempreatureMax = response.data.main.temp_max;
  let maxTemperatureNow = document.querySelector("#max-temp-now");
  maxTemperatureNow.innerHTML = Math.round( celciusTempreatureMax) + "°C";
  celciusTempreatureMin = response.data.main.temp_min;
  let minTemperatureNow = document.querySelector("#min-temp-now");
  minTemperatureNow.innerHTML = Math.round(celciusTempreatureMin) + "°C";
  let humidityNow = document.querySelector("#humidity-now");
  humidityNow.innerHTML = response.data.main.humidity;
  windMeterSeconds = response.data.wind.speed
  let windNow = document.querySelector("#wind-now");
  windNow.innerHTML = Math.round(3.6 * windMeterSeconds)+ "km/h";
  let weatherCondition = document.querySelector("#weather-condition");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let currentDate = document.querySelector("#date-today");
  currentDate.innerHTML = formatDate(response.data.dt * 1000 +(response.data.timezone * 1000));
  console.log(response.data)

}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "44b265d1d7325d3b65b118085f75bc5c";
  let cityInput = document.querySelector("#city-searched").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherValues);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(findLocation);
  function findLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "44b265d1d7325d3b65b118085f75bc5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherValues);
  }
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature-now");
  let fahrenheitTemperatureNow = (celciusTempreatureNow * 9) / 5 + 32; 
  temperatureNow.innerHTML = Math.round(fahrenheitTemperatureNow) + "°F";
  let maxTemperature = document.querySelector("#max-temp-now");
  let maxFahrenheitTemperature = (celciusTempreatureMax * 9) / 5 + 32;
  maxTemperature.innerHTML = Math.round( maxFahrenheitTemperature) + "°F";
  let minTemperature = document.querySelector("#min-temp-now");
  let minFahrenheitTemperature = (celciusTempreatureMin * 9) / 5 + 32;
  minTemperature.innerHTML = Math.round( minFahrenheitTemperature) + "°F";
  let windNow = document.querySelector("#wind-now");
  windNow.innerHTML = Math.round( 2.23694 * windMeterSeconds)+ "mph";

}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = Math.round(celciusTempreatureNow)+ "°C";
  let maxTemperatureNow = document.querySelector("#max-temp-now");
  maxTemperatureNow.innerHTML = Math.round( celciusTempreatureMax) + "°C";
  let minTemperatureNow = document.querySelector("#min-temp-now");
  minTemperatureNow.innerHTML = Math.round(celciusTempreatureMin) + "°C";
  let windNow = document.querySelector("#wind-now");
  windNow.innerHTML = Math.round(3.6 * windMeterSeconds)+ "km/h";
}
let cityCurrent = document.querySelector(".city-name");
let cityForm = document.querySelector(".change-city-search");
cityForm.addEventListener("submit", searchCity);
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);


let celciusTempreatureNow = null;
let celciusTempreatureMax = null;
let celciusTempreatureMin = null;
let windMeterSeconds = null
let fahrenheitLink = document.querySelector(".switch-f");
fahrenheitLink.addEventListener("click", convertFahrenheit);
let celsiusLink = document.querySelector(".switch-c");
celsiusLink.addEventListener("click", convertCelsius);