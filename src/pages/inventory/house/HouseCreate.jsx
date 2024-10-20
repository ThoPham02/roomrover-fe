import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../../../src/store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../../../src/common";
import { Breadcrumbs, HouseDetailForm } from "../../../../src/components/ui";
import { createHouse } from "../../../../src/store/services/inventServices";

const HouseCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [house, setHouse] = useState({
    name: "",
    type: 1,
    price: 0,
    area: 0,
    description: "",
    albums: [],
    address: "",
    provinceID: 1,
    districtID: 0,
    wardID: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.HOUSE));
  }, [dispatch]);

  const validateForm = (data) => {
    console.log("Data:", data);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...house,
      type: Number(house.type),
      price: Number(house.price),
      area: Number(house.area),
      albums: JSON.stringify(house.albums),
      rooms: JSON.stringify(
        house.rooms
          .filter((room) => room.name !== "")
          .map((room) => ({ ...room, capacity: Number(room.capacity) }))
      ),
      services: JSON.stringify(
        house.services
          .filter((service) => service.name !== "" && service.price !== "")
          .map((service) => ({
            ...service,
            price: Number(service.price),
            unit: Number(service.unit),
          }))
      ),
      provinceID: Number(house.provinceID),
      districtID: Number(house.districtID),
      wardID: Number(house.wardID),
    };

    validateForm(data);

    try {
      const res = await createHouse(data);

      if (res.result.code === 0) {
        navigate(ROUTE_PATHS.HOUSE_DETAIL.replace(":id", res.house.houseID));
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return null;
    }
  };

  return (
    <div className="house-create">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["CREATE"]}
        backRoute={ROUTE_PATHS.HOUSE}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE]}
        displayName={BREADCRUMB_DETAIL["CREATE"]}
      />

      <div className="relative">
        <HouseDetailForm
          house={house}
          setHouse={setHouse}
          option="create"
          handleSubmit={handleCreateSubmit}
        />
      </div>
    </div>
  );
};

export default HouseCreate;
