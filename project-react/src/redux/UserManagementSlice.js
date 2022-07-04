import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUsers, createUser, updateUser, deleteUser, getUserByUserID } from '../api/userManagement-api'

export const getAllUsersAsync = createAsyncThunk(
    "userManagement/getAllUsersAsync",
    async (accessToken, { rejectWithValue }) => {
        const response = await getUsers(accessToken);

        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(data)
        }
    }
)

export const updateUserAsync = createAsyncThunk(
    "userManagement/updateUserAsync",
    async ({ accessToken, userID, userName, password, isAdministrator }, { rejectWithValue }) => {
        const response = await updateUser(accessToken, userID, userName, password, isAdministrator);
        const data = await response.json();

        if (response.ok) {
            return { data: data, userID: userID }
        } else {
            return rejectWithValue(data)
        }
    }
)

export const deleteUserAsync = createAsyncThunk(
    "userManagement/deleteUserAsync",
    async ({ accessToken, id }, { rejectWithValue }) => {
        const response = await deleteUser(accessToken, id);
        const data = await response.json()
        if (response.ok) {
            return { data: data, id: id }
        } else {
            return rejectWithValue(data)
        }
    }
)

export const createUserAsync = createAsyncThunk(
    "userManagement/createUserAsync",
    async ({ accessToken, userID, userName, password, isAdministrator }, { rejectWithValue }) => {
        const response = await createUser(accessToken, userID, userName, password, isAdministrator);
        const data = await response.json();

        console.log('Response: ', response)
        // console.data('data', data)

        if (response.ok) {
            return data
        } else {
            return rejectWithValue(data)
        }
    }
)

export const getCurrentUserAsync = createAsyncThunk(
    "userManagement/getCurrentUserAsync",
    async ({ accessToken, userID }, { rejectWithValue }) => {
        const response = await getUserByUserID(accessToken, userID);
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(response)
        }
    }
)

export const UserManagementSlice = createSlice({
    name: 'userManagement',
    initialState: {
        users: null,
        currentUser: null,
        showUserManagementDialog: false,
        showNewUserDialog: false,
        showUpdateUserDialog: false,
        pending: null,
        error: null,
    },
    reducers: {
        activateManagementDialog: (state) => {
            return {
                ...state,
                showUserManagementDialog: true,
                error: null
            }
        },
        hideManagementDialog: (state) => {
            return {
                ...state,
                showUserManagementDialog: false,
                error: null
            }
        },
        activateNewUserDialog: (state) => {
            console.log('Activate New User')
            return {
                ...state,
                showNewUserDialog: true,
                error: null
            }
        },
        hideNewUserDialog: (state) => {
            console.log('Hide New User')
            return {
                ...state,
                showNewUserDialog: false,
                error: null
            }
        },
        activateUpdateUserDialog: (state) => {
            return {
                ...state,
                showUpdateUserDialog: true,
                error: null
            }
        },
        hideUpdateUserDialog: (state) => {
            console.log('Hide Update User')
            return {
                ...state,
                showUpdateUserDialog: false,
                error: null
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get All Users
            .addCase(getAllUsersAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(getAllUsersAsync.fulfilled, (state, { payload }) => {
                console.log('Get All Users fulfilled')
                state.pending = false;
                state.users = payload
            })
            .addCase(getAllUsersAsync.rejected, (state, { payload }) => {
                console.log('Get All Users rejected')
                state.pending = false;
                state.error = payload.error;
            })
            // delete User
            .addCase(deleteUserAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(deleteUserAsync.fulfilled, (state, { payload }) => {
                console.log('Delete User fulfilled')
                state.pending = false;
            })
            .addCase(deleteUserAsync.rejected, (state, { payload }) => {
                console.log('Delete User rejected')
                state.pending = false;
                state.error = payload;
            })
            // createUser 
            .addCase(createUserAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(createUserAsync.fulfilled, (state, { payload }) => {
                console.log('Create User fulfilled')
                console.log(payload)
                console.log('Beffore: ', state.users)
                state.users = state.users.concat(payload)
                console.log('After:', state.users)
                state.pending = false;
            })
            .addCase(createUserAsync.rejected, (state, { payload }) => {
                console.log('Create User rejected')
                state.pending = false;
                state.error = payload.Error;
            })
            // get Current User
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, { payload }) => {
                console.log('get Current fulfilled')
                state.pending = false;
                state.currentUser = payload;
            })
            .addCase(getCurrentUserAsync.rejected, (state, { payload }) => {
                console.log('get Current rejected')
                state.pending = false;
                state.error = payload;
            })
            // updateUserAsync
            .addCase(updateUserAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(updateUserAsync.fulfilled, (state, { payload }) => {
                console.log('Update User fulfilled')
                state.pending = false;
                state.users = [...state.users]
                console.log('Payload Update User:', payload)
                // state.currentUser = payload;
            })
            .addCase(updateUserAsync.rejected, (state, { payload }) => {
                console.log('Update User rejected')
                state.pending = false;
                state.error = payload.Error;
            })
    }
});
export const { activateManagementDialog, hideManagementDialog, activateNewUserDialog, hideNewUserDialog, activateUpdateUserDialog, hideUpdateUserDialog } = UserManagementSlice.actions;

export const selectUsers = (state) => state.userManagement.users
export const selectCurrentUser = (state) => state.userManagement.currentUser
export const selectShowUserManagementDialog = (state) => state.userManagement.showUserManagementDialog
export const selectShowNewUserDialog = (state) => state.userManagement.showNewUserDialog
export const selectShowUpdateUserDialog = (state) => state.userManagement.showUpdateUserDialog
export const selectUserError = (state) => state.userManagement.error
export const selectUserPending = (state) => state.userManagement.pending

export default UserManagementSlice.reducer;