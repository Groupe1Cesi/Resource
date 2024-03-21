import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '@/components/server/mongodb/mongodb.component'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserComplete } from '@/types/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const database = await Database.getInstance()
    if (req.method === 'POST') {
        const { prenom, nom, email, password, region } = req.body
        if (!email || !password || !prenom || !nom) {
            res.status(400).json({ message: 'Prenom, Nom, Email et mot de passe requis' })
            return;
        }
        let user
        try {
            user = await database.db.collection('users').findOne({ email })
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Problème avec la base de données' })
            return
        }
        if (user) {
            res.status(400).json({ status: 'error', message: 'Email déjà utilisé' })
            return
        }
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
        let createdAt = new Date()
        const uuid =  crypto.randomBytes(16).toString("hex");
        const result = await database.db.collection('users').insertOne({
            id: uuid,
            prenom: prenom,
            nom: nom,
            email : email,
            password: passwordHash,
            role: ['user'],
            region: region,
            createdAt: createdAt,
            lastLogin: createdAt
        })
        if (result.insertedId) {
            const token = jwt.sign({ id: result.insertedId, email }, process.env.JWT_SECRET as string, { expiresIn: '2h' })
            return res.status(200).json({ status: 'success', token })
        } else {
            return res.status(500).json({ status: 'error', message: 'Erreur Interne' })
        }
        return res.status(500).json({ status: 'error', message: 'Erreur Interne' })
    }
    return res.status(405).json({ status: 'error', message: 'Méthode non autorisée' })
}