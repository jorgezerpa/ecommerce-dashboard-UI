import React, { SyntheticEvent, useRef } from 'react'
import { useForm } from 'hooks/useForm'
import { useCreateCategoryMutation } from 'services/coreApi/categories'
import { BaseButton, BaseInput } from './../../components/form'
import { BackButton } from 'components/BackButton'
import useToBase64 from 'hooks/useToBase64'

const create = () => {
    const { formRef, getFormInfo } = useForm()
    const [ createCategory, result ] = useCreateCategoryMutation()
    const {imageRef, toBase64} = useToBase64()

    const handleSubmit = async(e:SyntheticEvent) => {
        if(imageRef.current){
            const [jsonData, formData] = getFormInfo(e)
            const image = await toBase64()
            createCategory({...jsonData, image })
        }
    }

    return (
        <div className='px-5 pt-10'>
            <BackButton />
            <h3 className='text-xl font-bold'>Create Category</h3>
            <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
                <BaseInput name='name' type="text" placeholder='name'/>
                <BaseInput name='description' type="text" placeholder='description'/>
                <input type='file' name='image' ref={imageRef} />
                <div>
                    <BaseButton label='create' />
                </div>
            </form> 
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Category created succesfully!</p>
            </div>
        </div>
    )
}

export default create