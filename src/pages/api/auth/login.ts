import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../components/server/mongodb/mongodb.component'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const database = await Database.getInstance();
  if (req.method === 'POST') {
    const { email, password } = req.body;
    let user;

    try {
      user = await database.db.collection('users').findOne({ email });
    } catch (error) {
      res.status(500).json({ message: 'Erreur Interne' });
      return;
    }

    if (!user) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
    if (user.password === passwordHash) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
      );

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
