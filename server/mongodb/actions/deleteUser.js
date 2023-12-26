import User from '../models/User';
import Animal from '../models/Animal';
import TrainingLog from '../models/TrainingLog';
import connectDB from '../index';

async function deleteUser(data) {
    await connectDB();
    try {
        const {userID} = data;
        // Delete the user
        const user = await User.deleteOne({ _id: userID });
        if (user.deletedCount === 0) {
            throw new Error('User Not Found');
        }
        // Delete animals associated with user
        await Animal.deleteMany({ owner: userID });
        // Delete training logs associated with user
        await TrainingLog.deleteMany({ user: userID });
        return true;
    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw new Error(error);
    }
};

export default deleteUser;
