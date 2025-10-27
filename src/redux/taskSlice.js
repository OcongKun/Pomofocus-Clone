import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title } = action.payload;
      const newTask = {
        id: Date.now().toString(),
        title: title || "New Task",
        isCompleted: false,
      };
      state.tasks.unshift(newTask);
    },
    toggleTask: (state, action) => {
      const id = action.payload;
      const t = state.tasks.find((task) => task.id === id);
      if (t) t.isCompleted = !t.isCompleted;
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const t = state.tasks.find((task) => task.id === id);
      if (t) t.title = title;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, clearTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
