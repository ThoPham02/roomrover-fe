import axios from "../axios";
import { ApiUrl } from "./apiUrl";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/users/register",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/users/login",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "users/info",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiFilterUser = async (filters) => {
  try {
    const response = await axios({
      ...ApiUrl.FilterUser,
      params: filters,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const apiUpdateUser = async (user) => {
    try {
        const response = await axios({
        ...ApiUrl.UpdateUser,
        url: ApiUrl.UpdateUser.url.replace(":id", user.userID),
        data: user,
        });
    
        return response;
    } catch (error) {
        return error;
    }
}
