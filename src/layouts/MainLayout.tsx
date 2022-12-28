import React, { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../hooks/rtkHooks'
import TopBar from 'commons/TopBar'

export const MainLayout = ({children}:PropsWithChildren) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(state=>state.authSlice.isLoggedIn)

  useEffect(()=>{
    if(!isLoggedIn) router.push('/login')
  },[isLoggedIn])

  return (
    <div className='w-full'>
      {router.pathname!=='/login' && <TopBar /> }
      { children }
    </div>
  )
}
