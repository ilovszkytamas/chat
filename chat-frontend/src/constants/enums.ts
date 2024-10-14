export enum ErrorMessage {
  FIRST_NAME = "First name must not be empty",
  LAST_NAME = "Last name must not be empty",
  EMAIL_BLANK = "Email must not be empty",
  EMAIL_FORMAT = "Invalid email format",
  PASSWORD = "Password must be between 8 and 20 characters length"
}

export enum ErrorType {
  FIELD = "FIELD",
  GENERIC = "GENERIC"
}

export enum FriendRelation {
  NONE = "NONE",
  PENDING_SENDER = "PENDING_SENDER",
  PENDING_RECIPIENT = "PENDING_RECIPIENT",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}