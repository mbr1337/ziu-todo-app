import { Box, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TodoItemProps } from "../types/todo.types";
function TodoItem(todoItemProps: TodoItemProps) {
  const { todo, onToggle, onDelete } = todoItemProps;
  const { id, title, completed } = todo;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Checkbox
        checked={completed}
        onChange={() => onToggle(id)}
        color="primary"
      />
      <Typography
        variant="body1"
        sx={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default TodoItem;
