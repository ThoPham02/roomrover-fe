export const ApiUrl = {
  FilterHouses: {
    url: "/invent/house/filter",
    method: "get",
  },
  GetHouse: {
    url: "/invent/house/:id",
    method: "get",
  },
  CreateHouse: {
    url: "/invent/house",
    method: "post",
  },
  UpdateHouse: {
    url: "/invent/house/:id",
    method: "put",
  },
  DeleteHouse: {
    url: "/invent/house/:id",
    method: "delete",
  },
  UploadImage: {
    url: "/invent/upload",
    method: "post",
  },
};
