import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    registerUser as regAsync,
    loginUser as loginAsync,
    logoutUser as logoutAsync,
    updateToken as tokenAsync,
    updateInfoUser as updateUser,
    getInfoUser as getUser
} from "../../utils/api";

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await regAsync(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await loginAsync(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await logoutAsync(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);

export const updateToken = createAsyncThunk(
    'auth/logout',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await tokenAsync(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);

export const updateInfoUser = createAsyncThunk(
    'auth/updateUser',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await updateUser(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);

export const getInfoUser = createAsyncThunk(
    'auth/getUser',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const res = await getUser(data);

        if (!res?.success) {
            return rejectWithValue(data)
        }

        return fulfillWithValue(res);
    }
);