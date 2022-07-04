import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from './AuthenticationSlice'
import UserManagementReducer from './UserManagementSlice'

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    userManagement: UserManagementReducer
  },
})