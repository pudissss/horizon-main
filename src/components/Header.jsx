import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Horizon Weather Logo" 
            style={{ 
              height: '40px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          />
        </Box>
        <Button 
          color="inherit" 
          onClick={() => navigate('/favorites')}
          sx={{ mr: 2 }}
        >
          Favorites
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;