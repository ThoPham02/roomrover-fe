import actionTypes from "../actions/actionTypes";

const initialState = {
  listContract: [],
  total: 0,
  page: 0,
  searchParams: {},
  contractDetail: {},
};

const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CONTRACT_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        listContract: action.data.contracts,
        total: action.data.total,
      };
    case actionTypes.GET_LIST_CONTRACT_FAIL:
      return {
        ...state,
        listContract: [],
        total: 0,
      };
    case actionTypes.GET_CONTRACT_DETAIL_SUCCESS:
      return {
        ...state,
        contractDetail: action.data.contract,
      };
    case actionTypes.GET_CONTRACT_DETAIL_FAIL:
      return {
        ...state,
        contractDetail: {},
      };

    default:
      return state;
  }
};

export default contractReducer;
