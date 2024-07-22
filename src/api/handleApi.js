import { DEFAULT_MESSAGE } from "../constants";
import instance from "./axios";
import { toast } from "react-toastify";

const handleApi = ({ path, method, body }) => {
  let promiseApi;

  switch (method) {
    case "get":
      promiseApi = instance.get(path, { params: body });
      break;
    case "post":
      promiseApi = instance.post(path, body);
      break;
    case "put":
      promiseApi = instance.put(path, body);
      break;
    case "delete":
      promiseApi = instance.delete(path);
      break;
    default:
      promiseApi = instance.get(path, { params: body });
  }

  if (method === "post" || method === "put") {
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
