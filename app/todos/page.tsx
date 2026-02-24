"use client";

import { FormEvent, useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) return;
        const data = (await res.json()) as Todo[];
        setTodos(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) return;

      const created = (await res.json()) as Todo;
      setTodos((prev) => [created, ...prev]);
      setNewTitle("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string) => {
    // optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
    if (!res.ok) {
      // revert on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));

    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setTodos(previous);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--cream,#fdf7f2)] px-4 py-10">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[var(--blush,#f3d3d8)] px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--deep-rose,#7b2e3b)] mb-2 text-center">
          Todo List
        </h1>
        <p className="font-sans text-[var(--text-soft,#6b5b5d)] text-center mb-8">
          Keep track of the little things you want to do.
        </p>

        <form onSubmit={handleAdd} className="flex gap-3 mb-8">
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 rounded-xl border border-[var(--blush,#f3d3d8)] px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[var(--rose,#e28b9d)]/60 bg-white/70"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-[var(--rose,#e28b9d)] text-white px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium shadow-sm hover:bg-[var(--deep-rose,#7b2e3b)] transition-colors"
          >
            {submitting ? "Adding..." : "Add"}
          </button>
        </form>

        {loading ? (
          <p className="font-sans text-[var(--text-soft,#6b5b5d)] text-center text-sm sm:text-base">
            Loading your todos…
          </p>
        ) : todos.length === 0 ? (
          <p className="font-sans text-[var(--text-soft,#6b5b5d)] text-center text-sm sm:text-base">
            No todos yet. Start by adding one above.
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--blush,#f3d3d8)] bg-white/70 px-4 py-2.5"
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    type="button"
                    onClick={() => handleToggle(todo.id)}
                    className="w-5 h-5 rounded-full border border-[var(--rose,#e28b9d)] flex items-center justify-center text-xs bg-white"
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {todo.completed ? "✓" : ""}
                  </button>
                  <span
                    className={`font-sans text-sm sm:text-base text-[var(--text-deep,#4a3b3d)] ${
                      todo.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="text-xs sm:text-sm text-[var(--dusty-rose,#b47a84)] hover:text-[var(--deep-rose,#7b2e3b)]"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

