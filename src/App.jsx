import React, { useEffect } from "react";
import AllTodos from "./Pages/AllTodos";
import AddTodo from "./Pages/AddTodo";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import "./index.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "./Utils/Auth";
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn();
    const intervalId = setInterval(async () => {
      let yes = await isUserLoggedIn();
      if (yes) clearInterval(intervalId);
    }, 1000);
  }, []);

  const isUserLoggedIn = async () => {
    const loggedIn = await isLoggedIn();
    if (loggedIn === false) {
      navigate("../login");
      return false;
    }
    return true;
  };
  return (
    <>
      <Provider store={Store}>
        <div className="container">
          <header>
            <Link style={{ padding: "20px" }} to="/">
              All Todos
            </Link>
            <Link to="/add" style={{ padding: "20px" }}>
              Add Todos
            </Link>
          </header>
          <Outlet />
        </div>
      </Provider>
    </>
  );
};

export default App;
