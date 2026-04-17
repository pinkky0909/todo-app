"use client";
import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none border border-white/20 focus:border-white/40"
      />

      <button
        onClick={handleAdd}
        className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;