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
};

export const apiGetContractDetail = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetContractDetail,
      url: ApiUrl.GetContractDetail.url.replace(":id", id),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiUpdateStatusContract = async (data) => {
  try {
    const response = await axios({
      ...ApiUrl.UpdateStatusContract,
      url: ApiUrl.UpdateStatusContract.url.replace(":id", data.contractID),
      data: { status: data.status },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiUpdateContract = async (contractID, data) => {
  try {
    console.log(data);

    const response = await axios({
      ...ApiUrl.UpdateContract,
      url: ApiUrl.UpdateContract.url.replace(":id", contractID),
      data,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiConfirmContract = async (data) => {
  try {
    const response = await axios({
      ...ApiUrl.ConfirmContract,
      url: ApiUrl.ConfirmContract.url.replace(":id", data.contractID),
      data,
    });
    return response;
  } catch (error) {
    return error;
  }
};
