import type { Middleware, MiddlewareAPI } from "redux";
import { wsMessage, wsOpen, wsClose, wsConnect } from "../services/actions/feed";

import {
    wsMessage as wsMessageUser,
    wsOpen as wsOpenUserOrders,
    wsClose as wsCloseUserOrders,
    wsConnect as wsConnectUserOrders
} from "../services/actions/userOrders";

import { AppDispatch, RootStore } from "../services/store";
import { IIngredientsData, IWebsocketOrders } from "../types";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getCookie } from "./cookie";

export const apiSocket: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next) => (action) => {
    const socket: any = new WebSocket('wss://norma.nomoreparties.space/orders/all');
    if (socket) {

        socket.onmessage = (event: any) => {

            const jsonData = JSON.parse(event.data);

            store.dispatch(wsMessage(jsonData));
            socket.close()
        }

        socket.onopen = (event: WebSocketEventMap) => {
            store.dispatch(wsOpen)
        }

        socket.onerror = (event: any) => {
            store.dispatch(wsClose)

        }
        socket.onclose = (event: any) => {
            console.log('WS close')

        }

    }
    next(action);
}

export const apiUserSocket: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next) => (action: any) => {
    const wsUrl = 'wss://norma.nomoreparties.space/orders';
    const token = getCookie('token');
    if (token) {
        const socket: any = new WebSocket(`${wsUrl}?token=${token}`);
        if (socket) {

            socket.onmessage = (event: any) => {

                const jsonData = JSON.parse(event.data);
                store.dispatch(wsMessageUser(jsonData));
                console.log('data', jsonData)
            }

            socket.onopen = (event: WebSocketEventMap) => {
                store.dispatch(wsOpenUserOrders)
            }

            socket.onerror = (event: any) => {
                store.dispatch(wsCloseUserOrders)

            }
            socket.onclose = (event: any) => {
                console.log('WS close')

            }

        }
    }

    next(action);
}

// export const apiUserSocket: Middleware = ((store: MiddlewareAPI<AppDispatch, RootStore>) => {
//         let socket: WebSocket | null = null;

//     return next => (action: {type: string; payload: any}) => {
//       const { dispatch, getState } = store;
//       const { type, payload } = action;
//       const {user} = useSelector((state:RootStore) => state.auth);
//       const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
//       const token = getCookie('token');
//       if (!token) {
//         console.error('Has not a token');
//         return;
//       }
//       socket = new WebSocket(`${wsUrl}?token=${token}`);//
//     //   if (type === 'FEED_WS_CONNECT') {
//     //   }
//       if (socket) {
//         socket.onopen = event => {
//         //   dispatch({ type: 'FEED_WS_OPEN', payload: event });
//         };
//         socket.onerror = event => {
//         //   dispatch({ type: 'FEED_WS_CLOSE', payload: event });
//         };
//         socket.onmessage = event => {
//           const { data } = event;
//           console.log('Data history', data);
//         //   dispatch({ type: 'FEED_WS_MESSAGE', payload: data });
//         };
//         socket.onclose = event => {
//         //   dispatch({ type: 'FEED_WS_CLOSE', payload: event });
//         };
//       }

//       next(action);
//     };
//     }) as Middleware;
