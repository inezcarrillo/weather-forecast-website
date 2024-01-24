var searchBtn = document.getElementById('searchBtn');
var newText = document.getElementById('searchBar');
var searchHistoryList = [];
var apiKey = '211c2be22c6d4ad1fb1d00f6bfd8f732';
var todayWeather = document.getElementById('todays-weather');
var forecast = document.getElementById('fiveday-forecast');



searchBtn.addEventListener("click", respondClick);

function respondClick() {
    var cityName = newText.value;
    console.log("City Name: ", cityName);
    cityWeather(cityName);
    saveSearchedCity(cityName);
}

// fetch response for open weather 
function cityWeather(cityName) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(weatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
            
            console.log('Weather Data:', data);

            updateWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

//get latitude and longitude of city 
function getLocation(cityLocation) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
            var latitude = location.coords.latitude;
            var longitude = location.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};
getLocation(window); 

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32 ;
}


function display5DayForecast(cityId) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey;

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
            
            update5DayForecast(data.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

function update5DayForecast(forecastList) {
    
    document.getElementById('forecast-row').innerHTML = '';

    
    for (let i = 0; i < forecastList.length; i += 8) { 
        const forecastData = forecastList[i];
        const forecastDate = new Date(forecastData.dt * 1000).toLocaleDateString();
        const temperatureKelvin = forecastData.main.temp;
        const temperatureFahrenheit = celsiusToFahrenheit(kelvinToCelsius(temperatureKelvin)).toFixed(0);
        const humidity = forecastData.main.humidity;

        const forecastElement = document.createElement('div');
        forecastElement.className = 'col-md-3 forecast bg-primary text-white m-2';
        forecastElement.innerHTML = `
            <p>Date: ${forecastDate}</p>
            <p>Temperature: ${temperatureFahrenheit} °F</p>
            <p>Humidity: ${humidity}%</p>
        `;

        document.getElementById('forecast-row').appendChild(forecastElement);
    }
};

function updateWeather(weatherData) {

    const temperatureCelsius = kelvinToCelsius(weatherData.main.temp);
    const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius).toFixed(0);
    const windSpeed = weatherData.wind.speed;

    todayWeather.innerHTML = `
        <h2>Today's Weather</h2>
        <p>City: ${weatherData.name}</p>
        <p>Temperature: ${temperatureFahrenheit} °F</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind-Speed: ${windSpeed} MPH</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;

    display5DayForecast(weatherData.id);

    const weatherIconData = [
        {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
        },
        {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
        },
        {
            id: 801,
            main: 'few clouds',
            description: 'few clouds',
            icon: '02d'
        },
        {
            id: '600',
            main: 'snow',
            description: 'snow',
            icon: '13d'
        }
    ];

    // Assuming you have the weather data stored in a variable called 'response'
    var forecast= [];

    for (let i = 0; i < 5; i++) {
        const forecastWeatherEl = document.createElement('div');
        const weatherIcon = document.createElement('img');
        weatherIcon.setAttribute("src", " https://openweathermap.org/img/wn/10d@2x.png");
        //weatherIcon.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
        forecastWeatherEl.append(weatherIcon);
        const tempEl = document.createElement("p");
        tempEl.innerHTML = temperatureFahrenheit;
        forecastWeatherEl.append(tempEl);
        const humidityEl = document.createElement("p");
        humidityEl.innerHTML = weatherData.main.humidity;
        forecastWeatherEl.append(humidityEl);
        forecast.push(forecastWeatherEl); // Use push to add forecastWeatherEl to the forecast array
}

// Assuming forecastContainer is an existing element where you want to append the forecast elements
        var forecastContainer = document.getElementById("fiveday-forecast");
        forecast.forEach(forecastElement => {
        forecastContainer.append(forecastElement);
});
}

function saveSearchedCity(cityName) {
    
    if (!searchHistoryList.includes(cityName)) {
        // Add the city to the list
        searchHistoryList.push(cityName);
        
        renderSearchHistory();
    }
};

function renderSearchHistory() {
    var historyListElement = document.getElementById('searchHistoryList');
    
    historyListElement.innerHTML = '';

    for (var i = 0; i < searchHistoryList.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = searchHistoryList[i];
        historyListElement.appendChild(listItem);
    }
};
