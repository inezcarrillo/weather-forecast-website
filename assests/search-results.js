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
            // Process the retrieved weather data
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

function celsiusLToFahrenheit(celsius) {
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
            // Process the retrieved forecast data
            //console.log('5-Day Forecast Data:', data);

            // Call a function to update the HTML with the 5-day forecast data
            update5DayForecast(data.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function update5DayForecast(forecastList) {
    // Clear the existing forecast HTML
    document.getElementById('forecast-row').innerHTML = '';
    //forecast.innerHTML = '<h3>5-Day Forecast</h3>';

    // Iterate through the forecast data and update HTML
    for (let i = 0; i < forecastList.length; i += 8) { // Every 8th entry for a daily forecast
        const forecastData = forecastList[i];
        const forecastDate = new Date(forecastData.dt * 1000).toLocaleDateString();
        var temperatureFaherenheit = celsiusLToFahrenheit(forecastData.main.temp);
        const temperature = forecastData.main.temp;
        const humidity = forecastData.main.humidity;

        const forecastElement = document.createElement('div');
        forecastElement.className = 'col-md-3 forecast bg-primary text-white m-2';
        forecastElement.innerHTML = `
            <p>Date: ${forecastDate}</p>
            <p>Temperature: ${temperature} °C</p>
            <p>Humidity: ${humidity}%</p>
        `;

        //forecast.appendChild(forecastElement);
        document.getElementById('forecast-row').appendChild(forecastElement);
    }
};

function updateWeather(weatherData) {
    // Update the HTML elements with the weather data

    var tenperatureFahrenheit = celsiusLToFahrenheit(weatherData.main.temp);

    todayWeather.innerHTML = `
        <h2>Today's Weather</h2>
        <p>City: ${weatherData.name}</p>
        <p>Temperature: ${weatherData.main.temp} °C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;

    // Call a function to get the 5-day forecast based on city ID
    display5DayForecast(weatherData.id);
}

