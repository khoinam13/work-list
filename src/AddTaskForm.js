// AddTaskForm.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
function AddTaskForm({ onAddTask }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userName = cookies.user
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  // set thời gian
  const handleSubmit = (e) => {
    console.log(userName)
    e.preventDefault();
    if (title.trim() !== "" && userName) {
      onAddTask(title);
      setTitle("");
    }
    else{
      return navigate('/login')
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
