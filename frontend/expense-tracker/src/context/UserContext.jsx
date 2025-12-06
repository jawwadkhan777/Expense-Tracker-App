import { createContext, useState } from 'react';

export const UserContext = createContext();
    
const UserProvider = ({children})=> {
    const [user, setUser] = useState(null);

    
    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    }
    
    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const updateUser = (userData) => setUser(userData);
//   const clearUser = () => setUser(null);

//   // AUTO LOAD USER ON REFRESH
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       axiosInstance
//         .get(API_PATHS.AUTH.GET_USER_INFO, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           setUser(res.data);
//         })
//         .catch(() => {
//           clearUser();
//         });
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
