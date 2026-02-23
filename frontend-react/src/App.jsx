import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import RetrieveExercise from './pages/RetrieveExercise';
import CreateExercise from './pages/CreateExercise';
import EditExercise from './pages/EditExercise';

function App() {
  const [exercises, setExercises] = useState([]); //Creates constants to store states of data for use across entire app
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  return (
      <Router> {/* Shares all following data across every page in SPA app*/}
        
        <header> 
          <h1>Exercise Tracker</h1>
          <p>Add, edit, and remove exercises here!</p>
        </header>
        
        <nav>
          <Link to="/">Retrieve</Link><br/> 
          <Link to="/create">Create</Link><br/>
        </nav>
        
        <main>
          <Routes> {/* Pages recieves data from above constants to use in their functions or pass down */}
            
            <Route path="/" 
            element={
            <RetrieveExercise 
              exercises = {exercises}
              setExercises = {setExercises}
              setExerciseToEdit = {setExerciseToEdit}
            />}>
            </Route>
            
            <Route path="/create" element={ <CreateExercise />}></Route>
            
            <Route path="/edit" 
            element={ 
            <EditExercise
              exerciseToEdit = {exerciseToEdit}
            />}>
            </Route>
          
          </Routes>
        </main>
        
        <footer>
          <p>2025 Anthony Martino</p>
        </footer>
      
      </Router>
  );
}

export default App;