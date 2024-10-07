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
    case actionTypes.CLEAR_SEARCH_PARAMS:
      return {
        ...state,
        house: {
          ...state.house,
          searchParams: {},
        },
      };

    case actionTypes.GET_HOUSE_DETAIL:
    case actionTypes.GET_HOUSE_DETAIL_SUCCESS:
      return {
        ...state,
        house: {
          ...state.house,
          houseDetail: action.data.house,
        },
      };
    case actionTypes.GET_HOUSE_DETAIL_FAIL:
      return {
        ...state,
        house: {
          ...state.house,
          houseDetail: null,
        },
      };

    case actionTypes.GET_HOUSE_SERVICE_SUCCESS:
      return {
        ...state,
        house: {
          ...state.house,
          houseService: action.data.services,
        },
      };
    case actionTypes.GET_HOUSE_SERVICE_FAIL:
      return {
        ...state,
        house: {
          ...state.house,
          houseService: [],
        },
      };

    case actionTypes.GET_HOUSE_ROOM_SUCCESS:
      return {
        ...state,
        house: {
          ...state.house,
          houseRoom: action.data.rooms,
          totalRoom: action.data.total,
        },
      };
    case actionTypes.GET_HOUSE_ROOM_FAIL:
      return {
        ...state,
        house: {
          ...state.house,
          houseRoom: [],
        },
      };

    default:
      return state;
  }
};

export default inventReducer;
