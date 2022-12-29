import React, { SyntheticEvent, useRef } from 'react'
import { useForm } from 'hooks/useForm'
import { useLoginMutation } from '../services/coreApi/auth'
import { useAppDispatch } from '../hooks/rtkHooks'
import { login } from '../store/authSlices/authSlice'
import { BaseButton, BaseInput } from './form'

export const LoginForm = () => {
    const { getFormInfo, formRef } = useForm()
    const [sendLogin, result] = useLoginMutation()
    const dispatch = useAppDispatch()

    const handleSubmit = (e:SyntheticEvent) => {
        const [jsonData, formData] = getFormInfo(e)
        sendLogin(jsonData)
            .unwrap()
            .then(result => dispatch(login({token:result.data.token as string, refreshToken:result.data.refreshToken as string })))
            .catch(err=>console.log(err))
    }

    return (
      <div className='w-full'>
          <form onSubmit={handleSubmit} ref={formRef}  className='w-full flex flex-col justify-center gap-4 py-5 px-3'>
              <BaseInput name='email' type="text" placeholder='email'  />
              <BaseInput name='password' type="text" placeholder='password'/>
              <div>
                <BaseButton label='login' />    
              </div>
          </form>
      </div>
    )
}
