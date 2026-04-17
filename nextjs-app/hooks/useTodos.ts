"use client";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";


interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 👉 fetch todos from DB
  useEffect(() => {
  fetch("/api/todos", {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // 👉 add todo (DB)
  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
  body: JSON.stringify({ text }),
});
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
  };

  // 👉 delete (still local for now)
  const deleteTodo = async (id: number) => {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  setTodos((prev) => prev.filter((t) => t.id !== id));
};
  // 👉 toggle (still local)
  const toggleTodo = async (id: number) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ done: !todo.done }),
  });

  setTodos((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    )
  );
};
  return { todos, addTodo, deleteTodo, toggleTodo };
}