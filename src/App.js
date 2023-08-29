import "./App.css";
import { useState, useEffect } from "react";

import Task from "./Task";
import TaskList from "./TaskList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#152539", contrastText: "#fff" },
    secondary: { main: "#B9B4C7", contrastText: "#fff" },
  },
});

function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("todo"));
    setTodoList((state) => item);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h2 className="mainHeading ">Todo Lists</h2>
        <Task setTodoList={setTodoList} todoList={todoList} />
        <TaskList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </ThemeProvider>
  );
}

export default App;
