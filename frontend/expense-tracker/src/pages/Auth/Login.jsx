import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Login logic here
  const loginHandler = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if(!password || password.length < 8) {
      setError("Please enter a correct password.")
      return
    }

    setError(null);

    // Login api call here
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;
      if (token) {
      localStorage.setItem('token', token);
      updateUser(user);
      navigate('/dashboard');
    }
    // Simulate successful login
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again later.");
    }
  }
}

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Login to your account</p>

        <form action="" onSubmit={loginHandler}>
          <Input value={email} type="text" onChange={(e)=> setEmail(e.target.value)} label="Email Address" placeholder='sample@test.com' />
          <Input value={password} type="password" onChange={(e)=> setPassword(e.target.value)} label="Password" placeholder='Min 8 Characters' />

          {error && (
            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
          )}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "} 
            <Link to="/signup" className='text-primary font-medium underline'>Register</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login