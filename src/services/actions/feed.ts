import { createAction } from "@reduxjs/toolkit";
import { IWebsocketOrders } from "../../types";

interface IWsMessage {
    total: number;
    totalToday: number;
    orders: IWebsocketOrders[];
}

export const wsConnect = createAction('FEED_WS_CONNECT');
export const wsDisonnect = createAction('FEED_WS_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction('FEED_WS_MESSAGE', function prepare (props: IWsMessage) {
    const {  total, totalToday, orders } = props;
    return {
        payload: {
            total, totalToday, orders
        }
    }
});
export const wsError = createAction('FEED_WS_ERROR');