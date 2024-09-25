import {
  filterHouses,
  getHouse,
  getHouseRoom,
  getHouseService,
} from "../services/inventServices";
import actionTypes from "./actionTypes";

export const clearSearchParams = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_SEARCH_PARAMS,
  });
};

export const getListHouses = (payload) => async (dispatch) => {
  try {
    const data = await filterHouses(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.SEARCH_HOUSE_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH_HOUSE_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH_HOUSE_FAIL,
      data: null,
    });
  }
};

export const getHouseDetailAction = (payload) => async (dispatch) => {
  try {
    const data = await getHouse(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.GET_HOUSE_DETAIL_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOUSE_DETAIL_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOUSE_DETAIL_FAIL,
      data: null,
    });
  }
};

export const getHouseServiceAction = (payload) => async (dispatch) => {
  try {
    const data = await getHouseService(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.GET_HOUSE_SERVICE_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOUSE_SERVICE_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOUSE_SERVICE_FAIL,
      data: null,
    });
  }
};

export const getHouseRoomAction = (payload) => async (dispatch) => {
  try {
    const data = await getHouseRoom(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.GET_HOUSE_ROOM_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOUSE_ROOM_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOUSE_ROOM_FAIL,
      data: null,
    });
  }
};
