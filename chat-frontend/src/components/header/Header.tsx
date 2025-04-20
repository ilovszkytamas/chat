import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UserSearch from './UserSearch';
import Notifications from './Notifications';
import { AccountCircle, MailOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          maxHeight: 70,
          justifyContent: 'center',
          px: 2,
          backgroundColor: 'primary.main'
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div">
              Profile
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <UserSearch />
            <Notifications />
            <IconButton color="inherit" aria-label="messages" onClick={() => navigate("/messages")}>
              <MailOutline />
            </IconButton>
            <Box gap={1}>
              <IconButton color="inherit" onClick={() => navigate("/profile")}>
                <Avatar 
                  src="/blank-profile-picture.jpeg" 
                  alt="User Avatar" 
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                borderRadius: 20,
                paddingX: 2,
                paddingY: 1,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'white',
                  color: 'primary.main',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
