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

export const getHouseService = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetHouseService,
      url: ApiUrl.GetHouseService.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getService = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetService,
      url: ApiUrl.GetService.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
}

export const createService = async (service) => {
  try {
    const response = await axios({
      ...ApiUrl.CreateService,
      data: service,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const updateService = async (service) => {
  try {
    const response = await axios({
      ...ApiUrl.UpdateService,
      url: ApiUrl.UpdateService.url.replace(":id", service.serviceID),
      data: service,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.DeleteService,
      url: ApiUrl.DeleteService.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getHouseRoom = async (payload) => {
  try {
    const response = await axios({
      ...ApiUrl.GetHouseRoom,
      url: ApiUrl.GetHouseRoom.url.replace(":id", payload.id),
      params: payload,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const createRoom = async (room) => {
  try {
    const response = await axios({
      ...ApiUrl.CreateRoom,
      data: room,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const updateRoom = async (room) => {
  try {
    const response = await axios({
      ...ApiUrl.UpdateRoom,
      url: ApiUrl.UpdateRoom.url.replace(":id", room.roomID),
      data: room,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.DeleteRoom,
      url: ApiUrl.DeleteRoom.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getRoom = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetRoom,
      url: ApiUrl.GetRoom.url.replace(":id", id),
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const apiFilterRoom = async (filters) => {
  try {
    const response = await axios({ ...ApiUrl.FilterRoom, params: filters });

    return response;
  } catch (error) {
    return error;
  }
}
