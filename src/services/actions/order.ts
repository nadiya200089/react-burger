import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";
import { AppDispatch } from "../store";

type TGetOrderThunk = {
  dispatch: AppDispatch;
  extra: typeof getOrder;
}


export const fetchOrder = createAsyncThunk<any, number[], TGetOrderThunk>(
  "order/fetchOrder",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const response = await getOrder(data);
    if (!response) {
      return rejectWithValue("Ошибка");
    }

    return fulfillWithValue(response);
  }
);
