import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Stack,
  Badge,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { TodoItemProps } from "../interfaces/todo.interfaces";
import { TodoPriorityEnum } from "../enums/TodoPriority.enum";
import theme from "../theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PRIORITY_COLORS: Record<
  TodoPriorityEnum,
  { primary: string; secondary: string; accent: string; background: string }
> = {
  [TodoPriorityEnum.PRIORITY_HIGH]: theme.palette.mutedPurple,
  [TodoPriorityEnum.PRIORITY_MEDIUM]: theme.palette.softGreen,
  [TodoPriorityEnum.PRIORITY_LOW]: theme.palette.warmGray,
};

function TodoItem(todoItemProps: TodoItemProps) {
  const { todo, onToggle, onEdit, onDelete } = todoItemProps;
  const { id, title, completed, createdAt, priority } = todo;

  const colors = priority ? PRIORITY_COLORS[priority] : null;
  const borderColor = colors
    ? completed
      ? colors.accent
      : colors.secondary
    : theme.palette.background.border;
  const mainColor = colors
    ? completed
      ? colors.accent
      : colors.primary
    : undefined;
  const mainBackground = colors ? colors.background : undefined;

  return (
    <Box
      component="article"
      aria-label={`${title}${priority ? `, priorytet: ${priority}` : ""}, ${completed ? "ukończone" : "aktywne"}`}
      sx={{
        aspectRatio: "4/3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 2,
        px: 3,
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        transition: "border 0.15s ease-in-out",
      }}>
      <Stack gap={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={completed}
              onChange={() => onToggle(id)}
              slotProps={{ input: { "aria-label": `Mark "${title}" as ${completed ? "incomplete" : "complete"}` } }}
              sx={{
                color: mainColor,
                transition: "color 0.15s ease-in-out",
                "&.Mui-checked": { color: mainColor },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                textDecoration: completed ? "line-through" : "none",
                color: mainColor,
                transition: "color 0.15s ease-in-out",
              }}>
              {title}
            </Typography>
          </Box>
          <Badge
            aria-hidden="true"
            badgeContent={priority}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: mainColor,
                color: "#fff",
                position: "relative",
                transform: "none",
                p: 1.75,
                borderRadius: 50,
                transition: "background-color 0.15s ease-in-out",
              },
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
            <CalendarMonthIcon aria-hidden="true" sx={{ color: mainColor, transition: "color 0.15s ease-in-out" }} />
            <Typography variant={"todoItem"} sx={{ color: mainColor, transition: "color 0.15s ease-in-out" }}>
              <span style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: 0 }}>
                Utworzono:
              </span>
              {createdAt}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: mainBackground, borderRadius: 2, }}>
            <Box sx={{ display: "flex", gap: 1, alignContent: "center", flexWrap: "wrap" }}>
            <IconButton aria-label={`Edit task: ${title}`} sx={{ color: mainColor, transition: "color 0.15s ease-in-out" }} onClick={() => onEdit(id, title)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label={`Delete task: ${title}`} sx={{ color: mainColor, transition: "color 0.15s ease-in-out" }} onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TodoItem;
