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

function getLocationTime(response){
  let currentDate = document.querySelector("#date-today");
  console.log(response)
  currentDate.innerHTML = formatDate(response.data.timestamp * 1000);
}

function formatForecastDate (timestamp) {
  let date = new Date(timestamp);
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
  return `${day}`;
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
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let timeDbKey = "S4RXUE2ZUA4K";
  let timeDbUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeDbKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
  axios.get(`${timeDbUrl}`).then(getLocationTime);
  let colorTempNow = document.querySelector("#weather-now");
  if (celciusTempreatureNow < -5) {
    colorTempNow.classList.add("temp-neg-5");
    colorTempNow.classList.add("white-font");
    colorTempNow.classList.remove("temp-neg-4-0","temp-pos-1-5","temp-pos-6-10","temp-pos-11-15","temp-pos-16-20","temp-pos-21-25");
    colorTempNow.classList.remove("grey-font");
   } else if (celciusTempreatureNow <= 0 && celciusTempreatureNow >= -4) {
    colorTempNow.classList.add("temp-neg-4-0");
    colorTempNow.classList.add("white-font");
    colorTempNow.classList.remove("temp-neg-5","temp-pos-1-5","temp-pos-6-10","temp-pos-11-15","temp-pos-16-20","temp-pos-21-25");
    colorTempNow.classList.remove("grey-font");
   }  else if (celciusTempreatureNow <= 5 && celciusTempreatureNow >= 1) {
    colorTempNow.classList.add("temp-pos-1-5");
    colorTempNow.classList.add("grey-font");
    colorTempNow.classList.remove("temp-neg-5","temp-neg-4-0","temp-pos-6-10","temp-pos-11-15","temp-pos-16-20","temp-pos-21-25");
    colorTempNow.classList.remove("white-font");
   } else if (celciusTempreatureNow <= 10 && celciusTempreatureNow >= 6) {
    colorTempNow.classList.add("temp-pos-6-10");
    colorTempNow.classList.add("grey-font");
    colorTempNow.classList.remove("temp-neg-5","temp-neg-4-0","temp-pos-1-5","temp-pos-11-15","temp-pos-16-20","temp-pos-21-25");
    colorTempNow.classList.remove("white-font");
    } else if (celciusTempreatureNow <= 15 && celciusTempreatureNow >= 11) {
    colorTempNow.classList.add("temp-pos-11-15");
    colorTempNow.classList.add("grey-font");
    colorTempNow.classList.remove("temp-neg-5","temp-neg-4-0","temp-pos-1-5","temp-pos-6-10","temp-pos-16-20","temp-pos-21-25");
    colorTempNow.classList.remove("white-font");
    } else if (celciusTempreatureNow <= 20 && celciusTempreatureNow >= 16) {
    colorTempNow.classList.add("temp-pos-16-20");
    colorTempNow.classList.add("grey-font");
    colorTempNow.classList.remove("temp-neg-5","temp-neg-4-0","temp-pos-1-5","temp-pos-6-10","temp-pos-11-15","temp-pos-21-25");
    colorTempNow.classList.remove("white-font");
    } else if (celciusTempreatureNow >= 21) {
    colorTempNow.classList.add("temp-pos-21-25");
    colorTempNow.classList.add("white-font");
    colorTempNow.classList.remove("temp-neg-5","temp-neg-4-0","temp-pos-1-5","temp-pos-6-10","temp-pos-11-15","temp-pos-16-20",);
    colorTempNow.classList.remove("grey-font");
    }
    }
function showForecastValues(response) {
  forecastValues = response.data.list
  let tempOne = document.querySelector("#forcast-temp-1");
  tempOne.innerHTML = Math.round(forecastValues[7].main.temp) + "°C";
  let tempTwo = document.querySelector("#forcast-temp-2");
  tempTwo.innerHTML = Math.round(forecastValues[15].main.temp) + "°C";
  let tempThree = document.querySelector("#forcast-temp-3");
  tempThree.innerHTML = Math.round(forecastValues[23].main.temp) + "°C";
  let tempFour = document.querySelector("#forcast-temp-4");
  tempFour.innerHTML = Math.round(forecastValues[31].main.temp) + "°C";
  let tempFive = document.querySelector("#forcast-temp-5");
  tempFive.innerHTML = Math.round(forecastValues[39].main.temp) + "°C";
  let dayOne = document.querySelector("#day-forecast-1");
  dayOne.innerHTML = formatForecastDate(forecastValues[7].dt * 1000);
  let dayTwo = document.querySelector("#day-forecast-2");
  dayTwo.innerHTML = formatForecastDate(forecastValues[15].dt * 1000);
  let dayThree = document.querySelector("#day-forecast-3");
  dayThree.innerHTML = formatForecastDate(forecastValues[23].dt * 1000);
  let dayFour = document.querySelector("#day-forecast-4");
  dayFour.innerHTML = formatForecastDate(forecastValues[31].dt * 1000);
  let dayFive = document.querySelector("#day-forecast-5");
  dayFive.innerHTML = formatForecastDate(forecastValues[39].dt * 1000);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "44b265d1d7325d3b65b118085f75bc5c";
  let cityInput = document.querySelector("#city-searched").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherValues);
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(`${forecastUrl}`).then(showForecastValues);

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