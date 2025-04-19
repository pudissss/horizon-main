import { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import Header from './components/Header';
// import UserPreferences from './components/UserPreferences';
import Login from './components/Login';
import Signup from './components/Signup';
import Favorites from './components/Favorites';
import HomePage from './components/HomePage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem('units');
    return saved || 'metric';
  });

  const [weatherData, setWeatherData] = useState({}); // State to store weather data for all favorites

  const handleAddFavorite = (location) => {
    const trimmedLocation = location.trim();
    const normalizedLocation = trimmedLocation.toLowerCase();

    if (!favorites.some(fav => fav.toLowerCase() === normalizedLocation)) {
      const updatedFavorites = [...favorites, trimmedLocation];
      setFavorites(updatedFavorites);
    }
  };

  const handleRemoveFavorite = (location) => {
    const trimmedLocation = location.trim();
    const normalizedLocation = trimmedLocation.toLowerCase();

    const updatedFavorites = favorites.filter(fav => fav.toLowerCase() !== normalizedLocation);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    console.log('Saving to localStorage:', { favorites, units });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('units', units);
  }, [favorites, units]);

  const fetchWeatherData = (location, units) => {
    console.log(`Fetching weather data for ${location} with units: ${units}`);
    // Simulate fetching weather data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ location, temperature: Math.random() * 100, units });
      }, 500);
    });
  };

  useEffect(() => {
    // Load initial weather data for first favorite
    if (favorites.length > 0) {
      fetchWeatherData(favorites[0], units).then((data) => {
        setWeatherData((prevData) => ({
          ...prevData,
          [favorites[0]]: {
            current: data,
            forecast: data,
          },
        }));
      });
    }
  }, []); // Run only on mount

  useEffect(() => {
    console.log('Units changed to:', units);

    // Fetch updated weather data for all favorite locations
    favorites.forEach((location) => {
      fetchWeatherData(location, units).then((data) => {
        setWeatherData((prevData) => ({
          ...prevData,
          [location]: {
            current: data, // Assuming `data` contains current weather
            forecast: data, // Assuming `data` contains forecast data
          },
        }));
      });
    });
  }, [units, favorites]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={
              <Favorites 
                units={units}
                setUnits={setUnits}
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            } />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={
              <WeatherDashboard 
                units={units} 
                setUnits={setUnits} 
                weatherData={weatherData}
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            } />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
