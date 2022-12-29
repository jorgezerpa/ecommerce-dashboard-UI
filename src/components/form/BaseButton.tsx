import React from 'react'

export const BaseButton = ({ label }:{ label?:string }) => {
  return (
    <button type='submit' className='w-full bg-gray-500 text-lg text-white font-bold px-5 py-2 rounded-xl'>{label || 'submit'}</button>
  )
}
