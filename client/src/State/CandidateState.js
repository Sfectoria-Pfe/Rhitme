import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCandidatesByOfferId = createAsyncThunk(
  "candidates/fetchCandidatesByOfferId",
  async (offerId) => {
    const response = await axios.get(
      `http://localhost:3000/candidates/offer/${offerId}`
    );
    return response.data;
  }
);

export const createCandidate = createAsyncThunk(
  "candidates/createCandidate",
  async ({ candidateData, cv }) => {
    const formData = new FormData();
    formData.append("cv", cv);
    Object.entries(candidateData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(
      "http://localhost:3000/candidates",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const deleteCandidate = createAsyncThunk(
  "candidates/deleteCandidate",
  async (candidateId) => {
    await axios.delete(`http://localhost:3000/candidates/${candidateId}`);
    return candidateId;
  }
);

const initialState = {
  candidates: [],
  fetchStatus: "idle",
  createStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesByOfferId.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchCandidatesByOfferId.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidatesByOfferId.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createCandidate.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.candidates.push(action.payload);
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCandidate.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.candidates = state.candidates.filter(
          (candidate) => candidate.candidate_id !== action.payload
        );
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default candidatesSlice.reducer;
