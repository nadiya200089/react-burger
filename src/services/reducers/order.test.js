import order from "./order";
import fetchMock from 'fetch-mock';
import { fetchOrder } from '../actions/order';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: Order', () => {
    it('check values in the initial state', () => {
        
        expect(order(undefined, {})).toEqual(
            {
                data: {
                    order: 0,
                },
                isLoading: false,
                error: null
            }
        )
    });


    it('Action test: order fetch', () => {
        //даныне которые подходят под входные данные запроса fetchOrder
        const reqData = ["1", "2", "3"];

        //иницилизирцем mock для асинхронного запроса fetchOrder
        //первый параметр это реальный урл запроса
        // bode мы заполняем сами. Body будет возвращаться в теле ответа mock server
        fetchMock.postOnce('https://norma.nomoreparties.space/api/orders', {
            body: { order: { number: 1 }},
            headers: { 'content-type': 'application/json' }
        });

        const expectedAction = [
            {
                type: fetchOrder.pending.type
            },
            {
                type: fetchOrder.fulfilled.type,
                payload: { order: { number: 1 } }
            }
        ];
        
        const store = mockStore();

        store.dispatch(fetchOrder(reqData)).then(() => {
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