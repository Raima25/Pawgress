import User from '../models/User';
import Animal from '../models/Animal';
import TrainingLog from '../models/TrainingLog';
import connectDB from '../index';

async function deleteTrainingLog(data) {
    await connectDB();
    try {
        const { trainingLogID } = data;
        // Find the training log to get the associated animal ID
        const trainingLog = await TrainingLog.findById(trainingLogID);
        if (!trainingLog) {
            throw new Error('Training Log Not Found');
        }
        // Delete the training log
        await TrainingLog.deleteOne({ _id: trainingLogID });
        // Update the associated animal's hoursTrained
        const animal = await Animal.findById(trainingLog.animal);
        if (animal) {
            animal.hoursTrained -= trainingLog.hours;
            await animal.save();
        }
        return true;
    } catch (error) {
        console.error('Error deleting training log:', error.message);
        return false;
    }
};

export default deleteTrainingLog;
