// Re-export interfaces for backwards compatibility
export type { Todo, NewTodoData, TodoItemProps, AddTodoFormProps } from "../interfaces/todo.interfaces";

export type FilterType = "all" | "active" | "completed";

export type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "DELETE"; payload: string }
  | { type: "EDIT"; payload: { id: string; title: string } };
