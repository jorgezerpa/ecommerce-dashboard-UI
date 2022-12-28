import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

interface AuthState {
  isLoggedIn: boolean,
  token:string|null
}

const initialState: AuthState = {
  isLoggedIn:Cookies.get('accessToken') ? true : false,
  token: Cookies.get('accessToken') ? Cookies.get('accessToken') as string : null 
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login:(state, action:PayloadAction<{ token:string, refreshToken:string }>) => {
        state.isLoggedIn=true
        state.token=action.payload.token
        let inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
        Cookies.set('accessToken', action.payload.token, { expires: inFiveMinutes })
        Cookies.set('refreshToken', action.payload.refreshToken, { expires: 1 })        
    },
    logout:(state) => {
        state.isLoggedIn=false,
        state.token=null
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
    },
  }
})

export const { login, logout } = authSlice.actions

export const selectCount = (state: RootState) => state.authSlice

export default authSlice.reducer