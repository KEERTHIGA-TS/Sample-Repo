
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function loadTodos() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Could not load tasks");
      setTodos(await response.json());
      setError("");
    } catch {
      setError("Cannot connect to the backend. Is Spring Boot running?");
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          completed: false,
        }),
      });

      if (!response.ok) throw new Error("Could not add task");
      setTitle("");
      loadTodos();
    } catch {
      setError("Could not add task. Check your backend.");
    }
  }

  async function toggleTodo(todo) {
    try {
      const response = await fetch(`${API}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) throw new Error("Update failed");
      loadTodos();
    } catch {
      setError("Could not update task.");
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      loadTodos();
    } catch {
      setError("Could not delete task.");
    }
  }

  return (
    <main className="app">
      <section className="todo-card">
        <p className="eyebrow">MY DAILY PLANNER</p>
        <h1>My Todo List ✨</h1>
        <p className="subtitle">Small steps, big progress.</p>

        <form onSubmit={addTodo} className="todo-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
          />
          <button type="submit">Add task</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="list-heading">
          <h2>Your tasks</h2>
          <span>{todos.filter((t) => !t.completed).length} remaining</span>
        </div>

        {todos.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label className={todo.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                  />
                  {todo.title}
                </label>
                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
