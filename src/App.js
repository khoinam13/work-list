// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useCookies } from "react-cookie";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // láy ra giá trị cookie
  const  userName = cookies.user
  // gắn giá trị mặc định cho tasks
  useEffect(()=>{
    fetch('http://localhost:3001/works',{
      
    })
    .then(res => res.json())
    .then(data => 
      setTasks(data)
    )
  },[tasks])
  // thêm công việc
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString(),
      user: userName 
    };
    fetch('http://localhost:3001/works',{
      method: 'POST',
      headers: {
        'Content-Type': 'applation/json'
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  };
  // xoá công viêc
  const hanleDelete = (id) => {
    fetch(`http://localhost:3001/works/${id}`,{
      method: 'DELETE'
    })
  };
  // xoá theo list
  const hanleDeleteList = async () => {
    async function fetchDeleteCheck(){
    await Promise.all(checked.map(async id =>{
      const respone = await fetch(`http://localhost:3001/works/${id}`,{
        method: 'DELETE'
      })
    }))
    }
    await fetchDeleteCheck()
  };
  // checked
  const [checked, setChecked] = useState([]);
  // hàm xử lí check
  function HandleChecked(id) {
    if (checked.includes(id)) {
      const checkedNew = checked.filter((checked) => checked !== id);
      setChecked(checkedNew);
    } else {
      setChecked((prev) => [...prev, id]);
    }
  }
  // sửa công việc
  function HandleUpdateTaks( id,taksUpdate) {
    // lấy chỉ số index
    const tasksIndex = tasks.findIndex(tasks => tasks.id === id)
    const workUpdate = {
      ...tasks[tasksIndex],
      ...taksUpdate
    }
    fetch(`http://localhost:3001/works/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'applation/json'
      },
      body: JSON.stringify(workUpdate)
    })
  }
  // xử lí đăng nhập

  function handleLogin(user) {
    // khai báo cookie
    setCookie("user", user, {maxAge: 7 * 24 * 60 * 60});
  }
  return (
    <div className="App">
     
        <Header />
        <AddTaskForm onAddTask={handleAddTask} />
        {/* =========================== xử lí routes ==================== */}
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          ></Route>
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
