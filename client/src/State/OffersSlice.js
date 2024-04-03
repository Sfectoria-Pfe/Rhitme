import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOffers = createAsyncThunk("offer/fetchOffers", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get("http://localhost:3000/jobOffers.json");
  return response.data;
});

export const fetchOfferById = createAsyncThunk(
  "offer/fetchOfferById",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get("http://localhost:3000/jobOffers.json");
    const offer = response.data.find((obj) => obj.id.toString() === id);

    return offer;
  }
);

export const OfferSlice = createSlice({
  name: "offer",
  initialState: {
    applyWindow: false,
    isOpen: false,
    applying_for: null,
    current_offer: 1,
    offers: [],
    status: "idle",
    error: null,
    offer: null,
    offerStatus: "idle",
    offerError: null,
  },
  reducers: {
    setCurrentOffer: (state, action) => {
      state.current_offer = action.payload;
    },
    showOfferDetails: (state) => {
      state.isOpen = true;
    },
    hideOfferDetails: (state) => {
      state.isOpen = false;
    },
    showApplyWindow: (state) => {
      state.applyWindow = true;
    },
    hideApplyWindow: (state) => {
      state.applyWindow = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOfferById.pending, (state, action) => {
        state.offerStatus = "loading";
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offerStatus = "succeeded";
        state.offer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.offerStatus = "failed";
        state.offerError = action.error.message;
      });
  },
});

export const {
  setCurrentOffer,
  showOfferDetails,
  hideOfferDetails,
  showApplyWindow,
  hideApplyWindow,
} = OfferSlice.actions;

export default OfferSlice.reducer;
