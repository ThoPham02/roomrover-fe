import {
  filterHouses,
  getHouse,
  createHouse,
} from "../services/inventServices";
import actionTypes from "./actionTypes";

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

export const getHouseDetail = (payload) => async (dispatch) => {
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

export const clearSearchParams = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_SEARCH_PARAMS,
  });
};

export const createHouseDetail = (payload) => async (dispatch) => {
  try {
    payload.albums = JSON.stringify(payload.albums);
    const data = await createHouse(payload);
    console.log(data);

    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.CREATE_HOUSE_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.CREATE_HOUSE_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_HOUSE_FAIL,
      data: null,
    });
  }
};
