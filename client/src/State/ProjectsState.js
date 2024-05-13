import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/projects");

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/projects",
        projectData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/projects/${projectId}`,
        projectData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ProjectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    project: {},
    fetchStatus: "idle",
    createStatus: "idle",
    fetchByIdStatus: "idle",
    updateStatus: "idle",
    error: null,
  },
  reducers: {
    changeProject: (state, action) => {
      state.project = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createProject.pending, (state, action) => {
        state.createStatus = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.projects.push(action.payload);
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProjectById.pending, (state, action) => {
        state.fetchByIdStatus = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.fetchByIdStatus = "succeeded";
        state.project = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.fetchByIdStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProject.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.project = action.payload;
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeProject } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
