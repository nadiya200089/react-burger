import { createSlice } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/ws";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/feed'
import { IWebsocketOrders } from '../../types'



export const initialState: TInitialState= {
  isConnectionError: false,
  total: 0,
  totalToday: 0,
  orders: [],
  status: WebsocketStatus.OFFLINE
};

type TInitialState = {
  isConnectionError: boolean;
  total: number;
  totalToday: number;
  orders: IWebsocketOrders[];
  status: string;
}

export const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.isConnectionError = false;
    })
    .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
    })
    .addCase(wsError, (state, action) => {
        // state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
        const { total, totalToday, orders  } = action.payload;
        state.total = total;
        state.totalToday = totalToday;
        state.orders= orders;
    })
 }
});

export default feedSlice.reducer;