import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TodoPriorityEnum } from "../enums/TodoPriority.enum";
import type { AddTodoFormProps } from "../interfaces/todo.interfaces";
import theme from "../theme/theme";

function AddTodoForm({ onClose, onSubmit }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TodoPriorityEnum>(TodoPriorityEnum.PRIORITY_MEDIUM);
  const [titleError, setTitleError] = useState(false);

  const handleSave = () => {
    if (!title) {
      setTitleError(true);
      return;
    }
    onSubmit({ title, description, dueDate, priority });
    onClose();
  };

  return (
    <Box sx={{ p: 4, minWidth: 480 }}>
      <Stack gap={3}>
        <Box>
          <Typography variant="h1" sx={{ mb: 1.5 }}>
            New Task
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.warmGray.secondary }}>
            Fill in the details below to create a new task.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>Task Title</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => { setTitle(e.target.value); setTitleError(false); }}
            placeholder="Enter task title"
            required
            autoFocus
            error={titleError}
            helperText={titleError ? "Task title is required" : ""}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>Description</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>Due Date</Typography>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>Priority</Typography>
          <FormControl fullWidth variant="outlined">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriorityEnum)}>
              <MenuItem value={TodoPriorityEnum.PRIORITY_HIGH}>High</MenuItem>
              <MenuItem value={TodoPriorityEnum.PRIORITY_MEDIUM}>Medium</MenuItem>
              <MenuItem value={TodoPriorityEnum.PRIORITY_LOW}>Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={onClose} sx={{ px: 4, py: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ px: 4, py: 1 }}>
            Save Task
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AddTodoForm;
