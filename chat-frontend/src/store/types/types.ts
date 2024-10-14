
import { ProfileData } from "../../constants/types";
import { GlobalAction } from "../actions/GlobalAction";

export type GlobalState = {
  signedInUser: ProfileData
}

export const defaultState: GlobalState = {
  signedInUser: {
    id: null,
    email: '',
    firstName: '',
    lastName: ''
  }
}

export type GlobalContextType = {
  state: GlobalState,
  dispatch: React.Dispatch<GlobalActionType>;
}

export type GlobalActionType = {
  type: GlobalAction,
  payload: any
}

export type GlobalReducerType = {
  (state: GlobalState, action: GlobalActionType): GlobalState
}