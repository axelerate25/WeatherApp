let appid = 'f1095d338a972e6c863ba0748a61e91f';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    }
    else {
        searchMethod = 'q';
    }
}

//Fetching API-url from documentation --> First by city name
//Original URL = api.openweathermap.org/data/2.5/weather?q=London
//Wrting http:// my self --> Using backticks `` instead of string ''
//Need to hold on until we get the JSOn-code from the API --> .then(result)
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);                          
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
    //We are calling the API with our search-method, converting 
    //the result to json and then passing that result to our init()-function
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("images/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
            break;

        case 'Rain':        //Will run all cases for one bit of code
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("images/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("images/storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("images/snow.jpg")';
            break;

        default:
            document.body.style.backgroundImage = 'url("images/default.jpg")';
            break;
    }
    let weatherDescriptionHeader = document.getElementById("weather-description-header");
    let temperatureElement = document.getElementById("temperature");
    let cityHeader = document.getElementById("city-header");
    let windSpeedElement = document.getElementById("wind-speed");
    let humidityElement = document.getElementById("humidity");
    let weatherIcon = document.getElementById("document-icon-img");

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;

    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '°';
    windSpeedElement.innerHTML = 'Windspeed is ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById("weather-container");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById("search-btn").addEventListener('click', () => {
    let searchTerm = document.getElementById("search-input").value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }    
})