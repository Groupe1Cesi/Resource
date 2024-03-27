import { Commentaire } from './commentaire';
import { Forum } from './forum';
import { User } from './user';

export type  Resource = {
    uniqueId: String,
    forum: Forum.code
    auteur: String,
    titre: String,
    contenue: String,
    datePublication : Date,
    dateMaj : Date,
    dateModification : Date | null,
    modifier: boolean,
    nombreVue: Number,
    categories: Array<String>,
    invisible: boolean,
    moderer: boolean,
    commentaire: Array<Commentaire>,
}

export type Resources = Array<Resource>