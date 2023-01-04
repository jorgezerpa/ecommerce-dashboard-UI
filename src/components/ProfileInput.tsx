import React, { useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

interface ProfileInputInterface {
  label:string,
  value:string,
  onChange?:any
}

export const ProfileInput = ({label, value, onChange}:ProfileInputInterface) => {
  const [isHover, setIsHover] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className=''>
      <div className='flex gap-1 relative' onMouseOver={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} >
        <p className='font-bold'>{label}:</p>
        <input onChange={onChange && onChange} readOnly={!isEditing} name={label} className={`outline-none ${isEditing ? 'h-[1.5rem] border-b-2 border-gray-400 font-bold p-1' : 'border-none'}`} type="text" defaultValue={value} />        
        <div className={`absolute top-0 left-[100%] ${isHover ? 'block' : 'hidden'}`} onClick={()=>setIsEditing(!isEditing)} >
          {isEditing ? <FaCheck size={20} /> : <MdOutlineModeEdit size={20} /> }</div>
      </div>
    </div>
  )
}
