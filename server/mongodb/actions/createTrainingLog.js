import connectDB from '../index.js'
import TrainingLog from '../models/TrainingLog.js'
import User from '../models/User.js'
import Animal from '../models/Animal.js'
import updateAnimal from './updateAnimal.js'


export default async function createTrainingLog(data) {
    try {

        // console.log("createTrainingLog");
        // console.log(data);
        await connectDB();
        let userExists = 0, animalExists = 0;

        try {
            userExists = await User.findOne({ _id: data.user });
            if (userExists === null){
                throw new Error("User Not Found");
            }
        } catch (e) {
            console.log(e)
            throw new Error("User Not Found")
        }
        
        try {
            animalExists = await Animal.findOne({ _id: data.animal });
            if (animalExists === null){
                throw new Error();
            }
        } catch (e) {
            console.log("Animal Not Found")
            throw new Error("Animal Not Found")
        }

        if (animalExists.owner.toString() !== data.user) {
            throw new Error("Animal's user does not match passed in user")
        }
        const newTrainingLog = new TrainingLog(data);
        await newTrainingLog.save();

        await updateAnimal({ "animalID": data.animal, "addValue": data.hours })
    } catch (e) {
        throw new Error(e)
    }
}