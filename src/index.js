let apiKey = "198cbo4efb3541a38t7c0636c984243a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours =`0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
       minutes=  `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
 return `Last updated: ${day} ${hours}:${minutes}`;   
}
function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return days[day];

}

function displayTemperature(response) {

let currentTemperature = document.querySelector("#mainTemp");
let city = document.querySelector("#city");
let descriptionM = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let currentDate = document.querySelector("#currentDate");
let mainIcon = document.querySelector("#mainIcon");

currentTemperature.innerHTML =Math.round(response.data.temperature.current);
city.innerHTML = response.data.city;
descriptionM.innerHTML = response.data.condition.description;
humidity.innerHTML =`Humidity: ${response.data.temperature.humidity}%`;
wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} km/h`;
currentDate.innerHTML= formatDate(response.data.time * 1000);
mainIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

CelsiusTemperature = response.data.temperature.current;

getForecast(response.data.coordinates);
}

//search engine
function search(city) {
let apiKey = "198cbo4efb3541a38t7c0636c984243a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchBar = document.querySelector("#searchBar");
    search(searchBar.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

//unit conversion to fahrenheit
function displayFTemperature(event) {
    event.preventDefault();
    let fahrenheitTemp = (CelsiusTemperature * 9/5 +32);
    let temperatureElement = document.querySelector("#mainTemp");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp); 
    
    celsiusLink .classList.remove("active");
    fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFTemperature);

//conversion to celsius
function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#mainTemp");
    temperatureElement.innerHTML = Math.round(CelsiusTemperature);

    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let CelsiusTemperature = null;

//Current location
function getLocation(position) {
    let apiKey = "198cbo4efb3541a38t7c0636c984243a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
} 
function showLocationTemp(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showLocationTemp);

//future forecast

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weatherForecast");

    let forecastHTML = `<div class ="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 4) {
        forecastHTML = forecastHTML +  `
            <div class="col-3">
                <div class="future-day">${formatDay(forecastDay.time)}</div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="tommorow-weather-icon" width="50px" height="50px">
                <div class="forecast-temperature">
                    <span class="future-max-temperature">${Math.round(forecastDay.temperature.maximum)}°</span> |
                    <span class="future-min-temperature">${Math.round(forecastDay.temperature.minimum)}°</span>                    
                </div>
            </div>
            `;
    }});
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
    let apiKey = "198cbo4efb3541a38t7c0636c984243a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
search("Bratislava");