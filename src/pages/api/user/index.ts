import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '@/components/server/mongodb/mongodb.component'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '@/types/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const database = await Database.getInstance();
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: 'Non autorisé. Error 001' })
    }
    let token:any
    try {
        token = jwt.verify(authorization, process.env.JWT_SECRET as string)
    } catch (error:any) {
        return res.status(401).json({ status: 'error', message: 'Non autorisé. Error 002', error: error.message  })
    }
    if (!token.email && !token.id) {
        return res.status(401).json({ message: 'Non autorisé. Error 003' })
    }
    let user
    try {
        user = await database.db.collection('users').findOne({ email: token.email })
    } catch (error) {
        return res.status(500).json({ status:'failed', message: 'Erreur Interne' })
    }
    if (!user) {
        return res.status(401).json({ message: 'Non autorisé. . Error 004' })
    }

    if (user._id.toString() !== token.id) {
        return res.status(401).json({ message: 'Non autorisé. Error 005' })
    }
    if (user.email !== token.email) {
        return res.status(401).json({ message: 'Non autorisé. Error 006' })
    }
    let userInfos = {
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        region: user.region,
    }
    if (!userInfos || userInfos === null || userInfos === undefined) {
        return res.status(401).json({ status: "failed", message: "Erreur Interne" })
    }
    return res.status(200).json({ status: "success", user: userInfos })
}