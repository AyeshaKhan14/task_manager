import React, { useState } from "react";
import { TaskList } from "./TaskList";
import * as XLSX from "xlsx";
import "../Styles/TaskForm.css";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      id: new Date().getTime(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Task List");
    XLSX.writeFile(workbook, "task_list.xlsx");
  };
  return (
    <div class='main'>
      <form id='form' onSubmit={handleSubmit}>
        <div id='tittdiv'>
          {" "}
          <label>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter Title'
          />
        </div>

        <div id='desdiv'>
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter description'
          />
        </div>

        <button id='btn' type='submit'>
          Add Task
        </button>
      </form>
      <div id='expo'>
        <button onClick={handleExportToExcel}>Export to Excel</button>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
