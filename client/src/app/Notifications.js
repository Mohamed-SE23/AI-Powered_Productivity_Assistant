import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://ai-powered-productivity-assistant.onrender.com/api/v1/notifications?userId=${userId}`);
      localStorage.setItem('notifications', response.data.length);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to delete a notification
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.delete(`https://ai-powered-productivity-assistant.onrender.com/api/v1/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return notificationId; // Return the ID of the deleted notification
    } catch (error) {
      console.error("Error deleting notification:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((notification) => notification._id !== action.payload);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectNotifications = (state) => state.notifications.data;

export const notificationsReducer = notificationsSlice.reducer;
