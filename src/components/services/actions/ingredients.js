import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../../utils/api';

const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const response = await getIngredients()
    if (!response) {
      return rejectWithValue('Ошибка')
    }

    return fulfillWithValue(response.data)
  }

)
export default fetchIngredients;
