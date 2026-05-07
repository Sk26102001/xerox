// services/uploadService.ts
import axios from 'axios';

// Use the same API configuration as your other services
import { API } from '@/api/api';

export const uploadFile = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
    
    // Handle different response formats
    if (response.data.success && response.data.url) {
      return response.data.url;
    }
    
    if (response.data.url) {
      return response.data.url;
    }
    
    throw new Error(response.data.message || 'Upload failed');
  } catch (error: any) {
    console.error('Upload error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to upload file');
  }
};

// import axiosInstance from 'axios';

// export const uploadFile = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', file);
  
//   const response = await axiosInstance.post('/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
  
//   if (response.data.success) {
//     return response.data.url;
//   }
//   throw new Error('Upload failed');
// };