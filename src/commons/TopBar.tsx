import React, { useState } from 'react'
import { useAppDispatch } from 'hooks/rtkHooks'
import { logout } from 'store/authSlices/authSlice'

const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useAppDispatch()

    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <div className='absolute top-0 right-0 pt-4 pr-4'>
            <div onClick={toggleMenu} className='relative rounded-full bg-blue-500 w-[40px] h-[40px]'>
                <div className={`absolute top-[100%] right-[50%] ${!showMenu && 'hidden'}`}>
                    <ul>
                        <li onClick={()=>dispatch(logout())}>logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar
