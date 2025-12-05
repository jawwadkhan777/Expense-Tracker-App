import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.imageUrl; // Assuming the server responds with the image URL
    } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  } 
};

export default uploadImage;