import connectDB from "../index.js"
import TrainingLog from "../models/TrainingLog.js"
import updateAnimal from "./updateAnimal.js";

export default async function updateTrainingLog(data) {
    try {
        await connectDB();
        const { trainingLogID, ...updateData} = data;
        const oldTrainingLog = await TrainingLog.findById(trainingLogID);
        const oldHours = oldTrainingLog.hours;
        const updatedTrainingLog = await TrainingLog.findByIdAndUpdate(
            trainingLogID, updateData, { new: true }
        );
        if (updatedTrainingLog === null) {
            throw new Error("Training Log Not Found");
        }

        const difference = updatedTrainingLog.hours - oldHours;
        await updateAnimal({ "animalID": updatedTrainingLog.animal, "addValue": difference })

        return updatedTrainingLog;
    } catch (e) {
        throw new Error(e);
    }
}