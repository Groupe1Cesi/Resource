import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../components/server/mongodb/mongodb.component'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const database = await Database.getInstance()
  const authorization = req.headers.authorization
  if (!authorization) {
    res.status(401).json({ message: 'Non autorisé. Error 001' })
    return;
  }
  // verify the token
  let token:any
  try {
    token = jwt.verify(authorization, process.env.JWT_SECRET as string)
  } catch (error) {
    res.status(401).json({ message: 'Non autorisé. Error 002' })
    return;
  }
  if (!token.email && !token.id) {
    res.status(401).json({ message: 'Non autorisé. Error 003' })
    return;
  }
  let user
  try {
    
    user = await database.db.collection('users').findOne({ email: token.email })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Problème avec la base de données' })
    return;
  }
  if (!user) {
    res.status(401).json({ message: 'Non autorisé. . Error 004' })
    return;
  }
  console.log(user)
  console.log(user._id)
  // user._id is an ObjectId
  // token.id is a string

  if (user._id.toString() !== token.id) {
    res.status(401).json({ message: 'Non autorisé. Error 005' })
    return;
  }
  if (user.email !== token.email) {
    res.status(401).json({ message: 'Non autorisé. Error 006' })
    return;
  }
  res.status(200).json({ status: "success", message: 'Autorisé' })
}