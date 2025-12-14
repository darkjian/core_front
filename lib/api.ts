import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { handleErrorByStatus } from './errorHandler';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API is not defined in env.local');
}

const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1/`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    config.headers['X-Request-Id'] = crypto.randomUUID();
    return config;
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
            handleErrorByStatus(error);
            const errorMessage = error.response?.data?.error || error.message || 'Network error';
            return Promise.reject(new Error(errorMessage as string));
        }
        return Promise.reject(error);
    }
);

export default apiClient;