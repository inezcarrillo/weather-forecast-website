var searchBtn = document.getElementById('#searchBtn');
var newText = document.getElementById('#searchBar');
var searchHistoryList = [];



searchBtn = addEventListener("click", respondClick)

function respondClick() {
    //document.getElementById("click").innerHTML;
    var newText = newText.value;
    console.log("success");
}

var apiKey = '211c2be22c6d4ad1fb1d00f6bfd8f732';

function cityWeather(cityName) {
    var weatherURL = "api.openweathermap.org/data/2.5/forecast?" + cityName + "&appid=" + apiKey;
    axios.get(weatherURL)
    .then(function (response) {

    })
}