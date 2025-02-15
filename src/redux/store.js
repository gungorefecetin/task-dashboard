// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
