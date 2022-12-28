import React, { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../hooks/rtkHooks'

export const MainLayout = ({children}:PropsWithChildren) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(state=>state.authSlice.isLoggedIn)

  useEffect(()=>{
    if(!isLoggedIn) router.push('/login')
  },[isLoggedIn])

  return (
    <div>
      { children }
    </div>
  )
}
