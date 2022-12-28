import React, { useState } from 'react'

export const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className='absolute top-0 right-0 p-4'>
            <div className='relative rounded-full bg-blue-500 w-[80px] h-[80px]'>
                <div className={`absolute top-0 right-0 ${!showMenu && 'hidden'}`}>
                    <ul>
                        <li>logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
