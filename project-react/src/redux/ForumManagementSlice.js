import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getForumThreads, createForumThread, deleteForumThread, updateForumThread, getMessagesOfForumThread } from '../api/forumthread-api'
import { createForumMessage, deleteForumMessage, updateForumMessage } from '../api/forumMessage-api'



export const getAllForumThreadsAsync = createAsyncThunk(
    "forumManagement/getAllForumThreadsAsync",
    async (accessToken, { rejectWithValue }) => {
        const response = await getForumThreads();

        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(data)
        }
    }
)

export const createForumThreadAsync = createAsyncThunk(
    "forumManagement/createForumThreadAsync",
    async ({ accessToken, name, description }, { rejectWithValue }) => {
        const response = await createForumThread(accessToken, name, description);
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(data)
        }
    }
)

export const deleteForumThreadAsync = createAsyncThunk(
    "forumManagement/deleteForumThreadAsync",
    async ({ accessToken, forumThreadID }, { rejectWithValue }) => {
        const response = await deleteForumThread(accessToken, forumThreadID);
        console.log(response)
        if (response.ok) {
            return
        } else {
            return rejectWithValue(response)
        }
    }
)

export const updateForumThreadAsync = createAsyncThunk(
    "forumManagement/updateForumThreadAsync",
    async ({ accessToken, forumThreadID, name, description }, { rejectWithValue }) => {
        const response = await updateForumThread(accessToken, forumThreadID, name, description);
        console.log(response)
        if (response.ok) {
            return
        } else {
            return rejectWithValue(response)
        }
    }
)

export const getMessagesOfForumThreadAsync = createAsyncThunk(
    "forumManagement/getMessagesOfForumThreadAsync",
    async ({ accessToken, forumThreadID }, { rejectWithValue }) => {
        const response = await getMessagesOfForumThread(accessToken, forumThreadID);
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(response)
        }
    }
)

export const createForumMessageAsync = createAsyncThunk(
    "forumManagement/createForumMessageAsync",
    async ({ accessToken, forumThreadID, title, text }, { rejectWithValue }) => {
        const response = await createForumMessage(accessToken, forumThreadID, title, text);
        const data = await response.json()
        console.log('Create new Message: ', data)
        if (response.ok) {
            return data
        } else {
            return rejectWithValue(response)
        }
    }
)

export const deleteForumMessageAsync = createAsyncThunk(
    "forumManagement/deleteForumMessageAsync",
    async ({ accessToken, forumMessageID }, { rejectWithValue }) => {
        const response = await deleteForumMessage(accessToken, forumMessageID);
        console.log(response)
        if (response.ok) {
            return
        } else {
            return rejectWithValue(response)
        }
    }
)


export const updateForumMessageAsync = createAsyncThunk(
    "forumManagement/updateForumMessageAsync",
    async ({ accessToken, forumMessageID, title, text }, { rejectWithValue }) => {
        const response = await updateForumMessage(accessToken, forumMessageID, title, text);
        console.log(response)
        if (response.ok) {
            return
        } else {
            return rejectWithValue(response)
        }
    }
)

export const ForumManagementSlice = createSlice({
    name: 'forumManagement',
    initialState: {
        forums: null,
        currentForum: null,
        forumMessages: null,

        pending: null,
        deletePending: null,
        editPending: null,
        createMessagePending: null,

        error: null,

        showForumManagement: false,
        showForumDetail: false

    },
    reducers: {
        openForumManagement: (state) => {
            return {
                ...state,
                showForumManagement: true,
                error: null
            }
        },
        hideForumManagement: (state) => {
            return {
                ...state,
                showForumManagement: false,
                error: null
            }
        },
        openForumDetail: (state) => {
            return {
                ...state,
                showForumDetail: true,
                error: null
            }
        },
        hideForumDetail: (state) => {
            return {
                ...state,
                showForumDetail: false,
                error: null
            }
        },
        setCurrentForum: (state, { payload }) => {
            return {
                ...state,
                currentForum: payload,
                error: null
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllForumThreadsAsync.pending, (state) => {
                state.pending = true
            })
            .addCase(getAllForumThreadsAsync.fulfilled, (state, { payload }) => {
                // console.log('FULFILLED Xtra Reducer get All Forum')
                state.pending = false
                state.forums = payload
            })
            .addCase(getAllForumThreadsAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer get All Forum')
                state.pending = false
                state.error = payload.error
            })
            // create Forum Thread
            .addCase(createForumThreadAsync.pending, (state) => {
                state.pending = true
            })
            .addCase(createForumThreadAsync.fulfilled, (state, { payload }) => {
                // console.log('FULFILLED Xtra Reducer Create Forum')
                state.pending = false
                state.forums = state.forums.concat(payload)
                state.error = null;
            })
            .addCase(createForumThreadAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Create Forum')
                state.pending = false
                state.error = payload.Error
            })
            // deleteForumThreadAsync
            .addCase(deleteForumThreadAsync.pending, (state) => {
                state.deletePending = true
            })
            .addCase(deleteForumThreadAsync.fulfilled, (state) => {
                // console.log('FULFILLED Xtra Reducer Delete Forum')
                state.deletePending = false
                state.error = null;
            })
            .addCase(deleteForumThreadAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Delete Forum')
                state.deletePending = false
                console.log(payload.error)
                state.error = payload.Error
            })
            // updateForumThreadAsync
            .addCase(updateForumThreadAsync.pending, (state) => {
                state.editPending = true
            })
            .addCase(updateForumThreadAsync.fulfilled, (state) => {
                // console.log('FULFILLED Xtra Reducer Update Forum')
                state.editPending = false
                state.error = null;
            })
            .addCase(updateForumThreadAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Update Forum')
                state.editPending = false
                console.log(payload.error)
                state.error = payload.Error
            })
            // getMessagesOfForumThreadAsync
            .addCase(getMessagesOfForumThreadAsync.pending, (state) => {
                state.pending = true
            })
            .addCase(getMessagesOfForumThreadAsync.fulfilled, (state, { payload }) => {
                // console.log('FULFILLED Xtra Reducer Messages')
                state.pending = false
                state.error = null;
                state.forumMessages = payload
            })
            .addCase(getMessagesOfForumThreadAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Messages')
                state.pending = false
                state.error = payload.Error
            })
            // createForumMessageAsync
            .addCase(createForumMessageAsync.pending, (state) => {
                state.pending = true
                state.createMessagePending = true
            })
            .addCase(createForumMessageAsync.fulfilled, (state) => {
                // console.log('FULFILLED Xtra Reducer Messages')
                state.pending = false
                state.error = null;
                state.createMessagePending = false
            })
            .addCase(createForumMessageAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Messages')
                state.pending = false
                state.error = payload.Error
                state.createMessagePending = false
            })
            // deleteForumMessageAsync
            .addCase(deleteForumMessageAsync.pending, (state) => {
                state.pending = true
                state.createMessagePending = true
            })
            .addCase(deleteForumMessageAsync.fulfilled, (state) => {
                // console.log('FULFILLED Xtra Reducer Messages')
                state.pending = false
                state.error = null;
                state.createMessagePending = false
            })
            .addCase(deleteForumMessageAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Messages')
                state.pending = false
                state.error = payload.Error
                state.createMessagePending = false
            })
            // updateForumMessageAsync
            .addCase(updateForumMessageAsync.pending, (state) => {
                state.pending = true
                state.createMessagePending = true
            })
            .addCase(updateForumMessageAsync.fulfilled, (state) => {
                // console.log('FULFILLED Xtra Reducer Messages')
                state.pending = false
                state.error = null;
                state.createMessagePending = false
            })
            .addCase(updateForumMessageAsync.rejected, (state, { payload }) => {
                // console.log('REJECTED Xtra Reducer Messages')
                state.pending = false
                state.error = payload.Error
                state.createMessagePending = false
            })
    }
})

export const { openForumManagement, hideForumManagement, openForumDetail, hideForumDetailm, setCurrentForum } = ForumManagementSlice.actions;


export const selectForums = (state) => state.forumManagement.forums
export const selectForumMessages = (state) => state.forumManagement.forumMessages
export const selectCurrentForum = (state) => state.forumManagement.currentForum


export const selectForumError = (state) => state.forumManagement.error

export const selectPending = (state) => state.forumManagement.pending
export const selectDeletePending = (state) => state.forumManagement.deletePending
export const selectEditPending = (state) => state.forumManagement.editPending
export const selectCreateMessagePending = (state) => state.forumManagement.createMessagePending


export const selectShowForumManagement = (state) => state.forumManagement.showForumManagement
export const selectShowForumDetail = (state) => state.forumManagement.showForumDetail




export default ForumManagementSlice.reducer;
