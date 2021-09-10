// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//26f2a17a0b943da8edd70936d6830e25

const weatherApi = {
  key: '26f2a17a0b943da8edd70936d6830e25',
  baseUrl: 'api.openweathermap.org/data/2.5/weather',
};

//event listner function
let weatherBody = document.querySelector('.weather-body');

console.log(weatherBody);

let input = document.getElementById('inputBox');

input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    console.log(event.target.value);
    let value = event.target.value;
    getWeatherReport(value);

    weatherBody.style.display = ' block';

    event.target.value = '';
  }
});

//get weather report

function getWeatherReport(city) {
  fetch(
    `https://${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport)
    .catch((error) => alert(`${city} is not a city`));
}

// show weather report

function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.getElementById('temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minmax = document.getElementById('min-max');

  minmax.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)/ ${Math.round(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById('weather');

  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById('date');

  let todayDate = new Date();
  console.log(todayDate);
  date.innerText = manageDate(todayDate);

  console.log(weatherType.textContent);

  if (weatherType.textContent === 'Clear') {
    document.body.style.backgroundImage = `url('./assets/image/sunny.jpeg')`;
  } else if (weatherType.textContent === 'Mist') {
    document.body.style.backgroundImage = `url('./assets/image/mist.jpg')`;
  } else if (weatherType.textContent === 'Rain') {
    document.body.style.backgroundImage = `url('./assets/image/rainy.jpg')`;
  } else if (weatherType.textContent === 'Clouds') {
    document.body.style.backgroundImage = `url('./assets/image/cloudy.jpg')`;
  }
}

function manageDate(todayDate) {
  console.log(todayDate);
  let elm = todayDate.toString().split(' ');

  console.log(elm);

  return `${elm[2]} ${elm[1]}, ${elm[0]}`;
}
