import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages
import App from "./App.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Project from "./pages/Project.jsx";
import Reports from "./pages/Reports.jsx";
import Setting from "./pages/Setting.jsx";
import Team from "./pages/Team.jsx";
import TaskDetails from "./pages/Task Details.jsx";
import { UserLoginContextProvider } from "./context/userLoginContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // <-- this makes it the default route
        element: <Dashboard />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "tasks/:taskID",
        element: <TaskDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserLoginContextProvider>
      <RouterProvider router={router} />
    </UserLoginContextProvider>
  </StrictMode>
);
