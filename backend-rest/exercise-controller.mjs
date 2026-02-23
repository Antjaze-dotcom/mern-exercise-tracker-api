import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler (async(req,res) => { // Use asynchandler/async/await to implement asychronous operations
    const acceptedUnits = ["kgs", "lbs", "miles"];
    const {name, reps, weight, unit, date} = req.body;
    if (typeof name !== 'string' || name.trim().length === 0 )
        return res.status(400).json({'Error':'Invalid request'})
    if (!Number.isInteger(reps) || reps <= 0)
        return res.status(400).json({'Error':'Invalid request'})
    if (!Number.isInteger(weight)|| weight < 0)
        return res.status(400).json({'Error':'Invalid request'})
    if (typeof unit !== 'string' || !acceptedUnits.includes(unit))
        return res.status(400).json({'Error':'Invalid request'})
    if (typeof date !== 'string' || isNaN(Date.parse(date)) )
        return res.status(400).json({'Error':'Invalid request'})
    const newExercise = await exercises.createExercise(req.body);
    return res.status(201).json(newExercise)
}));

app.get('/exercises', asyncHandler (async(req,res) => {
    const readAll = await exercises.readAllExercise();
    return res.status(200).json(readAll)
}));

app.get('/exercises/:id', asyncHandler (async(req,res) => {
    const exercisesId = req.params.id;
    const readOne = await exercises.readOneExercise(exercisesId);
    if (!readOne) { //If readOrderById returns false, return error
       return res.status(404).json({'Error':'Not found'});
    }
    else {
        return res.status(200).json(readOne); // If readOne is not false, return readOne
    }
}));

app.put('/exercises/:id', asyncHandler (async(req,res) => {
    const acceptedUnits = ["kgs", "lbs", "miles"];
    const {name, reps, weight, unit, date} = req.body;
    if (typeof name !== 'string' || name.trim().length === 0 )
        return res.status(400).json({'Error':'Invalid request'})
    if (!Number.isInteger(reps) || reps <= 0)
        return res.status(400).json({'Error':'Invalid request'})
    if (!Number.isInteger(weight)|| weight < 0)
        return res.status(400).json({'Error':'Invalid request'})
    if (typeof unit !== 'string' || !acceptedUnits.includes(unit))
        return res.status(400).json({'Error':'Invalid request'})
    if ( date && isNaN(Date.parse(date)) )
        return res.status(400).json({'Error':'Invalid request'})
    const exercisesId = req.params.id;
    const newValues = req.body;
    const updatedExercise = await exercises.updateExercise(exercisesId,newValues);
    if (!updatedExercise) {
        return res.status(404).json({'Error':'Not found'});
    }
    else {
        return res.status(200).json(updatedExercise);
    }
}));

app.delete('/exercises/:id', asyncHandler (async(req,res) => {
    const exercisesId = req.params.id; // assigns id to constant and passes to deleteOneUser
    const deletedExercise = await exercises.deleteOneExercise(exercisesId)
    if (!deletedExercise) {
        return res.status(404).json({'Error':'Not found'}); // if unsuccesfull...
    }
    else {
        return res.sendStatus(204); // If succesfull...
    }
}));


