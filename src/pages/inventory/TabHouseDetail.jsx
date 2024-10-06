import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { ROUTE_PATHS } from "../../common";
import { CreateButton, HouseDetailForm } from "../../components/ui";
import { updateHouse } from "../../store/services/inventServices";
// import { useNavigate } from "react-router-dom";

const TabHouseDetail = ({ id, option, setOption }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetailAction(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.house);
  const [house, setHouse] = useState(houseDetail);
  useEffect(() => {
    if (houseDetail) {
      setHouse(houseDetail);
    }
  }, [houseDetail]);

  const handleHouseUpdate = () => {
    setOption("update");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateHouse({
        ...house,
        type: Number(house.type),
        price: Number(house.price),
        area: Number(house.area),
        albums: JSON.stringify(house.albums),
        provinceID: Number(house.provinceID),
        districtID: Number(house.districtID),
        wardID: Number(house.wardID),
      });

      if (res.result.code === 0) {
        setOption("get");
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return null;
    }
  };
  return (
    <div className="relative">
      {option === "get" && (
        <CreateButton
          className="absolute -top-14 -right-0 z-1"
          onClick={handleHouseUpdate}
          text="Sửa"
          icon={<></>}
        />
      )}

      <HouseDetailForm
        houseDetail={house}
        setHouseDetail={setHouse}
        handleSubmit={handleSubmit}
        option={option}
      />
    </div>
  );
};

export default TabHouseDetail;
