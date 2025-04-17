import { useEffect, useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherForecast({ data, units }) {
  const [forecastType, setForecastType] = useState('hourly');
  
  if (!data || !data.list) return null;

  const convertTemp = (temp) => {
    if (units === 'imperial') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  const tempUnit = units === 'metric' ? '°C' : '°F';
  
  const processData = () => {
    const forecastData = data.list.slice(0, forecastType === 'hourly' ? 8 : 7).map(item => ({
      ...item,
      main: {
        ...item.main,
        temp: convertTemp(item.main.temp)
      }
    }));
    
    return {
      labels: forecastData.map(item => {
        const date = new Date(item.dt * 1000);
        return forecastType === 'hourly' 
          ? date.getHours() + ':00'
          : date.toLocaleDateString('en-US', { weekday: 'short' });
      }),
      datasets: [
        {
          label: `Temperature (${tempUnit})`,
          data: forecastData.map(item => Math.round(item.main.temp)),
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Humidity (%)',
          data: forecastData.map(item => item.main.humidity),
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.5)',
          tension: 0.4,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${forecastType === 'hourly' ? 'Hourly' : '7-Day'} Forecast`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Weather Forecast</Typography>
        <ToggleButtonGroup
          value={forecastType}
          exclusive
          onChange={(e, newValue) => newValue && setForecastType(newValue)}
          size="small"
        >
          <ToggleButton value="hourly">Hourly</ToggleButton>
          <ToggleButton value="daily">Daily</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ height: 300 }}>
        <Line data={processData()} options={chartOptions} />
      </Box>
    </Box>
  );
}

export default WeatherForecast;