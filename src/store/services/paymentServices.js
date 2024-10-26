import { ApiUrl } from "./apiUrl";
import axios from "../axios";

export const apiFilterPayment = async (filters) => {
  try {
    const response = await axios({
      ...ApiUrl.FilterPayments,
      params: filters,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const apiGetPaymentDetail = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.GetPaymentDetail,
      url: ApiUrl.GetPaymentDetail.url.replace(":id", id),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const apiZaloPayment = async (id) => {
  try {
    const response = await axios({
      ...ApiUrl.ZaloPayment,
      url: ApiUrl.ZaloPayment.url,
      data: { billID: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
