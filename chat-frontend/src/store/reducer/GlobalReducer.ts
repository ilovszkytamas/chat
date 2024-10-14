import { GlobalAction } from "../actions/GlobalAction";
import { GlobalReducerType } from "../types/types";

export const globalReducer: GlobalReducerType= (prevState, action) => {
  switch(action.type) {
    case GlobalAction.FILL_PROFILE_DATA:
      return {
        ...prevState,
        signedInUser: action.payload
      };
    default:
      return prevState;
  }
};