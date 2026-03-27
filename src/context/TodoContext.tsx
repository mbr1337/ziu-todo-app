import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo, NewTodoData } from "../interfaces/todo.interfaces";
import { TodoPriorityEnum } from "../enums/TodoPriority.enum";

interface TodoContextState {
  todos: Todo[];
}

interface TodoContextActions {
  addTodo: (data: NewTodoData) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
}

interface TodoContextValue {
  state: TodoContextState;
  actions: TodoContextActions;
}

const TodoContext = createContext<TodoContextValue | null>(null);

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    completed: false,
    createdAt: new Date().toLocaleDateString(),
    priority: TodoPriorityEnum.PRIORITY_HIGH,
  },
  {
    id: "2",
    title: "Todo 2",
    completed: false,
    createdAt: new Date().toLocaleDateString(),
    priority: TodoPriorityEnum.PRIORITY_MEDIUM,
  },
  {
    id: "3",
    title: "Todo 3",
    completed: true,
    createdAt: new Date().toLocaleDateString(),
    priority: TodoPriorityEnum.PRIORITY_LOW,
  },
  {
    id: "4",
    title: "Todo 4",
    completed: false,
    createdAt: new Date().toLocaleDateString(),
  },
];

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (data: NewTodoData) => {
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority || undefined,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  return (
    <TodoContext.Provider
      value={{
        state: { todos },
        actions: { addTodo, toggleTodo, deleteTodo, editTodo },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext(): TodoContextValue {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider");
  return ctx;
}
