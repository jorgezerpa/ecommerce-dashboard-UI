import React, { SyntheticEvent, useState } from 'react'
import { useForm } from 'hooks/useForm'
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from 'services/coreApi/products'
import { useRouter } from 'next/router'
import { BaseButton, BaseInput } from '../../../components/form'
import { BackButton } from 'components/BackButton'
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal'
import useToBase64 from 'hooks/useToBase64'
import { Loader } from 'components/loaders/Loader'
import { FcAddImage } from 'react-icons/fc'

const edit = () => {
    const router = useRouter()
    const { formRef, getFormInfo } = useForm()
    const [isImageSelected, setIsImageSelected] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, isSuccess, isLoading } = useGetProductQuery(router.query.id as string)
    const [ updateProduct, result ] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const { imageRef,toBase64 } = useToBase64()

    const handleSubmit = async(e:SyntheticEvent) => {
        const [jsonData] = getFormInfo(e)
        delete jsonData.image
        if(imageRef.current && imageRef.current.files && imageRef.current.files.length>0){ //just in case a new image is provided
            const image64 = await toBase64()
            jsonData.image=image64
        }
        updateProduct({data:{...jsonData}, productId:router.query.id as string})
    }

    const handleDeleteProduct = () => {
        deleteProduct(router.query.id as string)
            .then(()=>router.back())
    }

    const toggleDeleteModal = (value:boolean|null) => { setShowDeleteModal(!showDeleteModal) }

    return (
        <div className='px-5 pt-10'>
            <BackButton />
            <h3 className='text-3xl font-bold pl-3'>Update Product</h3>
            { isLoading && <div className='flex justify-center py-20'><Loader /></div> }
            { isSuccess && (
                <>
                    <form onSubmit={handleSubmit} ref={formRef}  className={`w-full flex flex-col justify-center gap-4 py-5 px-3`}>
                        <BaseInput defaultValue={data.data.product.name} name='name' type="text" placeholder='name'/>
                        <BaseInput defaultValue={data.data.product.description} name='description' type="text" placeholder='description'/>
                        <BaseInput defaultValue={data.data.product.price} name='price' type="number" placeholder='price'/>
                        <BaseInput defaultValue={data.data.product.quantity} name='quantity' type="text" placeholder='quantity'/>
                        <label htmlFor="image" className='relative'>
                            <FcAddImage size={100} />
                            { isImageSelected && <div className='absolute top-0 left-0 bg-green-500 rounded-full w-4 h-4'></div> }
                        </label>
                        <input onChange={()=>setIsImageSelected(true)} id='image' type='file' name='image' ref={imageRef} className='hidden' />

                        <div>
                            { !result.isLoading && <BaseButton label='create' />} 
                            { result.isLoading && <div className='flex justify-center pt-2'><Loader /></div> }
                        </div>
                    </form>
                </>

            )}
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Product updated succesfully!</p>
            </div>

            <div className='flex justify-end py-4'>
                <div onClick={()=>setShowDeleteModal(true)} className='font-bold px-4 py-1 bg-red-800 rounded-xl text-white'>
                    delete
                </div> 
            </div>

            <ConfirmDeleteModal 
            handler={handleDeleteProduct} 
            showModal={showDeleteModal} 
            toggleModal={toggleDeleteModal}
            buttonLabel='delete'
            message='are you sure do you want to delete the product?' 
            />
        </div>
    )
}

export default edit
