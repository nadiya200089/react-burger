import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store'
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

type TRegisterThunk = {
    extra: typeof regAsync;
}
type TLoginThunk = {
    dispatch: AppDispatch;
    extra: typeof loginAsync;
}
type TLogoutThunk = {
    dispatch: AppDispatch;
    extra: typeof logoutAsync;
}
type TUpdateTokenThunk = {
    dispatch: AppDispatch;
    extra: typeof tokenAsync;
}
type TUpdateInfoUserThunk = {
    dispatch: AppDispatch;
    extra: typeof updateUser;
}
type TGetInfoUserThunk = {
    dispatch: AppDispatch;
    extra: typeof getUser;
}
type TforgotPswThunk = {
    dispatch: AppDispatch;
    extra: typeof forgotPsw;
}
type TRsetPswThunk = {
    dispatch: AppDispatch;
    extra: typeof resetPsw;
}



export const registerUser = createAsyncThunk<IUserData, IRegisterData, TRegisterThunk>(
    '/auth/register',
    async (userdata, { rejectWithValue, fulfillWithValue }) => {
        const res = await regAsync(userdata);

        if (!res?.success) {
            return rejectWithValue(userdata)
        }
        console.log(res);
        return fulfillWithValue(res);
        
    }

);


export const loginUser = createAsyncThunk<IUserData, IUserData, TLoginThunk>(
    'auth/login',
    async (IUserData, { rejectWithValue, fulfillWithValue }) => {
        const res = await loginAsync(IUserData);

        if (!res?.success) {
            return rejectWithValue(IUserData)
        }

        return fulfillWithValue(res);
    }
);

export const logoutUser = createAsyncThunk<IUserData, ILogout, TLogoutThunk>(
    'auth/logout',
    async (ILogout, { rejectWithValue, fulfillWithValue }) => {
        const res = await logoutAsync(ILogout);

        if (!res?.success) {
            return rejectWithValue(ILogout)
        }

        return fulfillWithValue(res);
    }
);

export const updateToken = createAsyncThunk<any, IUpdateToken, TUpdateTokenThunk>(
    'auth/updateToken',
    async (IUpdateToken, { rejectWithValue, fulfillWithValue }) => {
        const res = await tokenAsync(IUpdateToken);

        if (!res?.success) {
            return rejectWithValue(IUpdateToken)
        }

        return fulfillWithValue(res);
    }
);

export const updateInfoUser = createAsyncThunk<any, IUserData, TUpdateInfoUserThunk>(
    'auth/updateUser',
    async (IUserData, { rejectWithValue, fulfillWithValue }) => {
        const res = await updateUser(IUserData);

        if (!res?.success) {
            return rejectWithValue(IUserData)
        }

        return fulfillWithValue(res);
    }
);

export const getInfoUser = createAsyncThunk<any, IRegisterData, TGetInfoUserThunk>(
    'auth/getUser',
    async (IRegisterData, { rejectWithValue, fulfillWithValue }) => {
        const res = await getUser(IRegisterData);

        if (!res?.success) {
            return rejectWithValue(IRegisterData)
        }

        return fulfillWithValue(res);
    }
);

export const forgotPassword = createAsyncThunk<any, IRegisterData, TforgotPswThunk>(
    'auth/forgotPassword',
    async (IForgotPassword, { rejectWithValue, fulfillWithValue }) => {
        const res = await forgotPsw(IForgotPassword);

        if (!res?.success) {
            return rejectWithValue(IForgotPassword)
        }

        return fulfillWithValue(res);
    }
);

export const resetPassword = createAsyncThunk<any, IResetPassword, TRsetPswThunk>(
    'auth/resetPassword',
    async (IResetPassword, { rejectWithValue, fulfillWithValue }) => {
        const res = await resetPsw(IResetPassword);

        if (!res?.success) {
            return rejectWithValue(IResetPassword)
        }

        return fulfillWithValue(res);
    }
);