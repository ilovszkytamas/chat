import React, { useState, useRef } from 'react';
import API from '../../config/api';
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ErrorType } from '../../constants/enums';
import { FieldError, ProfileData } from '../../constants/types';
import ImageUploader from './ImageUploader';
import ProfileInputs from './ProfileInputs';
import { useSearchParams } from 'react-router-dom';
import { useRefreshSignedInUser } from '../../hooks/useRefreshSignedInUser';
import { useGlobalContext } from '../../store/context/GlobalContext';
import FriendInteractionButton from '../friend-interaction/FriendInteractionButton';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useGlobalContext()
  console.log(state)
  const { signedInUser } = state;
  const [profileData, setProfileData] = useState<ProfileData>({
    id: null,
    email: '',
    firstName: '',
    lastName: ''
  });
  const [profileDataLoaded, setProfileDataLoaded] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([])
  const [hasError, setHasError] = useState<boolean>(false)
  const [image, setImage] = useState<any>();
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [uploadableImage, setUploadableImage] = useState<any>();
  const inputRef: any = useRef();
  const [searchParams, _] = useSearchParams();
  const refreshSignedInUser = useRefreshSignedInUser();
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);

  const loadProfileData = async () => {
    await refreshSignedInUser();
    const urlId = searchParams.get("id");
    console.log(urlId)
    if (!urlId || urlId === signedInUser.id?.toString()) {
      setProfileData(signedInUser);
      setProfileDataLoaded(true);
      setIsEditDisabled(false);
    } else {
      const response = await API.get(`/user/${urlId}`);
      const { data } = response;
      setProfileData(data);
      setProfileDataLoaded(true);
      setIsEditDisabled(true);
    }
  }

  const loadProfileImage = async () => {
    if (false) {
      const response = await API.get("/img/profile/" + profileData.id, {
        responseType: "blob"
      });
      const { data } = response;
      let reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = function () {
      let imageDataUrl = reader.result;
      setImage(imageDataUrl);
    };
    }
  }

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e?.target?.files)
    if (e.target) {
      const file = e?.target?.files!![0];
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const fileAsUrl = URL.createObjectURL(file);
      setImage(fileAsUrl);
      setImageChanged(true);
      setUploadableImage(file);
      // TODO: add proper error 
      } else console.log("Pic upload error")
    }
};

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    loadProfileData();
    if (profileDataLoaded) {
      loadProfileImage();
    }
  }, [profileDataLoaded])

  

  const submitChanges = async () => {
    if (inputRef.current.validateFields()) {
      try {
        const response = await API.post('/user/current', {...profileData});
        console.log(response)
      } catch (error: any) {
        const { data } = error?.response;
        if (data?.errorType === ErrorType.FIELD) {
          setFieldErrors(data.fieldErrors)
        } else {
          setHasError(true)
        }
      }
    }
    if (!hasError && imageChanged) {
    const formData = new FormData();
    formData.append('file', uploadableImage);
    formData.append('type', uploadableImage.type)
    const response = await API.post('/img/upload', formData);
    console.log(response)
    }
  };

  return (
    <Grid2 container direction="column" alignItems="center">
      <ProfileInputs 
        profileData={profileData} 
        onChangeHandler={onChangeHandler}
        fieldErrors={fieldErrors}
        setFieldErrors={setFieldErrors}
        isDisabled={isEditDisabled}
        ref={inputRef}  />
      <ImageUploader image={image} onFileChangeHandler={onFileChangeHandler} isDisabled={isEditDisabled}/>
      <Button onClick={submitChanges} style={{ display: isEditDisabled ? 'none' : undefined }}>Save Changes</Button>
      <FriendInteractionButton hidden={!isEditDisabled} id={profileData?.id || undefined}/>
    </Grid2>
  );
}

export default ProfilePage;