// AddTaskForm.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  // set thời gian

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      onAddTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thêm công việc mới..."
      />
      <button type="submit">
        <FontAwesomeIcon className="summit-icon" icon={faCirclePlus} />
      </button>
    </form>
  );
}
export default AddTaskForm;
