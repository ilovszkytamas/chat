import React, { useState } from 'react';
import API from '../../config/api';
import { FriendRelation } from '../../constants/enums';
import { Button } from '@mui/material';

interface Props {
  hidden: boolean;
  id?: number;
}

const FriendInteractionButton: React.FC<Props> = (props) => {
  const { hidden, id } = props; 
  const [relation, setRelation] = useState<FriendRelation>(FriendRelation.NONE);
  console.log(relation)
  const getFriendRelation = async (id: number) => {
    const response = await API.get(`/friend/relation/${id.toString()}`);
    const { data } = response
    setRelation(data);
  }

  React.useEffect(() => {
    if (!hidden && id) {
      getFriendRelation(id);
    }    
  }, [hidden, id]);

  const addFriend = async () => {
    const response = await API.put(`/friend/relation/request/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  const cancelFriendRequest = async () => {
    const response = await API.put(`/friend/relation/reject/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  const acceptFriendRequest = async () => {
    const response = await API.put(`/friend/relation/accept/${id?.toString()}`);
    const { data } = response
    setRelation(data);
  }

  if (hidden || !id) {
    return null;
  }

  switch(relation) {
    case FriendRelation.NONE: 
    case FriendRelation.REJECTED: {
      return <Button onClick={addFriend}>Add Friend</Button>
    }
    case FriendRelation.PENDING_SENDER: {
      return <Button onClick={cancelFriendRequest}>Cancel request</Button>
    }
    case FriendRelation.PENDING_RECIPIENT: {
      return (
      <React.Fragment>
        <Button onClick={acceptFriendRequest}>Accept</Button>
        <Button onClick={cancelFriendRequest}>Reject</Button>
      </React.Fragment>
      )
    }
    case FriendRelation.PENDING_SENDER: {
      return <Button onClick={cancelFriendRequest}>Delete Friend</Button>
    }
    default: return null;
  }
}

export default FriendInteractionButton;