import instance from "./axios";

import {toast} from "react-toastify";

const handleApi = ({ path, method, body }) => {

  switch (method) {
    case "get":
      return instance.get(path);
    case "post":
      var promiseApi = instance.post(path, body)
      toast.promise(
        promiseApi,
        {
          pending: "Đang xử lý!",
          success: "Xử lý thành công!",
          error: "Lỗi hệ thống! Xin vui lòng thử lại!",
        }
      );

      return promiseApi;
    case "put":
      return instance.put(path, body);
    case "delete":
      return instance.delete(path);
    default:
      return instance.get(path);
  }
};

export default handleApi;
