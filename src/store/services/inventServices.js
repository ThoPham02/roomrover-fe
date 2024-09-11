import axios from "../axios";
import { ApiUrl } from "./apiUrl";

export const filterHouses = async (filters) => {
  try {
    console.log(filters);
    const response = await axios({ ...ApiUrl.FilterHouses, params: filters });
    return response.data;
  } catch (error) {
    return error;
  }
};
