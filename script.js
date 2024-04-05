const apiKey = "93eb6485de7c80d03de0e8007a44afa1";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon img");

async function checkWeather(locality){

    const response = await fetch(apiUrl + `&q=${locality}`);
    var data = await response.json();

    if (response.cod == 400) {
        return;
    }

    if (response.status == 404) {

        document.querySelector(".weather-locality h3").innerHTML = "INVALID LOCALITY NAME!";
        document.querySelector(".temperature h2").innerHTML = "? °C";
        document.querySelector(".humidity h4").innerHTML = `<i class="fa-solid fa-water"></i> ? %`;
        document.querySelector(".wind h4").innerHTML = `<i class="fa-solid fa-wind"></i> ? km/h`;
        weatherIcon.src = "images/404.png"
        
        document.querySelector(".weather").style.display = "flex";

    } else {

        document.querySelector(".weather-locality h3").innerHTML = data.name;
        document.querySelector(".temperature h2").innerHTML = `${Math.round(data.main.temp)} °C`;
        document.querySelector(".humidity h4").innerHTML = `<i class="fa-solid fa-water"></i> ${data.main.humidity} %`;
        document.querySelector(".wind h4").innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(data.wind.speed)} km/h`;

        document.querySelector(".weather").style.display = "flex";

        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})
