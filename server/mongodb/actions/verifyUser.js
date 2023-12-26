import bcrypt from "bcryptjs"
import connectDB from '../index.js'
import User from '../models/User.js'

export default async function verifyUser(data) {
    data = JSON.parse(data);

    try {
        await connectDB()
        
        const user = await User.findOne({ email: data.email })
        if (user === null) {
            throw new Error('User does not exist')
        }

        const result = await bcrypt.compare(data.password, user.password)
        console.log(result);
        if (result === false) {
            throw new Error('Incorrect password')
        }

        return {'userID': user._id, 'admin': user.admin}
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}