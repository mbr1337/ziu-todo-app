import type { TodoPriorityEnum } from "../enums/TodoPriority.enum";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: TodoPriorityEnum;
  description?: string;
  dueDate?: string;
}

export interface NewTodoData {
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriorityEnum | "";
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export interface AddTodoFormProps {
  onClose: () => void;
  onSubmit: (data: NewTodoData) => void;
}
