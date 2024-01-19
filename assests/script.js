 var searchBtn = document.querySelector(".searchBtn");
 var searchBar = document.querySelector('#searchBar');
var linkElement = document.querySelector('a');

searchBtn.addEventListener("click", respondClick);

function respondClick() {
    console.log.apply('Search Results');
    window.location.href="search-results.html"
}