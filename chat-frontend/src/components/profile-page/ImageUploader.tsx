import { Box } from '@mui/material';
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
    <React.Fragment>
      <input type="file" onChange={onFileChangeHandler} hidden={isDisabled}/>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Blank Picture"
        src={image}
      />
    </React.Fragment>
  );
}

export default ImageUploader;