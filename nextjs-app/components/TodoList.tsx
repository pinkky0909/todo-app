"use client";

import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <div className="space-y-2">
      <AnimatePresence>
  {todos.map((todo) => (
    <MotionDiv
      key={todo.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center justify-between bg-white/20 px-4 py-2 rounded-xl border border-white/20"
    >
      <span
        onClick={() => onToggle(todo.id)}
        className={`cursor-pointer ${
          todo.done ? "line-through text-white/50" : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-200 hover:text-red-400 transition"
      >
        ✕
      </button>
    </MotionDiv>
  ))}
</AnimatePresence>
    </div>
  );
}

export default TodoList;