import React, { useEffect, useState } from 'react';
import List from './components/List'
import axios from 'axios';
import { baseURL } from './utils/constant';

const App = () => {

  const [input , setInput] = useState("");
  const [relation , setRelation] = useState("");
  const [age , setAge] = useState("");
  const [gender , setGender] = useState("");
  const [tasks , setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`)
    .then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input, relation: relation, age: age, gender: gender})
    .then((res) => {
      setInput("");
      setRelation("");
      setAge("");
      setGender("");
      setUpdateUI((prevState) => !prevState);
    });  
  }

  const updateMode = (id, text, relation, age, gender) => {
    console.log(text);
    setInput(text);
    setRelation(relation);
    setAge(age);
    setGender(gender);
    setUpdateId(id);
  }

  const updateTask = () => {
     axios.put(`${baseURL}/update/${updateId}`, {task: input, relation: relation, age: age, gender: gender})
     .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
      setRelation("");
      setAge("");
      setGender("");
     });
  }
  
  return (
    <main>
      <h1 className='title'>Family Tree</h1>
      <div className='input_holder'>
        <label>Name:</label>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
        <label>Relation:</label>
        <input type='text' value={relation} onChange={(e) => setRelation(e.target.value)}/>
        <label>Age:</label>
        <input type='number' value={age} onChange={(e) => setAge(e.target.value)}/>
        <label>Gender:</label>
        <input type='text' value={gender} onChange={(e) => setGender(e.target.value)}/>
        <button type='submit' onClick={updateId ? updateTask : addTask }>
          {updateId ? "Update Node" : "Add Node"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
        <List key={task._id} 
          id={task._id} 
          task={task.task} 
          relation={task.relation}
          age={task.age}
          gender={task.gender}
          setUpdateUI={setUpdateUI} 
          updateMode={updateMode}/>
        ))}
      </ul>
    </main>
  );
}

export default App;
