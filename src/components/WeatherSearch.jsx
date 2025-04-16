import { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  CircularProgress,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function WeatherSearch({ onSearch, favorites, onAddFavorite, onRemoveFavorite }) {
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.trim()) {
      setIsSearching(true);
      await onSearch(location.trim());
      setIsSearching(false);
    }
  };

  const isFavorite = (location) => favorites.includes(location);

  const toggleFavorite = (location) => {
    if (isFavorite(location)) {
      onRemoveFavorite(location);
    } else {
      onAddFavorite(location);
    }
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2
        }}
      >
        <TextField
          fullWidth
          label="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          variant="outlined"
          placeholder="e.g., London, New York, Tokyo"
          disabled={isSearching}
        />
        <IconButton 
          type="submit" 
          color="primary" 
          aria-label="search"
          disabled={isSearching}
        >
          {isSearching ? <CircularProgress size={24} /> : <SearchIcon />}
        </IconButton>
        {location && (
          <Button
            onClick={() => toggleFavorite(location)}
            startIcon={isFavorite(location) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            variant="outlined"
            disabled={isSearching}
          >
            {isFavorite(location) ? 'Remove' : 'Add'}
          </Button>
        )}
      </Box>

      {favorites.length > 0 && (
        <List sx={{ 
          mt: 1, 
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}>
          {favorites.map((favorite) => (
            <ListItem 
              key={favorite} 
              disablePadding
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => onRemoveFavorite(favorite)}
                  color="primary"
                >
                  <FavoriteIcon />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => onSearch(favorite)}>
                <ListItemText 
                  primary={favorite}
                  primaryTypographyProps={{
                    sx: { fontWeight: 500 }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default WeatherSearch;