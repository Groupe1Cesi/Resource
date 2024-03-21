export type User = {
    id: string
    prenom: string,
    nom: string,
    email: string,
    region: string,
}

export type UserBdd = {
    id: string
    prenom: string,
    nom: string,
    email: string,
    password: string,
    region: string,
    createdAt: Date,
    lastLogin: Date
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