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

    console.log(response);

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
