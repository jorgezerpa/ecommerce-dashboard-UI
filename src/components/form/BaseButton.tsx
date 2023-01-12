import React from 'react'

export const BaseButton = ({ label }:{ label?:string }) => {
  return (
    <button type='submit' className='shadow-md shadow-gray-700 w-full bg-blue-700 text-lg text-white font-bold px-5 py-2 rounded-xl'>{label || 'submit'}</button>
  )
}
