import { Box, Button, Stack } from '@mui/material';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';

interface Props {
  image: any;
  onFileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const ImageUploader: React.FC<Props> = (props) => {
  const { image, onFileChangeHandler, isDisabled } = props;

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4, mb: 2 }}>
      <Box
        component="img"
        sx={{
          height: 200,
          width: 200,
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: 3,
        }}
        alt="Profile Picture"
        src={image}
      />
      {!isDisabled && (
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={onFileChangeHandler} />
        </Button>
      )}
    </Stack>
  );
}

export default ImageUploader;