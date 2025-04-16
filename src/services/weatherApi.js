import axios from 'axios';

const API_KEY = '1da6c411e4f6bfe94b50efe5befd2f7f'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (location, units = 'metric') => {
  try {
    // Get coordinates from location name
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data.length) {
      throw new Error('Location not found');
    }

    const { lat, lon } = geoResponse.data[0];

    // Fetch current weather and forecast
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      ),
      axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      )
    ]);

    return {
      current: currentResponse.data,
      forecast: forecastResponse.data
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};