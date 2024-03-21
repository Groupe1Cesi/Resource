import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '@/components/server/mongodb/mongodb.component'
import tokenVerify from '@/components/server/auth/tokenVerify'
import { User, UserBdd } from '@/types/user'

let userUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    const database = await Database.getInstance();
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: 'Non autorisé. Error 001' })
    }
    let {allowed, tokenEmail} = await tokenVerify(authorization)
    if (!allowed) {
        return res.status(401).json({ message: 'Non autorisé. Error 002' })
    }
    let user: UserBdd
    try {
        user = await database.db.collection('users').findOne({ email: tokenEmail })
        console.log(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status:'failed', message: 'Erreur Interne' })
    }
    if (!user) {
        return res.status(401).json({ message: 'Non autorisé. . Error 004' })
    }
    let body = req.body
    console.log(req.body)
    if (body.prenom || body.nom || body.email || body.region) {
        let updateRequest = {}
        if (body.prenom) {
            updateRequest = { ...updateRequest, prenom: body.prenom }
        }
        if (body.nom) {
            updateRequest = { ...updateRequest, nom: body.nom }
        }
        if (body.email) {
            updateRequest = { ...updateRequest, email: body.email }
        }
        if (body.region) {
            updateRequest = { ...updateRequest, region: body.region }
        }
        try {
            await database.db.collection('users').updateOne({ email: tokenEmail }, { $set: updateRequest })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status:'failed', message: 'Erreur Interne' })
        }
        return res.status(200).json({ status: 'success' })
    }
    return res.status(400).json({ message: 'Mauvaise requête' })

}

export default userUpdate