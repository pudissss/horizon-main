import { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import WeatherDashboard from './components/WeatherDashboard';
import Header from './components/Header';
import UserPreferences from './components/UserPreferences';

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
  const handleAddFavorite = (location) => {
    if (!favorites.includes(location)) {
      setFavorites([...favorites, location]);
    }
  };

  const handleRemoveFavorite = (location) => {
    setFavorites(favorites.filter(fav => fav !== location));
  };
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('units', units);
  }, [favorites, units]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <UserPreferences 
          units={units} 
          setUnits={setUnits}
          favorites={favorites}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
        <WeatherDashboard units={units} favorites={favorites} onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;