import { ProfileData } from "../../constants/types";


export enum GlobalAction {
  FILL_PROFILE_DATA = "FILL_PROFILE_DATA"
}

export const fillProfileData = (payload: ProfileData) => ({
  type: GlobalAction.FILL_PROFILE_DATA,
  payload
})