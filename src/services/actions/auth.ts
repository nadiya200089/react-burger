import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRegisterData, IUserData, ILogout, IUpdateToken, IForgotPassword, IResetPassword } from '../../types';

import {
    registerUser as regAsync,
    loginUser as loginAsync,
    logoutUser as logoutAsync,
    updateToken as tokenAsync,
    updateInfoUser as updateUser,
    getInfoUser as getUser,
    forgotPsw,
    resetPsw
} from "../../utils/api";

// type TRegisterThunk = {
//     extra: typeof regAsync;
// }
// type TLoginThunk = {
//     dispatch: AppDispatch;
//     extra: typeof loginAsync;
// }
// type TLogoutThunk = {
//     dispatch: AppDispatch;
//     extra: typeof logoutAsync;
// }
// type TUpdateTokenThunk = {
//     dispatch: AppDispatch;
//     extra: typeof tokenAsync;
// }
// type TUpdateInfoUserThunk = {
//     dispatch: AppDispatch;
//     extra: typeof updateUser;
// }
// type TGetInfoUserThunk = {
//     dispatch: AppDispatch;
//     extra: typeof getUser;
// }
// type TforgotPswThunk = {
//     dispatch: AppDispatch;
//     extra: typeof forgotPsw;
// }
// type TRsetPswThunk = {
//     dispatch: AppDispatch;
//     extra: typeof resetPsw;
// }

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (userdata: IRegisterData, { rejectWithValue, fulfillWithValue }) => {
        const res = await regAsync(userdata);

        if (!res?.success) {
            return rejectWithValue(userdata)
        }
        console.log(res);
        return fulfillWithValue(res);
        
    }

);


export const loginUser = createAsyncThunk(
    'auth/login',
    async (UserData: IUserData, { rejectWithValue, fulfillWithValue }) => {
        const res = await loginAsync(UserData);

        if (!res?.success) {
            return rejectWithValue(UserData)
        }

        return fulfillWithValue(res);
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (logout:ILogout, { rejectWithValue, fulfillWithValue }) => {
        const res = await logoutAsync(logout);

        if (!res?.success) {
            return rejectWithValue(logout)
        }

        return fulfillWithValue(res);
    }
);

export const updateToken = createAsyncThunk(
    'auth/updateToken',
    async (token: IUpdateToken, { rejectWithValue, fulfillWithValue }) => {
        const res = await tokenAsync(token);

        if (!res?.success) {
            return rejectWithValue(token)
        }

        return fulfillWithValue(res);
    }
);

export const updateInfoUser = createAsyncThunk(
    'auth/updateUser',
    async (user: IRegisterData, { rejectWithValue, fulfillWithValue }) => {
        const res = await updateUser(user);

        if (!res?.success) {
            return rejectWithValue(user)
        }

        return fulfillWithValue(res);
    }
);

export const getInfoUser = createAsyncThunk(
    'auth/getUser',
    async (user: IRegisterData, { rejectWithValue, fulfillWithValue }) => {
        const res = await getUser(user);

        if (!res?.success) {
            return rejectWithValue(user)
        }

        return fulfillWithValue(res);
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (psw: IForgotPassword, { rejectWithValue, fulfillWithValue }) => {
        const res = await forgotPsw(psw);

        if (!res?.success) {
            return rejectWithValue(psw)
        }

        return fulfillWithValue(res);
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (psw:IResetPassword, { rejectWithValue, fulfillWithValue }) => {
        const res = await resetPsw(psw);

        if (!res?.success) {
            return rejectWithValue(psw)
        }

        return fulfillWithValue(res);
    }
);