import EditDeleteTask from './EditDeleteTask';


function DisplayTask(props) {
  const   {
  list,
  editIndex,
  editValue,
  setEditValue,
  handleEdit,
  handleSave,
  handleDelete,
     } = props;
  return (
    <div className="w-4/5">
      {list.map((item, index) => {
     return  ( <EditDeleteTask key={index} item={item} index={index}
          editIndex={editIndex}
          editValue={editValue}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />)
        
})}
    </div>
  );
}

export default DisplayTask;
