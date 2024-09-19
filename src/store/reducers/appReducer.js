import actionTypes from "../actions/actionTypes";

const initState = {};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.data,
      };

    default:
      return state;
  }
};

export default appReducer;
