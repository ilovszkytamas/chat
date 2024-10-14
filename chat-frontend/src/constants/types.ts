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