import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useRefreshSignedInUser } from '../../hooks/useRefreshSignedInUser';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();  
  const refreshSignedInUser = useRefreshSignedInUser();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [hasError, setHasError] = useState<boolean>(false)

  const handleChange = (e: any): void => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', credentials);
      const { token } = response.data;

      localStorage.setItem('token', token);
      await refreshSignedInUser();
      navigate("/home")
    } catch (error) {
      setHasError(true);
    }
  };

//TODO correct input types later
return (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
    <Paper elevation={3} sx={{ padding: 4, minWidth: 320, maxWidth: 400, width: '100%' }}>
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={credentials.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
        />
        {hasError && (
          <Typography color="error" textAlign="center">
            Invalid email or password
          </Typography>
        )}
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Login
        </Button>
        <Button variant="text" onClick={() => navigate('/register')} fullWidth>
          I don't have an account yet
        </Button>
      </Stack>
    </Paper>
  </Box>
);
}
export default LoginPage;
