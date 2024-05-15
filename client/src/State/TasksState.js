import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasksByProject = createAsyncThunk(
  "tasks/fetchTasksByProject",
  async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/tasks/project/${projectId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        taskData
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        taskData
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const TasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    task: {},
    fetchStatus: "idle",
    fetchByIdStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    changeTask(state, action) {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksByProject.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.fetchByIdStatus = "loading";
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.fetchByIdStatus = "succeeded";
        state.task = action.payload;
        state.error = null;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.fetchByIdStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeTask } = TasksSlice.actions;

export default TasksSlice.reducer;
