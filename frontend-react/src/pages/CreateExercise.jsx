import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateExercise () { //following 'const []' lines allow for setting values in new exercise 
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate()
    const addExercise = async () => { //addExercise utilizes fetch to call POST on valid submision in form
        const newexercise = {name, reps:Number(reps), weight:Number(weight), unit, date};
        const response = await fetch ('/exercises', {
            method: 'POST',
            body: JSON.stringify(newexercise),
            headers: { 'Content-Type' : 'application/json'}
        });
        if(response.status === 201){
            alert("Succesfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/")};

        const handleSubmit = (e) => {
            e.preventDefault();
            addExercise();
        };
        // Following return creates a form for submitting valid values for creating a new exercise
    return (
        <>
        <form onSubmit={handleSubmit}>
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
                <button type= "submit">Create Exercise</button>
            </p>
        </form>
        </>
    )
}

export default CreateExercise