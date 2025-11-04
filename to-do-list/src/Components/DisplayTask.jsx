import EditDeleteTask from './EditDeleteTask';


function DisplayTask({
  list,
  editIndex,
  editValue,
  setEditValue,
  handleEdit,
  handleSave,
  handleDelete,
}) {
  return (
    <div className="w-4/5">
      {list.map((item, index) => (
        <EditDeleteTask
          key={index}
          item={item}
          index={index}
          editIndex={editIndex}
          editValue={editValue}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default DisplayTask;
