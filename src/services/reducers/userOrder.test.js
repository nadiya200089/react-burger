import userOrders from "./userOrders";
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { initialState } from "./userOrders";
import { apiUserSocket } from '../../utils/apiSocket';
import { wsMessage, wsOpen, wsClose, wsConnect } from "../actions/userOrders";



const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: userOrders', () => {
    it('check values in the initial state', () => {
        expect(userOrders(undefined, {})).toEqual(
            initialState
        )
    });

    it('Action test: userOrders ', () => {
        const expectedAction = {
            type: wsMessage.type,
            payload: { total: 1, totalToday: 1, orders: [] }

        };
        expect(wsMessage({ total: 1, totalToday: 1, orders: [] })).toEqual(
            expectedAction
        )
    })
})