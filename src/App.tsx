import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          To-Do App
        </h1>

        <TodoInput onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;