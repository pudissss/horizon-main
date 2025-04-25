import { useState } from 'react';
import { 
  Autocomplete, 
  TextField, 
  IconButton, 
  Box,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function WeatherSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchText) => {
    if (!searchText || searchText.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=1da6c411e4f6bfe94b50efe5befd2f7f`
      );
      const data = await response.json();
      
      const locations = data.map(item => ({
        label: `${item.name}, ${item.country}${item.state ? `, ${item.state}` : ''}`,
        value: item.name
      }));
      
      setOptions(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
      <Autocomplete
        fullWidth
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newValue) => {
          setInputValue(newValue);
          handleSearch(newValue);
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            if (typeof newValue === 'string') {
              onSearch(newValue);
            } else {
              onSearch(newValue.value);
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search location..."
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <IconButton 
        onClick={() => onSearch(inputValue)}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default WeatherSearch;