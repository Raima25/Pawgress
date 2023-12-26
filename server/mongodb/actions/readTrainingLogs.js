import connectDB from '../index.js'
import TrainingLog from '../models/TrainingLog.js'

export default async function readTrainingLogs(page, limit) {
    try {
        await connectDB()
        return await TrainingLog.find({}).limit(limit).skip((page - 1) * limit).exec();
    } catch (e) {
        console.log(e)
        return false
    }
}