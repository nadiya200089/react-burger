import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser, 
  loginUser,
  logoutUser,
  updateToken, 
  updateInfoUser, 
  getInfoUser, 
  forgotPassword,
  resetPassword 
 } from "../actions/auth"
import { setCookie } from "../../utils/cookie";


const initialState = {
    isAuthChecked: false,
    accessToken: null,
    isOldToken: false,
    isResetPassword: false,
    isSuccessPassword: false,
    user: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
      builder
         //login
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
          const refreshToken = action.payload.refreshToken;
          setCookie('token', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          state.user = action.payload.user;
          state.accessToken = accessToken;
          state.isLoading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })

        //registration
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
          const refreshToken = action.payload.refreshToken;
          setCookie('token', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);

          state.accessToken = accessToken;
          state.isLoading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })
      
        //get user
        .addCase(getInfoUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getInfoUser.fulfilled, (state, action) => {
          state.user = action.payload.user
        })
        .addCase(getInfoUser.rejected, (state, action) => {
          state.isOldToken = true;
          state.error = action.payload;
          state.isLoading = false;
        })

        //refresh token 
        .addCase(updateToken.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateToken.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
            const refreshToken = action.payload.refreshToken;
            setCookie('token', accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);

            state.isOldToken = false;
            state.accessToken = accessToken;
            state.isLoading = false;
        })
        .addCase(updateToken.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })

        //logout
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          setCookie('token', '');
          window.localStorage.setItem('refreshToken', ''); //проверит когда будет готов компонент
          state.user = null;
          state.accessToken = '';
          state.isLoading = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })

        //update info user

        .addCase(updateInfoUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateInfoUser.fulfilled, (state, action) => {
          
          state.isLoading = false;
        })
        .addCase(updateInfoUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })
        // forgot password

        .addCase(forgotPassword.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
          state.isResetPassword = true;
          state.isLoading = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        })

        //reset password

        .addCase(resetPassword.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
          state.isResetPassword = false;
          state.isLoading = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.error = action.payload;
          state.isResetPassword = false;
          state.isLoading = false;
        })


    },
});

export default authSlice.reducer;

