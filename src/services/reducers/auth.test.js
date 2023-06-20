import auth from "./auth";
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { initialState } from "./auth";
import { loginUser, getInfoUser, registerUser, logoutUser, updateToken, forgotPassword, resetPassword} from "../actions/auth";
import {burgerProjectUrl} from '../../utils/api';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test of reducers: auth', () => {
    it('check values in the initial state', () => {
        expect(auth(undefined, {})).toEqual(
            initialState
        )
    });

    it('Action test:  get info user', () => {
        const token = 'test-token';

        fetchMock.getOnce(`${burgerProjectUrl}/auth/user`, {
            body: {
                success: true,
                user: {
                    email: "test@test.ru",
                    name: "test"
                }
            },
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const expectedAction = [
            {
                type: getInfoUser.pending.type,
            },
            {
                type: getInfoUser.fulfilled.type,
                payload: {
                    user: {
                        email: "test@test.ru",
                        name: "test"
                    },
                    success: true
                }
            }
        ];

        const store = mockStore();

        store.dispatch(getInfoUser()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  login', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/auth/login`, {
            body: {
                success: true,
                user: {
                    email: "test@test.ru",
                    name: "test",
                },
                accessToken: "test",
                refreshToken: "test"
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: loginUser.pending.type,
            },
            {
                type: loginUser.fulfilled.type,
                payload: {
                    success: true,
                    user: {
                        email: "test@test.ru",
                        name: "test",
                    },
                    accessToken: "test",
                    refreshToken: "test"
                }
            }
        ];

        const store = mockStore();

        store.dispatch(loginUser()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  register', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/auth/register`, {
            body: {
                success: true,
                user: {
                    email: "test@test.ru",
                    name: "test",
                },
                accessToken: "test",
                refreshToken: "test"
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: registerUser.pending.type,
            },
            {
                type: registerUser.fulfilled.type,
                payload:{
                    success: true,
                    user: {
                        email: "test@test.ru",
                        name: "test",
                    },
                    accessToken: "test",
                    refreshToken: "test"
                }
            }
        ];

        const store = mockStore();

        store.dispatch(registerUser()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  logout', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/auth/logout`, {
            body: {
                success: true,
                message: "success"
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: logoutUser.pending.type,
            },
            {
                type: logoutUser.fulfilled.type,
                payload:{
                    success: true,
                    message: "success"
                }
            }
        ];

        const store = mockStore();

        store.dispatch(logoutUser()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  updateToken', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/auth/token`, {
            body: {
                success: true,
                accessToken: "test"
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: updateToken.pending.type,
            },
            {
                type: updateToken.fulfilled.type,
                payload: {
                    success: true,
                    accessToken: "test"
                }
            }
        ];

        const store = mockStore();

        store.dispatch(updateToken()).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  forgot password', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/password-reset`, {
            body: {
                success: true,
                message: "Reset email sent",
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: forgotPassword.pending.type,
            },
            {
                type: forgotPassword.fulfilled.type,
                payload: {
                    success: true,
                    message: "Reset email sent",
                }
            }
        ];

        const store = mockStore();

        store.dispatch(forgotPassword({ email: 'test@mail.ru'})).then(() => {
            const arrParse = store.getActions().map(action => ({
                type: action.type,
                payload: action.payload
            }));
            expect(arrParse).toEqual(
                expectedAction
            )
        })

    })

    it('Action test:  reset password', () => {

        fetchMock.postOnce(`${burgerProjectUrl}/password-reset/reset`, {
            body: {
                success: true,
                message: "Reset email sent",
            },
            headers: {
                'content-type': 'application/json',
            }
        });

        const expectedAction = [
            {
                type: resetPassword.pending.type,
            },
            {
                type: resetPassword.fulfilled.type,
                payload: {
                    success: true,
                    message: "Reset email sent",
                }
            }
        ];

        const store = mockStore();

        store.dispatch(resetPassword({ password: 'test'}, {token: 'test'})).then(() => {
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