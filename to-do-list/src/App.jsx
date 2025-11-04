import { useEffect, useState } from 'react'

import './App.css'
import AddTask from './Components/AddTask';
import DisplayTask from './Components/DisplayTask';

function App() {
const [list ,setList] = useState([]);
const [value,setValue] = useState("");
const [editValue,setEditValue] = useState("")
const [editIndex,setEditIndex] = useState(null);

  useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

const handleAdd = () =>{
  if(value.trim() === "") {
    alert("saving empty task")
    return}
  setList([...list,value]);
  setValue("")
}

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(list[index]);
  };

  const handleSave = (index) => {
    if(editValue == "") {
      alert("Can't Edit")
      return;}
    const updatedList = [...list];
    updatedList[index] = editValue;
    setList(updatedList);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((item, i) => i !== index);
    setList(updatedList);
  };

  return (
    <>
   <div className="flex flex-col items-center justify-center">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">To-Do List</h1>
     <AddTask
        value={value}
        setValue={setValue}
        handleAdd={handleAdd}
      />
  
   <DisplayTask
        list={list}
        editIndex={editIndex}
        editValue={editValue}
        setEditValue={setEditValue}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
  
</div>

           </>
  )
}

export default App
