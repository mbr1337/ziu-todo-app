import type { TodoPriorityEnum } from "../enums/TodoPriority.enum";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: TodoPriorityEnum;
}

export type FilterType = "all" | "active" | "completed";

export type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "DELETE"; payload: string }
  | { type: "EDIT"; payload: { id: string; title: string } };

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}
