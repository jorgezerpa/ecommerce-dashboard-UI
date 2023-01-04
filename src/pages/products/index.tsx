import React from 'react'
import Image from 'next/image'
import { useGetProductsQuery } from 'services/coreApi/products'
import { useRouter } from 'next/router'
import { Loader } from 'components/loaders/Loader'

const index = () => {
  const router = useRouter()
  const { data, isSuccess, isLoading } = useGetProductsQuery()
  
  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-4'>Products</div>
      <div className='flex w-full justify-end py-2 px-4'>
        <div onClick={()=>router.push('/products/create')} className='px-3 py-2 bg-gray-800 text-white font-bold  rounded-xl'>New Product</div>
      </div>
      <div className='p-3'>
                {/* HEADER  */}
        <div className='flex gap-2 bg-gradient-to-b from-gray-700 to-gray-800 text-white rounded-xl font-bold px-4 pt-4 pb-2 '>
            <div className='w-full'>image</div>
            <div className='w-full'>name</div>
            <div className='w-full'>quantity</div>
            <div className='w-full'>price</div>
            <div className='w-full'>description</div>
            <div className='w-full'></div>
        </div>

        { isLoading && <div className='py-20 flex justify-center'><Loader /></div> }

        { (!isLoading && isSuccess) && data.data.products.map((product:any)=>(
            <div key={`productList${product.id}`} className="px-4">
              <div className='flex gap-2 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>
                    { product.image && <img src={product.image} alt="" width={80} className="rounded-xl"/>}
                  </div>
                  <div className='w-full font-bold'>{product.name}</div>
                  <div className='w-full font-bold'>{product.quantity}</div>
                  <div className='w-full font-bold'>{product.price}$</div>
                  <div className='w-full font-bold'>{product.description}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/products/edit/${product.id}`)}  className='px-5 py-1 rounded-xl bg-green-800 text-white'>edit</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index