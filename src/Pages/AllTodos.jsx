import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateTodo } from "../Store/TodoSlice";

const AllTodos = () => {
  const [todos, setTodos] = useState(useSelector((state) => state.todos));
  const [viewTask, setViewTask] = useState({ status: false, task: {} });

  const todoList = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(todos);
  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);

  const updateTodoList = (t) => {
    let currentTodo = {
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status == "Done" ? "Todo" : "Done",
    };
    dispatch(updateTodo(currentTodo));
  };

  const columns = [
    {
      renderCell: ({ row }) => (
        <Button onClick={() => updateTodoList(row)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"15px"}
            viewBox="0 0 448 512"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </Button>
      ),
    },
    { field: "id", width: "100" },
    {
      field: "title",
      width: "200",
    },
    {
      width: "200",
      field: "status",
    },
    {
      field: "view",
      renderCell: ({ row }) => (
        <Button onClick={() => setViewTask({ status: true, task: row })}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="allTodo">
      <Button variant="contained" onClick={() => navigate("/add")}>
        Add Todo
      </Button>
      {todos?.length > 0 ? (
        <>
          <DataGrid
            rows={todos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowClassName={(row) =>
              row.row.status === "Done" ? "task-completed" : ""
            }
          
            onCellClick={(cell) => {
              // console.log(cell.field, cell, "cell");
              if (cell.field === "view" || cell.field === "title")
                setViewTask({ status: true, task: cell?.row });
            }}
          />
          <Modal
            open={viewTask?.status}
            onClose={() => setViewTask({ status: false })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <h3>Title: {viewTask?.task?.title}</h3>
              <p>Description: {viewTask?.task?.description}</p>
              <p>Status: {viewTask?.task?.status}</p>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <h2>No Tasks Found</h2>
        </>
      )}
    </div>
  );
};

export default AllTodos;
