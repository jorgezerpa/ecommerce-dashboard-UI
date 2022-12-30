import { useRef } from "react"
import convertBase64 from 'utils/ToBase64'

const useToBase64 = () => {
    const imageRef = useRef<null|HTMLInputElement>(null)

    const toBase64 = async() => {
        const image = await convertBase64(imageRef.current as HTMLInputElement)
        return image as string
    }

    return { imageRef, toBase64 }
}

export default useToBase64
