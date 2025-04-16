import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import WeatherSearch from './WeatherSearch';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import { fetchWeatherData } from '../services/weatherApi';

function WeatherDashboard({ units, favorites }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSearch = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(location, units);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <WeatherSearch onSearch={handleLocationSearch} favorites={favorites} />
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      {weatherData && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <CurrentWeather data={weatherData.current} units={units} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <WeatherForecast data={weatherData.forecast} units={units} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default WeatherDashboard;