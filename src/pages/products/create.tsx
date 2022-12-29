import React, { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'hooks/useForm'
import { useCreateProductMutation } from 'services/coreApi/products'
import { BaseButton, BaseInput } from './../../components/form'
import { BackButton } from 'components/BackButton'

const create = () => {
    const { formRef, getFormInfo } = useForm()
    const [ createProduct, result ] = useCreateProductMutation()

    const handleSubmit = async(e:SyntheticEvent) => {
        const [jsonData, formData] = getFormInfo(e)
        createProduct(jsonData)
    }

    useEffect(()=>{
        if(result.isSuccess){
        }
    }, [result.data])


    return (
        <div className='px-5 pt-10'>
            <BackButton />
            <h3 className='text-xl font-bold'>Create Product</h3>
            <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
                <BaseInput name='name' type="text" placeholder='name'/>
                <BaseInput name='description' type="text" placeholder='description'/>
                <BaseInput name='price' type="number" placeholder='price'/>
                <BaseInput name='quantity' type="text" placeholder='quantity'/>
                <div>
                    <BaseButton label='create' />
                </div>
            </form> 
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Product created succesfully!</p>
            </div>
        </div>
    )
}

export default create