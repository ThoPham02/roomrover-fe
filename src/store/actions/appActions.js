import actionTypes from "./actionTypes";

export const setCurrentPage = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CURRENTPAGE,
    data: payload,
  });
};
