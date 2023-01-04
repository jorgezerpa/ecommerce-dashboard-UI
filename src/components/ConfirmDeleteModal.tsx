import React from 'react'

interface ConfirmDeleteModalInterface {
    showModal:boolean,
    toggleModal:any, //function
    handler:any, //function
    message?: string,
    buttonLabel?:string
}

export const ConfirmDeleteModal = ({ toggleModal, showModal, handler, message, buttonLabel }:ConfirmDeleteModalInterface) => {
  return (
    <div className={`${!showModal && 'hidden'} font-bold absolute top-0 w-screen h-screen left-0 bg-[rgba(0,0,0,.3)] flex justify-center items-center`}>
        <div className='bg-white p-10 rounded-lg'>
          <p>{ message || 'are you sure to proceed?'}</p>
          <div className='flex w-full justify-end mt-2 gap-2 '>
            <button className='px-2 py-1 bg-red-800 rounded-lg text-white' onClick={handler}>{buttonLabel || "delete"}</button>
            <button className='px-2 py-1 bg-gray-600 rounded-lg text-white' onClick={toggleModal}>cancel</button>
          </div>
        </div>
    </div>
  )
}
