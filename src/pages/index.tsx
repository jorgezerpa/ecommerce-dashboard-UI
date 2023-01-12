import React from 'react'
import { useGetQuoteQuery } from 'services/quotel/quotes'
import { Loader } from 'components/loaders/Loader'

const index = () => {
    const { data, isSuccess, refetch, isFetching } = useGetQuoteQuery()
    console.log(data)

    return (
      <div className='flex gap-5 flex-col h-screen w-full justify-center items-center'>
        { isFetching && <Loader /> }
        { (isSuccess && !isFetching) && (
          <div className='font-semibold text-md  max-w-[400px]'>
            { data.quote }
          </div>
        ) }
        <button onClick={()=>refetch()} className='px-5 py-2 font-bold bg-blue-700 text-white rounded-xl hover:bg-blue-900 hover:scale-95'>get new quote</button>
      </div>
    )
}

export default index