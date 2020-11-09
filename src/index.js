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
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = Math.round(response.data.main.temp);
  let maxTemperatureNow = document.querySelector("#max-temp-now");
  maxTemperatureNow.innerHTML = Math.round(response.data.main.temp_max);
  let minTemperatureNow = document.querySelector("#min-temp-now");
  minTemperatureNow.innerHTML = Math.round(response.data.main.temp_min);
  let humidityNow = document.querySelector("#humidity-now");
  humidityNow.innerHTML = response.data.main.humidity;
  let windNow = document.querySelector("#wind-now");
  windNow.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let weatherCondition = document.querySelector("#weather-condition");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let currentDate = document.querySelector("#date-today");
  currentDate.innerHTML = formatDate(response.data.dt *1000)
  

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
let cityCurrent = document.querySelector(".city-name");
let cityForm = document.querySelector(".change-city-search");
cityForm.addEventListener("submit", searchCity);
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);
