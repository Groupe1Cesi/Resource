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
    let { id } = req.query
    const database = await Database.getInstance();
    let forum;
    try {
        forum = await database.db.collection('forums').findOne({code: id})
    } catch (error) {
        return res.status(500).json({ message: "Erreur Interne" });
    }
    if (!forum) {
        return res.status(500).json({ message: "Erreur Interne" });
    }

    return res.status(200).json(forum);
  
}
