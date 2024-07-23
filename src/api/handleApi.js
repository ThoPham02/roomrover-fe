import { toast } from "react-toastify";

import { API_METHOD, DEFAULT_MESSAGE } from "../constants";
import instance from "./axios";

const handleApi = ({ path, method, body }) => {
  let promiseApi;

  switch (method) {
    case API_METHOD.GET:
      promiseApi = instance.get(path, { params: body });
      break;
    case API_METHOD.POST:
      promiseApi = instance.post(path, body);
      break;
    case API_METHOD.PUT:
      promiseApi = instance.put(path, body);
      break;
    case API_METHOD.DELETE:
      promiseApi = instance.delete(path);
      break;
    default:
      promiseApi = instance.get(path, { params: body });
  }

  if (method !== API_METHOD.GET) {
    toast.promise(
      promiseApi,
      {
        pending: DEFAULT_MESSAGE.PENDING,
      }
    );
  }

  return promiseApi;
};

export default handleApi;
