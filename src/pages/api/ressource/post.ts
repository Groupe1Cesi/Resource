import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from '@/components/server/mongodb/mongodb.component'
import { Resource, Resources } from '@/types/resource'
import tokenVerify from '@/components/server/auth/tokenVerify'
import { User } from '@/types/user'
import crypto from 'crypto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const database = await Database.getInstance();
    if (req.method !== "POST") {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: 'Non autorisé. Error 001' })
    }
    let {allowed, tokenEmail} = await tokenVerify(authorization)
    if (!allowed) {
        return res.status(401).json({ message: 'Non autorisé. Error 002' })
    }
    let user: any
    try {
        user = await database.db.collection('users').findOne({ email: tokenEmail })
    } catch (error) {
        return res.status(500).json({ status:'failed', message: 'Erreur Interne' })
    }
    if (!user) {
        return res.status(401).json({ message: 'Non autorisé. . Error 004' })
    }
    // create a new ressource
    const { titre, description, contenu, categorie, forum } = req.body
    if (titre === undefined || description === undefined || contenu === undefined || categorie === undefined || forum === undefined) {
        return res.status(400).json({ message: 'Tous les champs sont requis' })
    }
    let createdAt = new Date()

    let newResource: Resource = {
        uniqueId: crypto.randomBytes(16).toString('hex'),
        forum: forum,
        auteur: user.id,
        titre: titre,
        contenue: contenu,
        datePublication: createdAt,
        dateMaj: createdAt,
        dateModification: null,
        modifier: false,
        nombreVue: 0,
        categories: categorie,
        invisible: false,
        moderer: false,
        commentaire: [],
    }

    try {
        await database.db.collection('resources').insertOne(newResource)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status:'failed', message: 'Erreur Interne' })
    }
    return res.status(200).json({ status: 'success' });
  
}
