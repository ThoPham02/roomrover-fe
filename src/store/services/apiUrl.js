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
  SearchHouse: {
    url: "/invent/house/search",
    method: "get",
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
  SearchRoom: {
    url: "/invent/room/search",
    method: "get",
  },
  UpdateRoomStatus: {
    url: "/invent/room/:id/status",
    method: "put",
  },

  CreateContact: {
    url: "/invent/contact",
    method: "post",
  },
  FilterContact: {
    url: "/invent/contact/filter",
    method: "get",
  },
  DeleteContact: {
    url: "/invent/contact/:id",
    method: "delete",
  },
  UpdateStatusContact: {
    url: "/invent/contact/:id",
    method: "put",
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
  GetContractDetail: {
    url: "/contract/:id",
    method: "get",
  },
  UpdateStatusContract: {
    url: "/contract/:id/status",
    method: "put",
  },
  ConfirmContract: {
    url: "/contract/:id/confirm",
    method: "put",
  },
  UpdateContract: {
    url: "/contract/:id",
    method: "put",
  },

  // Payment
  FilterPayments: {
    url: "/bill/filter",
    method: "get",
  },
  GetPaymentDetail: {
    url: "/bill/:id",
    method: "get",
  },
  ZaloPayment: {
    url: "/bill/zalo",
    method: "post",
  },
  GetListBillDetail: {
    url: `/contract/bill-detail/:id`,
    method: "get",
  },
  UpdateListBillDetail: {
    url: `/contract/bill-detail/:id`,
    method: "put",
  },
  CreateBillPay: {
    url: "/bill/pay",
    method: "post",
  },

  // Noti 
  listNotis: {
    url: "/notifications/list",
    method: "get",
  },
  markAsReadNoti: {
    url: "/notifications/mark-read/:id",
    method: "put",
  },
  filterRenterContact: {
    url: "/contract/renters",
    method: "get",
  },
  ConfirmContact: {
    url: "/contract/renters/:id",
    method: "put",
  }
};
