import connectDB from '../index.js'
import User from '../models/User.js'

export default async function readUsers(page, limit) {
    try {
        await connectDB()
        return await User.find({}).limit(limit).skip((page - 1) * limit).exec();
    } catch (e) {
        console.log(e)
        return false
    }
}