import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ErrorMessage, ErrorType } from '../../constants/enums';
import { EMAIL_REGEX } from '../../constants/constants';
import { FieldError } from '../../constants/types';
import { useRefreshSignedInUser } from '../../hooks/useRefreshSignedInUser';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();  
  const refreshSignedInUser = useRefreshSignedInUser();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  const handleChange = (e: any): void => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const validateFields = (): boolean => {
    setFieldErrors([]);
    let fieldErrors: FieldError[] = [];
    if (credentials.firstName.length === 0) {
      fieldErrors.push({
        fieldName: "firstName",
        errorMessage: ErrorMessage.FIRST_NAME
      })
    }
    if (credentials.lastName.length === 0) {
      fieldErrors.push({
        fieldName: "lastName",
        errorMessage: ErrorMessage.LAST_NAME
      })
    }
    if (credentials.email.length === 0) {
      fieldErrors.push({
        fieldName: "email",
        errorMessage: ErrorMessage.EMAIL_BLANK
      })
    }
    if (EMAIL_REGEX.test(credentials.email)) {
      fieldErrors.push({
        fieldName: "email",
        errorMessage: ErrorMessage.EMAIL_FORMAT
      })
    }
    if (credentials.password.length < 8 || credentials.password.length > 20) {
      fieldErrors.push({
        fieldName: "password",
        errorMessage: ErrorMessage.PASSWORD
      })
    }

    if (fieldErrors.length > 0) {
      setFieldErrors(fieldErrors)
      return false;
    }

    return true;
  }

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post('http://localhost:8080/auth/register', credentials);
        const { token } = response.data;
  
        localStorage.setItem('token', token);
        await refreshSignedInUser()
        navigate("/profile");
      } catch (error: any) {
        const { data } = error?.response;
        if (data?.errorType === ErrorType.FIELD) {
          setFieldErrors(data.fieldErrors)
        } else {
          setHasError(true)
        }
      }
    }
  };

  const navigateToLogin = (): void => {
    navigate("/login");
  }

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <Grid2 container direction={"column"} spacing={2}>
      <Grid2>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={credentials.email}
          onChange={handleChange}
          error={!!fieldErrors?.find((e) => e.fieldName === "email")}
          helperText={fieldErrors?.find((e) => e.fieldName === "email")?.errorMessage}
        />
      </Grid2>
      <Grid2>
      <TextField
        type="text"
        name="firstName"
        label="First Name"
        value={credentials.firstName}
        onChange={handleChange}
        error={!!fieldErrors?.find((e) => e.fieldName === "firstName")}
        helperText={fieldErrors?.find((e) => e.fieldName === "firstName")?.errorMessage}
      />
      </Grid2>
      <Grid2>
      <TextField
        type="text"
        name="lastName"
        label="Last Name"
        value={credentials.lastName}
        onChange={handleChange}
        error={!!fieldErrors?.find((e) => e.fieldName === "lastName")}
        helperText={fieldErrors?.find((e) => e.fieldName === "lastName")?.errorMessage}
      />
      </Grid2>
      <Grid2>
      <TextField
        type="password"
        name="password"
        label="Password"
        value={credentials.password}
        onChange={handleChange}
        error={!!fieldErrors?.find((e) => e.fieldName === "password")}
        helperText={fieldErrors?.find((e) => e.fieldName === "password")?.errorMessage}
      />
      </Grid2>
      <Grid2>
        <Button type='button' onClick={handleSubmit}>Register</Button>
      </Grid2>
      <Grid2>
        <Button type="button" onClick={navigateToLogin}>Already have an account?</Button>
      </Grid2>
      <Grid2>
        <Typography style={{display: hasError ? "block" : "none", color: "red" }}>User already exists</Typography>
      </Grid2>
    </Grid2>
    </Box>
  );
};

export default RegisterPage;
