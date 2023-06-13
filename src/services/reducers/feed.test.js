import feed from "./feed";
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { initialState } from "./feed";
import { apiUserSocket } from '../../utils/apiSocket';
import { wsMessage, wsOpen, wsClose, wsConnect } from "../actions/feed";



const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: feed', () => {
    it('check values in the initial state', () => {
        expect(feed(undefined, {})).toEqual(
            initialState
        )
    });

    it('Action test: feed fetch', () => {
        const expectedAction = {
            type: wsMessage.type,
            payload: { total: 1, totalToday: 1, orders: [] }

        };
        expect(wsMessage({ total: 1, totalToday: 1, orders: [] })).toEqual(
            expectedAction
        )
    })
})