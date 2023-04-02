import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const response = await getOrder(data);
    if (!response) {
      return rejectWithValue("Ошибка");
    }

    return fulfillWithValue(response);
  }
);
