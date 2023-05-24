import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";
// import { AppDispatch } from "../store";
import { IIngredientsData } from "../../types";

// type TIngredientsThunk = {
//   dispatch: AppDispatch;
//   extra: typeof getIngredients;
// }

const fetchIngredients = createAsyncThunk
//<any, IIngredientsData, TIngredientsThunk>
(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const response = await getIngredients();
    if (!response) {
      return rejectWithValue("Ошибка");
    }
    console.log(response)
    return fulfillWithValue(response.data);
  }
);
export default fetchIngredients;
