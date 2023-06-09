import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IIngredientsDto, IIngredientsData } from '../../types'

interface IinitialState  {
  bun: IIngredientsDto;
  ingredients: IIngredientsData[] | null;
  lastOrder: {
    name: string,
    order: string,
  };
  sum: number;
};
type TUuid = {
  uuid: string;
}

interface ICoordinat {
  hi: number,
  di: number
}

export const initialState: IinitialState  = {
  bun: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    proteins: 0,
    image: '',
    price: 0,
    image_large: "",
    image_mobile: '',
    name: '',
    _id: '',
    type: '',
    uuid: '',
    __v: 0
  },
  ingredients: null,
  lastOrder: {
    name: "",
    order: "",
  },
  sum: 0,
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addConstructorA: (state, action: PayloadAction<IIngredientsData>) => {
      const uuid =  action.payload.uuid;
      if (action.payload.type === "bun") {
        

        state.bun = { ...action.payload, uuid: uuid && uuid.length ? uuid : uuidv4() };
        return;
      }
      if (!state.ingredients) {
        state.ingredients = [];
      }
      state.ingredients.push({ ...action.payload, uuid: uuid && uuid.length ? uuid : uuidv4() });
    },
    moveItemA: (state, action: PayloadAction<ICoordinat>) => {
      //di - start
      const { di, hi } = action.payload;
      const ingrds = state.ingredients;
      if (ingrds) {
        ingrds.splice(di, 0, ingrds.splice(hi, 1)[0]);

      }
    },
    deleteIngredientA: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ingredients) {
        const index = state.ingredients.findIndex((item: IIngredientsData) => item.uuid === id);
        if (index !== -1) {
           state.ingredients.splice(index, 1);    
        } else {
          console.log("Error: after delete an ingridients");
        }
      }
    },
    updateOrderA: (state, action) => {
      const { name, order } = action.payload;
      state.lastOrder = { name, order };
    },
    deleteAllA: (state) => {
      state.ingredients = null;
    }
  },
});

export const {  
  addConstructorA: addConstructor,
  updateOrderA: updateOrder,
  deleteIngredientA: deleteIngredient,
  moveItemA: moveItem,
  deleteAllA: deleteAll
} = constructorSlice.actions;
export default constructorSlice.reducer;