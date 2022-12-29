import React, { SyntheticEvent, useState } from 'react'
import { useForm } from 'hooks/useForm'
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from 'services/coreApi/products'
import { useRouter } from 'next/router'

const edit = () => {
    const router = useRouter()
    const { formRef, getFormInfo } = useForm()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, isSuccess } = useGetProductQuery(router.query.id as string)
    const [ updateProduct, result ] = useUpdateProductMutation()
    const [deleteProduct, deleteResult] = useDeleteProductMutation()

    const handleSubmit = async(e:SyntheticEvent) => {
        const [jsonData, formData] = getFormInfo(e)
        updateProduct({data:{...jsonData}, productId:router.query.id as string})
            .unwrap()
            .then(data=>console.log(data))
            .catch(error=>console.log(error))
    }

    const handleDeleteProduct = () => {
        deleteProduct(router.query.id as string)
            .then(()=>router.back())
    }

    return (
        <div className='px-5 pt-10'>
            <div onClick={()=>router.back()}>back</div>
            <h3 className='text-xl font-bold'>Create Product</h3>
            { isSuccess && (
                <>
                    <form onSubmit={handleSubmit} ref={formRef}  className={`w-full flex flex-col justify-center gap-4 py-5 px-3`}>
                        <input defaultValue={data.data.product.name} name='name' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='name'/>
                        <input defaultValue={data.data.product.description} name='description' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='description'/>
                        <input defaultValue={data.data.product.price} name='price' className='border-gray-300 border-2 rounded-xl w-full p-3' type="number" placeholder='price'/>
                        <input defaultValue={data.data.product.quantity} name='quantity' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='quantity'/>
                        <div>
                            <button type='submit' className='w-full bg-gray-500 text-lg text-white font-bold px-5 py-2 rounded-xl'>update</button>
                        </div>
                    </form>
                    <div onClick={()=>setShowDeleteModal(true)}>delete</div> 
                </>

            )}
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Product updated succesfully!</p>
            </div>

            { showDeleteModal && (
          <div className='absolute top-0 w-screen h-screen left-0 bg-[rgba(0,0,0,.3)] flex justify-center items-center'>
                <div className='bg-gray-200'>
                <p>are you really really sure?</p>
                <button onClick={handleDeleteProduct}>yep</button>
                </div>
            </div>
            )}


        </div>
    )
}

export default edit
