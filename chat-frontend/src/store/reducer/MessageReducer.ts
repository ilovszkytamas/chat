import { MessageAction } from '../actions/MessageAction';
import { MessageActionType, MessageState } from '../types/types';

export const messageReducer = (
  state: MessageState,
  action: MessageActionType
): MessageState => {
  switch (action.type) {
    case MessageAction.SET_SELECTED_CONVERSATION:
      return {
        ...state,
        selectedConversationId: action.payload,
      };
    case MessageAction.SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case MessageAction.SET_FRIEND_LIST:
      return {
        ...state,
        friendList: action.payload
      }
    default:
      return state;
  }
};