import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ErrorType } from '../../constants/enums';
import { FieldError, ProfileData } from '../../constants/types';
import ImageUploader from './ImageUploader';
import ProfileInputs from './ProfileInputs';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRefreshSignedInUser } from '../../hooks/useRefreshSignedInUser';
import { useGlobalContext } from '../../store/context/GlobalContext';
import FriendInteractionButton from './FriendInteractionButton';
import { BASE_API, IMAGE_API } from '../../config/api';

const ProfilePage: React.FC = () => {
  const { state } = useGlobalContext();
  const [profileData, setProfileData] = useState<ProfileData>({
    id: null,
    email: '',
    firstName: '',
    lastName: ''
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [uploadableImage, setUploadableImage] = useState<any>();
  const inputRef: any = useRef();
  const [searchParams, _] = useSearchParams();
  const refreshSignedInUser = useRefreshSignedInUser();
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);
  const [currentUrlId, setCurrentUrlId] = useState<string | null>(null);
  const location = useLocation();

  const loadProfileData = async () => {
    const urlId = searchParams.get("id");
    setCurrentUrlId(urlId);
    const currentUser = await refreshSignedInUser();
    console.log(urlId, currentUser.id?.toString())
    if (!urlId || urlId === currentUser.id?.toString()) {
      setProfileData(currentUser);
      setIsEditDisabled(false);
    } else {
      const response = await BASE_API.get(`/user/${urlId}`);
      const { data } = response;
      setProfileData(data);
      setIsEditDisabled(true);
    }
  };

  const loadProfileImage = async () => {
    if (!profileData.id) return;
  
    try {
      const response = await IMAGE_API.get(`/img/profile/${profileData.id}`, {
        responseType: "blob",
      });
      const { data } = response;
  
      const reader = new FileReader();
      reader.readAsDataURL(data);
  
      reader.onload = () => {
        setImage(reader.result);
      };
  
      reader.onerror = () => {
        setImage("/blank-profile-picture.jpeg");
      };
    } catch (error) {
      setImage("/blank-profile-picture.jpeg");
    }
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const fileAsUrl = URL.createObjectURL(file);
      setImage(fileAsUrl);
      setImageChanged(true);
      setUploadableImage(file);
    } else {
      console.log("Pic upload error");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    loadProfileData();
  }, [searchParams]);

  useEffect(() => {
    if (profileData.id && !image) {
      loadProfileImage();
    }
  }, [profileData]);

  const submitChanges = async () => {
    if (inputRef.current.validateFields()) {
      try {
        const response = await BASE_API.post('/user/current', { ...profileData });
        console.log(response);
      } catch (error: any) {
        const { data } = error?.response;
        if (data?.errorType === ErrorType.FIELD) {
          setFieldErrors(data.fieldErrors);
        } else {
          setHasError(true);
        }
      }
    }

    if (!hasError && imageChanged) {
      const formData = new FormData();
      formData.append('file', uploadableImage);
      formData.append('type', uploadableImage.type);
      const response = await IMAGE_API.post('/img/upload', formData);
      console.log(response);
    }
  };

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ px: 2, py: 4 }}
    >
      <Grid2>
        <ProfileInputs
          profileData={profileData}
          onChangeHandler={onChangeHandler}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
          isDisabled={isEditDisabled}
          ref={inputRef}
        />
      </Grid2>
  
      <Grid2>
        <ImageUploader
          image={image}
          onFileChangeHandler={onFileChangeHandler}
          isDisabled={isEditDisabled}
        />
      </Grid2>
  
      <Grid2>
        {!isEditDisabled && (
          <Button variant="contained" color="primary" onClick={submitChanges}>
            Save Changes
          </Button>
        )}
      </Grid2>
  
      <Grid2>
        <FriendInteractionButton
          hidden={!isEditDisabled}
          id={profileData?.id || undefined}
        />
      </Grid2>
    </Grid2>
  );
};

export default ProfilePage;
