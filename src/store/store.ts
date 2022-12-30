import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from '../services/coreApi/auth'
import { productsApi } from 'services/coreApi/products'
import { authSlice } from './authSlices/authSlice'
import { categoriesApi } from 'services/coreApi/categories'
import { merchantApi } from 'services/coreApi/merchant'
import { ordersApi } from 'services/coreApi/orders'

export const store = configureStore({
  reducer: {
    [authSlice.name]:authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [merchantApi.reducerPath]: merchantApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(productsApi.middleware)  
        .concat(categoriesApi.middleware)  
        .concat(merchantApi.middleware)  
        .concat(ordersApi.middleware),  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
