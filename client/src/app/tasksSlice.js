import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = "https://taskfyer.onrender.com/api/v1";

// Thunks for async operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`${serverUrl}/tasks`);
  return response.data.tasks;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await axios.post(`${serverUrl}/task/create`, task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`${serverUrl}/task/${taskId}`);
  return taskId;
});

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
