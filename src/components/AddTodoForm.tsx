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
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const firstInputElem = document.getElementById("task-title") as HTMLInputElement;
    if (firstInputElem) {
      firstInputElem.focus();
    }

  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Stack gap={3}>
        <Box>
          <Typography id="new-task-heading" component="h2" variant="h1" sx={{ mb: 1.5 }}>
            Nowe zadanie
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.warmGray.secondary }}>
            Wypełnij poniższe pola, aby utworzyć nowe zadanie.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography component="label" htmlFor="task-title" variant="body2" sx={{ mb: 1.5, fontWeight: 500, display: "block" }}>Tytuł zadania</Typography>
          <TextField
            id="task-title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => { setTitle(e.target.value); setTitleError(false); }}
            placeholder="Wpisz tytuł zadania"
            required
            autoFocus
            error={titleError}
            helperText={titleError ? "Tytuł zadania jest wymagany" : ""}
          />
        </Box>

        <Box>
          <Typography component="label" htmlFor="task-description" variant="body2" sx={{ mb: 1.5, fontWeight: 500, display: "block" }}>Opis</Typography>
          <TextField
            id="task-description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Wpisz opis zadania"
          />
        </Box>

        <Box>
          <Typography component="label" htmlFor="task-due-date" variant="body2" sx={{ mb: 1.5, fontWeight: 500, display: "block" }}>Termin</Typography>
          <TextField
            id="task-due-date"
            type="date"
            variant="outlined"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Box>

        <Box>
          <Typography id="priority-label" variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>Priorytet</Typography>
          <FormControl fullWidth variant="outlined">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriorityEnum)}
              inputProps={{ "aria-labelledby": "priority-label" }}>
              <MenuItem value={TodoPriorityEnum.PRIORITY_HIGH}>Wysoki</MenuItem>
              <MenuItem value={TodoPriorityEnum.PRIORITY_MEDIUM}>Średni</MenuItem>
              <MenuItem value={TodoPriorityEnum.PRIORITY_LOW}>Niski</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Button variant="contained" color="secondary" onClick={onClose} sx={{ px: 2, py: 1 }}>
            Anuluj
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ px: 2, py: 1 }}>
            Zapisz zadanie
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AddTodoForm;
