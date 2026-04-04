import axiosInstance from 'axios';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  if (response.data.success) {
    return response.data.url;
  }
  throw new Error('Upload failed');
};