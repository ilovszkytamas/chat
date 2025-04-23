import React from 'react';
import { useGlobalContext } from '../store/context/GlobalContext';
import { fillProfileData } from '../store/actions/GlobalAction';
import { BASE_API } from '../config/api';

export const useRefreshSignedInUser = () => {
  const { dispatch } = useGlobalContext();
  const refreshSignedInUser = async () => {
    const profileData = await BASE_API.get("/user/current");
    const { data } = profileData;
    dispatch(fillProfileData(data));
    return data;
  }

  return refreshSignedInUser;
}