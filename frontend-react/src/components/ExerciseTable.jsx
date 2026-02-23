import ExerciseRow from './ExerciseRow'

function ExerciseTable ({exercises, setExerciseToEdit, deleteExercise}) {
    return (
         <>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Repetitions</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody> {/*We map each exercise from MongoDB, then call our ExerciseRow componet to sort resulting data within body of table */}
                    {exercises.map((exercise) => ( 
                    <ExerciseRow 
                    exercise={exercise} 
                    key={exercise._id} 
                    setExerciseToEdit={setExerciseToEdit} 
                    deleteExercise={deleteExercise} /> ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default ExerciseTable