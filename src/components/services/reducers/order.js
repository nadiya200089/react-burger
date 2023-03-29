import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetOrder } from '../../utils/api';

const initialState = {
  data: {},
  isLoading: false,
  error: null
}

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const response = await GetOrder()
    if (!response) {
      return rejectWithValue('Ошибка')
    }

    return fulfillWithValue(response.data)
  }

)


export const orderSlice = createSlice({
    name: 'order',
    initialState,
     extraReducers: (builder) => {
      builder
        .addCase(fetchOrder.pending, (state) => {
          state.isLoading = true;
          state.error = null
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
          state.data = action.payload;
          state.isLoading = false
        })
        .addCase(fetchOrder.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false
        })
       //console.log(data);
    },
  });
  
  export default orderSlice.reducer;