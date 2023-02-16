function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
 return `Last updated: ${day} ${hours}:${minutes}`;   
}

let apiKey = "f3fcd99b4efc8a3098994617c9de63f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bratislava&appid=${apiKey}&units=metric`;

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

}


axios.get(apiUrl).then(displayTemperature);
