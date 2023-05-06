import type { Middleware, MiddlewareAPI  } from "redux";
import { wsMessage,wsOpen, wsClose } from "../services/actions/feed";
import { AppDispatch, RootStore } from "../services/store";
import { IIngredientsData, IWebsocketOrders } from "../types";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";



 export const apiSocket: Middleware = (store: MiddlewareAPI<AppDispatch, RootStore>) => (next:any) => (action:any) => { 
    const socket: any = new WebSocket('wss://norma.nomoreparties.space/orders/all');
    if (socket) {

        socket.onmessage = (event: any) => {

            const jsonData = JSON.parse(event.data);

            store.dispatch(wsMessage(jsonData));
        }

        socket.onopen = (event: WebSocketEventMap) => {
            store.dispatch(wsOpen)
        }

        socket.onerror = (event: any) => {
            store.dispatch(wsClose)

        }
        socket.onclose = (event: any) => {
            console.log( 'WS close')

        }

    }
    next(action);
}


