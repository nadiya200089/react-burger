import constructor from "./constructor";
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: constructor', () => {
    it('check values in the initial state', () => {
       
        expect(constructor(undefined, {})).toEqual(
            {

                ingredients: null,
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
                  lastOrder: {
                    name: "",
                    order: "",
                  },
                  sum: 0,
    
            }
        )
    });

    // it('Action test: ingredients fetch', () => {
        
    //     fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
    //         body: [{}, {}],
    //         headers: { 'content-type': 'application/json' }
    //     });

    //     const expectedAction = [
    //         {
    //             type: fetchIngredients.pending.type
    //         },
    //         {
    //             type: fetchIngredients.fulfilled.type,
    //             payload: [{}, {}]
    //         }
    //     ];

    //     const store = mockStore();

    //     store.dispatch(fetchIngredients()).then(() => {
    //         const arrParse = store.getActions().map(action => ({
    //             type: action.type,
    //             payload: action.payload
    //         }));

    //         expect(arrParse).toEqual(
    //             expectedAction
    //         )
    //     })
    // })
 })