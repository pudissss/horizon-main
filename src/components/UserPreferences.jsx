import { 
    Box, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Paper,
    Typography,
    Chip,
    Stack
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  function UserPreferences({ units, setUnits, favorites, onAddFavorite, onRemoveFavorite }) {
    const handleUnitChange = (event) => {
      setUnits(event.target.value);
    };
  
    const handleRemoveFavorite = (location) => {
      onRemoveFavorite(location);
    };
  
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="units-label">Units</InputLabel>
            <Select
              labelId="units-label"
              value={units}
              label="Units"
              onChange={handleUnitChange}
            >
              <MenuItem value="metric">Celsius (°C)</MenuItem>
              <MenuItem value="imperial">Fahrenheit (°F)</MenuItem>
            </Select>
          </FormControl>
  
          <Box sx={{ flex: 1, ml: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Favorite Locations
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {favorites.map((location) => (
                <Chip
                  key={location}
                  label={location}
                  onDelete={() => handleRemoveFavorite(location)}
                  deleteIcon={<DeleteIcon />}
                />
              ))}
              {favorites.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No favorite locations added yet
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
      </Paper>
    );
  }
  
  export default UserPreferences;