export enum LoginError {
  USERNOTVALID = 'The username or password is incorrect.',
  NOERRR = '',
  SUCCESS = 'Success',
  DUPLICATE = 'This account already exists.',
  EMAILINVALID = 'This email is not a valid email.',
  EMPTY = 'All fields are required.',
  PASSNOMATCH = 'The passwords do not match',
}
