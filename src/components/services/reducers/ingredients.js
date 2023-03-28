import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api';

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const response = await getIngredients()
    if (!response) {
      return rejectWithValue('Ошибка')
    }
    return fulfillWithValue(response.data)
  }

)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    plusCount: (state, action) => {
      const currentIngredientId = action.payload.id;
      const currentIngredientType = action.payload.type;

      state.data = state.data.map(ingredient => {
        let count;
        if (ingredient.type === 'bun' && currentIngredientType === 'bun') {
          ingredient.count = 0;
        }
        if (ingredient._id === currentIngredientId) {
          if (ingredient.type === 'bun') {
            count = 2;
          } else {
            count = ingredient.count ? ++ingredient.count : 1
          }
        }
        return ingredient._id === currentIngredientId ? {
          ...ingredient,
          count: count
        } : ingredient
      })
    },
    minusCount: (state, action) => {
      return  {
        ...state,
        data: state.data.map((item) => {
          const {count, _id} = item;
          if (_id !==action.payload) {
            return item
          }
          return {
            ...item,
            count: count > 1 ? count - 1 : null
          }
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false
      })

  },
});

export default ingredientsSlice.reducer;

export const { plusCount, minusCount } = ingredientsSlice.actions;