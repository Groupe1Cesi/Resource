import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from '@/components/server/mongodb/mongodb.component'
import { Forum, Forums } from '@/types/forum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
    const database = await Database.getInstance();
    let forums;
    try {
        forums = await database.db.collection('forums').find().toArray()
    } catch (error) {
        return res.status(500).json({ message: "Erreur Interne" });
    }
    if (!forums) {
        return res.status(500).json({ message: "Erreur Interne" });
    }

    let forumsCol:Forums = forums.map((forum:any) => {
        return {
            nom: forum.nom,
            description: forum.description,
            code: forum.code
        }
    })
    return res.status(200).json(forumsCol);
  
}
