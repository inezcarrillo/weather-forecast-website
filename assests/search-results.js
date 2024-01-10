var searchBtn = document.getElementById('searchBtn');
var newText = document.getElementById('searchBar');
var searchHistoryList = [];
var apiKey = '211c2be22c6d4ad1fb1d00f6bfd8f732';



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
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


