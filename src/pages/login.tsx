import React ,{ useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { LoginForm } from 'components/LoginForm'
import { RegisterForm } from 'components/RegisterForm'
import { useAppSelector } from 'hooks/rtkHooks'
import Image from 'next/image'

const login = () => {
    const [toggleForm, setToggleForm] = useState('login')
    const router = useRouter()
    const isLoggedIn = useAppSelector(state=>state.authSlice.isLoggedIn)
    
    useLayoutEffect(()=>{
        if(isLoggedIn) router.push('/')
    },[isLoggedIn])

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row overflow-x-hidden mb-20'>
            <div className='flex-1 flex justify-center items-center flex-col mb-20 mt-10 md:mt-10 md:mb-0'>
                <div className='w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] relative'>
                    <Image src={'/login.png'} alt='' fill style={{ objectFit:'cover' }} sizes='auto' priority />
                </div>
                <p className='text-center font-bold text-3xl px-3' >Your best Ecommerce Solution</p>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='w-[300px] bg-gradient-to-br from-gray-300 to-gray-400 p-2 rounded-3xl shadow-gray-600 shadow-xl py-10'>
                    <div className='rounded-xl flex w-full justify-evenly bg-white font-bold'>
                        <div onClick={()=>setToggleForm('login')} className={`rounded-xl w-full h-full py-2 md:py-4 px-2 text-center ${ toggleForm==='login' ? 'bg-blue-600 text-white' : 'text-gray-900' }`}>login</div>
                        <div onClick={()=>setToggleForm('register')} className={`rounded-xl w-full h-full py-2 md:py-4 px-2 text-center ${ toggleForm==='register' ? 'bg-blue-600 text-white' : 'text-gray-900' }`}>register</div>
                    </div>
                    { toggleForm === 'login' && <LoginForm />}
                    { toggleForm === 'register' && <RegisterForm />}
                </div>
            </div>
        </div>
    )
}

export default login