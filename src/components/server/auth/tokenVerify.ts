import jwt from 'jsonwebtoken'
import { Database } from '../mongodb/mongodb.component'

let tokenVerify = async (authorization:string):Promise<{allowed: boolean, tokenEmail: string}> => {
    let token:any
    let database = await Database.getInstance()
    try {
        token = jwt.verify(authorization, process.env.JWT_SECRET as string)
    } catch (error:any) {
        return {allowed: false, tokenEmail: ''}
    }
    if (!token.email && !token.id) {
        return {allowed: false, tokenEmail: ''}
    }
    let user
    try {
        user = await database.db.collection('users').findOne({ email: token.email })
    } catch (error) {
        return {allowed: false, tokenEmail: ''}
    }
    if (!user) {
        return {allowed: false, tokenEmail: ''}
    }
    if (user._id.toString() !== token.id) {
        return {allowed: false, tokenEmail: ''}
    }
    if (user.email !== token.email) {
        return {allowed: false, tokenEmail: ''}
    }
    return {allowed: true, tokenEmail: token.email}
}

export default tokenVerify