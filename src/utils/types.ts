import { wsMessage, wsOpen } from "../services/actions/feed";
import {IWsMessage} from '../services/actions/feed'
import { IWebsocketOrders } from "../types";

export const WsActionType = {
    url: '',
    wsOpen: 'FEED_WS_OPEN',
    wsClose: 'FEED_WS_CLOSE',
    wsUserOpen: 'USER_ORDERS_WS_OPEN',
    wsUserClose: 'USER_ORDERS_WS_CLOSE',
    wsMessage: (props: IWsMessage) => {
        const { total, orders, totalToday} = props;
        return {
             payload: {
                total,
                totalToday,
                orders: orders,
            },
            type: 'FEED_WS_MESSAGE'

        }
    },
  
    wsUserMessage:  (props: IWsMessage) => {
        const { total, orders, totalToday} = props;
        return {
             payload: {
                total,
                totalToday,
                orders: orders,
            },
            type:     'USER_ORDERS_WS_MESSAGE',


        }
    },
    
  
    }

  

    // export type WsActionType = {
    //     url: string,
        
    //     wsOpen: string,
    //     wsClose: string,
    //     wsUserOpen: string,
    //     wsUserClose: string,
    //     wsMessage({total, totalToday, orders}: IWsMessage): {
    //         payload: {
    //             total: number,
    //             totalToday: number,
    //             orders: IWebsocketOrders[],
    //         },
    //         type: string
    //     },
    //     wsUserMessage: string,
      
    //     }
