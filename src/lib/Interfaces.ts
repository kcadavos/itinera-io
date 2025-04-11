export interface IUserInfoCreate {
    email: string
    password: string
    name: string
}

export interface IUserDataLogin {
    password: string
    email: string


}


export interface IUserInfo {
    id: number
    email: string
    name: string

}

export interface IToken {
    token: string
}
