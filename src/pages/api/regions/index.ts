import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from '@/components/server/mongodb/mongodb.component'
import { Region, Regions } from '@/types/region'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
    const database = await Database.getInstance();
    let regions;
    try {
        regions = await database.db.collection('regions').find().toArray()
    } catch (error) {
        return res.status(500).json({ message: "Erreur Interne" });
    }
    if (!regions) {
        return res.status(500).json({ message: "Erreur Interne" });
    }

    let regionsCol:Regions = regions.map((region:any) => {
        return {
            nom: region.nom,
            code: region.code
        }
    })
    return res.status(200).json(regionsCol);
  
}
