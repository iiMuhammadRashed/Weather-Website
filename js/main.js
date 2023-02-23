var day = new Date();
var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 1);
var afterNextDay = new Date(day);
afterNextDay.setDate(day.getDate() + 2);
var searchInputValue = document.getElementById("searchInputValue");
var countryName;

function getDayName(dayIndex) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayIndex];
}

function getMonthName(monthIndex) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = months[monthIndex];
  return monthName;
}

async function getCurrent(country) {
  apiData = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ac6216a0e9514726934135943231802 &q=${country}&days=3&aqi=no&alerts=no`
  );
  currentWeather = await apiData.json();
  document.getElementById("apiLink").setAttribute("href",`${apiData.url}`)
}

function displayData() {
  // Display current day Data

  document.getElementById("currentDayName").innerText = getDayName(
    day.getDay()
  );
  document.getElementById("currentDayDate").innerText =
    day.getDate() + ` ` + getMonthName(day.getMonth());

  document.querySelector(".searchName").innerText =
    currentWeather.location.name;

  document.querySelector(".countryName").innerText =
    currentWeather.location.country;
  document.querySelector("#currentTemp").innerText =
    currentWeather.current.temp_c;
  document
    .querySelector("#currentDayImg img")
    .setAttribute(`src`, `${currentWeather.current.condition.icon}`);
  document.querySelector("#currentDayStatus").innerText =
    currentWeather.current.condition.text;

  //Display nextDay Data

  document.getElementById("nextDayName").innerText = getDayName(
    nextDay.getDay()
  );
  document.getElementById("nextDayDate").innerText =
    nextDay.getDate() + ` ` + getMonthName(nextDay.getMonth());

  document.querySelector("#nextDayTemp").innerText =
    currentWeather.forecast.forecastday[1].day.maxtemp_c;
  document
    .querySelector("#nextDayImg img")
    .setAttribute(`src`, `${currentWeather.forecast.forecastday[1].day.condition.icon}`);
  document.querySelector("#nextDayStatus").innerText =
  currentWeather.forecast.forecastday[1].day.condition.text;

  //Display afterNextDay Data

  document.getElementById("afterNextDayName").innerText = getDayName(
    afterNextDay.getDay()
  );
  document.getElementById("afterNextDayDate").innerText =
    afterNextDay.getDate() + ` ` + getMonthName(afterNextDay.getMonth());

  document.querySelector("#afterNextDayTemp").innerText =
  currentWeather.forecast.forecastday[2].day.maxtemp_c
  document
    .querySelector("#afterNextDayImg img")
    .setAttribute(`src`, `${currentWeather.forecast.forecastday[2].day.condition.icon}`);
  document.querySelector("#afterNextDayStatus").innerText =
  currentWeather.forecast.forecastday[2].day.condition.text;

}

async function getall() {
  await getCurrent("Egypt");
  displayData();
}

getall();

async function displaySearchedData() {
  countryName = searchInputValue.value;
  await getCurrent(countryName);
  displayData();
}

document.addEventListener("keypress", function (eventInfo) {
  if (eventInfo.key == "Enter") {
    displaySearchedData();
  }
});
document.getElementById("SearchBtn").addEventListener("click", function () {
  displaySearchedData();
});
