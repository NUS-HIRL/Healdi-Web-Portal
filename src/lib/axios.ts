import axios from 'axios'
import { COGNITO_ENDPOINT, UPSTREAM_BASE_URL } from '@/config/api'

export const cognitoAxios = axios.create({
  baseURL: COGNITO_ENDPOINT,
  headers: {
    'Content-Type': 'application/x-amz-json-1.1',
  },
  timeout: 10000,
})

export const apiAxios = axios.create({
  baseURL: UPSTREAM_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
  withCredentials: false, // Disable credentials for CORS
})

apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('accessToken')
      localStorage.removeItem('idToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenExpiresAt')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiAxios
