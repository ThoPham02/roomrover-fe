export const ApiUrl = {
  // auth
  FilterUser: {
    url: "/users/filter",
    method: "get",
  },
  GetUser: {
    url: "/users/:id",
    method: "get",
  },
  UpdateUser: {
    url: "/users/:id",
    method: "put",
  },

  // invent
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

  GetHouseService: {
    url: "/invent/service/house/:id",
    method: "get",
  },
  GetService: {
    url: "/invent/service/:id",
    method: "get",
  },
  CreateService: {
    url: "/invent/service",
    method: "post",
  },
  UpdateService: {
    url: "/invent/service/:id",
    method: "put",
  },
  DeleteService: {
    url: "/invent/service/:id",
    method: "delete",
  },

  GetHouseRoom: {
    url: "/invent/room/house/:id",
    method: "get",
  },
  GetRoom: {
    url: "/invent/room/:id",
    method: "get",
  },
  CreateRoom: {
    url: "/invent/room",
    method: "post",
  },
  UpdateRoom: {
    url: "/invent/room/:id",
    method: "put",
  },
  DeleteRoom: {
    url: "/invent/room/:id",
    method: "delete",
  },
  FilterRoom: {
    url: "/invent/room/filter",
    method: "get",
  },

  // contract
  FilterContracts: {
    url: "/contract/filter",
    method: "get",
  },

  CreateContract: {
    url: "/contract",
    method: "post",
  },
};
