// write logic to create axios instance
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default instance;