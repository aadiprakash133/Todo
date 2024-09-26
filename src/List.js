import React, { useState, } from "react";
import "./list.css";
import "bootstrap/dist/css/bootstrap.css";

function List() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          time: 0,
          countdown: null,
        },
      ]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setEditing(id);
    setEditInputValue(task.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editInputValue } : task
      )
    );
    setEditing(null);
    setEditInputValue("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // const setTime = (id, time) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, time: time * 60 } : task
  //     )
  //   );
  // };

  // const startCountdown = (id) => {
  //   setTasks(
  //     tasks.map((task) => {
  //       if (task.id === id && task.time > 0) {
  //         return {
  //           ...task,
  //           countdown: setInterval(() => {
  //             setTasks((prevTasks) =>
  //               prevTasks.map((t) => {
  //                 if (t.id === id) {
  //                   if (t.time <= 1) {
  //                     clearInterval(t.countdown);
  //                     alert(`Task "${t.text}" time is up!`);
  //                   }
  //                   return { ...t, time: t.time - 1 };
  //                 }
  //                 return t;
  //               })
  //             );
  //           }, 1000),
  //         };
  //       }
  //       return task;
  //     })
  //   );
  // };

  // const pauseCountdown = (id) => {
  //   setTasks(
  //     tasks.map((task) => {
  //       if (task.id === id) {
  //         clearInterval(task.countdown);
  //         return { ...task, countdown: null };
  //       }
  //       return task;
  //     })
  //   );
  // };

  // const resetCountdown = (id) => {
  //   setTasks(
  //     tasks.map((task) => {
  //       if (task.id === id) {
  //         clearInterval(task.countdown);
  //         return { ...task, time: 0, countdown: null };
  //       }
  //       return task;
  //     })
  //   );
  // };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => a.completed - b.completed);

  return (
    <div className="todo-list">
    <h1> To - Do List </h1>{" "}
    <br/><br/>
    <div className="input-container">
      <input type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}
      placeholder="Add a new task"
      />
      <button onClick={addTask}> Add Task </button>{" "}
    </div>{" "}
    <div className="filter-container">
      <button onClick={()=> setFilter("all")}> All </button>{" "}
      <button onClick={()=> setFilter("completed")}> Completed </button>{" "}
      <button onClick={()=> setFilter("pending")}> Pending </button>{" "}
    </div>{" "}
    <ul>
      {" "}
      {filteredTasks.map((task) => (
      <li key={task.id}>
        {" "}
        {editing === task.id ? (
        <div className="editing">
          <input type="text" value={editInputValue} onChange={(e)=> setEditInputValue(e.target.value)}
          />{" "}
          <i className="fa fa-save" onClick={()=> saveTask(task.id)}>
            {" "}
          </i>{" "}
        </div>
        ) : (
        <div className="task-item">
        <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
          <span style={{ textDecoration: task.completed ? "line-through" : "none" , marginRight: "10px" ,
            cursor: "pointer" , }} onClick={()=> toggleTask(task.id)}
            >
            {task.text}{" "}
          </span>{" "}

            <div className="action">
          <i className="fa fa-pen-to-square edit" onClick={()=> editTask(task.id)}
            ></i>{" "}
          <i className="fa fa-trash delete" onClick={()=> deleteTask(task.id)}
            ></i>{" "}
            </div>
            
            {/* set-timer()  */}
         {/* <div className="set-timer">
         <input type="number" min="0" placeholder="Set timer (min)" onChange={(e)=> setTime(task.id, e.target.value)}
          />{" "}

            <div className="media-icons">
            <i className="fa fa-play" onClick={()=> startCountdown(task.id)}
            ></i>{" "}
          <i className="fa fa-pause" onClick={()=> pauseCountdown(task.id)}
            ></i>{" "}
          <i className="fa fa-rotate-right" onClick={()=> resetCountdown(task.id)}
            ></i>{" "}

            </div>
          <span className="timer col-sm-2 text-center">
            {" "}
            {Math.floor(task.time / 60)} :{" "}
            {("0" + (task.time % 60)).slice(-2)}{" "}
          </span>{" "}
         </div> */}
        </div>


        )}{" "}
      </li>
      ))}{" "}
    </ul>{" "}
  </div>
  );
}

export default List;
