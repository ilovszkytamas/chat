import { NotificationStatus } from "./enums"

export interface FieldError {
  fieldName: string,
  errorMessage: string
}

export interface ProfileData {
  id: number | null,
  email: string,
  firstName: string,
  lastName: string
}

export interface Notification {
  id: number;
  senderId: number,
  recipientId: number,
  message: string,
  senderFullName: string,
  notificationStatus: NotificationStatus
}

export interface Friend {
  friendId: number,
  name: string,
  online: boolean
}

export interface Conversation {
  id: number,
  partnerName: string,
  lastMessage: string
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
};