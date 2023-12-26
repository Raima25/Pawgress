import connectDB from '../index.js'
import Animal from '../models/Animal.js'

export default async function readAnimals(page, limit) {
    try {
        await connectDB()
        return await Animal.find({}).limit(limit).skip((page - 1) * limit).exec();
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}