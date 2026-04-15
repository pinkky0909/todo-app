import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 w-full rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}