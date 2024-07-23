import handleApi from "../../../api/handleApi";
import { API_METHOD } from "../../../constants";
import { AUTH_PATHS } from "../constants";

export const loginApi = (postData, callback) => {
    handleApi({
        method: API_METHOD.POST,
        path: AUTH_PATHS.LOG_IN,
        body: postData,
    }).then((res) => {
        if (res.result.code === 0) {
            localStorage.setItem("token", res.token);
        }
        callback(res);
    }).catch((error) => {
        console.error(error);
        callback({ error });
    });
};

export const registerApi = async (postData) => {
    try {
        const res = await handleApi({
            method: API_METHOD.POST,
            path: AUTH_PATHS.REGISTER,
            body: postData,
        });

        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProfileApi = (callback) => {
    handleApi({
        method: API_METHOD.GET,
        path: AUTH_PATHS.PROFILE,
    }).then((res) => {
        callback(res);
    }
    ).catch((error) => {
        console.error(error);
        callback({ error });
    });
}
