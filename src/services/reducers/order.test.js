import order from "./order";
import fetchMock from 'fetch-mock';
import { fetchOrder } from '../actions/order';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {burgerProjectUrl} from '../../utils/api';


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
        const reqData = ["1", "2", "3"];

        fetchMock.postOnce(`${burgerProjectUrl}/orders`, {
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