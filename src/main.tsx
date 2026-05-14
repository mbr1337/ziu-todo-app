import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";
import { TodoProvider } from "./context/TodoContext";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./components/NotFound.js";
import MovieMain from "./components/MovieDB/MovieMain.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <MovieMain />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </TodoProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
