import { AppBar, Toolbar, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Header() {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <WbSunnyIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          Weather Forecast App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;