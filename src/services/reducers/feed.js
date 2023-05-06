import { createSlice } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/ws";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/feed'

const initialState = {
  connectionError: '',
  total: 0,
  totalToday: 0,
  orders: [],
  status: WebsocketStatus.OFFLINE
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
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
        state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
        const { total, totalToday, orders  } = action.payload;
        state.total = total;
        state.totalDay = totalToday;
        state.orders= orders;
    })
 }
});

export default feedSlice.reducer;