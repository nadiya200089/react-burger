import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid'

const initialState = {
  bun: [],
  ingredients: []
}

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => {
      if (action.payload.type === 'bun') {
         state.bun = {...action.payload, uuid: uuidv4()};
         return;
      }
      state.ingredients.push({...action.payload, uuid: uuidv4()});
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

export const {deleteIngredient, addConstructor} = constructorSlice.actions;
export default constructorSlice.reducer;
