import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get("http://localhost:3000/projects.json");
    const projects = response.data;
    return projects;
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get("http://localhost:3000/projects.json");
    const project = response.data.find((obj) => obj.project_id === id);
    return project;
  }
);

export const ProjectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
    selectedProject: [],
    projectStatus: "idle",
    projecterror: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProjectById.pending, (state, action) => {
        state.projectStatus = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.projectStatus = "succeeded";
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.projectStatus = "failed";
        state.projecterror = action.error.message;
      });
  },
});

export default ProjectsSlice.reducer;
