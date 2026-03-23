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

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import TodoItem from "./components/TodoItem";

import Header from "./components/Header";
import Filters from "./components/Filters";
import Search from "./components/Search";
import AddTodoForm from "./components/AddTodoForm";
import theme from "./theme/theme";
import { TodoPriorityEnum } from "./enums/TodoPriority.enum";
import AddIcon from "@mui/icons-material/Add";
import { SearchFiltersEnum } from "./enums/SearchFilters.enum";
import type { NewTodoData } from "./types/todo.types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "Todo 1",
      completed: false,
      createdAt: new Date().toLocaleDateString(),
      priority: TodoPriorityEnum.PRIORITY_HIGH,
    },
    {
      id: "2",
      title: "Todo 2",
      completed: false,
      createdAt: new Date().toLocaleDateString(),
      priority: TodoPriorityEnum.PRIORITY_MEDIUM,
    },
    {
      id: "3",
      title: "Todo 3",
      completed: true,
      createdAt: new Date().toLocaleDateString(),
      priority: TodoPriorityEnum.PRIORITY_LOW,
    },
    {
      id: "4",
      title: "Todo 4",
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  const onToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    );
  };

  const onEdit = (id: string, title: string) => {
    setEditingTodo({ id, title });
    setEditTitle(title);
    setEditModalOpen(true);
  };

  const confirmEdit = () => {
    if (editingTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, title: editTitle } : todo
        )
      );
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
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== pendingDeleteId)
      );
      setPendingDeleteId(null);
    }
    setDeleteModalOpen(false);
  };

  const [selectedFilter, setSelectedFilter] = useState<SearchFiltersEnum>(
    SearchFiltersEnum.ALL
  );

  const addNewPost = () => {
    setIsModalOpen(true);
  };

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

  const updateTodos = ({
    title,
    description,
    dueDate,
    priority,
  }: NewTodoData) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        // id: String(prevTodos.length + 1),
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority: priority || undefined,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth={"lg"}>
      <Stack gap={4} mt={4}>
        <Header />
        <Search />
        <Filters filtersArray={filters} selectedFilter={selectedFilter} />
        <Typography variant="h5">Todos: {filteredTodos.length}</Typography>
        <Grid
          container
          spacing={2}
          sx={{
            border: `1px solid ${theme.palette.background.border}`,
            borderRadius: "12px",
            py: 13,
            px: 3,
            minHeight: "400px",
          }}>
          {filteredTodos.map((todo) => {
            return (
              <Grid size={{ xs: 12, md: 8, lg: 4 }} key={todo.id}>
                <TodoItem
                  key={todo.id + todo.title}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </Grid>
            );
          })}
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={addNewPost}
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
        slots={{ transition: Fade }}
        disableRestoreFocus
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
