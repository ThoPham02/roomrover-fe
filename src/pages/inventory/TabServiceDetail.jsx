import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import {
  CreateButton,
  CusTable,
  ServiceActionButton,
} from "../../components/ui";
import { HOUSE_SERVICE_TYPE, ROUTE_PATHS } from "../../common";
import { createService } from "../../store/services/inventServices";
import { ServiceModal } from "../../components/containers";
import { formatCurrencyVND } from "../../utils/utils";

const columns = [
  {
    header: "Chi phí",
    accessorKey: "name",
  },
  {
    header: "Giá",
    accessorKey: "price",
  },
  {
    header: "Loại",
    accessorKey: "type",
  },
];

const TabServiceDetail = ({ id }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    type: 1,
    price: "",
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseServiceAction(id));
  }, [dispatch, id]);

  const { houseService } = useSelector((state) => state.invent.house);

  const handleCreateServiceBtn = () => {
    setShowModal(true);
  };

  const handleCreateService = async (e) => {
    e.preventDefault();

    try {
      const res = await createService({
        houseID: id,
        ...newService,
      });

      if (res.result.code === 0) {
        dispatch(actions.getHouseServiceAction(id));
        setShowModal(false);
        setNewService({
          name: "",
          type: 1,
          price: "",
        });
      }
    } catch (error) {
      console.error("Error Create Service:", error);
      return null;
    }
  };

  const data = houseService?.map((service) => ({
    ...service,
    type: HOUSE_SERVICE_TYPE[service.type].name,
    price: formatCurrencyVND(service.price),
  }));

  return (
    <div className="relative">
      <CreateButton
        className="absolute -top-14 -right-0 z-1"
        onClick={handleCreateServiceBtn}
      />
      <CusTable
        headers={columns}
        data={data}
        page={1}
        ActionButton={ServiceActionButton}
      />

      <ServiceModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleCreateService}
        service={newService}
        setService={setNewService}
      />
    </div>
  );
};

export default TabServiceDetail;
