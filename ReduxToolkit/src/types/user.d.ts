export type User = {
    id: string,
    name: string,
    age: number,
}

export type UserRequest = {
    id: string,
    serial: string,
}

export type UserResponse = {
    resultCode: string,
    id: string
    name: string,
    age: number
}

export type { User, UserRequest, UserResponse };
