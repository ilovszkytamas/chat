
import { Friend, ProfileData } from "../../constants/types";
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
  conversations: Array<{
    id: number;
    name: string;
    lastMessage: string;
  }>;
  friendList: Friend[]
};

export const defaultMessageState: MessageState = {
  selectedConversationId: null,
  conversations: [
    { id: 1, name: 'Alice', lastMessage: 'Hey, how’s it going?' },
    { id: 2, name: 'Bob', lastMessage: 'Got the files?' },
    { id: 3, name: 'Charlie', lastMessage: 'Let’s catch up soon.' },
  ],
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