import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gallery endpoints
export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

export const addGalleryImage = async (imageData) => {
  try {
    const response = await api.post('/gallery', imageData);
    return response.data;
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id) => {
  try {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};

// Services endpoints
export const fetchServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const addService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    console.error('Error adding service:', error);
    throw error;
  }
};

// Inquiry endpoints
export const submitInquiry = async (inquiryData) => {
  try {
    const response = await api.post('/inquiry', inquiryData);
    return response.data;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};

export const fetchInquiries = async () => {
  try {
    const response = await api.get('/inquiry');
    return response.data;
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    throw error;
  }
};

export default api;
