export interface IId {
  id: string | any
}

export interface IProfile {
  id: string
  name: string
  email: string
  isAdmin: boolean
  created_at: string
}

export interface IAuthSignIn {
  email: string
  password: string
}

export interface IUserById {
  id: string
}

export interface IUserState {
  state: {
    email: string
  }
}
