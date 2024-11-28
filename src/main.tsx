import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
// Layouts&Pages
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Cart from "./pages/Cart/index.tsx";
import CustomerDashboardPage from "./pages/Customer/index.tsx";
import ManagerDashboardPage from "./pages/Manager/index.tsx";
import StaffDasboardPage from "./pages/Staff/index.tsx";
import ExecutiveDashboardPage from "./pages/Executive/index.tsx";
import KitchenStaffDashboardPage from "./pages/KitchenStaff/index.tsx";
import App from "./App.tsx";
// styles
import "./index.css";

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
    path: "/dashboard/",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // {
      //   index: true,
      //   element: <App />,
      // },
      {
        path: "customer",
        element: <CustomerDashboardPage />,
      },
      {
        path: "staff",
        element: <StaffDasboardPage />,
      },
      {
        path: "manager",
        element: <ManagerDashboardPage />,
      },
      {
        path: "executive",
        element: <ExecutiveDashboardPage />,
      },
      {
        path: "kitchen-staff",
        element: <KitchenStaffDashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/cart12",
    element: <Cart />,
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
