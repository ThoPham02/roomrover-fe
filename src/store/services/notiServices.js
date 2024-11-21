import axios from "../axios";
import { ApiUrl } from "./apiUrl";

export const apiGetListNotis = async (filters) => {
  try {
    const response = await axios({ ...ApiUrl.listNotis, params: filters });

    return response;
  } catch (error) {
    return error;
  }
};

export const apiMarkAsReadNoti = async (id) => {
  try {
    const response = await axios({
      url: `/notifications/mark-read/${id}`,
      method: "PUT",
    });

    return response;
  } catch (error) {
    return error;
  }
};
