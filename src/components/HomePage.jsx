import { Box, Typography, Paper, Button, Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WbSunnyIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h2" component="h1" color="primary.main">
            Horizon Weather
          </Typography>
          <CloudIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        </Box>

        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600 }}>
          Your comprehensive weather companion. Get accurate forecasts, real-time updates, 
          and detailed weather information for any location worldwide.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            maxWidth: 800,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            backgroundColor: 'background.paper',
          }}
        >
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Key Features
            </Typography>
            <Typography component="ul" sx={{ textAlign: 'left' }}>
              <li>Real-time weather updates</li>
              <li>5-day weather forecast</li>
              <li>Favorite locations</li>
              <li>Temperature unit conversion</li>
              <li>Detailed weather information</li>
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Get Started
            </Typography>
            <Typography paragraph>
              Search for any city worldwide and get instant access to accurate 
              weather information. Save your favorite locations for quick access.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ mt: 2 }}
            >
              Check Weather Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;