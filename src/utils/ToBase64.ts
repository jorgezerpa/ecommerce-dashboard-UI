import { Base64 } from 'js-base64';

const convertBase64 = (inputFile:HTMLInputElement) => {
    return new Promise((resolve, reject) => {
        if(!inputFile.files) return reject('files not found on input')
        const fileReader = new FileReader();
        fileReader.readAsDataURL(inputFile.files[0])
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
    })
}

export default convertBase64
