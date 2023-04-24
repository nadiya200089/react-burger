import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";
import { AppDispatch } from "../store";

type TGetOrderThunk = {
  dispatch: AppDispatch;
  extra: typeof getOrder;
}

interface INumber {
  number?: any
}
interface IPayload {
  order: INumber
}

export const fetchOrder = createAsyncThunk<IPayload, string[], TGetOrderThunk>(
  "order/fetchOrder",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    const response = await getOrder(data);
    if (!response) {
      return rejectWithValue("Ошибка");
    }

    return fulfillWithValue(response);
  }
);
