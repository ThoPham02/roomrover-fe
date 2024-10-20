import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as actions from "../../../store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../../common";
import {
  Breadcrumbs,
  CreateButton,
  HouseDetailForm,
} from "../../../components/ui";
import { updateHouse } from "../../../store/services/inventServices";

const HouseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { houseDetail } = useSelector((state) => state.invent.house);
  const [house, setHouse] = useState({
    albums: [],
    rooms: [],
    services: [],
  });
  const [option, setOption] = useState("get");

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.HOUSE));

    if (id) {
      dispatch(actions.getHouseDetailAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (houseDetail) {
      setHouse(houseDetail);
    }
  }, [houseDetail]);

  const validateForm = (data) => {
    console.log("Data:", data);
  };

  const handleUpdateSubmit = async (e) => {
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
          .map((room) => ({ ...room, maxPeople: Number(room.maxPeople) }))
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
        const res = await updateHouse(data);
  
        if (res.result.code === 0) {
          setOption("get");
        }
      } catch (error) {
        console.error("Error Update House:", error);
        return null;
      }
  };

  return (
    <div className="house-detail-page">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["DETAIL"]}
        backRoute={ROUTE_PATHS.HOUSE}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.HOUSE]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <div className="relative">
        <CreateButton
          className="absolute -top-16 right-0 z-1"
          icon={<></>}
          text="Sửa"
          onClick={() => setOption("update")}
        />

        <HouseDetailForm
          house={house}
          setHouse={setHouse}
          option={option}
          handleSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default HouseDetail;
