import React from 'react'
import { useRouter } from 'next/router'

const items = [
    { title:'products', path:'/products' },
    { title:'categories', path:'/categories' },
    { title:'profile', path:'/profile' },
]

const Sidebar = () => {
    const router = useRouter()

    return (
        <div className='h-screen w-[200px] bg-gray-300'>
            <ul>
                { items.map((item, index)=>(
                    <div key={`sidebarMenu${index}`}>
                        <div className='bg-gray-200 h-[3px] w-full'></div>
                        <li className='font-bold text-white text-lg bg-gray-600 p-3' onClick={()=>router.push(item.path)}>{ item.title }</li>
                    </div>
                )) }
            </ul>
        </div>
    )
}

export default Sidebar