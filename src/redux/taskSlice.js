// src/redux/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Complete the first task', status: 'todo' },
  { id: 2, title: 'Task 2', description: 'Work on the second task', status: 'inprogress' },
  { id: 3, title: 'Task 3', description: 'Finish the third task', status: 'done' },
];

// Async thunk to simulate fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTasks;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateTask, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
