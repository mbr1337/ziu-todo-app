import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TodoPriorityEnum } from "../enums/TodoPriority.enum";
import type { NewTodoData } from "../types/todo.types";
import theme from "../theme/theme";

interface AddTodoFormProps {
  onClose: () => void;
  onSubmit: (data: NewTodoData) => void;
}

function AddTodoForm({ onClose, onSubmit }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TodoPriorityEnum | "">("");

  const handleSave = () => {
    console.log({ title, description, dueDate, priority });
    onSubmit({ title, description, dueDate, priority });
    onClose();
  };

  return (
    <Box sx={{ p: 4, minWidth: 480 }}>
      <Stack gap={3}>
        <Box>
          <Typography variant="h1" sx={{ mb: 0.5 }}>
            New Task
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.warmGray.secondary }}>
            Fill in the details below to create a new task.
          </Typography>
        </Box>

        <Divider />

        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />

        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TodoPriorityEnum)}>
            <MenuItem value={TodoPriorityEnum.PRIORITY_HIGH}>High</MenuItem>
            <MenuItem value={TodoPriorityEnum.PRIORITY_MEDIUM}>Medium</MenuItem>
            <MenuItem value={TodoPriorityEnum.PRIORITY_LOW}>Low</MenuItem>
          </Select>
        </FormControl>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Task
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AddTodoForm;
