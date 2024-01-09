var searchBtn = document.querySelector('#searchBtn');
var dallasWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Dallas,TX,+1&limit=5&appid=211c2be22c6d4ad1fb1d00f6bfd8f732"
var newText = document.querySelectorAll('#searchBar');


searchBtn = addEventListener("click", respondClick)

function respondClick() {
    document.getElementById("click").innerHTML;
    var newText = searchBar.value;
    console.log(newText);
}

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