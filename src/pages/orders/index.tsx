import React from 'react'
import { useGetCategoriesQuery } from 'services/coreApi/categories'
import { useGetOrdersQuery } from 'services/coreApi/orders'
import { useRouter } from 'next/router'
import { Loader } from 'components/loaders/Loader'

const index = () => {
  const router = useRouter()
  const { data, isSuccess, isLoading} = useGetOrdersQuery()
  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-3'>Orders</div>
      <div className='p-3'>
                {/* HEADER  */}
            <div className='flex gap-2 bg-gradient-to-b from-gray-700 to-gray-800 text-white rounded-xl font-bold px-4 pt-4 pb-2 '>
                <div className='w-full'>id</div>
                <div className='w-full'>state</div>
                <div className='w-full'></div>
            </div>

        { isLoading && <div className='py-20 flex justify-center'><Loader /></div> }
        { isSuccess && data.data.orders.map((order:any)=>(
            <div key={`ordersList${order.id}`} className="">
              <div className='flex gap-2 border-b-3 border-gray-300 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>{order.id}</div>
                  <div className='w-full font-bold'>{order.state}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/orders/details/${order.id}`)}  className='px-5 py-1 rounded-xl bg-green-800 text-white'>see</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index