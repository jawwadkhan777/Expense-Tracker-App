import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle image selection and preview
    const imageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    } 

    // Handle removing selected image
    const removeImageHandler = () => {
        setImage(null);
        setPreviewUrl(null);
        // inputRef.current.value = null;
    }

    // Handle clicking on the file input
    const onChooseFileHandler = () => {
        inputRef.current.click();
    }


  return (
    <div className='flex justify-center mb-6'>
        <input type="file" ref={inputRef} onChange={imageChangeHandler} accept='image/*' className='hidden'/>

        {!image ? (
            <div className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center  relative'>
                <LuUser className='text-5xl text-primary' />

                <button onClick={onChooseFileHandler} type='button' className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 border-2 border-white cursor-pointer'>
                    <LuUpload />
                </button>
            </div>
        ) : (
            <div className='relative'>
                <img src={previewUrl} alt="Profile Preview" className='w-24 h-24 rounded-full object-cover' />
                <button onClick={removeImageHandler} type='button' className='absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full border-2 border-white cursor-pointer'><LuTrash /></button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector