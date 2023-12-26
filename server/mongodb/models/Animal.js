import mongoose from 'mongoose'

const animalSchema = new mongoose.Schema({
    name: { // animal's name
        type: String,
        required: true
    },
    breed: { // animal's breed
        type: String,
        required: true
    },
    owner: { // id of the animal's owner
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hoursTrained: { // total number of hours the animal has been trained for
        type: Number,
        required: true 
    }, 
    profilePicture: { // url to an image that can be displayed in an <img> tag
        type: String,
        required: true
    }
})

export default mongoose.models?.Animal || mongoose.model('Animal', animalSchema)