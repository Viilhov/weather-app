function showWeatherInformation(result) {
  console.log(result);
  let h2 = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  h2.innerHTML = result.data.city;
  currentTemp.innerHTML = Math.round(result.data.temperature.current);
  descriptionElement.innerHTML = result.data.condition.description;
  humidity.innerHTML = result.data.temperature.humidity;
  wind.innerHTML = Math.round(result.data.wind.speed);
}

let apiKey = "331711t40ba7f6a03e3o8bfc5f54faa4";
let units = "metric";
let city = "Paris";
let cityApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units${units}`;

axios.get(cityApiUrl).then(showWeatherInformation);
