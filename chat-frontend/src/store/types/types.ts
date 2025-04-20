
import { Conversation, Friend, ProfileData } from "../../constants/types";
import { GlobalAction } from "../actions/GlobalAction";
import { MessageAction } from "../actions/MessageAction";

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

export type MessageState = {
  selectedConversationId: number | null;
  conversations: Conversation[]
  friendList: Friend[]
};

export const defaultMessageState: MessageState = {
  selectedConversationId: null,
  conversations: [],
  friendList: []
};

export type MessageActionType = {
  type: MessageAction,
  payload: any
}

export type MessageContextType = {
  state: MessageState;
  dispatch: React.Dispatch<MessageActionType>;
}