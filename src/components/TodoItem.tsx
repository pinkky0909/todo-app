import { motion } from "framer-motion";

type Props = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({
  text,
  completed,
  onToggle,
  onDelete,
}: Props) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-between items-center bg-gray-50 p-2 rounded"
    >
      <span
        onClick={onToggle}
        className={completed ? "line-through cursor-pointer" : "cursor-pointer"}
      >
        {text}
      </span>

      <button onClick={onDelete} className="text-red-500">
        ❌
      </button>
    </motion.li>
  );
}