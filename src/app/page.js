"use client";
import { useState, useEffect } from "react";
import "./index.css";
import ShortUniqueId from "short-unique-id";

export default function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  const addtodo = () => {
    if (inputValue !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };
  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  const completedCount = todos.filter((t) => t.completed).length;

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "cnt dark" : "cnt"}>
      <div className="nt1">
        <p className="to">To-Do list</p>
        <div className="wrap">
          <input
            placeholder="Add a new task..."
            className="btn1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addtodo()}
          />
          <button className="btn2" onClick={addtodo}>
            Add
          </button>
          <button
            className={`${filter === "All" ? "btn3" : "activeBtn3"}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`${filter === "Active" ? "btn4" : "activeBtn4"}`}
            onClick={() => setFilter("Active")}
          >
            Active
          </button>
          <button
            className={`${filter === "Completed" ? "btn5" : "activeBtn5"}`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-toggle"
          >
            {darkMode ? "🌙  Dark" : "☀️  Light"}
          </button>
        </div>
        {filteredTodos.length === 0 && (
          <p className="no">No tasks to display</p>
        )}

        {filteredTodos.map((todo, index) => (
          <div key={index} className="create">
            <div className="crct2">
              <input
                className="crct"
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <p
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </p>
            </div>
            <button
              className="crct1 show-on-hover"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </div>
        ))}

        {filteredTodos.length > 0 && (
          <div className="of">
            <p>
              {completedCount} of {filteredTodos.length} tasks completed
            </p>
            <button className="btn" onClick={clearCompleted}>
              Clear completed
            </button>
          </div>
        )}
      </div>
      <div className="nt2">
        <p>Powered by</p>
        <a href="">Pinecone academy</a>
      </div>
    </div>
  );
}
