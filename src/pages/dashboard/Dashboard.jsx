import React, { useId, useState } from "react";
import "./Dashboard.scss";

const Dashboard = ({ currentUser }) => {
  const baseId = useId(); // stable prefix
  const [task, setTask] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [todos, setTodos] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("todos")) || [];
    return stored.filter((todo) => todo.userId === currentUser.id);
  });
  const [edit, setEdit] = useState(null);

  const updateAllTodos = (updatedTodos) => {
    const all = JSON.parse(localStorage.getItem("todos")) || [];
    const otherUsers = all.filter((todo) => todo.userId !== currentUser.id);
    const newTodos = [...otherUsers, ...updatedTodos];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(updatedTodos);
  };

  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (edit) {
      const updated = todos.map((todo) =>
        todo.id === edit ? { ...todo, text: task } : todo
      );
      updateAllTodos(updated);
      setEdit(null);
    } else {
      const newTodo = {
        id: `${baseId}-${taskCount}`, 
        userId: currentUser.id,
        text: task,
        completed: false,
      };
      setTaskCount((prev) => prev + 1);
      updateAllTodos([...todos, newTodo]);
    }

    setTask("");
  };

  const handleDelete = (id) => {
    updateAllTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const toEdit = todos.find((todo) => todo.id === id);
    setTask(toEdit.text);
    setEdit(id);
  };

  const handleCompleted = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateAllTodos(updated);
  };

  const handleClear = () => {
    updateAllTodos([]);
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
          {edit ? "Update" : "Add"}
        </button>
      </div>

      <div className="task-lists">
        <h3>Pending Tasks</h3>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <div className="todo-actions">
                <button onClick={() => handleCompleted(todo.id)} className="complete-btn">Complete</button>
                <button onClick={() => handleEdit(todo.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}

        <h3>Completed Tasks</h3>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div key={todo.id} className="todo-item completed">
              <span>{todo.text}</span>
              <div className="todo-actions">
                <button onClick={() => handleEdit(todo.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
      </div>

      <button onClick={handleClear} className="clear-btn">Clear All</button>
    </div>
  );
};

export default Dashboard;
