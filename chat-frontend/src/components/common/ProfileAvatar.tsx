import React, { useEffect, useState } from 'react';
import { Avatar, CircularProgress } from '@mui/material';
import { useGlobalContext } from '../../store/context/GlobalContext';
import { IMAGE_API } from '../../config/api';

interface ProfileAvatarProps {
  userId?: number;
  size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userId, size = 40 }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { state } = useGlobalContext();
  const { signedInUser } = state;

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await IMAGE_API.get(`/img/profile/${userId || signedInUser.id}`, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (userId || signedInUser.id) {
      fetchProfileImage();
    }
  }, [userId, signedInUser]);

  if (loading) {
    return <CircularProgress size={size} color="inherit" />;
  }

  return (
    <Avatar
      src={error ? "/blank-profile-picture.jpeg" : imageUrl}
      alt="User Avatar"
      sx={{ width: size, height: size }}
    />
  );
};

export default ProfileAvatar;
