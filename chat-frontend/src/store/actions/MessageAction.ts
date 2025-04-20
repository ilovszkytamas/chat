import { Conversation, Friend } from "../../constants/types"

export enum MessageAction {
  SET_SELECTED_CONVERSATION = "SET_SELECTED_CONVERSATION",
  SET_CONVERSATIONS = "SET_CONVERSATIONS",
  SET_FRIEND_LIST = "SET_FRIEND_LIST"
}

export const setSelectedConversationId = (payload: number) => ({
  type: MessageAction.SET_SELECTED_CONVERSATION,
  payload
})

export const setConversations = (payload: Conversation[]) => ({
  type: MessageAction.SET_CONVERSATIONS,
  payload
})

export const setFriendList = (payload: Friend[]) => ({
  type: MessageAction.SET_FRIEND_LIST,
  payload
})