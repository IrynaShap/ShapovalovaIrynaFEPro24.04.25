const apiKey = '4462c5e45947e84f744f253f65f0a7de';
const defaultCountry = 'Ukraine';
const defaultUnits = 'metric';
const defaultLang = 'ua';

async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${defaultCountry}&appid=${apiKey}&units=${defaultUnits}&lang=${defaultLang}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherUI(data) {
    if (!data) {
        console.error('No data to update UI');
        return;
    }
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} м/с`;
    document.getElementById('pressure').textContent = `${data.main.pressure} гПа`;
}

async function getWeatherForCity(city) {
    const result = await fetchWeatherData(city);
    updateWeatherUI(result);
}

document.addEventListener('DOMContentLoaded', () => {
    const cityDropdown = document.getElementById('citySelect');
    const refreshBtn = document.getElementById('refreshWeather');
    function updateCurrentCityWeather() {
        getWeatherForCity(cityDropdown.value || 'Kyiv');
    }
    updateCurrentCityWeather();
    if (cityDropdown) {
        cityDropdown.addEventListener('change', updateCurrentCityWeather);
    }
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateCurrentCityWeather);
    }
});