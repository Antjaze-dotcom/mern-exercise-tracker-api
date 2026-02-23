import { useEffect } from "react"
import ExerciseTable from '../components/ExerciseTable'

function RetrieveExercise({ exercises, setExercises, setExerciseToEdit }) { //Include as parameters, data inherited from App.jsx
    const loadExercises = async () => { //Fetch from backend using proxy, asign to data the info retrieved from fetch, then call it using setExercises
        const response = await fetch('/exercises')
        const data = await response.json() 
        setExercises(data)
    }
    useEffect( () => {
        loadExercises();
    }, []);

    const deleteExercise = async (id) => { // An asynchronous function that deletes an exercise from MongoDB
        const response = await fetch(`/exercises/${id}`, {method: 'DELETE'});
        if (response.status === 204) {
            await loadExercises()};
        if (response.status === 404) {
            alert('Exercise not found')};
    }
    
    // Shares following data to component ExerciseTable
    return ( 
        <ExerciseTable 
            exercises = {exercises}
            setExerciseToEdit = {setExerciseToEdit}
            deleteExercise = {deleteExercise}
        /> 
    )
}

export default RetrieveExercise