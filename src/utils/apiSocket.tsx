import { PayloadAction } from "@reduxjs/toolkit";

import type { Middleware, MiddlewareAPI } from "redux";


import { AppDispatch, RootStore } from "../services/store";

import { WsActionType } from './types';

export const socketUrl = 'wss://norma.nomoreparties.space/orders';

export const socketMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next) => (action: PayloadAction<
    typeof WsActionType
>) => {

    let socket;
    let url;
    const { type, payload } = action;

    const { wsOpen, wsClose, wsUserOpen, wsUserClose, wsUserMessage, wsMessage } = WsActionType;

    if (type === wsUserOpen || type === wsOpen) {
        url = payload.url;
        console.log('connected feed')
        socket = new WebSocket(url);
    }

    if (socket) {
        if (type === wsClose) {
            socket.close(1000, 'work is complete');
        }

        if (type === wsUserClose) {
            socket.close(1000, 'work is complete');
        }

        socket.onmessage = (event: any) => {
            const jsonData = JSON.parse(event.data);
            if (event.srcElement.url.includes('token')) {
                store.dispatch(wsUserMessage(jsonData));
            } else {
                store.dispatch(wsMessage(jsonData));

            }
        }
    }

    next(action);
}
