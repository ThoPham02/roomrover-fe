import axios from "../axios";
import { ApiUrl } from "./apiUrl";

export const filterContracts = async (filters) => {
  try {
    const response = await axios({
      ...ApiUrl.FilterContracts,
      params: filters,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiCreateContract = async (contract) => {
  try {
    const response = await axios({
      ...ApiUrl.CreateContract,
      data: contract,
    });
    return response;
  } catch (error) {
    return error;
  }
}
