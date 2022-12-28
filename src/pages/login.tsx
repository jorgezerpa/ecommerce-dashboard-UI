import React ,{ useState } from 'react'
import { LoginForm } from 'components/LoginForm'
import { RegisterForm } from 'components/RegisterForm'

const login = () => {
    const [toggleForm, setToggleForm] = useState('login')

    return (
        <div className='w-full min-h-screen flex'>
            <div className='flex-1 bg-blue-500'>
                image
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='w-[300px]'>
                    <div className='rounded-xl flex w-full justify-evenly bg-gray-300 text-white font-bold'>
                        <div onClick={()=>setToggleForm('login')} className={`rounded-xl w-full h-full py-4 px-2 text-center ${ toggleForm==='login' && 'bg-gray-600' }`}>login</div>
                        <div onClick={()=>setToggleForm('register')} className={`rounded-xl w-full h-full py-4 px-2 text-center ${ toggleForm==='register' && 'bg-gray-600' }`}>register</div>
                    </div>
                    { toggleForm === 'login' && <LoginForm />}
                    { toggleForm === 'register' && <RegisterForm />}
                </div>
            </div>
        </div>
    )
}

export default login