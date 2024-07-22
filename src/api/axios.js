// write logic to create axios instance
import axios from 'axios';
import { toast } from 'react-toastify';
import { DEFAULT_MESSAGE, HANDLE_ERROR_CODE, HANDLE_ERROR_MESSAGE } from '../constants';
import { AUTH_PATHS } from '../features/auth';

const instance = axios.create({
    baseURL: "https://roomrover-be.onrender.com",
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    },
});

const token = localStorage.getItem("token");

if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        console.log(response.data.result)
        const errorCode = response.data.result.code;

        if (errorCode === 0) {
            toast.success(DEFAULT_MESSAGE.SUCCESS);
        } else if (Object.values(HANDLE_ERROR_CODE).includes(errorCode)) {
            toast.error(HANDLE_ERROR_MESSAGE[errorCode] || DEFAULT_MESSAGE.ERROR);
        } else {
            toast.error(DEFAULT_MESSAGE.ERROR);
        }

        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            toast.error(DEFAULT_MESSAGE.SESSION_EXPIRED);

            localStorage.removeItem("token");
            window.location.href = AUTH_PATHS.LOG_IN;
        } 
        return Promise.reject(error);
    }
);

export default instance;