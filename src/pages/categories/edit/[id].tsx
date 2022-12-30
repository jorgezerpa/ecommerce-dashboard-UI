import React, { SyntheticEvent, useState } from 'react'
import { useForm } from 'hooks/useForm'
import { useGetCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from 'services/coreApi/categories'
import { useRouter } from 'next/router'
import { BaseButton, BaseInput } from '../../../components/form'
import { BackButton } from 'components/BackButton'
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal'
import useToBase64 from 'hooks/useToBase64'

const edit = () => {
    const router = useRouter()
    const { formRef, getFormInfo } = useForm()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, isSuccess } = useGetCategoryQuery(router.query.id as string)
    const [ updateCategory, result ] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const { imageRef,toBase64 } = useToBase64()

    const handleSubmit = async(e:SyntheticEvent) => {
        const [jsonData] = getFormInfo(e)
        delete jsonData.image
        if(imageRef.current && imageRef.current.files && imageRef.current.files.length>0){ //just in case a new image is provided
            const image64 = await toBase64()
            jsonData.image=image64
        }
        updateCategory({data:{...jsonData}, categoryId:router.query.id as string})
    }

    const handleDeleteCategory = () => {
        deleteCategory(router.query.id as string)
            .then(()=>router.back())
    }

    const toggleDeleteModal = () => { setShowDeleteModal(!showDeleteModal) }

    return (
        <div className='px-5 pt-10'>
            <BackButton />
            <h3 className='text-xl font-bold'>Update Product</h3>
            { isSuccess && (
                <>
                    <form onSubmit={handleSubmit} ref={formRef}  className={`w-full flex flex-col justify-center gap-4 py-5 px-3`}>
                        <BaseInput defaultValue={data.data.category.name} name='name' type="text" placeholder='name'/>
                        <BaseInput defaultValue={data.data.category.description} name='description' type="text" placeholder='description'/>
                        <input type='file' name='image' ref={imageRef} />
                        <div>
                            <BaseButton label='update' />
                        </div>
                    </form>
                    <div onClick={()=>setShowDeleteModal(true)}>delete</div> 
                </>

            )}
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>category updated succesfully!</p>
            </div>

            <ConfirmDeleteModal 
            handler={handleDeleteCategory} 
            showModal={showDeleteModal} 
            toggleModal={toggleDeleteModal}
            buttonLabel='delete'
            message='are you sure do you want to delete this category?' 
            />
        </div>
    )
}

export default edit
