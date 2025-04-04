export interface IUserInfoCreate {
    email: string
    password: string
    name: string
}

export interface IUserDataLogin {
    password: string
    email: string
}

export interface IToken {
    token: string
}