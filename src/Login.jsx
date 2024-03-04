import { InputLabel, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { setCookie, validateEmail } from "./Utils/Utils";
import { useNavigate } from "react-router-dom";
import { encode } from "./Utils/Crypto";
import { isLoggedIn } from "./Utils/Auth";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn();
    const intervalId = setInterval(async () => {
      let yes = await isUserLoggedIn();
      if (yes) clearInterval(intervalId);
    }, 60000);
  }, []);

  const isUserLoggedIn = async () => {
    const loggedIn = await isLoggedIn();
    if (loggedIn === true) {
      navigate("/");
      return true;
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(userData.email)) {
      return alert("Invalid Email");
    }
    if (userData?.email == "admin@gmail.com" && userData?.password == "admin") {
      console.log("Login Success");
      let _ud = await encode(JSON.stringify(userData));
      setCookie("_ud", _ud, 30);
      navigate("/");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="mt-2">
          <InputLabel>Email: </InputLabel>

          <TextField
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="mt-2">
          <InputLabel>Password: </InputLabel>
          <TextField
            onChange={(e) =>
              setUserData((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="mt-2">
          <Button variant="contained" fullWidth type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
