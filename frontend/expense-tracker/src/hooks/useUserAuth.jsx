import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(user) return; // User is already authenticated

        let isMounted = true;

        const fetchUserData = async () => {
            try {
                const responnse = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && responnse.status === 200) {
                    updateUser(responnse.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserData();
        return () => {
            isMounted = false;
        };
}, [user, updateUser, clearUser, navigate]);

}