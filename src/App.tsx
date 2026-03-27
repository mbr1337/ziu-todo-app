import "./App.scss";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";

const CustomFade = forwardRef(function CustomFade(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return (
    <Fade
      ref={ref}
      {...props}
      timeout={{ enter: 450, exit: 250 }}
      easing={{ enter: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    />
  );
});

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      timeout={{ enter: 400, exit: 150 }}
      easing={{
        enter: "cubic-bezier(0.22, 1, 0.36, 1)",
        exit: "cubic-bezier(0.55, 0, 1, 0.45)",
      }}
    />
  );
});

import TodoItem from "./components/TodoItem";
import Filters from "./components/Filters";
import Search from "./components/Search";
import AddTodoForm from "./components/AddTodoForm";
import theme from "./theme/theme";
import { SearchFiltersEnum } from "./enums/SearchFilters.enum";
import type { NewTodoData } from "./interfaces/todo.interfaces";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { useTodoContext } from "./context/TodoContext";

const MotionGridItem = motion.create(Grid);

function App() {
  const { state, actions } = useTodoContext();
  const { todos } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const onToggle = (id: string) => actions.toggleTodo(id);

  const onEdit = (id: string, title: string) => {
    setEditingTodo({ id, title });
    setEditTitle(title);
    setEditModalOpen(true);
  };

  const confirmEdit = () => {
    if (editingTodo) {
      actions.editTodo(editingTodo.id, editTitle);
    }
    setEditModalOpen(false);
    setEditingTodo(null);
  };

  const onDelete = (id: string) => {
    setPendingDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      actions.deleteTodo(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setDeleteModalOpen(false);
  };

  const [selectedFilter, setSelectedFilter] = useState<SearchFiltersEnum>(
    SearchFiltersEnum.ALL
  );

  const filters = [
    {
      id: "1",
      name: SearchFiltersEnum.ALL,
      onClick: () => setSelectedFilter(SearchFiltersEnum.ALL),
    },
    {
      id: "2",
      name: SearchFiltersEnum.ACTIVE,
      onClick: () => setSelectedFilter(SearchFiltersEnum.ACTIVE),
    },
    {
      id: "3",
      name: SearchFiltersEnum.COMPLETED,
      onClick: () => setSelectedFilter(SearchFiltersEnum.COMPLETED),
    },
    {
      id: "4",
      name: SearchFiltersEnum.PRIORITY,
      onClick: () => setSelectedFilter(SearchFiltersEnum.PRIORITY),
    },
  ];

  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === SearchFiltersEnum.ACTIVE) return !todo.completed;
    if (selectedFilter === SearchFiltersEnum.COMPLETED) return todo.completed;
    if (selectedFilter === SearchFiltersEnum.PRIORITY) return !!todo.priority;
    return true;
  });

  const updateTodos = (data: NewTodoData) => {
    actions.addTodo(data);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth={"lg"}>
      <Stack gap={4} mt={4}>
        <DashboardLayout />
        <Search />
        <Filters filtersArray={filters} selectedFilter={selectedFilter} />
        <Typography variant="h5">Todos: {filteredTodos.length}</Typography>
        <Grid
          container
          spacing={2}
          sx={{
            border: `2px solid ${theme.palette.background.border}`,
            borderRadius: "12px",
            py: 13,
            px: 3,
            minHeight: "400px",
          }}>
          <AnimatePresence>
            {todos.length === 0 && (
              <MotionGridItem size={{ xs: 12 }}>
                <Typography
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mt: 4 }}>
                  Brak zadań. Dodaj pierwsze!
                </Typography>
              </MotionGridItem>
            )}
            {filteredTodos.map((todo) => (
              <MotionGridItem
                size={{ xs: 12, sm: 6, lg: 4 }}
                key={todo.id}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 48 }}
                transition={{ duration: 0.3 }}>
                <TodoItem
                  key={todo.id + todo.title}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </MotionGridItem>
            ))}
          </AnimatePresence>
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: theme.palette.blackAndWhite.primary,
            color: theme.palette.blackAndWhite.secondary,
            borderRadius: "28px",
            mx: "auto",
            px: 2,
            py: 1,
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: theme.palette.blackAndWhite.primaryHover,
            },
          }}
          role="button">
          <IconButton sx={{ color: theme.palette.blackAndWhite.secondary }}>
            <AddIcon />
          </IconButton>
          <Typography variant="body1">Add New Post</Typography>
        </Stack>
      </Stack>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slots={{ transition: SlideUp }}
        maxWidth="sm"
        fullWidth>
        <AddTodoForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={updateTodos}
        />
      </Dialog>

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        slots={{ transition: SlideUp }}
        disableRestoreFocus
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={confirmEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        slots={{ transition: CustomFade }}
        disableRestoreFocus
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ px: 4, py: 1, borderRadius: 1.5 }}
            onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ px: 4, py: 1, borderRadius: 1.5 }}
            onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
