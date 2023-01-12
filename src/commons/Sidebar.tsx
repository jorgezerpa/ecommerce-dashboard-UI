import React from 'react'
import { useRouter } from 'next/router'
import { FaTshirt } from 'react-icons/fa'
import { MdCategory } from 'react-icons/md'
import { BsFilePersonFill } from 'react-icons/bs'
import { GoListUnordered } from 'react-icons/go'

const items = [
    { icon: FaTshirt, title:'products', path:'/products' },
    { icon: MdCategory, title:'categories', path:'/categories' },
    { icon: BsFilePersonFill, title:'profile', path:'/profile' },
    { icon: GoListUnordered, title:'orders', path:'/orders' },
]

const Sidebar = () => {
    const router = useRouter()

    return (
        <div className='h-screen w-[200px] bg-gray-900 rounded-b-xl shadow-xl shadow-black'>
            <div onClick={()=>router.push('/')} className='shadow-sm shadow-[rgba(255,255,255,.7)] py-5 font-extrabold text-xl text-center text-white bg-gray-800 mb-3'>
                <p>Dashboard</p>
            </div>
            <ul>
                { items.map((item, index)=>(
                    <div key={`sidebarMenu${index}`}>
                        <li className={`${router.pathname===item.path && 'bg-[rgba(250,250,250,.2)]'} flex gap-1 items-center font-bold text-white text-lg  p-3 mx-2 rounded-xl`} onClick={()=>router.push(item.path)}>
                            <item.icon color='white' size={20} />
                            <p>{ item.title }</p>
                        </li>
                    </div>
                )) }
            </ul>
        </div>
    )
}

export default Sidebar