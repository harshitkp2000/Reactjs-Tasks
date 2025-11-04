const AddTask = ({value,setValue,handleAdd}) =>{

return(
    <div className="flex items-center gap-2 mb-2">
    <input
      type="text"
      placeholder="Enter task"
      value={value}
      className="border border-gray-400 rounded-lg p-2 w-64 outline-none"
      onChange={(e) =>{setValue(e.target.value)
      }}
    />
    <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={handleAdd}>
      Add +
    </button>
    </div>
);
}
export default AddTask;