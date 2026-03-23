import { Box, Checkbox, Typography, IconButton, Stack, Badge } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { TodoItemProps } from "../types/todo.types";
import { TodoPriorityEnum } from "../enums/TodoPriority.enum";
import theme from "../theme/theme";

const PRIORITY_COLORS: Record<TodoPriorityEnum, { primary: string; secondary: string; accent: string }> = {
  [TodoPriorityEnum.PRIORITY_HIGH]: theme.palette.mutedPurple,
  [TodoPriorityEnum.PRIORITY_MEDIUM]: theme.palette.softGreen,
  [TodoPriorityEnum.PRIORITY_LOW]: theme.palette.warmGray,
};

function TodoItem(todoItemProps: TodoItemProps) {
  const { todo, onToggle } = todoItemProps;
  const { id, title, completed, createdAt, priority } = todo;

  const colors = priority ? PRIORITY_COLORS[priority] : null;
  const borderColor = colors ? (completed ? colors.accent : colors.secondary) : theme.palette.background.border;
  const mainColor = colors ? (completed ? colors.accent : colors.primary) : undefined;

  return (
    <Box
      sx={{
        gap: 2,
        py: 2,
        px: 3,
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
      }}>
      <Stack gap={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={completed}
              onChange={() => onToggle(id)}
              sx={{
                color: mainColor,
                "&.Mui-checked": { color: mainColor },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                textDecoration: completed ? "line-through" : "none",
                color: mainColor,
              }}>
              {title}
            </Typography>
          </Box>
          <Badge
            badgeContent={priority}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: mainColor,
                color: "#fff",
                position: "relative",
                transform: "none",
              },
            }}
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={1}>
          <CalendarMonthIcon sx={{ color: mainColor }} />
          <Typography variant="body2" sx={{ color: mainColor }}>
            {createdAt}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TodoItem;
