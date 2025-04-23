import React, { useState } from 'react';
import { FriendRelation } from '../../constants/enums';
import { Button, ButtonProps, Stack, Tooltip } from '@mui/material';
import { BASE_API } from '../../config/api';

interface Props {
  hidden: boolean;
  id?: number;
}

const FriendInteractionButton: React.FC<Props> = (props) => {
  const { hidden, id } = props; 
  const [relation, setRelation] = useState<FriendRelation>(FriendRelation.NONE);
  console.log(relation)
  const getFriendRelation = async (id: number) => {
    const response = await BASE_API.get(`/friend/relation/${id.toString()}`);
    const { data } = response
    setRelation(data);
  }

  React.useEffect(() => {
    if (!hidden && id) {
      getFriendRelation(id);
    }    
  }, [hidden, id]);

  const addFriend = async () => {
    const response = await BASE_API.put(`/friend/relation/request/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  const cancelFriendRequest = async () => {
    const response = await BASE_API.put(`/friend/relation/reject/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  const acceptFriendRequest = async () => {
    const response = await BASE_API.put(`/friend/relation/accept/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  const renderButton = (text: string, onClick: () => void, color: ButtonProps['color']) => (
    <Tooltip title={text}>
      <Button
        variant="contained"
        color={color}
        onClick={onClick}
        sx={{ width: '100%', marginBottom: 1 }}
      >
        {text}
      </Button>
    </Tooltip>
  );

  if (hidden || !id) {
    return null;
  }

  switch(relation) {
    case FriendRelation.NONE: 
    case FriendRelation.REJECTED: {
      return renderButton('Add Friend', addFriend, 'primary');
    }
    case FriendRelation.PENDING_SENDER: {
      return renderButton('Cancel request', cancelFriendRequest, 'secondary');
    }
    case FriendRelation.PENDING_RECIPIENT: {
      return (
        <Stack spacing={2}>
          {renderButton('Accept', acceptFriendRequest, 'primary')}
          {renderButton('Reject', cancelFriendRequest, 'error')}
        </Stack>
      );
    }
    default: return null;
  }
}

export default FriendInteractionButton;