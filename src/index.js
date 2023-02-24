let apiKey = "fcdf4a4bded49166e940dd974c8ecadb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

function displayTemperature(response) {

let currentTemperature = document.querySelector("#mainTemp");
currentTemperature.innerHTML =Math.round(response.data.main.temp);
let city = document.querySelector("#city");
city.innerHTML = response.data.name;
let descriptionM = document.querySelector("#description");
descriptionM.innerHTML = response.data.weather[0].main;
let humidity = document.querySelector("#humidity");
humidity.innerHTML =`Humidity: ${response.data.main.humidity}%`;
let wind = document.querySelector("#wind");
wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} km/h`;
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML= formatDate(response.data.dt * 1000);
let mainIcon = document.querySelector("#mainIcon");
mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

CelsiusTemperature = response.data.main.temp;
}

//search engine
function search(city) {
let apiKey = "fcdf4a4bded49166e940dd974c8ecadb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "fcdf4a4bded49166e940dd974c8ecadb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
} 
function showLocationTemp(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showLocationTemp);

//future forecast

function displayForecast() {
    let forecast = document.querySelector("#weatherForecast");

    let forecastHTML = `<div class ="row">`;
    let days = ["Saturday", "Sunday", "Monday", "Tuesday"];
    days.forEach(function(day) {
        forecastHTML = forecastHTML +  `
            <div class="col-3">
                <div class="future-day" id="">${day}</div>
                <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="tommorow-weather-icon" width="50px" height="50px">
                <div class="forecast-temperature">
                    <span class="future-max-temperature">6°</span> |
                    <span class="future-min-temperature">8°</span>                    

                </div>
            </div>
            `;
    });

        forecastHTML = forecastHTML + `</div>`;
        forecast.innerHTML = forecastHTML;
}

search("Bratislava");
displayForecast();