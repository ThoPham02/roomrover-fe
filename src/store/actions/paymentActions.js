import { apiFilterPayment, apiGetPaymentDetail } from "../services/paymentServices";
import actionTypes from "./actionTypes";

export const getListPayment = (payload) => async (dispatch) => {
  try {
    const data = await apiFilterPayment(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.FILTER_PAYMENT_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.FILTER_PAYMENT_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.FILTER_PAYMENT_FAIL,
      data: null,
    });
  }
};

export const getPaymentDetail = (id) => async (dispatch) => {
  try {
    const data = await apiGetPaymentDetail(id);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.GET_PAYMENT_DETAIL_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PAYMENT_DETAIL_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PAYMENT_DETAIL_FAIL,
      data: null,
    });
  }
};
