let input = document.querySelector("input");
let button = document.querySelector("button");
let weather = document.querySelector(".weather");

let weatherDiv = document.createElement("div");
weather.appendChild(weatherDiv);

getWeather = () => {
  let city = input.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=903507f17d707fecd352d38301efba77&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      display(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

function display(data) {
  const { name, sys, main, weather, wind, clouds } = data;
  weatherDiv.innerHTML = `
    <div class="weather-card">
      <p><strong>Location:</strong> ${name}, ${sys.country}</p>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
      <p><strong>Weather:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
      <p><strong>Cloudiness:</strong> ${clouds.all}%</p>
      <p><strong>Sunrise:</strong> ${new Date(
        sys.sunrise * 1000
      ).toLocaleTimeString()}</p>
      <p><strong>Sunset:</strong> ${new Date(
        sys.sunset * 1000
      ).toLocaleTimeString()}</p>
    </div>
  `;
}

button.addEventListener("click", getWeather);
