import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from '../services/coreApi/auth'
import { authSlice } from './authSlices/authSlice'

export const store = configureStore({
  reducer: {
    [authSlice.name]:authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
        .concat(authApi.middleware),  
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch