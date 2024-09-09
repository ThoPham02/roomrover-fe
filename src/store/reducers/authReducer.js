import actionTypes from "../actions/actionTypes";

const initialState = {
  isLogined: false,
  token: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLogined: true,
        token: action.data.token,
        user: action.data.user,
      };
    case actionTypes.LOGIN_FAIL:
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLogined: false,
        token: null,
        user: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogined: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;