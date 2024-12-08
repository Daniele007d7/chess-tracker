import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./stylesheets-module/calendar.css";

import Login from "./Login.jsx";
import Homepage from "./Homepage.jsx";
import Signup from "./Signup.jsx";

import Tips from "./Tips.jsx";
import Goals from "./Goals.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginProvider from "./AuthContext.jsx";
import Stats from "./Stats.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },

  {
    path: "/tips",
    element: <Tips />,
  },
  {
    path: "/goals/",
    element: <Goals />,
  },
  {
    path: "/stats/",
    element: <Stats />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>
);
