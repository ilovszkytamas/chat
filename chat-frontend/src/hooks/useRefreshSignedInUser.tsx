import React from 'react';
import { useGlobalContext } from '../store/context/GlobalContext';
import API from '../config/api';
import { fillProfileData } from '../store/actions/GlobalAction';

export const useRefreshSignedInUser = () => {
  const { dispatch } = useGlobalContext();
  const refreshSignedInUser = async () => {

    const profileData = await API.get("/user/current");
    const { data } = profileData;
    dispatch(fillProfileData(data))
  }

  return refreshSignedInUser;
}