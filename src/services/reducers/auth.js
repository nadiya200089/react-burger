import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, updateToken, updateInfoUser, getInfoUser } from "../actions/auth"
import { setCookie } from "../../utils/cookie";
const initialState = {
    isAuthChecked: false,
    accessToken: null,
    user: null
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
          });
      },
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
          const refreshToken = action.payload.refreshToken;
          setCookie('token', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);

          state.accessToken = accessToken;
          state.isLoading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    },
});

export const logoutSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          setCookie('token', '');
          window.localStorage.setItem('refreshToken', ''); //проверит когда будет готов компонент
          state.accessToken = '';
          state.isLoading = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    },
});

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(updateToken.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateToken.fulfilled, (state, action) => {
          const accessToken = action.payload.accessToken.split('Bearer ')[1];
            const refreshToken = action.payload.refreshToken;
            setCookie('token', accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);

            state.accessToken = accessToken;
            state.isLoading = false;
        })
        .addCase(updateToken.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    },
});

export const userSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(updateInfoUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateInfoUser.fulfilled, (state, action) => {
          // посмотреть что вернется
        })
        .addCase(updateInfoUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    },
});

export const gaeUserSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
      builder
        .addCase(getInfoUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getInfoUser.fulfilled, (state, action) => {
          state.user = action.payload.user
        })
        .addCase(getInfoUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        });
    },
});

export default authSlice.reducer;
