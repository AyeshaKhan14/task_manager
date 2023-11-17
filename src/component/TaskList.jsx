import React, { useState } from "react";
import "../Styles/TaskList.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDel = (id) => {
    const data = tasks.filter((el) => el.id !== id);
    setTasks(data);
  };

  const handleUpdate = (id) => {
    // Find the task to edit
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);

    setTitle("");
    setDescription("");

    setEditingTask(null);
  };
  return (
    <div class='taskdiv'>
      <h2>Task List</h2>
      <div className='task-list'>
        {tasks.map((task) => (
          <div key={task.id} className='task-card'>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div id='div_ed'>
              <CiEdit class='edit' onClick={() => handleUpdate(task.id)} />
              <MdDelete class='del' onClick={() => handleDel(task.id)} />
            </div>
            {editingTask && editingTask.id === task.id && (
              <div className='update-form'>
                <h3>Edit Task</h3>
                <form onSubmit={handleEdit}>
                  <label>Title:</label>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div id='div_new'>
                    {" "}
                    <button id='cancel' onClick={() => setEditingTask(null)}>
                      Cancel
                    </button>
                    <button id='upadte' type='submit'>
                      Update Task
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
