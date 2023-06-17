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
  resetPassword,
  changeLoading
} from "../actions/auth"
import { setCookie } from "../../utils/cookie";

interface IUserState {
  isAuthChecked: boolean;
  accessToken: string | null,
  isOldToken: boolean;
  isResetPassword: boolean;
  isSuccessPassword: boolean;
  user: IRegisterData | null;
  isSuccessRegister: boolean;
  isLoading: boolean;
}

export const initialState: IUserState = {
  isAuthChecked: false,
  accessToken: null,
  isOldToken: false,
  isResetPassword: false,
  isSuccessPassword: false,
  user: null,
  isSuccessRegister: false,
  isLoading: true,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeLoading, (state, action) => {
        state.isLoading = action.payload.state;
      })
      //login
      .addCase(loginUser.fulfilled, (state, action) => {
        const accessToken = String(action.payload.accessToken.split('Bearer ')[1]);
        const refreshToken = action.payload.refreshToken;
        setCookie('token', accessToken, {});
        window.localStorage.setItem('refreshToken', refreshToken);
        state.user = action.payload.user;
        state.accessToken = accessToken;
      })
      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        const accessToken = action.payload.accessToken.split('Bearer ')[1];
        const refreshToken = action.payload.refreshToken;
        setCookie('token', accessToken, {});
        window.localStorage.setItem('refreshToken', refreshToken);
        state.isSuccessRegister = true;
        state.accessToken = accessToken;
      })


      //get user
      .addCase(getInfoUser.pending, (state, action) => {

        state.isLoading = true;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false;

      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.isOldToken = true;
        state.isLoading = false;
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
        console.log('3');
      })

      .addCase(updateInfoUser.rejected, (state, action) => {
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

