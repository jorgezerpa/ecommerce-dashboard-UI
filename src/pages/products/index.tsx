import React, { useEffect } from 'react'
import { useGetProductsQuery } from 'services/coreApi/products'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()
  const { data, isSuccess, refetch } = useGetProductsQuery()

  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-3'>Products</div>
      <div className='p-3'>
                {/* HEADER  */}
            <div className='flex gap-2 bg-gray-500 text-white font-bold px-2 py-5'>
                <div className='w-full'>name</div>
                <div className='w-full'>quantity</div>
                <div className='w-full'>price</div>
                <div className='w-full'>description</div>
                <div className='w-full'></div>
            </div>
        { isSuccess && data.data.products.map((product:any)=>(
            <div key={`productList${product.id}`} className="">
              <div className='flex gap-2 border-b-3 border-gray-300 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>{product.name}</div>
                  <div className='w-full font-bold'>{product.quantity}</div>
                  <div className='w-full font-bold'>{product.price}$</div>
                  <div className='w-full font-bold'>{product.description}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/products/edit/${product.id}`)}  className='px-3 py-2 rounded-xl bg-gray-400 text-white'>edit</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index