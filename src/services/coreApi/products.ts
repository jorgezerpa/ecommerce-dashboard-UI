import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'

export const productsApi = createApi({
    reducerPath:'productsApi', 
    tagTypes:['products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://commerce-api.zerpacode.com/api/v1/dashboard',
        prepareHeaders: (headers, store) => {
            headers.set( 'Authorization', `Bearer ${(store.getState() as RootState).authSlice.token as string}`)
        },
    }),
    endpoints: (build) => ({
        getProducts: build.query<any, void>({query:() => ({ url: `product`}), providesTags:['products']}),
        getProduct: build.query<any, string>({query:(productId) => ({ url: `product/${productId}`}), providesTags:['products']}),
        createProduct: build.mutation<any, void>({query:(data) => ({ url: `product`, method:'POST', body:data }), invalidatesTags:['products']}),
        updateProduct: build.mutation<any, {productId:string, data:any}>({query:({productId, data}) => ({ url: `product/${productId}`, method:'PATCH', body:data }), invalidatesTags:['products']}),
        deleteProduct: build.mutation<any, string>({query:(productId) => ({ url: `product/${productId}`, method:'DELETE' }), invalidatesTags:['products']}),
    }),
})

export const { useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi
