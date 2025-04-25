import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  CircularProgress,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { fetchWeatherData } from '../services/weatherApi';
import CurrentWeather from './CurrentWeather';
import WeatherSearch from './WeatherSearch';

function Favorites({ units, favorites, onRemoveFavorite, onAddFavorite }) {
  const [favoritesWeather, setFavoritesWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      const weatherData = {};
      
      try {
        for (const location of favorites) {
          const response = await fetchWeatherData(location, units);
          weatherData[location] = response.current;
        }
        setFavoritesWeather(weatherData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchAllWeather();
    } else {
      setLoading(false);
    }
  }, [favorites, units]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper
          sx={{
            p: 2,
            mb: 4,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            boxShadow: 2
          }}
        >
          <WeatherSearch onSearch={onAddFavorite} />
        </Paper>

        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            color: 'primary.main',
            fontWeight: 500,
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1
          }}
        >
          Favorite Locations
        </Typography>

        {favorites.length === 0 ? (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No favorite locations added yet
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((location) => (
              <Grid item xs={12} md={6} lg={4} key={location}>
                <Box 
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    transition: 'transform 0.2s ease-in-out',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => onRemoveFavorite(location)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: 'error.light',
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        bgcolor: 'error.main',
                        color: 'white'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  
                  {favoritesWeather[location] && (
                    <CurrentWeather 
                      data={favoritesWeather[location]}
                      units={units}
                      favorites={favorites}
                      onAddFavorite={onAddFavorite}
                      onRemoveFavorite={onRemoveFavorite}
                      showFavoriteButton={false}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Favorites;