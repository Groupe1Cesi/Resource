import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../components/server/mongodb/mongodb.component'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const database = await Database.getInstance()
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email et mot de passe requis' })
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
    const result = await database.db.collection('users').insertOne({
      email : email,
      password: passwordHash,
      role: ['user'],
      createdAt: createdAt,
      lastLogin: createdAt
    })
    if (result.insertedId) {
      const token = jwt.sign({ id: result.insertedId, email }, process.env.JWT_SECRET as string, { expiresIn: '2h' })
      res.status(200).json({ status: 'success', token })
      return
    } else {
      res.status(500).json({ status: 'error', message: 'Problème avec la base de données' })
      return
    }
    return
  }
  return res.status(405).json({ status: 'error', message: 'Méthode non autorisée' })
}