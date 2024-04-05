// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
//  máy chủ http
const https = "http://localhost:3001";
function App() {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(tasksStorage || []);
  // ========== Local STORAGE ==============
  useEffect(() => {
    const getStorageTasks = localStorage.getItem("tasks");
    if (getStorageTasks) {
      setTasks(JSON.parse(getStorageTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   fetch(`${https}/register`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  // ========== Local STORAGE ==============

  // thêm công việc
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };
  // xoá công viêc
  const hanleDelete = (id) => {
    const tasksNew = tasks.filter((task) => task.id !== id);
    setTasks(tasksNew);
    // localStorage.setItem('tasks', JSON.stringify(tasksNew))
  };
  // xoá theo list
  const hanleDeleteList = () => {
    const tasksNew = tasks.filter((tasks) => !checked.includes(tasks.id));
    setTasks(tasksNew);
  };
  // checked
  const [checked, setChecked] = useState([]);
  // hàm xử lí check
  function HandleChecked(id) {
    // const listIdTaks = tasks.filter(tasks => tasks.id);
    if (checked.includes(id)) {
      const checkedNew = checked.filter((checked) => checked !== id);
      setChecked(checkedNew);
    } else {
      setChecked((prev) => [...prev, id]);
    }
  }
  // sửa công việc
  function HandleUpdateTaks(taksUpdate) {
    setTasks(taksUpdate);
    // localStorage.setItem('tasks', JSON.stringify(taksUpdate))
  }
  return (
    <div className="App">
      <Header />
      <AddTaskForm onAddTask={handleAddTask} />

      {/* =========================== xử lí routes ==================== */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onDelete={hanleDelete}
              onCheck={HandleChecked}
              onDeleteList={hanleDeleteList}
              checked={checked}
              OnUpdateTaks={HandleUpdateTaks}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
