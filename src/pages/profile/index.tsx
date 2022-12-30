import React, { SyntheticEvent, useState } from 'react'
import { useGetMerchantQuery, useUpdateMerchantMutation } from 'services/coreApi/merchant'
import { ProfileInput } from 'components/ProfileInput'
import { useForm } from 'hooks/useForm'

const index = () => {
  const {data, isSuccess} = useGetMerchantQuery()
  const [updateMerchant, result] = useUpdateMerchantMutation()
  const { formRef, getFormInfo } = useForm()
  const [wasChanged, setWasChanged] = useState(false)

  const handleSubmit = (e:SyntheticEvent) => {
    const [jsonInfo] = getFormInfo(e)
    updateMerchant(jsonInfo)
  }

  const handleOnChange = () => setWasChanged(true)

  return (
    <div>
      { isSuccess && (
        <div className='w-full flex flex-col items-center pt-20'>
          <div className='bg-gray-600 rounded-full w-[150px] h-[150px] mb-4'></div>
          <p className='font-bold text-lg mb-3'>{data.data.merchant.email}</p>
          
          <form ref={formRef} onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
            <ProfileInput onChange={handleOnChange} value={data.data.merchant.firstName} label='firstName' />
            <ProfileInput onChange={handleOnChange} value={data.data.merchant.lastName} label='lastName' />
            <ProfileInput onChange={handleOnChange} value={data.data.merchant.phone} label='phone' />
            { wasChanged && <button className='px-3 py-2 bg-gray-500 font-bold text-white rounded-xl'>save changes</button>}
          </form>
          
        </div>
      ) }
    </div>
  )
}

export default index