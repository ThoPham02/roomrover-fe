import { apiLogin, apiRegister, apiUpdateUser } from "../services/authServices";
import actionTypes from "./actionTypes";

export const register = (payload) => async (dispatch) => {
  try {
    const data = await apiRegister(payload);
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

export const updateCurrentUser = (payload) => async (dispatch) => {
  try {
    const data = await apiUpdateUser(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.UPDATE_CURRENT_USER,
        data: data,
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_CURRENT_USER_SUCCESS,
        data: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_USER_FAIL,
      data: payload,
    });
  }
};
