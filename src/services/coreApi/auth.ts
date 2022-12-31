import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://commerce-api.zerpacode.com/api/v1/'}),
    endpoints: (build) => ({
        login: build.mutation({ query: (data) => ({ url: `dashboard/auth/login`, method: 'POST', body: data, }) }),
        refresh: build.mutation({ query: (data:{refreshToken:string}) => ({ 
            url: `dashboard/auth/refresh`, 
            method: 'POST', 
            body: data,
        }) }),
    }),
})

export const { useLoginMutation, useRefreshMutation } = authApi
