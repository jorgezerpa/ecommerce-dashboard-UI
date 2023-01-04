import React, { useState } from 'react'
import { useAppDispatch } from 'hooks/rtkHooks'
import { logout } from 'store/authSlices/authSlice'
import { FaUserAlt } from 'react-icons/fa'

const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useAppDispatch()

    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <div className='absolute top-0 right-0 pt-4 pr-4'>
            <div onClick={toggleMenu} className='relative rounded-full bg-gray-900 w-[40px] h-[40px] flex justify-center items-center'>
                <FaUserAlt size={22} color='white' />
                <div className={`absolute top-[100%] right-[50%] ${!showMenu && 'hidden'}`}>
                    <ul className='w-[200px] bg-gray-500 text-white font-bold p-1 rounded-xl shadow-xl shadow-[rgba(0,0,0,.3)]'>
                        <li className='p-2' onClick={()=>dispatch(logout())}>logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar
