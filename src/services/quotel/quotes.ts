import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'

export const quotesApi = createApi({
    reducerPath:'quotesApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://quotel-quotes.p.rapidapi.com',
        prepareHeaders: (headers, store) => {
            headers.set( 'content-type', `application/json`)
            headers.set( 'X-RapidAPI-Key', `c448da5249msh0c0cd058b531996p13835cjsnd44b48a1777f`)
            headers.set( 'X-RapidAPI-Host', `quotel-quotes.p.rapidapi.com`)
        },
    }),
    endpoints: (build) => ({
        getQuote: build.query<any, void>({query:() => ({ method:'POST', body: {}, url: `/quotes/random`})}),
    }),
})

export const { useGetQuoteQuery } = quotesApi
