import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";
import { IIngredientsData } from "../../types";


const fetchIngredients = createAsyncThunk
(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const response = await getIngredients();
    if (!response) {
      return rejectWithValue("Ошибка");
    }
    return fulfillWithValue(response);
  }
);
export default fetchIngredients;
