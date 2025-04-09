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
  senderId: number,
  recipientId: number,
  message: string,
  senderFullName: string,
  notificationStatus: NotificationStatus
}