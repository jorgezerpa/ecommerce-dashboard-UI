import React from 'react'
import { useRouter } from 'next/router'

export const BackButton = () => {
    const router = useRouter()

    return (
        <div onClick={()=>router.back()}>back</div>
    )
}
