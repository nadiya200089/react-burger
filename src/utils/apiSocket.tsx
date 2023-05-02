import type { Middleware } from "redux";
import { useDispatch } from "../services/hooks";
import { wsMessage } from "../services/actions/feed";
import { RootStore } from "../services/store";


export const apiSocket: Middleware = (store:any) => (next:any) => (action:any) => { 
   const dispatch = useDispatch();
    const socket: any = new WebSocket('wss://norma.nomoreparties.space/orders/all');
    if (socket) {

        socket.onmessage = (event: any) => {

            const jsonData = JSON.parse(event.data);
            //orders 
            store.dispatch(wsMessage(jsonData));
            console.log('ws-event', event);
        }

        socket.onopen = (event: WebSocketEventMap) => {
                console.log('ws-event', event);
        }

    }
    next(action);
}


