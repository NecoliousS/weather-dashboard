const apiKey = '0043fe80eb91494e99c73a5061385012'; // REPLACE THIS
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
        hideError();
    } catch (error) {
        showError('City not found. Please try again.');
        hideWeather();
    }
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°F`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} mph`;
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.classList.remove('hidden');
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    const errorElement = document.getElementById('error-message');
    errorElement.classList.add('hidden');
}

function hideWeather() {
    const weatherCard = document.getElementById('weather-info');
    weatherCard.classList.add('hidden');
}

document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
