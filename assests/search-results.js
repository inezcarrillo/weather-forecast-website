var searchBtn = document.getElementById('#searchBtn');
var newText = document.getElementById('#searchBar');
var today = moment().format('L');
var searchHistoryList = [];



searchBtn = addEventListener("click", respondClick)

function respondClick() {
    document.getElementById("click").innerHTML;
    var newText = newText.value;
    console.log("success");
}

var apiKey = '211c2be22c6d4ad1fb1d00f6bfd8f732';


async function cityWeather() {
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Dallas,TX,+1&limit=5&appid=211c2be22c6d4ad1fb1d00f6bfd8f732");
    const weather = await response.json();
    console.log(weather);
  }
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=Dallas,TX,+1&limit=5&appid=211c2be22c6d4ad1fb1d00f6bfd8f732")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });