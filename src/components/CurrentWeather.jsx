import { Box, Typography, Grid, IconButton } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';

function CurrentWeather({ data, units, favorites, onAddFavorite, onRemoveFavorite, showFavoriteButton = true }) {
  // Add data validation
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Weather data unavailable
        </Typography>
      </Box>
    );
  }

  // Add memo for temperature conversion
  const convertTemp = (temp) => {
    if (!temp) return 0;
    if (units === 'imperial') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  // Add memo for wind speed conversion
  const convertWind = (speed) => {
    if (!speed) return 0;
    if (units === 'imperial') {
      return speed * 2.237; // Convert m/s to mph
    }
    return speed;
  };

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  // Convert temperatures based on units with safety checks
  const temperature = Math.round(convertTemp(data.main?.temp));
  const feelsLike = Math.round(convertTemp(data.main?.feels_like));
  const windSpeed = Math.round(convertWind(data.wind?.speed));
  const humidity = data.main?.humidity || 0;
  const description = data.weather[0]?.description || '';
  const icon = data.weather[0]?.icon || '01d'; // default to clear sky icon

  const isFavorite = favorites?.includes(data.name);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(data.name);
    } else {
      onAddFavorite(data.name);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Current Weather in {data.name || 'Unknown Location'}
        </Typography>
        {showFavoriteButton && (
          <IconButton 
            onClick={handleFavoriteClick}
            sx={{ 
              color: isFavorite ? 'error.main' : 'grey.400',
              '&:hover': {
                color: 'error.main',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          style={{ width: 80, height: 80 }}
        />
        <Typography variant="h3" sx={{ ml: 2 }}>
          {temperature}{tempUnit}
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThermostatIcon color="primary" sx={{ mr: 1 }} />
            <Typography>
              Feels like: {feelsLike}{tempUnit}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OpacityIcon color="primary" sx={{ mr: 1 }} />
            <Typography>
              Humidity: {humidity}%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AirIcon color="primary" sx={{ mr: 1 }} />
            <Typography>
              Wind: {windSpeed} {windUnit}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CurrentWeather;