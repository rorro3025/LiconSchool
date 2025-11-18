export type SaveUserT = {
    name: string, 
    role: string
    age: number
    email: string
    username: string
}

export type UserInDB = {
    password: string
    id: string
    createdAt: string
} & SaveUserT