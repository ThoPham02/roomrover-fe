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

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios({
      ...ApiUrl.UploadImage,
      data: formData,
    });

    return response.url;
  } catch (error) {
    return error;
  }
};

export const createHouse = async (house) => {
  try {
    const response = await axios({
      ...ApiUrl.CreateHouse,
      data: house,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const updateHouse = async (house) => {
  try {
    const response = await axios({
      ...ApiUrl.UpdateHouse,
      url: ApiUrl.UpdateHouse.url.replace(":id", house.houseID),
      data: house,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteHouse = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.DeleteHouse,
      url: ApiUrl.DeleteHouse.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};
