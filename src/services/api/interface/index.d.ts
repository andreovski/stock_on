export interface IId {
  id: string | any
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

export interface IPagination {
  from: number
  to: number
}
