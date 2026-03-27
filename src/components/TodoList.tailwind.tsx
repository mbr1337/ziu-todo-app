import type { Todo } from "../interfaces/todo.interfaces";

interface TodoListTailwindProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_BADGE: Record<string, string> = {
  High: "bg-purple-100 text-purple-700",
  Medium: "bg-green-100 text-green-700",
  Low: "bg-gray-100 text-gray-600",
};

export default function TodoListTailwind({ todos, onToggle, onDelete }: TodoListTailwindProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        Brak zadań. Dodaj pierwsze!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
            />
            <span
              className={`text-sm truncate ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>
            {todo.priority && (
              <span
                className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                  PRIORITY_BADGE[todo.priority] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {todo.priority}
              </span>
            )}
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-4 text-gray-400 hover:text-red-500 transition-colors text-xs shrink-0"
            aria-label="Usuń zadanie"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
