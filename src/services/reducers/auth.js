import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../actions/auth";
const initialState = {
    isAuthChecked: false,
    accessToken: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            // state.accessToken = action.payload?.order?.number;
            debugger;
            state.isLoading = false;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
          });
        //console.log(data);
      },
});

export default authSlice.reducer;
