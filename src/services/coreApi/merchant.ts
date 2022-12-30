import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'

export const merchantApi = createApi({
    reducerPath:'merchantApi', 
    tagTypes:['merchant'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://commerce-api.zerpacode.com/api/v1/dashboard',
        prepareHeaders: (headers, store) => {
            headers.set( 'Authorization', `Bearer ${(store.getState() as RootState).authSlice.token as string}`)
        },
    }),
    endpoints: (build) => ({
        getMerchant: build.query<any, void>({query:() => ({ url: `merchant`}), providesTags:['merchant']}),
        getClientCredentials: build.query<any, void>({query:() => ({ url: `merchant/client-credentials`}), providesTags:['merchant']}),
        updateMerchant: build.mutation<any, {productId:string, data:any}>({query:(data) => ({ url: `merchant`, method:'PATCH', body:data }), invalidatesTags:['merchant']}),
        deleteMerchant: build.mutation<any, string>({query:(productId) => ({ url: `merchant`, method:'DELETE' }), invalidatesTags:['merchant']}),
    }),
})

export const { useGetMerchantQuery, useGetClientCredentialsQuery, useUpdateMerchantMutation, useDeleteMerchantMutation } = merchantApi
