import "./App.scss";
import { Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Search from "./components/Search";
import theme from "./theme/theme";
import { TodoPriorityEnum } from "./enums/TodoPriority.enum";
import AddIcon from "@mui/icons-material/Add";
import { SearchFiltersEnum } from "./enums/SearchFilters.enum";

function App() {
  const navigate = useNavigate();
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

  const [selectedFilter, setSelectedFilter] = useState<SearchFiltersEnum>(
    SearchFiltersEnum.ALL
  );

  const addNewPost = () => {
    navigate("/addTodo");
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

  return (
    <Container maxWidth={"lg"}>
      <Stack gap={4} mt={4}>
        <Header />
        <Search />
        <Filters filtersArray={filters} selectedFilter={selectedFilter} />
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
                  onEdit={() => {}}
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
          <IconButton sx={{color: theme.palette.blackAndWhite.secondary,}}>
            <AddIcon />
          </IconButton>
          <Typography variant="body1">Add New Post</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
