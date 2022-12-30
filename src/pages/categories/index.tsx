import React from 'react'
import { useGetProductsQuery } from 'services/coreApi/products'
import { useGetCategoriesQuery } from 'services/coreApi/categories'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()
  const { data, isSuccess } = useGetCategoriesQuery()
  console.log(data)
  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-3'>Categories</div>
      <div className='flex w-full justify-end py-2 px-3'>
        <div onClick={()=>router.push('/categories/create')} className='px-3 py-2 bg-gray-800 text-white font-bold  rounded-xl'>New Category</div>
      </div>
      <div className='p-3'>
                {/* HEADER  */}
            <div className='flex gap-2 bg-gray-500 text-white font-bold px-2 py-5'>
                <div className='w-full'>name</div>
                <div className='w-full'>description</div>
                <div className='w-full'></div>
            </div>
        { isSuccess && data.data.categories.map((categories:any)=>(
            <div key={`categoriesList${categories.id}`} className="">
              <div className='flex gap-2 border-b-3 border-gray-300 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>{categories.name}</div>
                  <div className='w-full font-bold'>{categories.description}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/categories/edit/${categories.id}`)}  className='px-3 py-2 rounded-xl bg-gray-400 text-white'>edit</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index