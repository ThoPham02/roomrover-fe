import axios from "../axios";
import { ApiUrl } from "./apiUrl";

export const filterHouses = async (filters) => {
  try {
    const response = await axios({ ...ApiUrl.FilterHouses, params: filters });

    return response;
  } catch (error) {
    return error;
  }
};

export const getHouse = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetHouse,
      url: ApiUrl.GetHouse.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};
