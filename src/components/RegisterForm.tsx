import React, { SyntheticEvent } from 'react'
import { useForm } from 'hooks/useForm'

export const RegisterForm = () => {
  const { getFormInfo, formRef } = useForm()

  const handleSubmit = (e:SyntheticEvent) => {
      const [jsonData, formData] = getFormInfo(e)
      console.log(jsonData)
  }

  return (
    <div className='w-full'>
        <form ref={formRef} onSubmit={handleSubmit} className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
            <input name="firstName" className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='First Name'/>
            <input name="lastName" className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='Last Name'/>
            <input name="email" className='border-gray-300 border-2 rounded-xl w-full p-3' type="email" placeholder='Email'/>
            <input name="phone" className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='Phone Number'/>
            <input name="password" className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='Password'/>
            <div>
                <button type='submit' className='w-full bg-gray-500 text-lg text-white font-bold px-5 py-2 rounded-xl'>register</button>
            </div>
        </form>
    </div>
  )
}
