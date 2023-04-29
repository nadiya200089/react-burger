import { createSlice } from "@reduxjs/toolkit";
import fetchIngredients from "../actions/ingredients";
import { IIngredientsData} from '../../types';

type TInitialState = {
  data: IIngredientsData[];
  isLoading: Boolean;
  error: Boolean;
};
const initialState: TInitialState = {
  data: [],
  isLoading: false,
  error: false,
};


export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export default ingredientsSlice.reducer;
