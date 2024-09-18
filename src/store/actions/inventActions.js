import { filterHouses } from "../services/inventServices";
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

export const clearSearchParams = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_SEARCH_PARAMS,
  });
};
