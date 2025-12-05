import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Sign up logic here
  const signUpHandler = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (profilePic) {
      // In real application, upload the image to server or cloud storage and get the URL
      profileImageUrl = URL.createObjectURL(profilePic);
    }

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    } 
    if (!password || password.length < 8) {
      setError("Please enter a password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);

    // SignUp api call here
    try {
      if(profilePic) {
        const imageUrlRes = await uploadImage(profilePic);
        profileImageUrl = imageUrlRes || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100] md:h-full h-auto mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today! To start managing your expenses efficiently.
        </p>

        <form onSubmit={signUpHandler}>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Imran Khan"
              label="Full Name"
              type="text"
            />
            <Input
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="sample@test.com"
            />
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Min 8 Characters"
            />
            <Input
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Re-enter Password"
            />
          </div>

          {error && (
                      <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                    )}
          
                    <button type='submit' className='btn-primary'>SignUp</button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "} 
                      <Link to="/login" className='text-primary font-medium underline'>Login</Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
