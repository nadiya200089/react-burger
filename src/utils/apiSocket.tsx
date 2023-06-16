import { PayloadAction } from "@reduxjs/toolkit";

import type { Middleware, MiddlewareAPI } from "redux";
import { wsMessage, wsOpen, wsClose, wsConnect } from "../services/actions/feed";

import {
    wsMessage as wsMessageUser,
    wsOpen as wsOpenUserOrders,
    wsClose as wsCloseUserOrders,
    wsConnect as wsConnectUserOrders
} from "../services/actions/userOrders";

import { AppDispatch, RootStore } from "../services/store";

import { WsActionType } from './types';
import { typeUsersActions } from "../services/actions/userOrders";
import {typeFeedActions} from '../services/actions/feed'

export const socketMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next) => (action: PayloadAction<
    WsActionType
>) => {


    let socket;
    let url;
    const { type, payload } = action;

    const  { wsUserOpen, wsUserClose } = typeUsersActions;
    const  { wsOpen, wsClose } = typeFeedActions;


    if (type === wsUserOpen || type === wsOpen ) {
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
                store.dispatch(wsMessageUser(jsonData));
            } else {   
                store.dispatch(wsMessage(jsonData));

            }
        }
    }

    next(action);
}
