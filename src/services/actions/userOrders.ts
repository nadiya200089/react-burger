import { createAction } from "@reduxjs/toolkit";
import { IWebsocketOrders } from "../../types";

interface IWsMessage {
    total: number;
    totalToday: number;
    orders: IWebsocketOrders[];
}

interface IUrl {
    url: string;
}

export const typeUsersActions = {
    wsUserOpen: 'USER_ORDERS_WS_OPEN',
    wsUserClose: 'USER_ORDERS_WS_CLOSE',
};

export const wsConnect = createAction('USER_ORDERS_WS_CONNECT');
export const wsDisonnect = createAction('USER_ORDERS_WS_DISCONNECT');
export const wsConnecting = createAction('USER_ORDERS_WS_CONNECTING');
export const wsOpen = createAction(typeUsersActions.wsUserOpen, function prepare ({ url }: IUrl) {
    return {
        payload: {
           url
        }
    }
});
export const wsClose = createAction(typeUsersActions.wsUserClose);
export const wsMessage = createAction('USER_ORDERS_WS_MESSAGE', function prepare (props: IWsMessage) {
    const {  total, totalToday, orders } = props;
    return {
        payload: {
            total, totalToday, orders
        }
    }
});
export const wsError = createAction('USER_ORDERS_WS_ERROR');

