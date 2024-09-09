import { apiLogin, apiRegister } from "../services/authServices";
import actionTypes from "./actionTypes";

export const register = (payload) => async (dispatch) => {
  try {
    const data = await apiRegister(payload);
    console.log(data);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    const data = await apiLogin(payload);
    console.log(data?.result.code === 0);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const getCurrentUser = () => ({
  type: actionTypes.GET_CURRENT_USER,
});
