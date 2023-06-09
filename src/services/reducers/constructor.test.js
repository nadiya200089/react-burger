import constructor, { deleteAll } from "./constructor";
import { addConstructor, updateOrder, deleteIngredient, moveItem } from './constructor'
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { initialState } from "./constructor";
import { v4 as uuidv4 } from "uuid";



const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: constructor', () => {
    it('check values in the initial state', () => {

        expect(constructor(undefined, {})).toEqual(
            initialState
        )
    });


    it('should add constructor', () => {
        const uuid = uuidv4();
        const testIngredient = {
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
            uuid: uuid,
            __v: 0
        }

        const resultReducerConstructor = constructor(undefined, {
            type: addConstructor.type,
            payload: testIngredient,
        });

        const defaultStoreConstructor = { ...initialState, ingredients: [testIngredient] };


        expect(
            resultReducerConstructor
        ).toEqual(
            defaultStoreConstructor
        )
    })

    it('should update order', () => {
        const testOrder = {
            name: 'burger',
            order: 'superBurger'
        }
        expect(constructor(undefined, {
            type: updateOrder.type,
            payload: testOrder,
        })
        ).toEqual(
            { ...initialState, lastOrder: testOrder }
        )

    })

    it('should delete ingredient', () => {
        const testIngredients = [{uuid: '1' }, {uuid: '2'}];
        const id = '1';
        const initStateForDelete =  { ...initialState, ingredients: testIngredients };

        const stateReducer = constructor(initStateForDelete, {
            type: deleteIngredient.type,
            payload: id,
        });
        const trueResult = { ...initialState, ingredients: testIngredients.filter(item => item.uuid !== id) };
        expect(stateReducer
        ).toEqual(
            trueResult
        )

    })

    it('should move ingredient', () => {
        const testIngredients = [{uuid: '1' }, {uuid: '2'}, {uuid: '3'}];
    
        const initStateForMove =  { ...initialState, ingredients: testIngredients };

        const stateReducer = constructor(initStateForMove, {
            type: moveItem.type,
            payload: { di: 0, hi: 2},
        });
        const trueResult = { ...initialState, ingredients:  [{uuid: '3' }, {uuid: '1'}, {uuid: '2'}] };
        expect(stateReducer
        ).toEqual(
            trueResult
        )

    })

    it('should delete all ingredients', () => {
        const testIngredients = [{uuid: '1' }, {uuid: '2'}];
        const initStateForDelete =  { ...initialState, ingredients: testIngredients };

        const stateReducer = constructor(initStateForDelete, {
            type: deleteAll.type,
        });
        const trueResult = { ...initialState, ingredients: null};
        expect(stateReducer
        ).toEqual(
            trueResult
        )

    })

})