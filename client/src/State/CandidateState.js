import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCandidates = createAsyncThunk(
  "candidate/fetchCandidates",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.get("http://localhost:3000/candidates.json");
    const candidates = response.data.filter(
      (obj) => obj.offer_id.toString() === id
    );

    candidates.sort((a, b) => b.accuracy - a.accuracy);

    return candidates;
  }
);

export const CandidatesSlice = createSlice({
  name: "candidate",
  initialState: {
    candidates: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCandidates.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default CandidatesSlice.reducer;
