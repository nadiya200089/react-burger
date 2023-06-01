import { PayloadAction } from "@reduxjs/toolkit";

import type { Middleware, MiddlewareAPI } from "redux";
import { wsMessage, wsOpen, wsClose, wsConnect } from "../services/actions/feed";
import { WsActionType } from '../services/actions/userOrders'
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

export const apiUserSocket: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next) => (action: PayloadAction<
    typeof WsActionType
>) => {
    console.log('type init', action.type)

    const wsUrl = 'wss://norma.nomoreparties.space/orders';
    let socket;
    let url;
    const { type } = action;

    if (type === 'FEED_WS_OPEN') {
        console.log('connected feed');
        url = wsUrl + '/all';
        socket = new WebSocket(wsUrl + '/all');
    } else if (type === 'USER_ORDERS_WS_OPEN') {
        console.log('connected user-orders');
        const token = getCookie('token');
        if (token) {
            socket = new WebSocket(`${wsUrl}?token=${token}`);
        }
    }
    
    if (socket) {
        if (type === 'FEED_WS_CLOSE') {
            socket.close(1000, 'work is complete');
        }

        if (type === 'USER_ORDERS_WS_CLOSE') {
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
