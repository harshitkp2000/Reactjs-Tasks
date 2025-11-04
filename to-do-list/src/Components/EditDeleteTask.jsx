function EditDeleteTask({
  item,
  index,
  editIndex,
  editValue,
  setEditValue,
  handleEdit,
  handleSave,
  handleDelete,
}) {
  return (
    <div className="border rounded-lg px-4 py-2 flex mb-1 justify-between">
      <div className="w-3/4 flex items-center ">
        {editIndex === index ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 w-full outline-none"
          />
        ) : (
          <div className="font-bold word-wrap w-3/4">{item}</div>
        )}
      </div>
        <div className="">
      {editIndex === index ? (
        <button
          className="bg-green-600 text-white rounded-lg px-4 py-2 m-2 "
          onClick={() => handleSave(index)}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-yellow-500 text-white rounded-lg px-4 py-2 m-2 "
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
      )}

      <button
        className="bg-red-500 text-white rounded-lg px-4 py-2 m-2"
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
      </div>
    </div>
  );
}

export default EditDeleteTask;
