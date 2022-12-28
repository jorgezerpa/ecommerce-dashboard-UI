import React, { SyntheticEvent, useRef } from 'react'
import { useForm } from 'hooks/useForm'
import { useLoginMutation } from '../services/coreApi/auth'

export const LoginForm = () => {
    const { getFormInfo, formRef } = useForm()
    const [sendLogin, result] = useLoginMutation()

    const handleSubmit = (e:SyntheticEvent) => {
        const [jsonData, formData] = getFormInfo(e)
        console.log(jsonData)
        sendLogin(jsonData)
            .unwrap()
            .then(result => console.log(result))
            .catch(err=>console.log(err))
    }

    return (
      <div className='w-full'>
          <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
              <input name='email' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='email'/>
              <input name='password' className='border-gray-300 border-2 rounded-xl w-full p-3' type="text" placeholder='password'/>
              <div>
                  <button type='submit' className='w-full bg-gray-500 text-lg text-white font-bold px-5 py-2 rounded-xl'>login</button>
              </div>
          </form>
      </div>
    )
}
