import axios from "axios";
import { toast } from "react-toastify";

import {
  API_METHOD,
  DEFAULT_MESSAGE,
  HANDLE_ERROR_CODE,
  HANDLE_ERROR_MESSAGE,
  ROUTE_PATHS,
} from "../common";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  (config) => {
    let token =
      window.localStorage.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(
        1,
        -1
      );

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const NO_TOAST_API_LIST = [
  '/login', // API login
  '/register', // Thêm các API khác nếu cần
  'mark-read'
];
instance.interceptors.response.use(
  (response) => {
    const config = response.config;
    const errorCode = response.data.result?.code;

    // Kiểm tra nếu API hiện tại nằm trong danh sách NO_TOAST_API_LIST
    const isNoToastApi = NO_TOAST_API_LIST.some((api) =>
      config.url.includes(api)
    );

    if (!isNoToastApi && config.method !== API_METHOD.GET) {
      if (errorCode === 0) {
        toast.success(DEFAULT_MESSAGE.SUCCESS);
      } else if (Object.values(HANDLE_ERROR_CODE).includes(errorCode)) {
        toast.error(HANDLE_ERROR_MESSAGE[errorCode] || DEFAULT_MESSAGE.ERROR);
      } else {
        toast.error(DEFAULT_MESSAGE.ERROR);
      }
    }

    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("persist:auth");
      window.location.assign(ROUTE_PATHS.LOGIN);
      toast.error(DEFAULT_MESSAGE.SESSION_EXPIRED);
    }
    return Promise.reject(error);
  }
);

export default instance;
