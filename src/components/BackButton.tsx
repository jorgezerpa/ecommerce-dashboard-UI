import React from 'react'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack } from 'react-icons/io'

export const BackButton = () => {
    const router = useRouter()

    return (
        <div onClick={()=>router.back()}>
            <IoMdArrowRoundBack color='#516170' size={35}/>
        </div>
    )
}
