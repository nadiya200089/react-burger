import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrder } from "../actions/order";

const initialState = {
  data: {
    order: 0,
  },
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.data.order = action.payload?.order?.number;
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
    //console.log(data);
  },
});

export default orderSlice.reducer;
