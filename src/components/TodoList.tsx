import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

type Props = {
  todos: Todo[];
  onToggle: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: Props) {
  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggle(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}