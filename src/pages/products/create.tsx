import React, { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'hooks/useForm'
import { useCreateProductMutation } from 'services/coreApi/products'
import { useRouter } from 'next/router'

const create = () => {
    const router = useRouter()
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
            <div onClick={()=>router.back()}>back</div>
            <h3 className='text-xl font-bold'>Create Product</h3>
            <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
                <input name='name' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='name'/>
                <input name='description' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='description'/>
                <input name='price' className='border-gray-300 border-2 rounded-xl w-full p-3' type="number" placeholder='price'/>
                <input name='quantity' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='quantity'/>
                <div>
                    <button type='submit' className='w-full bg-gray-500 text-lg text-white font-bold px-5 py-2 rounded-xl'>create</button>
                </div>
            </form> 
            <div className={`${result.isSuccess ? 'block' : 'hidden'}`}>
                <p className='font-bold text-center'>Product created succesfully!</p>
            </div>
        </div>
    )
}

export default create