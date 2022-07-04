import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { login } from '../api/authentication-api'

export const getUserSession = createAsyncThunk(
    "authentication/getUserSession", async ({ username, password }, thunkAPI) => {

        const response = await login(username, password)
        const data = await response.json()
        if (response.ok) {
            const token = response.headers.get('Authorization');
            return { token: token, user: username, }
        } else {
            return thunkAPI.rejectWithValue(data)
        }
    }
)

export const AuthenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null,
        pending: false,
        showLoginDialog: false,
        error: null,
        accessToken: null
    },
    reducers: {
        activateLoginDialog: (state) => {
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        },
        hideLoginDialog: (state) => {
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        },
        logout: (state) => {
            return {
                ...state,
                user: null,
                pending: false,
                showLoginDialog: false,
                error: null,
                accessToken: null
            }
        }
    },
    extraReducers: {
        [getUserSession.pending]: (state, action) => {
            state.pending = true
        },
        [getUserSession.fulfilled]: (state, { payload }) => {
            //   console.log('fulfilled')
            console.log(payload)
            state.pending = false
            state.showLoginDialog = false
            state.error = null
            state.accessToken = payload.token
            state.user = payload.username;
        },
        [getUserSession.rejected]: (state, { payload }) => {
            //   console.log('rejected')
            state.pending = false
            state.error = payload.Error
        }
    }
});

export const { activateLoginDialog, hideLoginDialog, logout } = AuthenticationSlice.actions;

export const selectAccessToken = (state) => state.authentication.accessToken
export const selectShowLoginDialog = (state) => state.authentication.showLoginDialog
export const selectError = (state) => state.authentication.error
export const selectUser = (state) => state.authentication.user

export default AuthenticationSlice.reducer;