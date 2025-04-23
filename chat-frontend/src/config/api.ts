// src/api/index.ts
import axios from 'axios';

const BASE_API = axios.create({
  baseURL: 'http://localhost:8080',
});

const IMAGE_API = axios.create({
  baseURL: 'http://localhost:8082',
});

const attachToken = (config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

BASE_API.interceptors.request.use(attachToken, (error) => Promise.reject(error));
IMAGE_API.interceptors.request.use(attachToken, (error) => Promise.reject(error));

export { BASE_API, IMAGE_API };
