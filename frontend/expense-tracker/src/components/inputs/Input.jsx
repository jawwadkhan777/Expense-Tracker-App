import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = ()=> {
        setShowPassword((prev) => !prev);
    }


  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='input-box'>
            <input 
                type={type === "password" ? (showPassword ? "text" : "password") : type} 
                value={value} onChange={onChange} placeholder={placeholder} className='w-full bg-transparent outline-none' />

                {type === "password" && (
                    <>
                    {showPassword ? (
                    <FaRegEye size={22} className="cursor-pointer text-primary" onClick={toggleShowPassword} />
                ) : (                    
                    <FaRegEyeSlash size={22} className="cursor-pointer text-primary" onClick={toggleShowPassword} />
                )}
                    </>
                )}  
        </div>

    </div>
  )
}

export default Input