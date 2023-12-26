import connectDB from "../index.js"
import Animal from "../models/Animal.js"

export default async function updateAnimal(data) {
    try {
        await connectDB();
        console.log("animal id " + data.animalID)
        console.log(data.addValue)
        const query = await Animal.findById(data.animalID).exec()
        if (query === null) {
            throw new Error("Animal Not Found")
        }
        const animal = await Animal.updateOne(
            { _id: data.animalID },
            { $inc: { hoursTrained: data.addValue}}
        );
        return animal
    } catch (e) {
        throw new Error(e);
    }
}