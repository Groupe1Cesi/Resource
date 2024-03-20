export type User = {
    id: string
    prenom: string,
    nom: string,
    email: string
}

export type UserComplete = {
    id: string,
    prenom: string,
    nom: string,
    email : string,
    password: string,
    role: Array<string>,
    createdAt: Date,
    lastLogin: Date
}