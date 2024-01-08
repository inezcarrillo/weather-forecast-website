var searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", nextPage);

function nextPage() {
  window.location.assign('search-results.html');
}