import { apiGetContractDetail, filterContracts } from "../services/contractServices";
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

export const getContractDetail = (id) => async (dispatch) => {
  try {
    const data = await apiGetContractDetail(id);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.GET_CONTRACT_DETAIL_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CONTRACT_DETAIL_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CONTRACT_DETAIL_FAIL,
      data: null,
    });
  }
};
