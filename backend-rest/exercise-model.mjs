// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    reps: { type: Number, required: true},
    weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: Date, required: true, default: Date.now,}   
}, {collection: 'exercises'});

const Exercise = mongoose.model("Exercise",exerciseSchema);

const createExercise = async (data) => {
    if (!connection) { // Always wait for connection before continuing
        await connect();
    }
    const exercise = new Exercise(data); // data is an object containing data for a new user
    const saved = await exercise.save()
    return saved
}

const readAllExercise = async (filter) => {
    if (!connection) {
            await connect();
        }
    const query = await Exercise.find(filter); // use filter to sort through databases for matches
    return query;
}

const readOneExercise = async (id) => {
    if (!connection) {
        await connect();
    }
    const query = await Exercise.findById(id);
    return query;
}

const updateExercise = async (id, new_version) => {
    if (!connection) {
        await connect();
    }
    const updatedExercise = await Exercise.findByIdAndUpdate(id, new_version, {new: true}) //use built in method findByIdAndUpdate to more easily update user 
    return updatedExercise;
}

const deleteManyExercises = async (filter) => {
    if (!connection) {
        await connect();
    }
    const query = await Exercise.deleteMany(filter) // use a filter with built in deleteMany method to sort out what objects need to be deleted from database 
    return query
}

const deleteOneExercise = async (id) => {
    if (!connection) {
        await connect();
    }
    const exerciseDeleted = await Exercise.findByIdAndDelete(id) //use built in findByIdAndDelete method to execute this operation
    return exerciseDeleted;
}

export { connect };
export { createExercise };
export { readAllExercise };
export { readOneExercise };
export { updateExercise };
export { deleteOneExercise };
export { deleteManyExercises };