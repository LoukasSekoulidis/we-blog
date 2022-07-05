import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from './AuthenticationSlice'
import UserManagementReducer from './UserManagementSlice'
import ForumManagementReducer from './ForumManagementSlice'

export const store = configureStore({
    reducer: {
        authentication: AuthenticationReducer,
        userManagement: UserManagementReducer,
        forumManagement: ForumManagementReducer
    },
})