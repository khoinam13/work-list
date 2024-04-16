// TaskList.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
function TaskList({ tasks, onDelete, onCheck, onCheckAll, onRemoveCheckAll, onDeleteList, checked,  OnUpdateTaks}) {
    // user
    const [cookies] = useCookies(["user"]);
    const userName = cookies.user
    // lưu biến checked
    function HandleDeleteTaks(id){
        onDelete(id)
    }
    function HandleChecked(id){
        onCheck(id)
    }
    function HandleDeleteList(){
        onDeleteList()
    }
    // biến lưu trữ set show input update
    const [showUptade, setShowUpdate] = useState(null)
    function HandleShowUptade(id){
        setShowUpdate(id)
    }
    // biến lưu trữ form update
    const [editTaks, setEditTaks] = useState({
        title: tasks.title,
        date: tasks.date
    })
    // lấy id và giá trị mới
    const HandleUpdateTaks = (e,id,tasksUpdate)=>{
        e.preventDefault();
        tasksUpdate = editTaks
        // trả về mảng mới gửi props sang cha
        OnUpdateTaks(id,tasksUpdate)
        setShowUpdate(null)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTaks({
            ...editTaks,
            [name]: value
        });
    };
     /* lọc các phần tử có user == user đã đăng nhập */
    const userWork = tasks.filter(work => work.user === userName)

    // chọn các phần tử được hiển thị theo chỉ mục

    
    // handleCheckAll
    function handleCheckAll (){
        onCheckAll()
    }
    // remove CheckAll
    function handleRemoveCheckAll(){
        onRemoveCheckAll()
    }
    // ============ Xử lí show khi công việc quá nhiều =====================/
    // biến lưu trữ sô trang
    const [startIndex , SetstartIndex] = useState(0)
    const [endIndex, SetEndIndex] = useState(5)
    //  chỉ show 5 giá trị công việc
    const cutFiveTaks = userWork.slice(startIndex,endIndex)
    function handlePrev(){
        if( startIndex <= 0){
            SetstartIndex(0)
            SetEndIndex(5)
        }else{
            SetstartIndex( prev => prev - 5)
            SetEndIndex( prev => prev - 5)
        } 
    }
    function handleNext(){
        if( userWork.length <= endIndex){
            SetstartIndex(0)
            SetEndIndex(5)
        }else{
            SetstartIndex( prev => prev + 5)
            SetEndIndex( prev => prev + 5)
        }
    }
  return (
    <div>
        <h2 className='heading__today'>Hôm nay</h2>
        {
           cutFiveTaks.length > 0 ? (
            <div>
                <ul className="task-list">
                   
                    {cutFiveTaks.map((task, index) => (
                        
                        <li className="task-item" key={index}>
                            {showUptade === task.id ? (
                                <form className='task__Update-form' onSubmit={(e)=>HandleUpdateTaks(e,task.id)}>
                                    <input className='task__Update-input-text' type='text' name='title' value={editTaks.title || ''} placeholder='Sửa công việc' onChange={handleInputChange}/>
                                    <input className='task__Update-input-date' type='date' name='date' value={editTaks.date || ''} placeholder='Sửa ngày' min="2024-01-01" onChange={handleInputChange}/>
                                    <button className='task__Update-submit' type='submit'>Cập nhật</button>
                                </form>
                            ):
                            (
                                <div>
                                    <input checked ={checked.includes(task.id)} type='checkbox' onChange={()=> HandleChecked(task.id)}/>
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-date"><FontAwesomeIcon className='task-date__icon' icon={faCalendarDays}/>{task.date}</span>
                                    <button className='task-click task-click__delete' onClick={()=> HandleDeleteTaks(task.id)}><FontAwesomeIcon className='task-click__icon' icon={faTrashCan} /></button>
                                    <button className='task-click task-click__update' onClick={()=> HandleShowUptade(task.id)}><FontAwesomeIcon className='task-click__icon' icon={faFilePen}/></button>
                                </div>
                            )
                            } 
                        </li>
                    ))}
                </ul>
                <h2 className='heading__today'>Đang xem {startIndex+1} đến {endIndex > userWork.length ? userWork.length : endIndex} trong tổng {userWork.length}</h2>
                <div className='wrap-task-list-click'>
                    <button className='task-list-click' onClick={handleCheckAll}>Chọn tất cả</button>
                    <button className='task-list-click' onClick={handleRemoveCheckAll}>Bỏ Chọn tất cả</button>
                    <button onClick={HandleDeleteList} className='task-list-click'>Xoá</button>
                    <div className='task-list-click wrap-task-list-transfer' >
                        <button onClick={handlePrev} className='task-list-transfer' ><FontAwesomeIcon icon={faChevronLeft }/></button>
                        <button onClick={handleNext} className='task-list-transfer' ><FontAwesomeIcon icon={faChevronRight }/></button>
                    </div>
                </div>
                <div className='clearfix'></div>
            </div>
            ):
        (
            <div className='task__empty-message'><FontAwesomeIcon className='task__empty-message-icon' icon={faFileCircleXmark}/><span>Công việc trống</span></div>
        )
        }
        
    </div>
  );
}

export default TaskList;
