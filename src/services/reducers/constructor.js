import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  bun: {},
  ingredients: [],
  lastOrder: {
    name: '',
    order: ''
  },
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
      ingrds.splice(di, 0, ingrds.splice(hi, 1)[0]);
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
    },
    updateOrder: (state, action) => {
      const { name, order } = action.payload;
      state.lastOrder = { name, order };
    }
  }
});

export const { deleteIngredient, addConstructor, moveItem, updateOrder } = constructorSlice.actions;
export default constructorSlice.reducer;
