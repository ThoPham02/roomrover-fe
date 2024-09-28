import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { ROUTE_PATHS } from "../../common";
import { CreateButton, HouseDetailForm } from "../../components/ui";

const TabHouseDetail = ({ id, option, setOption }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetailAction(id));
  }, [dispatch, id]);
  
  const { houseDetail } = useSelector((state) => state.invent.house);
  const [house, setHouse] = useState(houseDetail);
  

  const handleHouseUpdate = () => {
    setOption("update");
  };

  const handleSubmit = (e) => {};
  return (
    <div className="relative">
      <CreateButton
        className="absolute -top-14 -right-0 z-1"
        onClick={handleHouseUpdate}
        text="Sửa"
        icon={<></>}
      />

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
