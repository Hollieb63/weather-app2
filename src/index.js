let weather = {
    Paris: { temp: 19.7, humidity: 80 },
    Tokyo: {
      temp: 17.3,
      humidity: 20
    },
    Lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "San francisco": {
      temp: 20.9,
      humidity: 100
    },
    Oslo: {
      temp: -5,
      humidity: 20
    }
  };
  let city = prompt("Please enter a city");
  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let celcius = Math.round(temperature);
    let farenheit = Math.round(temperature);
    alert(`It is ${temperature}ºC in ${city} with a humidity of ${humidity}%`);
  } else {
    alert(
      "Sorry, we do not know the weather for this city, try going to:https://www.metoffice.gov.uk for more information."
    );
  }
  
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let day = days[now.getDay()]; //0 and 6
  let time = now.getHours();
  let minutes = now.getMinutes();
  let milliseconds = now.getMilliseconds();
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${day} ${time}:${minutes}`;
  
  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#weather-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
  }
  
  function searchCity(city) {
    let apiKey = "2efb90627753bf3d901e44a0b3405473";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(displayWeather);
  }
  
  function process(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#weather-temp");
    let city = document.querySelector("#search-engine").value;
    cityInput.innerHTML = city;
    searchCity(city);
  }
  function displayPosition(position) {
    let apiKey = "2efb90627753bf3d901e44a0b3405473";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(displayWeather);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayPosition);
  }
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", process);
  searchCity("paris");
  