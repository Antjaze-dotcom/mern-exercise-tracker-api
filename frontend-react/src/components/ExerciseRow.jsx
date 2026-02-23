import { useNavigate } from "react-router-dom"


function ExerciseRow ({exercise, setExerciseToEdit, deleteExercise }) { // A function that creates rows of data acessing properties from exercises in MongoDB along with their values
    const Navigate = useNavigate();
    
    const StartEdit = () => {
        setExerciseToEdit(exercise)
        Navigate("/edit")
    };
    const StartDeletion = () => {
        deleteExercise(exercise._id)
    };
    
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date?.split('T')[0]}</td>
            <td>
                <button onClick={StartEdit}>Edit</button> {/*These lines create our Edit and delete buttons*/}
                <button onClick={StartDeletion}>Delete</button>         
            </td> 
        </tr>
    )
}

export default ExerciseRow