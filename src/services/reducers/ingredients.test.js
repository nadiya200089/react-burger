import ingredients from "./ingredients";
import fetchMock from 'fetch-mock';
import fetchIngredients from '../actions/ingredients';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {burgerProjectUrl} from '../../utils/api';



const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: ingredients', () => {
    it('check values in the initial state', () => {
        expect(ingredients(undefined, {})).toEqual(
            {

                data: [],
                isLoading: false,
                error: false

            }
        )
    });

    it('Action test: ingredients fetch', () => {

        fetchMock.getOnce(`${burgerProjectUrl}/ingredients`, {
            body: [{}, {}],
            headers: { 'content-type': 'application/json' }
        });


        const expectedAction = [
            {
                type: fetchIngredients.pending.type
            },
            {
                type: fetchIngredients.fulfilled.type,
                payload: [{}, {}]
            }
        ];
        
        const store = mockStore();

        store.dispatch(fetchIngredients()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })
        
    })
})