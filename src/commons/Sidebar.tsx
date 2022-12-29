import React from 'react'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter()

    return (
        <div className='h-screen w-[200px] bg-gray-300'>
            <ul>
                <li onClick={()=>router.push('/products')}>Products</li>
                <li onClick={()=>router.push('/categories')}>Categories</li>
                <li onClick={()=>router.push('/profile')}>Profile</li>
            </ul>
        </div>
    )
}

export default Sidebar