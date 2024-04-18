import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("http://localhost:3000/tasks.json");
  return response.data;
});

export const fetchTasksByProject = createAsyncThunk(
  "tasks/fetchTasksByProject",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get("http://localhost:3000/tasks.json");
    const tasks = response.data.filter((obj) => obj.project_id === id);
    return tasks;
  }
);

export const TasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
    tasksByProject: [],
    tasksByProjectStatus: "idle",
    tasksByProjectError: null,
  },
  reducers: {
    updateTask(state, action) {
      const updatedTask = action.payload;
      state.tasksByProject = state.tasksByProject.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
    },
    reorderTasks(state, action) {
      const { listType, updatedTasks } = action.payload;
      state[listType] = updatedTasks;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTasksByProject.pending, (state, action) => {
        state.tasksByProjectStatus = "loading";
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.tasksByProjectStatus = "succeeded";
        state.tasksByProject = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.tasksByProjectStatus = "failed";
        state.tasksByProjectError = action.error.message;
      });
  },
});

export const { updateTask, reorderTasks } = TasksSlice.actions;

export default TasksSlice.reducer;
