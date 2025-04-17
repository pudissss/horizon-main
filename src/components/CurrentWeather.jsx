import { Box, Typography, Grid } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { useEffect, useState } from 'react';

function CurrentWeather({ data, units }) {
  if (!data) return null;

  // Add memo for temperature conversion
  const convertTemp = (temp) => {
    if (units === 'imperial') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  // Add memo for wind speed conversion
  const convertWind = (speed) => {
    if (units === 'imperial') {
      return speed * 2.237; // Convert m/s to mph
    }
    return speed;
  };

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  // Convert temperatures based on units
  const temperature = Math.round(convertTemp(data.main.temp));
  const feelsLike = Math.round(convertTemp(data.main.feels_like));
  const windSpeed = Math.round(convertWind(data.wind.speed));

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Current Weather in {data.name}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          style={{ width: 80, height: 80 }}
        />
        <Typography variant="h3" sx={{ ml: 2 }}>
          {temperature}{tempUnit}
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {data.weather[0].description.charAt(0).toUpperCase() + 
         data.weather[0].description.slice(1)}
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
              Humidity: {data.main.humidity}%
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