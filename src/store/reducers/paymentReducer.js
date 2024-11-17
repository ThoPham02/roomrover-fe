import { PaymentStatusComponent, RenterContactStatusComponent } from "../../common";
import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";
import actionTypes from "../actions/actionTypes";

const initialState = {
  bill: {
    listBill: [],
    total: 0,
    page: 0,
    searchParams: {},
    billDetails: {},
  },
  renterContact: {
    listRenterContacts: [],
    total: 0,
    page: 0,
    searchParams: {},
  },
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_PAYMENT_SUCCESS:
      const bills = action.data.bills
        ? action.data.bills.map((item) => {
            return {
              ...item,
              amount: formatCurrencyVND(item.amount),
              pay: formatCurrencyVND(item.amount - item.remain),
              remain: formatCurrencyVND(item.remain),
              paymentDate: convertTimestampToDate(item.paymentDate),
              statusComponent: PaymentStatusComponent[item.status],
            };
          })
        : [];

      return {
        ...state,
        bill: {
          ...state.bill,
          listBill: bills,
          total: action.data.total,
        },
      };
    case actionTypes.FILTER_PAYMENT_FAIL:
      return {
        ...state,
        bill: {
          ...state.bill,
          listBill: [],
          total: 0,
        },
      };
    case actionTypes.GET_PAYMENT_DETAIL_SUCCESS:
      return {
        ...state,
        bill: {
          ...state.bill,
          billDetail: action.data.bill,
        },
      };
    case actionTypes.GET_PAYMENT_DETAIL_FAIL:
      return {
        ...state,
        bill: {
          ...state.bill,
          billDetail: {},
        },
      };

    case actionTypes.GET_FILTER_RENTER_CONTACT_SUCCESS:
      const renterContacts = action.data.renters
        ? action.data.renters.map((item) => {
            return {
              ...item,
              cccdDate: convertTimestampToDate(item.cccdDate),
              statusComponent: RenterContactStatusComponent[item.status]
            };
          })
        : [];
      return {
        ...state,
        renterContact: {
          listRenterContacts: renterContacts,
          total: action.data.total,
        },
      };
    case actionTypes.GET_FILTER_RENTER_CONTACT_FAIL:
      return {
        ...state,
        renter_contact: {
          ...state.renter_contact,
          listRenterContacts: [],
          total: 0,
        },
      };

    default:
      return state;
  }
};

export default paymentReducer;
