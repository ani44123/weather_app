function getWeather() {
    var city = document.getElementById('cityInput').value;
    var apiKey = '03729336ef4b08f6a411eda01799582b'; // Replace with your own API key
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        displayWeather(data);
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
  
  function displayWeather(data) {
    var weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';
  
    if (data.cod === '404') {
      weatherInfo.innerHTML = 'City not found.';
      return;
    }
  
    var cityName = data.name;
    var temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
    var description = data.weather[0].description;
    var weatherIcon = data.weather[0].icon;
  
    var cityElement = document.createElement('h2');
    cityElement.innerHTML = cityName;
  
    var tempElement = document.createElement('p');
    tempElement.innerHTML = 'Temperature: ' + temperature + '&deg;C';
  
    var descElement = document.createElement('p');
    descElement.innerHTML = 'Description: ' + description;
  
    var iconElement = document.createElement('i');
    iconElement.classList.add('bi', getWeatherIconClass(weatherIcon));
  
    var weatherIconElement = document.createElement('p');
    weatherIconElement.appendChild(iconElement);
  
    weatherInfo.appendChild(cityElement);
    weatherInfo.appendChild(tempElement);
    weatherInfo.appendChild(descElement);
    weatherInfo.appendChild(weatherIconElement);
  }
  
  function getWeatherIconClass(iconCode) {
    // Map weather icon codes to corresponding Bootstrap Icons classes
    var iconClasses = {
      '01d': 'bi-sun', // clear sky (day)
      '01n': 'bi-moon', // clear sky (night)
      '02d': 'bi-cloud-sun', // few clouds (day)
      '02n': 'bi-cloud-moon', // few clouds (night)
      '03d': 'bi-cloud', // scattered clouds
      '03n': 'bi-cloud', // scattered clouds
      '04d': 'bi-cloudy', // broken clouds
      '04n': 'bi-cloudy', // broken clouds
      '09d': 'bi-cloud-rain', // shower rain
      '09n': 'bi-cloud-rain', // shower rain
      '10d': 'bi-cloud-drizzle', // rain (day)
      '10n': 'bi-cloud-drizzle', // rain (night)
      '11d': 'bi-cloud-lightning', // thunderstorm
      '11n': 'bi-cloud-lightning', // thunderstorm
      '13d': 'bi-cloud-snow', // snow
      '13n': 'bi-cloud-snow', // snow
      '50d': 'bi-cloud-haze', // mist
      '50n': 'bi-cloud-haze' // mist
    };
  
    return iconClasses[iconCode] || 'bi-question'; // default icon if code is not found
  }
  