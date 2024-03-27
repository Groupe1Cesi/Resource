import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from '@/components/server/mongodb/mongodb.component'
import { Resource, Resources } from '@/types/resource'
import { User } from '@/types/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
    let { id } = req.query
    const database = await Database.getInstance();
    let resources: Resources = []
    let resourcesNonTraitee: any
    try {
        resourcesNonTraitee = await database.db.collection('resources').find({forum: id}).toArray()
        console.log(id)
    } catch (error) {
        return res.status(500).json({ message: "Erreur Interne" });
    }
    if (!resourcesNonTraitee) {
        return res.status(500).json({ message: "Erreur Interne" });
    }

    for(let resourceNonTraitee of resourcesNonTraitee) {
        let user: any
        try {
            user = await database.db.collection('users').findOne({id: resourceNonTraitee.auteur})
        } catch (error) {
            console.log(error)
        }

        resources.push({
            uniqueId: resourceNonTraitee.uniqueId,
            forum: resourceNonTraitee.forum,
            auteur: `${user.nom} ${user.prenom}`,
            titre: resourceNonTraitee.titre,
            contenue: resourceNonTraitee.contenue,
            datePublication: resourceNonTraitee.datePublication.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
            dateMaj: resourceNonTraitee.dateMaj,
            dateModification: resourceNonTraitee.dateModification,
            modifier: resourceNonTraitee.modifier,
            nombreVue: resourceNonTraitee.nombreVue,
            categories: resourceNonTraitee.categories,
            invisible: resourceNonTraitee.invisible,
            moderer: resourceNonTraitee.moderer,
            commentaire: resourceNonTraitee.commentaire,
        })
    }

    return res.status(200).json(resources);
  
}
