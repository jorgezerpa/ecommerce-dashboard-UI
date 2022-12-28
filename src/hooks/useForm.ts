import { useRef, useState, SyntheticEvent } from 'react'

type getFormInfoType = [jsonData:any, formData:FormData]

const useForm = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const getFormInfo = (e:SyntheticEvent):getFormInfoType => {
        e.preventDefault()
            const formData = new FormData(formRef.current as HTMLFormElement)
            let jsonData:any= {}
            formData.forEach((value, key)=>jsonData[key]=value)
            return [jsonData, formData]
    }        
    return { formRef, getFormInfo }
}

export { useForm }