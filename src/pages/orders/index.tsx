import React from 'react'
import { useGetCategoriesQuery } from 'services/coreApi/categories'
import { useGetOrdersQuery } from 'services/coreApi/orders'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()
  const { data, isSuccess } = useGetOrdersQuery()
  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-3'>Orders</div>
      <div className='p-3'>
                {/* HEADER  */}
            <div className='flex gap-2 bg-gray-500 text-white font-bold px-2 py-5'>
                <div className='w-full'>id</div>
                <div className='w-full'>state</div>
                <div className='w-full'></div>
            </div>
        { isSuccess && data.data.orders.map((order:any)=>(
            <div key={`ordersList${order.id}`} className="">
              <div className='flex gap-2 border-b-3 border-gray-300 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>{order.id}</div>
                  <div className='w-full font-bold'>{order.state}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/orders/details/${order.id}`)}  className='px-3 py-2 rounded-xl bg-gray-400 text-white'>see</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index