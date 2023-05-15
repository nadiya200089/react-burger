import { createSlice } from "@reduxjs/toolkit";
import { IRegisterData } from '../../types';

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

interface IUserState {
  isAuthChecked: boolean;
    accessToken: string | null,
    isOldToken: boolean;
    isResetPassword: boolean;
    isSuccessPassword: boolean;
    user: IRegisterData | null;
    isSuccessRegister: boolean
}

const initialState: IUserState = {
    isAuthChecked: false,
    accessToken: null,
    isOldToken: false,
    isResetPassword: false,
    isSuccessPassword: false,
    user: null, 
    isSuccessRegister: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
         //login
        .addCase(loginUser.fulfilled, (state, action) => {
          debugger;
          const accessToken = String(action.payload.accessToken.split('Bearer ')[1]);
          const refreshToken = action.payload.refreshToken;
          setCookie('token', accessToken,  {});
          window.localStorage.setItem('refreshToken', refreshToken);
          state.user = action.payload.user;
          state.accessToken = accessToken;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
          const refreshToken = action.payload.refreshToken;
          setCookie('token', accessToken, {});
          window.localStorage.setItem('refreshToken', refreshToken);
          state.isSuccessRegister = true;
          state.accessToken = accessToken;
        })

      
        //get user
        .addCase(getInfoUser.fulfilled, (state, action) => {
          state.user = action.payload.user
        })
        .addCase(getInfoUser.rejected, (state, action) => {
          state.isOldToken = true;
        })

        //refresh token 
        .addCase(updateToken.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
            const refreshToken = action.payload.refreshToken;
            setCookie('token', accessToken, {});
            window.localStorage.setItem('refreshToken', refreshToken);

            state.isOldToken = false;
            state.accessToken = accessToken;
        })
      

        //logout
       
        .addCase(logoutUser.fulfilled, (state, action) => {
          setCookie('token', '', {});
          window.localStorage.setItem('refreshToken', ''); //проверит когда будет готов компонент
          state.user = null;
          state.accessToken = '';
        })
      
        //update info user
        .addCase(updateInfoUser.fulfilled, (state, action) => {
          debugger;
          console.log('3');
         })

          .addCase(updateInfoUser.rejected, (state, action) => {
            debugger;
            console.log('3');
          })
        // forgot password

       
        .addCase(forgotPassword.fulfilled, (state, action) => {
          state.isResetPassword = true;
        })
      

        //reset password

        .addCase(resetPassword.fulfilled, (state, action) => {
          state.isResetPassword = false;
          state.isSuccessPassword = true;
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.isResetPassword = false;
        })


    },
});

export default authSlice.reducer;

