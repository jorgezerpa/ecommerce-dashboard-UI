import React, { SyntheticEvent, useState } from 'react'
import { useForm } from 'hooks/useForm'
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from 'services/coreApi/products'
import { useRouter } from 'next/router'
import { BaseButton, BaseInput } from '../../../components/form'
import { BackButton } from 'components/BackButton'

const edit = () => {
    const router = useRouter()
    const { formRef, getFormInfo } = useForm()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, isSuccess } = useGetProductQuery(router.query.id as string)
    const [ updateProduct, result ] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const handleSubmit = async(e:SyntheticEvent) => {
        const [jsonData] = getFormInfo(e)
        updateProduct({data:{...jsonData}, productId:router.query.id as string})
    }

    const handleDeleteProduct = () => {
        deleteProduct(router.query.id as string)
            .then(()=>router.back())
    }

    return (
        <div className='px-5 pt-10'>
            <BackButton />
            <h3 className='text-xl font-bold'>Update Product</h3>
            { isSuccess && (
                <>
                    <form onSubmit={handleSubmit} ref={formRef}  className={`w-full flex flex-col justify-center gap-4 py-5 px-3`}>
                        <BaseInput defaultValue={data.data.product.name} name='name' type="text" placeholder='name'/>
                        <BaseInput defaultValue={data.data.product.description} name='description' type="text" placeholder='description'/>
                        <BaseInput defaultValue={data.data.product.price} name='price' type="number" placeholder='price'/>
                        <BaseInput defaultValue={data.data.product.quantity} name='quantity' type="text" placeholder='quantity'/>
                        <div>
                            <BaseButton label='update' />
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
