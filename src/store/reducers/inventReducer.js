import { getArea } from "../../utils/utils";
import actionTypes from "../actions/actionTypes";

const initialState = {
  house: {
    searchParams: {},
    total: 0,
    listHouse: [],
  },
  room: {
    listRooms: [],
    total: 0,
    searchParams: {},
    roomDetail: {},
  },
  publicHouse: {
    listHouse: [],
    total: 0,
    houseDetail: {},
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

    case actionTypes.SEARCH_ROOM_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          listRooms: action.data.rooms,
          total: action.data.total,
        },
      };

    case actionTypes.UPDATE_ROOM_SEARCH_PARAMS:
      return {
        ...state,
        room: {
          ...state.room,
          searchParams: action.data,
        },
      };

    case actionTypes.GET_ROOM_DETAIL_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          roomDetail: action.data,
        },
      };
    case actionTypes.GET_ROOM_DETAIL_FAIL:
      return {
        ...state,
        room: {
          ...state.room,
          roomDetail: {},
        },
      };
    case actionTypes.SEARCH_HOUSE_PUBLIC_SUCCESS:
      const houses = action.data.houses ? action.data.houses.map(item => {
        return {
          ...item,
          location: item.address + "," + getArea(item?.provinceID, item?.districtID, item?.wardID),
        };
      }) : [];

      return {
        ...state,
        publicHouse: {
          ...state.publicHouse,
          listHouse: houses,
          total: action.data.total,
        },
      };
    case actionTypes.SEARCH_HOUSE_PUBLIC_FAIL:
      return {
        ...state,
        publicHouse: {
          ...state.publicHouse,
          listHouse: [],
          total: 0,
        },
      };

    default:
      return state;
  }
};

export default inventReducer;
