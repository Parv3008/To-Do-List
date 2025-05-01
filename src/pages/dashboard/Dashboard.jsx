import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

const Dashboard = ({ currentUser }) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);

  const userKey = `todos_${currentUser.email}`;

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(userKey)) || [];
    setTodos(storedTodos);
  }, [userKey]);

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem(userKey, JSON.stringify(updatedTodos));
  };

  const handleAddTask = () => {
    if (task.trim() === "") return;

    let updatedTodos;
    if (edit !== null) {
      updatedTodos = [...todos];
      updatedTodos[edit].text = task;
      setEdit(null);
    } else {
      updatedTodos = [...todos, { text: task, completed: false }];
    }

    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
    setTask("");
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setEdit(index);
  };

  const handleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const handleClear = () => {
    setTodos([]);
    saveToLocalStorage([]);
  };

  return (
    <div className="dashboard-container">
      <h2>Add your task</h2>

      <div className="task-input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <button onClick={handleAddTask} className="task-btn">
          {edit !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="task-lists">
        <h3>Pending Tasks</h3>
        {todos
          .map((todo, index) => ({ ...todo, originalIndex: index }))
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div key={todo.originalIndex} className="todo-item">
              <span>{todo.text}</span>
              <div className="todo-actions">
                <button
                  onClick={() => handleCompleted(todo.originalIndex)}
                  className="complete-btn"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleEdit(todo.originalIndex)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.originalIndex)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        <h3>Completed Tasks</h3>
        {todos
          .map((todo, index) => ({ ...todo, originalIndex: index })) // Keep track of original index
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div key={todo.originalIndex} className="todo-item completed">
              <span>{todo.text}</span>
              <div className="todo-actions">
              <button
                  onClick={() => handleEdit(todo.originalIndex)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.originalIndex)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        <button onClick={handleClear} className="clear-btn">
          Clear All Tasks
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
