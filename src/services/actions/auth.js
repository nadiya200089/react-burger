import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser as regAsync } from "../../utils/api";

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (data, { rejectWithValue, fulfillWithValue,   }) => {
        const res = await regAsync(data);
        console.log('responce', res);
        if (!res?.success) {
            return rejectWithValue(data)
        }
        // setCookie('accessToken', data.accessToken, { 'max-age': 1000 });
        // setCookie('refreshToken', data.refreshToken)
        // localStorage.setItem('refreshToken', data.refreshToken);

        // return data.user;
        return fulfillWithValue(res);
    }
);