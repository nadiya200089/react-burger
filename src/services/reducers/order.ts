import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchOrder } from "../actions/order";

interface IData {
  order: number[];
}
interface IInitState { 
  data: IData,
  isLoading: boolean;
  error: boolean | null;
}

const initialState: IInitState = {
  data: {
    order: [0],
  },
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.data.order = action.payload?.order?.number;
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      });
  }
});

export default orderSlice.reducer;
