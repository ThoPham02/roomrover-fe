// write logic to create axios instance
import axios from 'axios';

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

        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default instance;