import React, { SyntheticEvent, useState } from 'react'
import { useForm } from 'hooks/useForm'
import { useCreateCategoryMutation } from 'services/coreApi/categories'
import { BaseButton, BaseInput } from './../../components/form'
import { BackButton } from 'components/BackButton'
import useToBase64 from 'hooks/useToBase64'
import { FcAddImage } from 'react-icons/fc'
import { Loader } from 'components/loaders/Loader'

const create = () => {
    const { formRef, getFormInfo } = useForm()
    const [isImageSelected, setIsImageSelected] = useState(false)

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
            <h3 className='text-3xl font-bold pl-3'>Create Category</h3>
            <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
                <BaseInput name='name' type="text" placeholder='name'/>
                <BaseInput name='description' type="text" placeholder='description'/>
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
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Category created succesfully!</p>
            </div>
        </div>
    )
}

export default create