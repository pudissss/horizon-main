import { Box, Typography, Grid } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

function CurrentWeather({ data, units }) {
  if (!data) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

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
          {Math.round(data.main.temp)}{tempUnit}
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
              Feels like: {Math.round(data.main.feels_like)}{tempUnit}
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
              Wind: {Math.round(data.wind.speed)} {windUnit}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CurrentWeather;