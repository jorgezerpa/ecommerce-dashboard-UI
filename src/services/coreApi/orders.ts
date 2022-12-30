import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'

export const ordersApi = createApi({
    reducerPath:'ordersApi', 
    tagTypes:['orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://commerce-api.zerpacode.com/api/v1/dashboard',
        prepareHeaders: (headers, store) => {
            headers.set( 'Authorization', `Bearer ${(store.getState() as RootState).authSlice.token as string}`)
        },
    }),
    endpoints: (build) => ({
        getOrders: build.query<any, void>({query:() => ({ url: `orders`}), providesTags:['orders'],
            transformResponse: (response:any)=>{
                const orders:any[] = []
                response.data.orders.forEach((order:any)=>{
                    const parsedOrder = {...order, order:JSON.parse(order.order)}
                    orders.push(parsedOrder)
                })
                response.data.orders = orders
                return response
            }  
        }),
        getOrder: build.query<any, string>({query:(orderId) => ({ url: `orders/${orderId}`}), providesTags:['orders'],
            transformResponse: (response:any)=>{
                response.data.order.order = JSON.parse(response.data.order.order)
                return response
            }  
        }),
        deleteOrder: build.mutation<any, string>({query:(orderId) => ({ url: `orders/${orderId}`, method:'DELETE' }), invalidatesTags:['orders']}),
    }),
})

export const { useDeleteOrderMutation, useGetOrderQuery, useGetOrdersQuery } = ordersApi
