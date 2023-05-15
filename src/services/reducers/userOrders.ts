import { createSlice } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/ws";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/userOrders'
import { IWebsocketOrders } from '../../types'



const initialState: TInitialState= {
  connectionError: '',
  total: 0,
  totalToday: 0,
  orders: [],
  status: WebsocketStatus.OFFLINE
};

type TInitialState = {
  connectionError: string;
  total: number;
  totalToday: number;
  orders: IWebsocketOrders[];
  status: string;
}

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: initialState,
  reducers: {
    // wsMessage: (state => {
    //     debugger;
    // })
  },
  extraReducers: (builder) => {
    builder
    .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
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

export default userOrdersSlice.reducer;