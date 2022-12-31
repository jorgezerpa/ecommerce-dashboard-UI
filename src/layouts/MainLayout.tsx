import React, { PropsWithChildren, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useAppSelector } from '../hooks/rtkHooks'
import { useRefreshMutation } from 'services/coreApi/auth'
import { useAppDispatch } from '../hooks/rtkHooks'
import { login, logout } from '../store/authSlices/authSlice'
import Sidebar from 'commons/Sidebar'
import TopBar from 'commons/TopBar'

export const MainLayout = ({children}:PropsWithChildren) => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state=>state.authSlice.isLoggedIn)
  const [refresh] = useRefreshMutation()

  useEffect(()=>{
    if(isLoggedIn){
      let interval = setInterval(()=>{
            if(Cookies.get('refreshToken')){
              refresh({ refreshToken: Cookies.get('refreshToken') as string })
                .unwrap()
                .then(data=>dispatch(login({ token:data.data.token, refreshToken:data.data.refreshToken })))        
            } else {
              dispatch(logout())
              router.push('/login')
            }
      }, (1000 * 60 * 5)-20) 
      } else{
        router.push('/login')
      } 
  },[isLoggedIn])

  return (
    <div className='w-full'>
      {router.pathname!=='/login' && <TopBar /> }
      <div className='flex'>
        { router.pathname!=='/login' && <Sidebar /> }
        <div className='w-full'>{ children }</div>
      </div>
    </div>
  )
}
