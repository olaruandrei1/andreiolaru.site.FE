import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'X-BFF-For': import.meta.env.VITE_API_KEY,
    },
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
    }
);

export default api;
