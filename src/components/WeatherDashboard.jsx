import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WeatherSearch from './WeatherSearch';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import { fetchWeatherData } from '../services/weatherApi';

function WeatherDashboard({ units, setUnits, favorites, onAddFavorite, onRemoveFavorite }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

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

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <WeatherSearch 
          onSearch={handleLocationSearch} 
          onAddFavorite={onAddFavorite} 
          onRemoveFavorite={onRemoveFavorite} 
          favorites={favorites} 
        />
        <Button
          variant="outlined"
          startIcon={<ThermostatIcon />}
          onClick={toggleUnits}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            minWidth: '100px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
            }
          }}
        >
          {isHovering 
            ? `Switch to ${units === 'metric' ? '°F' : '°C'}` 
            : `${units === 'metric' ? '°C' : '°F'}`
          }
        </Button>
      </Box>
      
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