import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../Store/TodoSlice";
import TextField from "@mui/material/TextField";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTodo = (e) => {
    e.preventDefault();
    console.log(todo);
    dispatch(addTodo(todo));
    navigate("/");
  };
  return (
    <>
      <h2>Add Todo</h2>
      <form onSubmit={handleAddTodo}>
        <div className="mt-2">
          <InputLabel>Title: </InputLabel>

          <TextField
            onChange={(e) =>
              setTodo((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="mt-2">
          <InputLabel>Description: </InputLabel>
          <TextField
            onChange={(e) =>
              setTodo((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              })
            }
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="mt-2">
          <InputLabel>Status</InputLabel>
          <Select
            id="demo-simple-select-helper"
            value={todo?.status}
            fullWidth
            onChange={(e) =>
              setTodo((prev) => {
                return {
                  ...prev,
                  status: e.target.value,
                };
              })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Todo"}>Todo</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </div>
        <div className="mt-2">
          <Button variant="contained" fullWidth type="submit">
            Add Todo
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
