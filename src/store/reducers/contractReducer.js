const initialState = {
  listContract: [],
  total: 0,
  page: 0,
  searchParams: {},
};

const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_CONTRACT":
    case "GET_LIST_CONTRACT_SUCCESS":
      console.log(action.data);
      return {
        ...state,
        listContract: action.data.contracts,
        total: action.data.total,
      };
    case "GET_LIST_CONTRACT_FAIL":
      return {
        ...state,
        listContract: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default contractReducer;
