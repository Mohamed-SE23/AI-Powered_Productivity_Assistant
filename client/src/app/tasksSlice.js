import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = "/api/v1";

// get the token 
const user = JSON.parse(localStorage.getItem('user'));

// Thunks for async operations
//  ----------------- fetch all tasks ---------------------
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = user.token;
  const response = await axios.get(`${serverUrl}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.tasks;
});

// ------------------- get task by ID -------------------
export const getTask = createAsyncThunk('tasks/getTask', async (taskId) => {
  const token = user.token;
  const response = await axios.get(`${serverUrl}/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.task;
});

// ------------------- create tasks -------------------
export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const token = user.token;
  const response = await axios.post(`${serverUrl}/task/create`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

// ------------------- update tasks -------------------
export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const token = user.token;
  const response = await axios.patch(`${serverUrl}/task/${task._id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

// ------------------------ delete task ------------------------
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  const token = user.token;
  await axios.delete(`${serverUrl}/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return taskId;
});

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: {},
    loading: false,
    isEditing: false,
    error: null,
    priority: "all",
    modalMode: null,
    activeTask: null,
  },
  reducers: {
    setTaskField: (state, action) => {
      const { field, value } = action.payload;
      state.task[field] = value;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setModalMode: (state, action) => {
      state.modalMode = action.payload;
    },
    setActiveTask: (state, action) => {
      state.activeTask = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    closeModal: (state) => {
      state.modalMode = null;
      state.activeTask = null;
      state.isEditing = false;
      state.task = {};
    },
    addTaskToState: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskInState: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
  },
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

      // Get task by ID
      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.activeTask = action.payload; // Assign the fetched task to a specific state field
      })
      .addCase(getTask.rejected, (state, action) => {
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

export const {
  setTaskField,
  setPriority,
  setIsEditing,
  setModalMode,
  setActiveTask,
  setTask,
  closeModal,
  addTaskToState,
  updateTaskInState,
} = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectModalMode = (state) => state.tasks.modalMode;
export const selectActiveTask = (state) => state.tasks.activeTask;
export const selectPriority = (state) => state.tasks.priority;
export const selectIsEditing = (state) => state.tasks.isEditing;

export default tasksSlice.reducer;
