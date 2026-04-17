"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/lib/auth";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
  const checkAuth = () => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  };

  checkAuth();

  window.addEventListener("storage", checkAuth);

  return () => {
    window.removeEventListener("storage", checkAuth);
  };
}, []);
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();
  
  return (
  <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">

    {/* Logout Button */}
    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}
      className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded"
    >
      Logout
    </button>

    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 text-white">

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-white/70 text-sm">
          Stay organized, one task at a time
        </p>
      </div>

      <TodoInput onAdd={addTodo} />

      <div className="mt-6">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>

    </div>
  </div>
);
}