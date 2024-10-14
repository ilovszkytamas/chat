import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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

  const navigateToRegister = (): void => {
    navigate("/register");
  }
//TODO correct input types later
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <Grid2 container direction={"column"} spacing={2}>
      <Grid2>
      <TextField
        type="text"
        name="email"
        label="Email"
        value={credentials.email}
        onChange={handleChange}
      />
      </Grid2>
      <Grid2>
      <TextField
        type="password"
        name="password"
        label="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      </Grid2>
      <Grid2>
        <Button type="button" onClick={handleSubmit}>Login</Button>
      </Grid2>
        <Button type="button" onClick={navigateToRegister}>I don't have an account yet</Button>
      </Grid2>
      <Grid2>
        <Typography style={{display: hasError ? "block" : "none", color: "red" }}>Invalid email or password</Typography>
      </Grid2>
    </Box>
  );
}
export default LoginPage;
