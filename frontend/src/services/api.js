import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081',
});

// Add a request interceptor to include token if needed (optional for this mock, but good practice)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
