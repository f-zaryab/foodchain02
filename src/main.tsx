import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import "./index.css";
import App from "./App.tsx";

const theme = createTheme({
  colors: {
    // Add your color
    deepBlue: [
      "#eef3ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc1",
      "#5f7cb8",
      "#5474b4",
      "#44639f",
      "#39588f",
      "#2d4b81",
    ],
    blue: [
      "#eef3ff",
      "#dee2f2",
      "#bdc2de",
      "#98a0ca",
      "#7a84ba",
      "#6672b0",
      "#5c68ac",
      "#4c5897",
      "#424e88",
      "#364379",
    ],
    red: [
      "#FF0800",
      "#FF0800",
      "#FF0800",
      "#FF0800",
      "#7a84ba",
      "#6672b0",
      "#5c68ac",
      "#4c5897",
      "#424e88",
      "#364379",
    ],
  },

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  // headings: {
  //   fontFamily: 'Roboto, sans-serif',
  //   sizes: {
  //     h1: { fontSize: rem(36) },
  //   },
  // },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </MantineProvider>
);
