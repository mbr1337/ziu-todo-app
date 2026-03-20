import "./App.css";
import { Box, Container, Stack } from "@mui/material";
import TodoItem from "./components/Todoitem";
import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "Todo 1",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Todo 2",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Todo 3",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Todo 4",
      completed: false,
      createdAt: new Date(),
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
      }),
    );
  };
  const onDelete = (id: string) => {
    console.log("on delete todo", id);
  };
  return (
    <Container maxWidth={"lg"}>
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id + todo.title}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={() => {}}
              />
            );
          })}
        </Box>
        <AddTodoForm />
      </Stack>
    </Container>
  );
}

export default App;
