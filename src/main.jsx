import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AllTodos from "./Pages/AllTodos.jsx";
import AddTodo from "./Pages/AddTodo.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllTodos />,
      },
      {
        path: "/add",
        element: <AddTodo />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
