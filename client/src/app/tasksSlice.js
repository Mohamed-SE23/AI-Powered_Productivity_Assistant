import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../config';

// get the token 
const user = JSON.parse(localStorage.getItem('user'));

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
  const userId = user?.id;
  
  if (!userId) {
    throw new Error("User ID is not available.");
  }

  const response = await axios.get(`${server}/api/v1/tasks`, {
    params: { userId },
  });
  return response.data.tasks;
});

// ------------------- get task by ID -------------------
export const getTask = createAsyncThunk('tasks/getTask', async (taskId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (!token) {
    throw new Error("User token is not available.");
  }

  const response = await axios.get(`${server}/api/v1/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.task;
});

// ------------------- create tasks -------------------
export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (!token) {
    throw new Error("User token is not available.");
  }

  const response = await axios.post(`${server}/api/v1/task/create`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  toast.success("Task created successfully")
  return response.data;
});

// ------------------- update tasks -------------------
export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (!token) {
    throw new Error("User token is not available.");
  }

  const response = await axios.patch(`${server}/api/v1/task/${task._id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  toast.success("Task updated successfully")
  return response.data;
});

// ------------------------ delete task ------------------------
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (!token) {
    throw new Error("User token is not available.");
  }
  
  await axios.delete(`${server}/api/v1/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  toast.success("Task deleted successfully")
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
