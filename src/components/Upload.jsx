import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const authenticator = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/upload-auth`
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


const Upload = ({ children, type, setProgress, setData }) => {

    const ref = useRef(null)

    const onError = err => {
        console.log("Error", err);
        toast.error("Image upload failed!")
    };

    const onSuccess = res => {
        console.log("Success", res);
        setData(res)
    };
    const onUploadProgress = progress => {
        setProgress(Math.round((progress.loaded / progress.total) * 100))
    };

    return (
        <IKContext
            publicKey="public_fwoUHzKZYpZ8YoocCtUholqmGWg="
            urlEndpoint="https://ik.imagekit.io/zo4hoeyng"
            authenticator={authenticator}
        >
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                className='hidden'
                ref={ref}
                accept={`${type}/*`}
            />
            <div className='cursor-pointer' onClick={() => ref.current.click()}>
                {children}
            </div>
        </IKContext>
    )
}
export default Upload