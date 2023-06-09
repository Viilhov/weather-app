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
function showWeatherForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let weatherForecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 col-width">
        <div class="forecast-day">${formatDay(forecastDay.time)}</div>
        <div class="forecast-img">
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" alt="sun and cloud"
                with="38" height="38" />
        </div>
        <div class="forecast-temp">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span>
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
        </div>
    </div>
    `;
    }
  });

  forecastHTML =
    forecastHTML +
    `
</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  console.log(city);
  let apiKey = "331711t40ba7f6a03e3o8bfc5f54faa4";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(showWeatherForecast);
}

function showWeatherInformation(result) {
  let h2 = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = result.data.temperature.current;

  h2.innerHTML = result.data.city;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = result.data.condition.description;
  humidity.innerHTML = result.data.temperature.humidity;
  wind.innerHTML = Math.round(result.data.wind.speed);
  dateElement.innerHTML = formatDate(result.data.time * 1000);
  iconElement.setAttribute("src", `${result.data.condition.icon_url}`);
  iconElement.setAttribute("alt", `${result.data.condition.description}`);

  getForecast(result.data.city);
}

function search(city) {
  let apiKey = "331711t40ba7f6a03e3o8bfc5f54faa4";
  let units = "metric";
  let cityApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units${units}`;

  axios.get(cityApiUrl).then(showWeatherInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Malaga");
showWeatherForecast();
