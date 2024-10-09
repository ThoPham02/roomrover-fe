import { filterContracts } from "../services/contractServices";
import actionTypes from "./actionTypes";

export const getListContract = (payload) => async (dispatch) => {
    try {
      const data = await filterContracts(payload);
      if (data?.result.code === 0) {
        dispatch({
          type: actionTypes.GET_LIST_CONTRACT_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_LIST_CONTRACT_FAIL,
          data: data,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LIST_CONTRACT_FAIL,
        data: null,
      });
    }
  };