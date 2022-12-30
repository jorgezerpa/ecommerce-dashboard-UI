import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'

export const categoriesApi = createApi({
    reducerPath:'categoriesApi', 
    tagTypes:['categories'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://commerce-api.zerpacode.com/api/v1/dashboard',
        prepareHeaders: (headers, store) => {
            headers.set( 'Authorization', `Bearer ${(store.getState() as RootState).authSlice.token as string}`)
        },
    }),
    endpoints: (build) => ({
        getCategories: build.query<any, void>({query:() => ({ url: `category`}), providesTags:['categories']}),
        getCategory: build.query<any, string>({query:(categoryId) => ({ url: `category/${categoryId}`}), providesTags:['categories']}),
        createCategory: build.mutation<any, void>({query:(data) => ({ url: `category`, method:'POST', body:data }), invalidatesTags:['categories']}),
        updateCategory: build.mutation<any, {categoryId:string, data:any}>({query:({categoryId, data}) => ({ url: `category/${categoryId}`, method:'PATCH', body:data }), invalidatesTags:['categories']}),
        deleteCategory: build.mutation<any, string>({query:(categoryId) => ({ url: `category/${categoryId}`, method:'DELETE' }), invalidatesTags:['categories']}),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi
