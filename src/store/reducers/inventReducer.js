import actionTypes from "../actions/actionTypes";

const initialState = {
  house: {
    searchParams: {},
    page: 0,
    total: 0,
    listHouse: [],
  },
};

const inventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_HOUSE:
    case actionTypes.SEARCH_HOUSE_SUCCESS:
      return {
        ...state,
        house: {
          ...state.house,
          listHouse: action.data.listHouses ? action.data.listHouses : [],
          total: action.data.total,
        },
      };
    case actionTypes.SEARCH_HOUSE_FAIL:
      return {
        ...state,
        house: {
          ...state.house,
          listHouse: [],
          total: 0,
          page: 0,
        },
      };
    default:
      return state;
    
    case actionTypes.CLEAR_SEARCH_PARAMS:
      return {
        ...state,
        house: {
          ...state.house,
          searchParams: {},
        },
      };
  }
};

export default inventReducer;
