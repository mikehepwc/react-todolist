// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [completed, setCompleted] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const currentTime = new Date().toLocaleString();
      setTodos([...todos, newTodo]);
      setNewTodo('');
      setCompleted([...completed, false]);
      setTimestamps([...timestamps, currentTime]);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const newCompleted = completed.filter((_, i) => i !== index);
    const newTimestamps = timestamps.filter((_, i) => i !== index);
    setTodos(newTodos);
    setCompleted(newCompleted);
    setTimestamps(newTimestamps);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const saveEdit = () => {
    const newTodos = todos.map((todo, index) =>
      index === editingIndex ? editingText : todo
    );
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleComplete = (index) => {
    const newCompleted = completed.map((item, i) =>
      i === index ? !item : item
    );
    setCompleted(newCompleted);
  };

  return (
    <div className="todo-list">
      <h1>To-do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={completed[index] ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={completed[index]}
              onChange={() => toggleComplete(index)}
            />
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </div>
            ) : (
              <div className="todo-item">
                <span>{todo}</span>
                <span className="timestamp">{timestamps[index]}</span>
                <button onClick={() => editTodo(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;