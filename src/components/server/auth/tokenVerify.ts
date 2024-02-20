import jwt from 'jsonwebtoken'
import { Database } from '../mongodb/mongodb.component'
let tokenVerify = async (authorization:string):Promise<boolean> => {
    let token:any
    let database = await Database.getInstance()
    try {
        token = jwt.verify(authorization, process.env.JWT_SECRET as string)
    } catch (error:any) {
        return false
    }
    if (!token.email && !token.id) {
        return false
    }
    let user
    try {
        user = await database.db.collection('users').findOne({ email: token.email })
    } catch (error) {
        return false
    }
    if (!user) {
        return false
    }
    if (user._id.toString() !== token.id) {
        return false
    }
    if (user.email !== token.email) {
        return false
    }
    return true
}

export default tokenVerify