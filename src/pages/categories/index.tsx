import React from 'react'
import { useGetCategoriesQuery } from 'services/coreApi/categories'
import { useRouter } from 'next/router'
import { Loader } from 'components/loaders/Loader'

const index = () => {
  const router = useRouter()
  const { data, isSuccess, isLoading } = useGetCategoriesQuery()
  
  return (
    <div className=''>
      <div className='font-bold text-5xl mt-20 ml-4'>Categories</div>
      <div className='flex w-full justify-end py-2 px-3'>
        <div onClick={()=>router.push('/categories/create')} className='px-3 py-2 bg-gray-800 text-white font-bold  rounded-xl'>New Category</div>
      </div>
      <div className='p-3'>
                {/* HEADER  */}
            <div className='flex gap-2 bg-gradient-to-b from-gray-700 to-gray-800 text-white rounded-xl font-bold px-4 pt-4 pb-2'>
                <div className='w-full'>image</div>
                <div className='w-full'>name</div>
                <div className='w-full'>description</div>
                <div className='w-full'></div>
            </div>

        { isLoading && <div className='py-20 flex justify-center'><Loader /></div> }

        { (!isLoading && isSuccess) && data.data.categories.map((category:any)=>(
            <div key={`categoriesList${category.id}`} className="px-4">
              <div className='flex gap-2 border-b-3 border-gray-300 min-h-[90px] py-2 items-center'>
                  <div className='w-full font-bold'>
                    { category.image && <img src={category.image} alt="" width={80} />}
                  </div>
                  <div className='w-full font-bold'>{category.name}</div>
                  <div className='w-full font-bold'>{category.description}</div>
                  <div className='w-full font-bold flex gap-2'>
                    <button onClick={()=>router.push(`/categories/edit/${category.id}`)}  className='px-5 py-1 rounded-xl bg-green-800 text-white'>edit</button>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default index