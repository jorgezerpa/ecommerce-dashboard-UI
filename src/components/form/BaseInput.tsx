import React from 'react'

interface BaseInputInterface{
    name:string, 
    type:'email'|'text'|'number',
    placeholder?:string,
    defaultValue?:string|number
}

export const BaseInput = ({name, type, placeholder="", defaultValue}:BaseInputInterface) => {
  return (
    <input
        defaultValue={defaultValue && defaultValue}
        className='border-gray-300 border-2 rounded-xl w-full p-3' 
        name={name} 
        type={type} 
        placeholder={placeholder} 
    />
  )
}
