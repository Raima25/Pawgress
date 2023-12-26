import connectDB from '../index.js'
import Animal from '../models/Animal.js'
import User from '../models/User.js'

export default async function createAnimal(data) {
    try {
        await connectDB();
        const userExists = await User.findOne({ _id: data.owner })
        if (userExists === null) {
            throw new Error("Owner Not Found")
        }
        const newAnimal = new Animal(data)
        await newAnimal.save()
    } catch (e) {
        throw new Error(e)
    }
}