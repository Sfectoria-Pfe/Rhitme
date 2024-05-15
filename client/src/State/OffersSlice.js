import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOffers = createAsyncThunk("offers/fetchOffers", async () => {
  try {
    const response = await axios.get("http://localhost:3000/offers");
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (offerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/offers",
        offerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchOfferById = createAsyncThunk(
  "offers/fetchOfferById",
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/offers/${offerId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOffer = createAsyncThunk(
  "offers/updateOffer",
  async ({ offerId, offerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/offers/${offerId}`,
        offerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "offers/deleteOffer",
  async (offerId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/offers/${offerId}`);
      return offerId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const OffersSlice = createSlice({
  name: "offers",
  initialState: {
    applyWindow: false,
    isOpen: false,
    current_offer: null,
    offers: [],
    offer: {},
    fetchStatus: "idle",
    createStatus: "idle",
    fetchByIdStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
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
        state.fetchStatus = "loading";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.offers = action.payload;
        state.error = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createOffer.pending, (state, action) => {
        state.createStatus = "loading";
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.offers.push(action.payload);
        state.error = null;
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOfferById.pending, (state, action) => {
        state.fetchByIdStatus = "loading";
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.fetchByIdStatus = "succeeded";
        state.offer = action.payload;
        state.error = null;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.fetchByIdStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOffer.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.offer = { ...state.offer, ...action.payload };
        state.error = null;
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOffer.pending, (state, action) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.offers = state.offers.filter(
          (offer) => offer.offer_id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentOffer,
  showOfferDetails,
  hideOfferDetails,
  showApplyWindow,
  hideApplyWindow,
} = OffersSlice.actions;

export default OffersSlice.reducer;
