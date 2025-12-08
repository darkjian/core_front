import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API is not defined in env.local');
}

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.error || error.message || 'Network error';
        return Promise.reject(new Error(errorMessage));
    }
);

export default apiClient;