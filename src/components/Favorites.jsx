import { Box, Container, Typography } from '@mui/material';
import UserPreferences from './UserPreferences';

function Favorites({ units, setUnits, favorites, onAddFavorite, onRemoveFavorite }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Locations
        </Typography>
        <UserPreferences 
          units={units}
          setUnits={setUnits}
          favorites={favorites}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      </Box>
    </Container>
  );
}

export default Favorites;