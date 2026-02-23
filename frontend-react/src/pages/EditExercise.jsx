import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditExercise ({ exerciseToEdit }) {
    if (!exerciseToEdit) {
        return <p>No exercise to edit</p>; // Handles edge caes where page accessed without exerciseToEdit
    }
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(
        exerciseToEdit.date ? exerciseToEdit.date.split("T")[0]:"");
    
        const navigate = useNavigate()
    
    const editExercise = async () => { //editExercise utilizes fetch to call PUT on valid submision in form
        const alteredExercise = {name, reps:Number(reps), weight:Number(weight), unit, date};
        const response = await fetch (`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(alteredExercise),
            headers: { 'Content-Type' : 'application/json'}
        });
        if(response.status === 200){
            alert("Succesfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/")};

    const handleEdit = (e) => {
        e.preventDefault();
        editExercise();
    };
    // Following return creates a form for submitting valid values for editing an exercise
    return (
        <>
        <form onSubmit={handleEdit}>
            <p>
                <label>Name</label>
                <input type= "text" value = {name} 
                onChange={e => setName(e.target.value)}/>  
            </p>
            <p>
                <label>Reps</label>
                <input type= "number" value = {reps}
                onChange={e => setReps(e.target.value)} />
            </p>
            <p>
                <label>Weight</label>
                <input type= "number" value= {weight}
                onChange={e => setWeight(e.target.value)} />
            </p>
            <p>
                <label>Unit</label>
                <select
                    id= "unit" value= {unit} 
                    onChange={e => setUnit(e.target.value)}>
                    <option value="">-- choose unit --</option>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                    <option value="miles">miles</option>
                </select>
            </p>
            <p>
                <label>Date</label>
                <input type = "date" value = {date}
                onChange={e => setDate(e.target.value)}/> 
            </p>
            <p>
                <button type= "submit">Save Changes</button>
            </p>
        </form>
        </>
    );
}

export default EditExercise