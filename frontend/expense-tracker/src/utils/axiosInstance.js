import axios from 'axios';
import { BASE_URL } from './apiPaths';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Set the base URL for all requests
    timeout: 10000,  // Set the request timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',  // Set default content type for requests
        Accept: 'application/json',  // Set default accept header for responses
    },
});

// Add an interceptor to handle responses globally
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from local storage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Attach the access token to the request headers
        }
        return config;
    },
    (error) => {
        // Handle request errors here if needed
        return Promise.reject(error);
    }
);

// Add an interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses here if needed
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.error('Unauthorized access - redirecting to login');
                window.location.href = '/login'; // Redirect to login page
            }
            else if (error.response.status === 500) {
                // Handle internal server error
                console.error('Internal server error, please try again later');
            }
        } else if (error.code === 'ECONNABORTED') {
            // Handle request timeout
            console.error('Request timed out, please try again later');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;