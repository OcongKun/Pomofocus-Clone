import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    task: taskReducer,
  },
});

export default store;
