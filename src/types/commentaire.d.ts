export type  Commentaire = {
    id: String,
    autheur: String,
    message: String,
    datePublication: Date,
    dateModification: Date | null,
    modifier: boolean,
    invisible: boolean,
    moderer: boolean,
}