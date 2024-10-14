import { InputLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { forwardRef, useImperativeHandle } from 'react';
import { FieldError, ProfileData } from '../../constants/types';
import { ErrorMessage } from '../../constants/enums';
import { EMAIL_REGEX } from '../../constants/constants';

interface ProfileInputProps {
  profileData: ProfileData;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldErrors: FieldError[];
  setFieldErrors: any;
  isDisabled: boolean;
}

const ProfileInputs = forwardRef((props: ProfileInputProps, ref) => {
  const { profileData, onChangeHandler, fieldErrors, setFieldErrors, isDisabled } = props;

  useImperativeHandle(ref, () => ({
     validateFields(): boolean {
      setFieldErrors([]);
      let fieldErrors: FieldError[] = [];
      if (profileData.firstName.length === 0) {
        fieldErrors.push({
          fieldName: "firstName",
          errorMessage: ErrorMessage.FIRST_NAME
        })
      }
      if (profileData.lastName.length === 0) {
        fieldErrors.push({
          fieldName: "lastName",
          errorMessage: ErrorMessage.LAST_NAME
        })
      }
      if (profileData.email.length === 0) {
        fieldErrors.push({
          fieldName: "email",
          errorMessage: ErrorMessage.EMAIL_BLANK
        })
      }
      if (EMAIL_REGEX.test(profileData.email)) {
        fieldErrors.push({
          fieldName: "email",
          errorMessage: ErrorMessage.EMAIL_FORMAT
        })
      }
  
      if (fieldErrors.length > 0) {
        setFieldErrors(fieldErrors)
        return false;
      }
  
      return true;
    }
  }));

  return (
    <React.Fragment>
      <Grid2 container direction="row" alignItems="center" spacing={5}>
        <Grid2>
          <InputLabel>Email</InputLabel>
        </Grid2>
        <Grid2>
          <TextField
            name="email"
            value={profileData?.email}
            onChange={onChangeHandler}
            error={!!fieldErrors?.find((e) => e.fieldName === "email")}
            helperText={fieldErrors?.find((e) => e.fieldName === "email")?.errorMessage}
            disabled={isDisabled}
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction="row" alignItems="center" spacing={5}>
        <Grid2>
          <InputLabel>First Name</InputLabel>
        </Grid2>
        <Grid2>
          <TextField 
            name="firstName"
            value={profileData?.firstName}
            onChange={onChangeHandler}
            error={!!fieldErrors?.find((e) => e.fieldName === "firstName")}
            helperText={fieldErrors?.find((e) => e.fieldName === "firstName")?.errorMessage}
            disabled={isDisabled}
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction="row" alignItems="center" spacing={5}>
        <Grid2>
          <InputLabel>Last Name</InputLabel>
        </Grid2>
        <Grid2>
          <TextField
            name="lastName"
            value={profileData?.lastName}
            onChange={onChangeHandler}
            error={!!fieldErrors?.find((e) => e.fieldName === "lastName")}
            helperText={fieldErrors?.find((e) => e.fieldName === "lastName")?.errorMessage}
            disabled={isDisabled}
          />
        </Grid2>
      </Grid2>
    </React.Fragment>
  )
})

export default ProfileInputs;