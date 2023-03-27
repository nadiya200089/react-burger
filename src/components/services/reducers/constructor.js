import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'
import ingredients from './ingredients';

const initialState = {
  bun: [],
  ingredients: [],
  sum: 0
}

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, uuid: uuidv4() };
        return;
      }
      state.ingredients.push({ ...action.payload, uuid: uuidv4() });
    },
    moveItem: (state, action) => {
        const { di, hi } = action.payload;
        const ingrds = state.ingredients;
        console.log(ingrds)
        ingrds.splice(di, 0, ingrds.splice(hi, 1)[0]);
        console.log(ingrds)
    },
    deleteIngredient: (state, action) => {
      const id = action.payload;
      const index = state.ingredients.findIndex(item => item.uuid === id);
      if (index !== -1) {
        state.ingredients.splice(index, 1)

      }
      else {
        console.log('error');
      }
    }
  }
});

export const { deleteIngredient, addConstructor, moveItem } = constructorSlice.actions;
export default constructorSlice.reducer;
