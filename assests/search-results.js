var searchBtn = document.querySelector('#searchBtn');


async function cityWeather() {
    const response = await fetch("http://example.com/movies.json");
    const weather = await response.json();
    console.log(weather);
  }