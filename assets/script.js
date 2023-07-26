
const apiKey = "7bec50d244f86f1a234d48df3ac17606";
const weatherInfoElement = document.getElementById("weatherInfo");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput").value;
  getWeatherData(cityInput);
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found or an error occurred.");
    }
    const weatherData = await response.json();
    displayWeatherForecast(weatherData);
  } catch (error) {
    console.error("Error:", error.message);
    weatherInfoElement.innerHTML = "City not found or an error occurred.";
  }
}

function displayWeatherForecast(weatherData) {
  const { city, list } = weatherData;
  const cityName = city.name;

  let weatherHTML = `<h2>${cityName} Weather Forecast</h2>`;

  list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const time = new Date(forecast.dt * 1000).toLocaleTimeString();
    const temperature = forecast.main.temp;
    const description = forecast.weather[0].description;

    weatherHTML += `
      <div class="forecast-item">
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Description: ${description}</p>
      </div>
    `;
  });

  weatherInfoElement.innerHTML = weatherHTML;
}
