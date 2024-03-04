import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      action.payload["id"] = state.length + 1;
      state.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, description, status } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.status = status;
      } else {
        console.log("No todo found with that id");
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    viewTodo: (state, action) => {
      return state.find((todo) => todo.id === action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, viewTodo } = todoSlice.actions;

export default todoSlice.reducer;
