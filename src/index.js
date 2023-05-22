function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeatherInformation(result) {
  let h2 = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  h2.innerHTML = result.data.city;
  currentTemp.innerHTML = Math.round(result.data.temperature.current);
  descriptionElement.innerHTML = result.data.condition.description;
  humidity.innerHTML = result.data.temperature.humidity;
  wind.innerHTML = Math.round(result.data.wind.speed);
  dateElement.innerHTML = formatDate(result.data.time * 1000);
  iconElement.setAttribute("src", `${result.data.condition.icon_url}`);
  iconElement.setAttribute("alt", `${result.data.condition.description}`);
}

let apiKey = "331711t40ba7f6a03e3o8bfc5f54faa4";
let units = "metric";
let city = "Malaga";
let cityApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units${units}`;

axios.get(cityApiUrl).then(showWeatherInformation);
